---
title: Introduction to Inverse Adding-Doubling (IAD)
date: 2025-08-23
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Theoretical Foundation
  - Optical Simulation
tags:
  - IAD
  - MCML
  - Optical Properties
  - Simulation
description: A comprehensive guide to the Inverse Adding-Doubling (IAD) method for deducing intrinsic optical parameters from reflectance and transmittance measurements, including validation against MOP-MCML simulations.
---

# 1. Introduction to IAD

## Overview
**Inverse Adding-Doubling (IAD)** is a powerful numerical technique used to determine the intrinsic optical properties of turbid sample—specifically the absorption coefficient ($\mu_a$), the reduced scattering coefficient ($\mu_s'$), and the anisotropy factor ($g$)—from macroscopic measurements of total reflection ($R$) and transmission ($T$). It iteratively solves the inverse problem by calling the **Adding-Doubling (AD)** forward model to predict $R$ and $T$ from candidate parameters until they match the experimental values within a specified tolerance.

The software package typically provides two main executables:
*   **IAD (Inverse Mode)**: Calculates optical properties ($\mu_a, \mu_s', g$) from measured reflection ($R$) and transmission ($T$).
*   **AD (Forward Mode)**: Calculates reflection ($R$) and transmission ($T$) given known optical properties.

This method is highly robust and valid over a wide range of optical thicknesses and albedos, provided the experimental geometry satisfies the assumptions of the radiative transport equation (e.g., uniform illumination, semi-infinite slab).

## Fundamental Relations

To understand the inputs and outputs, we define the following relationships:

*   **True vs. Reduced Scattering Coefficient**:
    $$ \mu_s = \frac{\mu_s'}{1 - g} $$
*   **Single-Scattering Albedo ($a$)**:
    $$ a = \frac{\mu_s}{\mu_a + \mu_s} $$
*   **Optical Thickness ($b$)**:
    $$ b = (\mu_a + \mu_s) \times d $$
    where $d$ is the physical thickness of the sample (typically $d = 10 \text{ mm}$ in our simulations).

> **Critical Note on $g$**:
> Some GitHub examples compute $a$ and $b$ using $\mu_s'$ directly, effectively assuming $g=0$. However, biological tissues typically have a high anisotropy factor ($g \approx 0.9$). Using $\mu_s'$ instead of the true $\mu_s$ leads to significant underestimation of scattering and incorrect predictions. **Always derive $\mu_s$ from $\mu_s'$ and $g$ before calculating $a$ and $b$.**

---

# 2. Simulation Setup with MOP-MCML

To validate the IAD method, we selected optical parameters for human skin tissues (Fat and Muscle) based on literature comparisons.

## Optical Parameters
The following table summarizes the parameters derived from Bashkatov et al. [[1](#ref1)] and Simpson et al. [[2](#ref2)] for a sample thickness $d = 10 \text{ mm}$.

<div align="center">

| Tissue | $\lambda$ (nm) | $\mu_a (\text{cm}^{-1})$ | $\mu_s' (\text{cm}^{-1})$ | $\mu_s (\text{cm}^{-1})$ | $a$ | $b$ | $n$ | $g$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Fat** | 700 | 1.11 | 12.20 | 122.0 | 0.9909 | 123.11 | 1.455 | 0.9 |
| **Fat** | 800 | 1.07 | 11.15 | 111.5 | 0.9905 | 112.57 | 1.455 | 0.9 |
| **Fat** | 900 | 1.06 | 10.29 | 102.9 | 0.9898 | 103.96 | 1.455 | 0.9 |
| **Muscle** | 700 | 0.48 | 8.18 | 81.8 | 0.9942 | 82.28 | 1.37 | 0.9 |
| **Muscle** | 800 | 0.28 | 7.04 | 70.4 | 0.9960 | 70.68 | 1.37 | 0.9 |
| **Muscle** | 900 | 0.32 | 6.21 | 62.1 | 0.9949 | 62.42 | 1.37 | 0.9 |

</div>

## MOP-MCML Simulation Results
We performed Monte Carlo simulations (MOP-MCML) using these parameters to generate "ground truth" Reflectance ($R$) and Transmittance ($T$) values for verification.

**Fat Tissue Results:**
*   **700 nm**: $R = 0.2462$, $T = 0.0011$
*   **800 nm**: $R = 0.2406$, $T = 0.0017$
*   **900 nm**: $R = 0.2309$, $T = 0.0022$

**Muscle Tissue Results:**
*   **700 nm**: $R = 0.3453$, $T = 0.0236$
*   **800 nm**: $R = 0.4064$, $T = 0.0632$
*   **900 nm**: $R = 0.3645$, $T = 0.0644$

---

# 3. Model Verification: AD vs. IAD vs. MCML

We conducted a cross-verification study to assess the consistency between the analytical AD model, the numerical IAD inversion, and the stochastic MOP-MCML simulation.

## Workflow
1.  **Forward AD**: Calculate $R_{AD}$ and $T_{AD}$ using the known parameters ($\mu_a, \mu_s, g$).
2.  **Inverse IAD**: Recover parameters ($\mu_{a, rec}, \mu_{s, rec}'$) from both $R_{AD}/T_{AD}$ and $R_{MCML}/T_{MCML}$.
3.  **Comparison**: Evaluate the deviation of recovered parameters from the original inputs.

## Comparative Results (Fat Tissue)

<div align="center">

| $\lambda$ | Source | Input $R$ | Input $T$ | Recovered $\mu_a$ | Recovered $\mu_s'$ | Original $\mu_a$ | Original $\mu_s'$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **700nm** | **AD** | 0.2830 | 0.0011 | **0.1696** | **0.8615** | 0.111 | 1.22 |
| | **MCML** | 0.2462 | 0.0011 | **0.1880** | **0.7637** | | |
| **800nm** | **AD** | 0.2754 | 0.0016 | **0.1616** | **0.7848** | 0.107 | 1.115 |
| | **MCML** | 0.2406 | 0.0017 | **0.1789** | **0.7021** | | |
| **900nm** | **AD** | 0.2654 | 0.0021 | **0.1609** | **0.7354** | 0.106 | 1.029 |
| | **MCML** | 0.2309 | 0.0022 | **0.1761** | **0.6500** | | |

</div>

## Analysis
*   **Consistency**: The AD forward model produces slightly higher reflectance ($R$) than MCML, likely due to differences in boundary condition handling or light source modeling (MCML models a finite beam, while AD assumes infinite plane wave).
*   **Inversion Accuracy**: The parameters inverted from AD results ("AD → IAD") are closer to the original parameters than those inverted from MCML results ("MCML → IAD"), but both show a systematic offset. $\mu_a$ values are generally overestimated, while $\mu_s'$ are underestimated.
*   **Implication**: While IAD is rigorous for specific geometries (integrating spheres), direct comparison with MCML requires careful matching of source and detector geometries.

---

# 4. Polyurethane Phantom Test

To test the method on real experimental data, we used a polyurethane phantom (skin/fat analog). We compared the spectral response measured experimentally against predictions from both IAD and MOP-MCML.

## Experimental Data
*   **Sample**: 1-inch port-type polyurethane phantom.
*   **Data Source**: [vio-A.rxt](https://github.com/scottprahl/iad/blob/main/test/vio-A.rxt) (650–850 nm).
*   **Inversion**: Used `iad` to extract $\mu_a$ and $\mu_s'$ assuming $g=0.9$.

## Comparison: IAD vs. MOP-MCML Prediction
We used the inverted parameters to predict $R$ and $T$ back using both methods.

*   **IAD Prediction Error**: $R \approx 7.3\%$, $T \approx 0.8\%$. IAD is self-consistent as it fits the parameters to the data.
*   **MOP-MCML Prediction Error**: $R \approx 29.8\%$, $T \approx 9.7\%$.

{% asset_img Diff_RT_MCML.png Spectral Error Comparison: IAD vs. MOP-MCML %}

## Interpreting the Discrepancy
The larger error in MOP-MCML predictions stems from:
1.  **Source-Model Mismatch**: The experimental light source and detector geometry (likely integrating sphere ports) differ from the simplified Gaussian/Point sources used in our MCML configuration.
2.  **Inverse-Forward Evaluation Gap**: IAD minimizes error essentially by "fitting" the AD model to reliability. feeding those fitted parameters into a different forward model (MCML) naturally exposes geometric and boundary condition differences.

Despite these numerical differences, the error magnitude is comparable to the intrinsic parameter uncertainty in commercial phantoms (often $\sim 40\%$), confirming that MOP-MCML provides physically reasonable estimates within the expected tolerance.

---

# References
<span id="ref1">[1]</span> Bashkatov et al. "Optical properties of human skin, subcutaneous and mucous tissues in the wavelength range from 400 to 2000 nm." *J. Phys. D: Appl. Phys.*, 38(15), 2543, 2005. DOI: 10.1088/0022-3727/38/15/004.
<span id="ref2">[2]</span> Simpson et al. "Near-infrared optical properties of ex vivo human skin and subcutaneous tissues measured using the Monte Carlo inversion technique." *Phys. Med. Biol.*, 43(9), 2465-78, 1998. DOI: 10.1088/0031-9155/43/9/003.