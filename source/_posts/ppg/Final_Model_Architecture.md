---
title: "PPG Signal Analysis: Dual-Stream Architecture"
date: 2025-12-26
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Technical Share
  - Model Iteration
tags: 
  - Dual-Stream
  - ResNet
  - UNet
  - PPG
description: The final V4.0 architecture solving the classification-localization conflict by completely decoupling the feature streams.
---

# Birth of the Dual-Stream

Looking back at previous versions, we struggled in the quagmire of balancing high classification accuracy with high localization precision. In Single-Stream networks, no matter how much attention mechanism was added, as long as the underlying convolutional kernels were shared, the gradients of the two tasks would interfere with each other.

The birth of the **Dual-Stream Architecture** marked a fundamental shift in our thinking: **Since the features required by the two tasks are intrinsically different, why not let them go separate ways?**

Thus, we designed the Dual-Stream system. This is no longer a single model, but a dual-core system working in synergy.

# Architectural Breakdown

The PPG Classification Model V4 Series consists of two completely independent parallel streams. They share the same input source but follow entirely different processing paths:

## Stream A: Classification Specialist
*   **Input**: Lightweight 2-channel time-domain signal (Amplitude + Velocity).
*   **Backbone**: Deep ResNet1D.
*   **Characteristic**: Focuses on extracting **Translation Invariant** global features. It doesn't care "at which second the PVC occurs", only "whether there is a PVC in this signal". The deep structure of ResNet perfectly captures subtle morphological differences of arrhythmias.

## Stream B: Segmentation Specialist
*   **Input**: Heavyweight 34-channel CWT Time-Frequency Tensor.
*   **Backbone**: UNet with SE-Attention.
*   **Characteristic**: Focuses on extracting **Translation Equivariant** local features. The rich time-frequency textures provided by CWT, combined with UNet's Skip Connections, enable it to localize noise boundaries with **pixel-level** precision.

# Workflow

1.  **Data Acquisition**: ADS1298 chip collects 8-second PPG signals at 1000Hz sampling rate.
2.  **Stream Splitting**:
    *   Data Copy 1 enters the ResNet stream, outputting a 5-dimensional classification probability vector (Normal, PVC, PAC, Fusion, Unknown).
    *   Data Copy 2 undergoes CWT transformation and enters the UNet stream, outputting a noise mask aligned with the time axis (Clean, Forearm, Hand, HighFreq, etc.).
3.  **Fusion**: The system outputs both heartbeat category and noise coverage simultaneously. E.g., "Premature Ventricular Contraction detected, but arm movement artifact present at 3-5s; confidence downgraded".

# Performance and Trade-offs

## Pros
1.  **Total Non-Interference**: Classification accuracy reached a perfect **100%** (on a 20k test set), and segmentation accuracy reached **99.69%**. The two tasks do not hold each other back.
2.  **Modular Debugging**: If localization for a specific noise is poor, we only need to adjust Stream B, without worrying about breaking the classifier.
3.  **Flexible Deployment**: On edge devices with limited compute, if only heart rate monitoring is needed, we can run only Stream A (very lightweight) and completely shut down Stream B to save power.

## Cons
1.  **Parameters & VRAM**: Dual streams mean double the parameters (approx. 10.8M). Although inference speed is optimized to under 75ms (real-time capable), the VRAM usage is tangible.
2.  **Preprocessing Overhead**: Stream B relies on CWT transformation, which is computationally expensive and can be a bottleneck on embedded CPUs.

# Conclusion

The PPG Classification Model V4 Series is the culmination of our understanding of PPG signals. It proves that in complex signal processing tasks, **"Decoupling"** is often more effective than complex "Fusion". By letting specialized structures do specialized jobs, we finally achieved a powerful system that can both understand heartbeats and see through noise.
