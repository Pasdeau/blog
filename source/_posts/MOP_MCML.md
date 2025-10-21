---
title: MOP‑MCML User Guide and Introduction
date: 2025-09-09
mathjax: true
description: A practical, theory‑grounded guide to the MOP‑MCML Monte‑Carlo simulator for modeling photon transport in layered biological tissues, with instructions, file formats, and validation recipes.
---

This manual addresses research on light propagation simulations in biological tissues. Building on the physical model and Monte Carlo methodology of MCML, we establish and describe the MOP-MCML framework to quantify the mean optical path (MOP) traversed by light within tissue from emission at the source to reception by a photodiode (PD). The document introduces MCML fundamentals, our extensions and contributions, input/output (I/O) and visualization methods, and a complete end-to-end simulation workflow with representative results.

# 1. Background and Objectives

In wearable or implantable biomedical systems, near-infrared spectroscopy (NIRS) is widely used for functional monitoring and optical imaging to assess tissue integrity and physiological state. Relying solely on surface reflectance $R$ and transmittance $T$ is insufficient for engineering demands related to the “reachability” of target layers; practical design focuses on internal quantities such as the optical path (denoted $OP$) and penetration depth.

Building on classical MCML, we implement MOP-MCML by introducing configurable geometric detection regions, user-defined source distributions, MOP visualization, and computation of material reflectance and transmittance. Validation on single-layer and multi-layer tissue cases demonstrates a simulation toolchain suitable for experimental design and parameter inversion.

# 2. Overview of MCML

The Monte Carlo Multi-Layer (MCML) model is open-source software developed in the 1990s for steady-state optical simulations in biological media and remains foundational for modeling steady-state light transport [[1](#ref1)]. Tissue is modeled as a semi-infinite multilayer stack along the $z$-axis. Each layer at wavelength $\lambda$ is characterized by four macroscopic parameters:

$$
\mu_a(\lambda), \mu_s(\lambda), g(\lambda), n(\lambda)
$$

Here, $\mu_a$ is the absorption coefficient, $\mu_s$ the scattering coefficient, $g$ the anisotropy factor, and $n$ the refractive index. The reduced scattering coefficient is commonly written as

$$
\mu_s'=(1-g) \ \mu_s
$$

MCML discretizes incident light into photon packets. Each photon undergoes absorption, scattering, and interface reflection/transmission as random events, generating statistical samples [[2](#ref2)]. The standard error of independent samples decays with the total photon count $N_{\mathrm{ph,tot}}$ approximately as

$$
SE \propto N_{\mathrm{ph,tot}}^{-\frac{1}{2}}
$$

# 3. Simulation Principles and Computational Methods

## 3.1 Photon Packets and Free-Path Sampling

Each free path $L_i$ follows an exponential distribution:

$$
L_i = -\frac{\ln(\xi_i)}{\mu_a+\mu_s}, \quad 0<\xi<1
$$

In common visible–NIR tissues, the free path typically ranges from $10\sim1000 \ \mu\mathrm{m}$. At the end of each step, the propagation direction is updated by a phase function (e.g., Henyey–Greenstein), and the photon weight is decreased according to absorption.

## 3.2 Computing Reflectance and Transmittance

In the original MCML, all escaping photons are accumulated at the exit surface to estimate $X\in\{R,T\}$:

$$
X=\frac{1}{\omega_i \ N_{\mathrm{ph,tot}}}\sum_{j=1}^{N_{\mathrm{ph},X}} \omega_{0,j}
$$

where $\omega_i$ is the initial weight, $\omega_{0,j}$ is the exit weight of the $j$-th photon, and $N_{\mathrm{ph},X}$ is the number of photons in the corresponding set.

In MOP-MCML, we define on the reflection side $z=0$ and the transmission side $z=Z_{\max}$ a rectangular PD on each detection plane, and we only tally photons that hit the PD active area:

$$
X=\frac{1}{\omega_i \ N_{\mathrm{ph,tot}}}\sum_{j=1}^{N_{\mathrm{ph}}}\omega_{0,j}
$$

where $N_{\mathrm{ph}}$ counts photons striking the PD. This definition aligns with real-device measurements and markedly improves simulation–experiment consistency.

## 3.3 Mean Optical Path and Penetration Depth

For the $N_{\mathrm{ph}}$ detected photon trajectories [[3](#ref3)], let the total pathlength of the $j$-th trajectory be
{% raw %}
$$
\mathrm{OP}_j=\sum_{i=1}^{N_j} L_{i}
$$
{% endraw %}
The arithmetic mean optical path is
{% raw %}
$$
\mathrm{MOP}_{\text{arith}}=\frac{1}{N_{\mathrm{ph}}}\sum_{j=1}^{N_{\mathrm{ph}}}\mathrm{OP}_j
$$
{% endraw %}
An intensity-weighted mean, more consistent with intensity measurements, is

$$
L_{\mathrm{eff}}=\frac{\sum_j \omega_j \ \mathrm{OP}_j}{\sum_j \omega_j}
$$

where $\omega_j$ is the exit weight. Under the diffusion approximation, a characteristic penetration depth can be written as

$$
\delta=\frac{1}{3 \ \mu_a(\mu_a+\mu_s')}
$$

which is used for comparison with numerical results. For a homogeneous medium, the analytical transmittance under pure absorption ($\mu_s'=0$) is

$$
T_{\mathrm{th}}=e^{-\mu_a d}
$$

If written as $\exp[-(\mu_a+\mu_s')d]$, it reduces to the above in the absence of scattering.

# 4. Source–Detector Separation and DPF Derivation

## 4.1 Source–Detector Separation (SDS)

Reflection mode:

$$
r_{\mathrm{refl}}=(x_r-x_s)^2+(y_r-y_s)^2
$$

Transmission mode:

$$
r_{\mathrm{trans}}=(x_t-x_s)^2+(y_t-y_s)^2
$$

In MOP-MCML, $(x_s,y_s)$ are specified by $(\text{light\_x},\text{light\_y})$, while $(x_r,y_r)$ and $(x_t,y_t)$ are given by $(\text{PD\_Rx},\text{PD\_Ry})$ and $(\text{PD\_Tx},\text{PD\_Ty})$, respectively.

## 4.2 From Path Integrals to the MBLL Equivalence

Let $\mu_a$ denote the absorption coefficient. For the $j$-th trajectory, the intensity factor is approximated by $\exp(-\mu_a \mathrm{OP}_j)$. The total detected intensity $I(\mu_a)$ and decadic absorbance $A(\mu_a)$ are

$$
I(\mu_a)=\sum_j \omega_j(0)e^{-\mu_a \mathrm{OP}_j}
$$

$$
A(\mu_a)=-\log_{10}\frac{I(\mu_a)}{I(0)}
$$

For a small perturbation $\Delta \mu_a$,

$$
\frac{\mathrm{d}A}{\mathrm{d}\mu_a}=\frac{1}{\ln 10}
$$
{% raw %}
$$
\frac{\sum_j \omega_j(0) \ \mathrm{OP}_j \ e^{-\mu_a \mathrm{OP}_j}}{\sum_j \omega_j(0) \ e^{-\mu_a \mathrm{OP}_j}} \approx L_{\mathrm{eff}}\ln 10
$$
{% endraw %}
and thus

$$
\Delta A \approx L_{\mathrm{eff}}\ln 10 \ \Delta \mu_a
$$

The modified Beer–Lambert law (MBLL) relates $\Delta A$ to the geometric separation $r$ and the differential path length factor $DPF$:

$$
\Delta A \approx DPF\cdot r \cdot \ln 10 \ \Delta \mu_a
$$

By comparison,

$$
DPF=\frac{L_{\mathrm{eff}}}{r}
$$

If one focuses on a specific region or layer $k$, then

$$
L_{\mathrm{eff},k}=\frac{\sum_j \omega_j \ \mathrm{OP}_{j,k}}{\sum_j \omega_j}
$$

$$
DPF_k=\frac{L_{\mathrm{eff},k}}{r}
$$

When the diffusion approximation holds and the medium’s optical parameters are fixed, $DPF$ is approximately constant (or slowly varying) with respect to $r$ within the usable range, so $L_{\mathrm{eff}}\approx DPF\cdot r$ grows roughly linearly with $r$. Only when $r$ is too small (non-diffusive regime) or too large (boundary/loss dominated) does $DPF$ deviate markedly from constancy.

# 5. From MCML to MOP-MCML

## 5.1 Geometric Modeling of Detectors and Sources

On $z=0$ and $z=Z_{\max}$, we define a rectangular PD on each detection plane with independently adjustable center coordinates and side lengths (in cm) to tally photons incident on the device’s active area. The source supports three spatial profiles: point ($\text{type}=1$), Gaussian ($\text{type}=2$), and flat-top uniform ($\text{type}=3$), each with configurable center and size parameters.

## 5.2 New Statistics and Outputs

MOP-MCML provides **device-consistent** estimates of reflectance R and transmittance T, the **intensity-weighted mean pathlength** $L_{\mathrm{eff}}$, **penetration-depth histograms**, and **harmonized summary statistics** for both reflection and transmission geometries. These outputs are designed to support the **joint optimization** of source–detector separation (SDS) and device dimensions.

To streamline batch experiments, after each run the computed R and T are appended to a project-level summary file (`summary.csv`), enabling quick inspection, aggregation, and cross-run comparison without parsing individual output files.

## 5.3 I/O and MATLAB Visualization Updates

We extend the `.mco` output in `mcmlio.c` to append PD adn source geometry and the source type. Example:

```c
// Add coordinate information here
fprintf(file, "%G\t%G\t\t%G\t\t%G\t%G\t\t%G\t\t# PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)\n",
        In_Parm.PD_Rx, In_Parm.PD_Ry, In_Parm.PD_Rl,
        In_Parm.PD_Tx, In_Parm.PD_Ty, In_Parm.PD_Tl);

// The light type
fprintf(file, "%hd\t\t%G\t%G\t\t%G\t\t# light source : param 1: 1.point 2.Gaussian 3.Flat\n",
        In_Parm.lightType, In_Parm.light_x, In_Parm.light_y, In_Parm.light_l);
```

Corresponding `.mco` tail example:

```python
1.2 0.1  0.05  0.8 0.1  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.1  0.05              # light source: 1.point 2.Gaussian 3.Flat
```

Leveraging the added source and PD coordinates, size parameters, and source type, the visualization highlights positions and physical sizes for both the source and the two PDs (reflection and transmission), improving spatial interpretability. Symbolization depends on the source type: a point source is drawn as an inverted triangle, whereas extended sources are annotated with semi-transparent shapes sized to their physical extent. This enhances clarity of ray-path diagrams and improves interpretability of simulation results.

# 6. Installation and Usage

## 6.1 Clone and Build

MOP-MCML is written in C and can be compiled and optimized with standard toolchains. You can obtain the source code from the following repository:

```bash
git clone https://gitlab.lip6.fr/feruglio/mop-mcml.git
```

Then, build MOP-MCML on your machine.

* **Windows (Visual Studio 2022):**
  Open the source tree in Visual Studio, select a **Release** configuration, and enable compiler optimizations (e.g., `/O2` or `/O3`). Build the project to produce `mop-mcml.exe`.

* **Linux/macOS (GCC or Clang):**
  From the project root, compile with:

  ```bash
  gcc -O3 -o mop-mcml *.c -lm
  ```

  If you prefer Clang, replace `gcc` with `clang`. Ensure the math library is linked with `-lm` and that high-level optimization (e.g., `-O3`) is enabled.

The resulting executable reads text-based `.mci` input files and writes `.mco` result files.

## 6.2 Input File Essentials

1. Global/batch control: A single `.mci` can define multiple simulations (varying SDS, wavelength, or layer parameters).

2. Layer model: Specify thickness $d$ (or layer interfaces $z$) and $\mu_a,\ \mu_s,\ g,\ n$ per layer.

3. Source: $\text{lightType}\in{1,2,3}$; $(\text{light}_x,\text{light}_y)$ are source center coordinates (cm); `light_l` is the size parameter (e.g., radius and half-width, cm).

4. Detectors: Reflection PD center $(\text{PD\_Rx},\text{PD\_Ry})$ and side $\text{PD\_Rl}$; transmission PD center $(\text{PD\_Tx},\text{PD\_Ty})$ and side $\text{PD\_Tl}$.

5. Photon count: $N_{\mathrm{ph,tot}}$ typically starts from $10^6$; larger counts reduce variance but increase runtime.

6. Grid: Step and voxel sizes should match tissue characteristic scales; average free paths of $10\sim100 \ \mu\mathrm{m}$ are typical in NIRS regimes.

7. Multiple runs: Enforce strict blank-line and block formatting to avoid parser ambiguity at run boundaries.

Follow the repository’s parser for exact syntax; examples can be filled according to the implemented field order and units.

## 6.3 Running and Output

Command-line usage:

```bash
./mop-mcml your_input_file_name.mci
```

The `.mco` output includes grids and layer info, $R$ and $T$ statistics, and vector and matrix data blocks (e.g., `Al`, `Az`, `Rr`/`Ra`, `Tr`/`Ta`, `Azr`, `Rra`/`Tra`, `OP`). If the project’s I/O extension is enabled, two lines of geometric metadata (PDs and source) are appended at the end (see Section 5.3).

## 6.4 MATLAB Visualization Workflow

1. Environment: Place parsing/plotting scripts on the MATLAB path. If a project colormap utility `makec2f.m` exists, plotting will use it; otherwise, a default colormap is used.

2. Data ingestion: Use the reader to parse `.mco`, validating grids, layer parameters, statistics, and data blocks; both legacy and extended `.mco` files are supported (auto-detecting the optional tail metadata).

3. Main rendering: Plot $\log_{10}(\mathrm{OP})$ via

   $$
   \texttt{imagesc}(r,z,\log_{10}(\mathrm{OP}))
   $$

   with axes in cm. Draw the source marker just above the top surface based on source type: inverted triangle for a point source; semi-transparent square scaled to size for extended sources. Draw rectangular patches for the reflection and transmission PDs above $z=0$ and below $z=Z_{\max}$, respectively. Normalize colorbars/contrast for cross-figure comparability.

4. Derived plots and layer interfaces: Use $R_r, T_r$ for radial energy distributions, $R_a, T_a$ for angular distributions; overlay dashed horizontal lines for layer boundaries using cumulative thickness.

5. SDS and DPF: When `.mco` contains geometric metadata, compute

   $$
   r_{\mathrm{refl}}=(x_r-x_s)^2+(y_r-y_s)^2
   $$

   $$
   r_{\mathrm{trans}}=(x_t-x_s)^2+(y_t-y_s)^2
   $$

   Given $L_{\mathrm{eff}}$

   $$
   DPF=\frac{L_{\mathrm{eff}}}{r}
   $$

6. Robustness tip: Validate $T_{\mathrm{th}}=e^{-\mu_a d}$ with a non-scattering sample to regression-test I/O and statistical definitions.

{% asset_img MOP-MCML.png MOP-MCML %}

# 7. Numerical Validation and Representative Results

1. Single-layer transmittance and penetration depth (subcutaneous tissue, $Z_{\max}=1 \ \mathrm{cm}$, $\lambda=1300 \ \mathrm{nm}$). Source at $(0.8,0.2,0.1) \ \mathrm{cm}$; reflection-side PD is a $0.05 \ \mathrm{cm} \times 0.05 \ \mathrm{cm}$ square centered at $(1.2,0.2,0.1) \ \mathrm{cm}$; $N_{\mathrm{ph,tot}}=2\times10^6$. In reflection mode, the maximum penetration is about $0.6\ \mathrm{cm}$, the mean is about $0.28 \ \mathrm{cm}$, and the relative error versus the analytical approximation $\delta\approx0.32 \ \mathrm{cm}$ is roughly $12.5\\%$. Theoretical and simulated transmittance agree within reasonable error.

2. Non-scattering medium transmittance check: Set $\mu_s=0$ and $\mu_a \in [0.5,3.0] \ \mathrm{cm}^{-1}$. Simulated transmittance typically differs from $T_{\mathrm{th}}=e^{-\mu_a d}$ by less than $5\\%$, suitable for regression testing.

# 8. Parameter Selection and Common Issues

1. Photon count vs variance: Increase $N_{\mathrm{ph,tot}}$ first to reduce statistical variance; an engineering workflow may use $10^5$ for coarse scans, then $10^6$ for refinement.

2. Source–detector separation: In reflection mode, SDS governs reachable depth and SNR; batch scanning is recommended to balance sensitivity and depth.

3. Detector size: Smaller PDs improve geometric fidelity but reduce collected photon counts; match PD area to the real device.

4. Layer parameters: Use literature or measured properties at the target wavelength and ensure physical consistency among $\mu_a,\ \mu_s,\ g,\ n$.

5. MATLAB `.mco` parse failures: Often due to ignoring the final two lines of geometric metadata or using outdated scripts. A temporary workaround is to skip the last two lines; the long-term fix is to update the parser.

6. Multiple runs and ASCII format errors: Blank lines and block layouts in `.mci` affect parsing. Use a fixed order and compact layout for each run entry and avoid inserting blank lines between critical blocks.

# 9. Examples

## A. Example mci with Multiple Simulations

Each MOP-MCML execution is driven by a single `.mci` file. By adjusting `Number of runs`, one `.mci` can produce multiple `.mco` results, improving throughput and enabling batch variation of SDS to evaluate MOP, penetration depth, and collection efficiency. The example `.mci` below sets multiple simulations, each producing one `.mco` corresponding to different materials and wavelengths.

```python
1.0   # file version
2     # Number of runs

### Specify data for run 1 ###
fat700.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.455  1.11  122  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD: (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source: 1.point 2.Gaussian 3.Flat; 

### Specify data for run 2 ###
fat800.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.455  1.07  111.5  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD: (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source: 1.point 2.Gaussian 3.Flat;
```

## B. Mode Selection and Application

In `mcmlmain.c`, the following toggles are available:

* Commenting out “Recording photon optical paths in R” disables MCML in R mode.
* Commenting out “Recording photon optical paths in T” disables MCML in T mode.

In a single active mode, one obtains the MOP from the source to the chosen detection region. The visualization below shows single-layer adipose tissue at $800 \ \mathrm{nm}$.

{% asset_img fig1_new.png Distribution of optical paths in reflection (a) and transmission (b) for a layer of human hypodermis %}

## C. Multilayer Ankle Model

We configure reflection mode with an SDS of approximately $4 \ \mathrm{mm}$ to verify that photons can reach the ligament layer and be received by the photodiode. Layer optical parameters are listed below; the simulation wavelength is $1300 \ \mathrm{nm}$ [[4](#ref4)].

| $\text{Layer}$       | $d$ $\text{(cm)}$ | $\mu_a$ $\text{(}\mathrm{cm}^{-1}\text{)}$ | $\mu_s$ $\text{(}\mathrm{cm}^{-1}\text{)}$ |
| :-----------: | :----------: | :---------------------------------: | :---------------------------------: |
| Epidermis   | 0.025      | 0.71                              | 25.70                             |
| Dermis      | 0.12       | 1.19                              | 16.20                             |
| Hyperdermis | 0.20       | 1.05                              | 15.80                             |
| Ligament    | 0.22       | 0.70                              | 16.50                             |

This example illustrates how to construct a multilayer model. Note that the total material thickness must match `dz` in the `.mci`; otherwise, black regions may appear in visualization due to a mismatch between physical and optical thicknesses [[5](#ref5)].

{% asset_img liga_3.png Simulation results of ankle tissue at 1300nm %}

# References
<span id="ref1">[1]</span> S.L. Jacques. 2022. History of Monte Carlo modeling of light transport in tissues using mcml.c. Journal of Biomedical Optics, 27(8), 083002. DOI: 10.1117/1.JBO.27.8.083002.
<span id="ref2">[2]</span> S. Chatterjee, P.A. Kyriacou. Monte Carlo Analysis of Optical Interactions in Reflectance and Transmittance Finger Photoplethysmography. Sensors, 2019. DOI: 10.3390/s19040789.
<span id="ref3">[3]</span> S. Chatterjee, J.P. Phillips, P.A. Kyriacou. Monte Carlo investigation of the effect of blood volume and oxygen saturation on optical path in reflectance pulse oximetry. Biomedical Physics and Engineering Express, 2016, 2(6): 065018. DOI: 10.1088/2057-1976/2/6/065018.
<span id="ref4">[4]</span> A.N. Bashkatov, E.A. Genina, V.V. Tuchin. Optical properties of skin, subcutaneous, and muscle tissues: a review. Journal of Innovative Optical Health Sciences, 2011, 4(01): 9–38. DOI: 10.1142/S1793545811001319.
<span id="ref5">[5]</span> I. Saliba, A. Hardy, W. Wang, R. Vialle, S. Feruglio. A Review of Chronic Lateral Ankle Instability and Emerging Alternative Outcome Monitoring Tools in Patients following Ankle Ligament Reconstruction Surgery. J. Clin. Med. 2024, 13, 442. DOI: 10.3390/jcm13020442.
