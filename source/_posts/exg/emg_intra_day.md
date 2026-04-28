---
title: "EMG Gesture Recognition: Intra-Baseline"
date: 2025-12-25
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Research Projects
  - Signal Processing
tags:
  - EMG
  - Intra-Day
  - TCN
  - Baseline
description: Establishing a TCN-based EMG gesture recognition baseline to verify signal separability and model capacity under ideal conditions.
---

# EMG Gesture Recognition Baseline

Before conducting any generalization research, we must first establish a baseline: **What is the upper limit of model performance under ideal conditions?**

"Ideal conditions" refer to Intra-Subject Intra-Day testing:
1.  **Consistent Subject**: Training and testing sets come from the same person.
2.  **Consistent Time**: Electrode positions remain unchanged, impedance is stable.
3.  **Consistent Distribution**: Data distribution is not significantly affected by environmental or physiological changes.

Under such conditions, traditional machine learning methods (such as SVM or Random Forest) can typically achieve 85%-90% accuracy, indicating good signal separability.

## Deep Learning Model Design

To further exploit signal features, we designed a baseline model based on **1D Temporal Convolutional Network (1D-TCN)**. Compared to manual feature extraction (e.g., zero-crossing rate, waveform length), an end-to-end deep learning model can learn complex non-linear patterns directly from raw voltage signals.

We used Session 1 data from the [GRABMyo Dataset](https://physionet.org/content/grabmyo/1.1.0/) for **5-Fold Cross Validation**.

The results are as follows:
*   **Training Set Accuracy**: 99.8%
*   **Validation Set Accuracy**: **99.0%**

This demonstrates the model's extremely high fitting capability in distinguishing 10 fine gestures (such as index finger flexion, wrist movements) within the same session.

# Conclusion and Limitations

This baseline test reveals two key facts:
1.  **Reliable Signal Quality**: The preprocessing pipeline preserves sufficient effective information, and muscle electrical signals contain features distinguishable enough for complex actions.
2.  **Sufficient Model Capacity**: For data distribution of a single subject, a small-parameter CNN/TCN model is sufficient to achieve overfitting-level performance.

However, it is important to note that this 99% accuracy represents performance only under **Stationary Distribution**. In real-world applications, slight electrode shifts, skin condition changes, and cross-subject physiological differences will cause drastic **Distribution Shifts**.

Therefore, starting from the next post, we will explore the more challenging **Cross-Day** and **Cross-Subject** testing, which are the true touchstones for model robustness.
