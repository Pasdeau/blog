---
title: "EMG Gesture Recognition: Generalization & Calibration"
date: 2025-12-28
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Research Projects
  - Signal Processing
tags:
  - Cross-Subject
  - Transfer Learning
  - Calibration
description: Discussing the severe cross-subject distribution shift in EMG signals and proposing a solution based on Universal Models and Few-Shot Rapid Calibration.
---

# The Challenge of Cross-Subject Generalization

In the field of biometrics, **Cross-Subject** generalization is always a core difficulty. Significant differences in physiological structures (arm circumference, muscle position, subcutaneous fat thickness) between individuals lead to massive **Domain Gaps** in EMG signal data distribution.

Directly applying a model trained on Subject A to Subject B typically causes accuracy to plummet to around 50%, indicating that the model has not learnt universal gesture features independent of the individual. Previous attempts, even using Unsupervised Domain Adaptation (e.g., DANN), yielded suboptimal results.

# Universal Model: From Individual to Population

To extract more robust common features, we changed our training strategy and adopted a **Leave-One-Subject-Out (LOSO)** approach to build a **Universal Model**.

We leveraged the diversity of the GRABMyo dataset (43 subjects) to train a Universal TCN model covering various arm anatomies.
*   The goal of this model is no longer to memorize specific individual patterns but to learn **Invariant Representations** of gesture actions across populations, such as the synergistic contraction laws of muscle groups for specific gestures.
*   In Zero-Shot testing, the average accuracy of this universal model improved to the 85%-92% range. Although there is still a gap compared to intra-subject testing, this proves the model possesses certain cross-subject generalization capabilities.

# Rapid Calibration

To bridge the remaining performance gap and achieve product-level precision, we introduced a **Registration/Calibration** mechanism similar to biometric systems. We propose a **Rapid Calibration Pipeline**:

1.  **Backbone Freezing**: Keep the parameter weights of the Universal Model's feature extraction part (Backbone) unchanged to preserve the learned general muscle patterns.
2.  **Head Fine-tuning**: Update only the parameters of the model's final classifier layer (Linear Head).
3.  **Few-Shot Data**: Collect a very small amount of labeled data from the new user (e.g., 10 repetitions per gesture, about 1 minute of data).

## Experimental Results

Testing on a completely unseen subject showed:
*   **Before Calibration (Zero-Shot)**: Accuracy ~50.1% (in challenging cases).
*   **After Calibration (Few-Shot)**: Average accuracy soared to **96.53%**, with some users reaching 100%.

This result verifies the effectiveness of the **"Universal Model + Few-Shot Calibration"** paradigm. By combining universal features trained on big data with fine-tuning for specific users, we successfully solved the individual difference problem in EMG signals, realizing a system that has both generalization potential and the ability to adapt quickly to new users.
