---
title: MATLAB Simulation for ECG and PPG Signal Generation
date: 2025-07-15
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Research Projects
  - Biomedical Optics
tags:
  - MATLAB
  - ECG
  - PPG
  - Simulation
description: A MATLAB-based framework for generating customizable ECG and PPG signals with realistic noise artifacts, designed to train and validate signal classification algorithms.
---

This post introduces a MATLAB-based simulation tool designed to generate synthetic Electrocardiogram (ECG) and Photoplethysmogram (PPG) signals. The primary objective is to create labeled datasets with controlled noise characteristics, which are essential for training and robustly validating signal classification algorithms.

## Source Code

The complete source code and modified versions are available below:
*   **Original Algorithm**: [PPG Generation Algorithm](https://nuage.lip6.fr/index.php/s/Mg2r8KswAPrE9Ta)
*   **Modified Version**: [Modified PPG Generation Algorithm](https://nuage.lip6.fr/index.php/s/NmpaTdCfmtRt6fX)

> **Note**: The modified version addresses an issue in the original code where PPG signals could not be generated with zero noise. It is recommended to use the modified version for clean signal generation.

---

# Simulation Results: Signal Type 1 (50 RR Intervals)

The following metrics illustrate the time-domain and frequency-domain characteristics of the generated signals under various noise conditions.

## Parameters
*   **Signal Duration**: 50 RR intervals
*   **Signal Type**: Type 1 (Standard Verification Signal)

## 1. Noise-Free Baseline
The reference signal without any added noise.
{% asset_img PPG0_plot.png Clean PPG Signal (Type 0) %}

## 2. Noise Scenario 1
### Signal Analysis
Time and frequency domain representation of the signal corrupted by Noise 1.
{% asset_img PPG1_plot.png PPG Signal with Noise 1 %}

### Component Breakdown
*   **Clean Signal Component**:
    {% asset_img S1_plot.png Clean Signal Component (S1) %}
*   **Noise Component**:
    {% asset_img N1_plot.png Noise Component (N1) %}
*   **Signal-to-Noise Ratio (SNR) Analysis**:
    {% asset_img SN1_plot.png SNR Analysis (SN1) %}

## 3. Noise Scenario 2
### Signal Analysis
{% asset_img PPG2_plot.png PPG Signal with Noise 2 %}

### Component Breakdown
*   **Clean Signal Component**:
    {% asset_img S2_plot.png Clean Signal Component (S2) %}
*   **Noise Component**:
    {% asset_img N2_plot.png Noise Component (N2) %}
*   **SNR Analysis**:
    {% asset_img SN2_plot.png SNR Analysis (SN2) %}

## 4. Noise Scenario 3
### Signal Analysis
{% asset_img PPG3_plot.png PPG Signal with Noise 3 %}

### Component Breakdown
*   **Clean Signal Component**:
    {% asset_img S3_plot.png Clean Signal Component (S3) %}
*   **Noise Component**:
    {% asset_img N3_plot.png Noise Component (N3) %}
*   **SNR Analysis**:
    {% asset_img SN3_plot.png SNR Analysis (SN3) %}

## 5. Noise Scenario 4
### Signal Analysis
{% asset_img PPG4_plot.png PPG Signal with Noise 4 %}

### Component Breakdown
*   **Clean Signal Component**:
    {% asset_img S4_plot.png Clean Signal Component (S4) %}
*   **Noise Component**:
    {% asset_img N4_plot.png Noise Component (N4) %}
*   **SNR Analysis**:
    {% asset_img SN4_plot.png SNR Analysis (SN4) %}

---

# Comparative Analysis: Signal Types with 10 RR Intervals

To evaluate short-duration performance, we generated five distinct signal types with a duration of 10 RR intervals.

## Type 1
{% asset_img T1_plot.png Type 1 Signal (10 RR) %}

## Type 2
{% asset_img T2_plot.png Type 2 Signal (10 RR) %}

## Type 3
{% asset_img T3_plot.png Type 3 Signal (10 RR) %}

## Type 4
{% asset_img T4_plot.png Type 4 Signal (10 RR) %}

## Type 5
{% asset_img T5_plot.png Type 5 Signal (10 RR) %}
