---
title: "EMG Gesture Recognition: Robustness Research"
date: 2025-12-26
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Research Projects
  - Signal Processing
tags:
  - Cross-Day
  - Data Augmentation
  - Robustness
  - EMG
description: Proposing Causal Filtering and Spatial Rotation Augmentation strategies to address non-stationarity caused by electrode shift, significantly improving Cross-Day accuracy.
---

# Electrode Shift and Non-stationarity Challenges

In the previous post, we verified high model accuracy under ideal conditions. However, when applying this model to data from the same user but on a different day (Cross-Day Test), accuracy dropped significantly from **99%** to **50%-60%**.

The primary reason for this performance degradation is the **Non-stationarity** signal characteristics caused by **Electrode Shift**.

EMG signals have high spatial sensitivity. Even minor changes in electrode position (such as rotation or translation) can alter the recorded muscle activation patterns, resulting in inconsistent data distribution (Domain Shift) between training and testing sets.

# Solutions

## 1. Causal Filtering

In offline signal processing, zero-phase filters (like `filtfilt`) are commonly used, which utilize future data to correct the present. However, in a **Real-time System**, we cannot access future signals.

If zero-phase filtering is used during training while causal filtering is used during inference, it creates a Train-Test Mismatch in feature distribution. To eliminate this, we refactored the preprocessing pipeline to strictly use **Causal Filters** in both stages. Although this introduces some phase delay, it ensures the model learns temporal features that remain valid in real-time scenarios.

## 2. Spatial Rotation Augmentation

To address random rotational shifts during wearing, we introduced a spatial rotation data augmentation strategy on the GRABMyo dataset (16-channel circular electrodes).

During training, we apply random **Cyclic Shift** to the 16-channel input data.
*   This simulates random angular deviations that may occur when the user wears the armband.
*   By forcing the model to train on such augmented data, we guide it to learn **Rotation-Invariant** features, focusing on the relative patterns of muscle activation rather than absolute channel positions.

# Validation Results

Combinining the TCN architecture, causal filtering, and rotation augmentation key strategies, performance on Session 3 (Cross-Day test set) recovered significantly:

*   **Baseline**: 82% (Significant degradation)
*   **Ours (with Augmentation)**: **89.90%**

This result indicates that through rational signal processing standards and targeted data augmentation, we can effectively transform the physical uncertainty of electrode shift into a data distribution problem solvable by algorithms, substantially improving longitudinal robustness.

However, this is still limited to the "same user." Solving the larger distribution differences in **Cross-Subject** scenarios will be the focus of the next stage.
