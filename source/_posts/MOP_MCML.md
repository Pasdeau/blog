---
title: "MOP-MCML: A User Guide and Technical Introduction"
date: 2025-09-09
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Optical Simulation
  - User Manuals
tags:
  - MCML
  - Monte Carlo
  - Biomedical Optics
  - MOP
description: A practical, theory-grounded guide to the MOP-MCML simulator for modeling photon transport in layered biological tissues, featuring Mean Optical Path (MOP) analysis and enhanced visualization.
---

This manual provides a comprehensive guide for researchers modeling light propagation in biological tissues. Building upon the foundational physical models of standard MCML, the **MOP-MCML** framework extends capabilities to quantify the **Mean Optical Path (MOP)** traversed by photons from emission to detection. This document details the underlying principles, new features, input/output specifications, visualization tools, and a complete end-to-end workflow with validation examples.

# 1. Background and Objectives

In the design of wearable or implantable biomedical systems, Near-Infrared Spectroscopy (NIRS) is a cornerstone technology for assessing tissue physiology. However, relying solely on surface measurements of Reflectance ($R$) and Transmittance ($T$) is often insufficient for engineering robust sensors. Practical design requires a deeper understanding of internal photon behavior, specifically:
*   **"Reachability"**: Does light penetrate to the target layer (e.g., muscle or deep vessels)?
*   **Pathlength**: What is the effective optical pathlength for applying the Beer-Lambert law?

MOP-MCML addresses these needs by introducing:
*   Configurable geometric detection regions (photodiodes).
*   User-defined source profiles (Point, Gaussian, Flat-top).
*   Direct computation and visualization of the Mean Optical Path (MOP).
*   Device-consistent estimation of $R$ and $T$.

---

# 2. Overview of MCML

The **Monte Carlo Multi-Layer (MCML)** model, developed in the 1990s, remains the gold standard for steady-state optical simulations in turbid media [[1](#ref1)]. It models tissue as a semi-infinite stack of layers aligned along the $z$-axis. Each layer is defined by its optical properties at a specific wavelength $\lambda$:

$$ \mu_a(\lambda), \ \mu_s(\lambda), \ g(\lambda), \ n(\lambda) $$

Where:
*   $\mu_a$: Absorption coefficient ($cm^{-1}$)
*   $\mu_s$: Scattering coefficient ($cm^{-1}$)
*   $g$: Anisotropy factor (dimensionless)
*   $n$: Refractive index

The reduced scattering coefficient is given by $\mu_s'=(1-g)\mu_s$.

MCML simulates photon packets undergoing random walk events (absorption, scattering, reflection/refraction) [[2](#ref2)]. The statistical error of the simulation decreases with the total number of photon packets $N_{ph,tot}$:

$$ SE \propto \frac{1}{\sqrt{N_{ph,tot}}} $$

---

# 3. Simulation Principles and Computational Methods

## 3.1 Photon Packets and Free-Path Sampling
The step size $L_i$ between interaction events is sampled from an exponential distribution:

$$ L_i = -\frac{\ln(\xi)}{\mu_a+\mu_s}, \quad \xi \in (0,1) $$

In biological tissues (visible–NIR), the mean free path ranges from $10$ to $1000 \mu m$. After each step, the photon's weight is attenuated by absorption, and its direction is updated using a phase function (e.g., Henyey–Greenstein).

## 3.2 Computing Reflectance and Transmittance
**Standard MCML** calculates $R$ and $T$ by accumulating all photons exiting the upper or lower surfaces, effectively assuming an infinite detector.

**MOP-MCML** introduces finite detectors. We define rectangular Photodiodes (PDs) on the reflection ($z=0$) and transmission ($z=Z_{max}$) planes. Reflectance and Transmittance are calculated only from photons striking the active area:

$$ X = \frac{1}{W_i \cdot N_{ph,tot}}\sum_{j=1}^{N_{ph}}\omega_{0,j} $$

Where $N_{ph}$ is the count of photons hitting the specific PD geometry. This approach aligns simulation results with real-world sensor measurements.

## 3.3 Mean Optical Path and Penetration Depth
For the $N_{ph}$ detected photon trajectories [[3](#ref3)], the total pathlength of the $j$-th photon is $OP_j = \sum L_i$.

We define the **Intensity-Weighted Mean Optical Path ($L_{eff}$)**, which is most relevant for intensity-based sensing:

$$ L_{eff} = \frac{\sum_j \omega_j \cdot OP_j}{\sum_j \omega_j} $$

Under the diffusion approximation, the theoretical penetration depth $\delta$ is:

$$ \delta = \frac{1}{\sqrt{3\mu_a(\mu_a+\mu_s')}} $$

This theoretical value serves as a benchmark for verifying numerical results.

---

# 4. Source–Detector Separation and DPF

## 4.1 Source–Detector Separation (SDS)
Geometry is critical in NIRS. MOP-MCML allows precise placement of sources and detectors. The SDS is calculated as:

*   **Reflection Mode**: $r_{refl} = \sqrt{(x_r-x_s)^2 + (y_r-y_s)^2}$
*   **Transmission Mode**: $r_{trans} = \sqrt{(x_t-x_s)^2 + (y_t-y_s)^2}$

## 4.2 The Differential Pathlength Factor (DPF)
The Modified Beer–Lambert Law (MBLL) relates absorbance changes $\Delta A$ to absorption changes $\Delta \mu_a$:

$$ \Delta A \approx L_{eff} \cdot \ln 10 \cdot \Delta \mu_a $$

We can express $L_{eff}$ in terms of the geometric distance $r$ and a scaling factor, the **DPF**:

$$ DPF = \frac{L_{eff}}{r} $$

In the diffusive regime, $DPF$ is relatively constant, meaning $L_{eff}$ scales linearly with $r$. MOP-MCML allows you to calculate $DPF$ directly for complex, multilayer geometries where analytical solutions fail.

---

# 5. From MCML to MOP-MCML: Key Extensions

## 5.1 Measurement Geometry Modeling
MOP-MCML adds specific geometric definitions to the input file:
*   **detectors**: Rectangular PDs defined by center coordinates and side lengths.
*   **Sources**:
    *   Type 1: Point Source
    *   Type 2: Gaussian Beam
    *   Type 3: Flat-top Uniform Beam

## 5.2 Enhanced Output Statistics
New outputs include:
*   **Device-consistent $R$ and $T$**: Based on finite detector aperture.
*   **$L_{eff}$**: Intensity-weighted mean optical path.
*   **Summary File**: A `summary.csv` is automatically generated, appending $R$ and $T$ from batch runs for easy analysis.

## 5.3 Improved I/O and Visualization
The output `.mco` file format is extended to include geometric metadata. This enables the MATLAB visualization scripts to:
*   Draw exact source and detector positions.
*   Visualize the source profile (e.g., inverted triangle for point, semi-transparent shape for area).
*   Overlay these on the photon fluence map for clear interpretation.

---

# 6. Installation and Usage

## 6.1 Clone and Build
MOP-MCML is written in C.

```bash
git clone https://github.com/Pasdeau/MOP-MCML.git
```

**Build Commands**:
*   **Linux/macOS**:
    ```bash
    gcc -O3 -o mop-mcml *.c -lm
    ```
*   **Windows**: Use Visual Studio with Release configuration and `/O2` optimization.

## 6.2 Input File (.mci) Essentials
The input file structure dictates the simulation. Key additions for MOP-MCML are the source type and geometric coordinates for PDs. Ensure strict adherence to the format (avoid sparse blank lines between data blocks).

## 6.3 Running the Simulation
```bash
./mop-mcml your_input_file.mci
```

## 6.4 MATLAB Visualization
Using the provided MATLAB scripts:
1.  **Parse**: Read the `.mco` file.
2.  **Render**: Use `imagesc` to plot $\log_{10}(OP)$.
3.  **Overlay**: The script automatically draws the source (top) and detectors (reflection/transmission) based on the file metadata.

{% asset_img MOP-MCML.png MOP-MCML Visualization Interface %}

---

# 7. Validation Results

We verified MOP-MCML against analytical models and standard test cases.

1.  **Single-Layer Tissue ($1300$ nm)**:
    *   Simulated penetration depth agreed with diffusion theory ($\delta \approx 0.32$ cm) within $12.5\%$.
    *   Transmittance matched theoretical expectations.
2.  **Non-Scattering Medium**:
    *   Compared against Beer-Lambert Law ($T = e^{-\mu_a d}$).
    *   Error was $< 5\%$ across $\mu_a \in [0.5, 3.0] \ cm^{-1}$.

---

# 8. Practical Guide: Parameter Selection

1.  **Photon Count**: Start with $10^5$ for quick scans, then use $10^6$ or $10^7$ for final high-precision results.
2.  **SDS Optimization**: Use batch mode to scan multiple SDS values to find the sweet spot between signal strength ($R$) and penetration depth.
3.  **Detector Sizing**: Match the simulated PD size to your physical hardware (e.g., $1 \times 1$ mm) to get realistic photon counts.
4.  **Troubleshooting**: If MATLAB fails to parse `.mco`, check if the geometric metadata lines exist at the end of the file. Legacy readers may need updates.

---

# 9. Examples

## A. Batch Simulation Input (.mci)
This example defines two runs with different source wavelengths ($700$ nm vs $800$ nm).

```python
1.0   # file version
2     # Number of runs

### Run 1: Fat 700nm ###
fat700.mco A  # Output file
200000        # Photon count
0.001 0.002   # dz, dr
1000 1000 1   # Grid dimensions

1             # Number of layers
1.0           # n_ambient
# n     mua   mus   g    d
1.455 1.11  122   0.90 1.0 
1.0           # n_bottom

1.2 0.0 0.05 0.8 0.0 0.05  # PD Geometry: Rx Ry Rl Tx Ty Tl
1   0.8 0.0 0.05           # Source Geometry: Type x y Size

### Run 2: Fat 800nm ###
fat800.mco A
...
```

## B. Visualization: Optical Path Distribution
The figure below compares Reflection Mode (left) and Transmission Mode (right). Note how photon paths distribute differently, affecting the sampled volume.

{% asset_img fig1_new.png Optical Path Distribution in Reflection (a) and Transmission (b) Modes %}

## C. Multilayer Ankle Model
A complex model simulating light propagation through Epidermis, Dermis, Hypodermis, and Ligament layers. By setting SDS $\approx 4$ mm, we verified that photons successfully probe the ligament layer ($d > 3.45$ mm).

{% asset_img liga_3.png Multilayer Simulation of Ankle Tissue at 1300nm %}

---

# References
<span id="ref1">[1]</span> S.L. Jacques. "History of Monte Carlo modeling of light transport in tissues using mcml.c." *J. Biomed. Opt.*, 27(8), 083002, 2022. DOI: 10.1117/1.JBO.27.8.083002.
<span id="ref2">[2]</span> S. Chatterjee, P.A. Kyriacou. "Monte Carlo Analysis of Optical Interactions in Reflectance and Transmittance Finger Photoplethysmography." *Sensors*, 19(4), 2019. DOI: 10.3390/s19040789.
<span id="ref3">[3]</span> S. Chatterjee et al. "Monte Carlo investigation of the effect of blood volume and oxygen saturation..." *Biomed. Phys. Eng. Express*, 2(6), 065018, 2016. DOI: 10.1088/2057-1976/2/6/065018.
<span id="ref4">[4]</span> A.N. Bashkatov et al. "Optical properties of skin, subcutaneous, and muscle tissues: a review." *J. Innov. Opt. Health Sci.*, 4(01): 9–38, 2011. DOI: 10.1142/S1793545811001319.
<span id="ref5">[5]</span> I. Saliba, W. Wang et al. "A Review of Chronic Lateral Ankle Instability..." *J. Clin. Med.*, 13, 442, 2024. DOI: 10.3390/jcm13020442.
