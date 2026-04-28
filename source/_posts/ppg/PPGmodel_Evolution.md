---
title: "PPG Signal Analysis: Time-Frequency & Attention"
date: 2025-12-24
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Technical Share
  - Model Iteration
tags:
  - PPG
  - CWT
  - UNet
  - SE-Attention
description: How introducing Continuous Wavelet Transform (CWT) and SE-Attention bridged the gap between time-domain limitations and robust noise segmentation.
---

# Limitations of 1D Signals

After exploring the V2 series of our PPG classification model, we had a stable classifier based on ResNet1D. By introducing dual-channel input (Raw Amplitude + First Derivative/Velocity), we successfully pushed classification accuracy to 98.5%. However, when facing baseline drift or high-frequency Electromyography (EMG) noise, 1D Convolutional Neural Networks (1D-CNN) struggled.

The limitation of 1D signals is that **noise and valid signals often overlap in the frequency domain**. For example, the frequency components of certain motion artifacts are very close to the QRS complex. Relying solely on the time-domain waveform, the neural network finds it difficult to distinguish between heartbeats and jitters.

# Time-Frequency Analysis

In the V3 series, to solve the noise recognition problem, we decided to "upgrade dimensionality"—introducing the **Continuous Wavelet Transform (CWT)**.

We converted the original 1D PPG signal into a **34-channel Time-Frequency Tensor**:
*   Channel 1: Raw PPG signal
*   Channel 2: Velocity signal (First Derivative)
*   Channels 3-34: Wavelet coefficients across 32 different scales

The brilliance of this design is that it enables the network to **see both time and frequency domains** simultaneously. The network is no longer fumbling along a line but looking at "topographic maps" (scalograms). Motion artifacts typically appear as chaotic, broadband textures on the scalogram, while normal heartbeats appear as clear vertical stripes. This visual difference significantly lowers the difficulty of the segmentation task.

# SE-Attention Mechanism

Although the V3 series introduced CWT, we still faced performance fluctuations in multi-talk learning. To make the network smarter about focusing on important features, we introduced the **Squeeze-and-Excitation (SE) Attention Mechanism** in V3.1.

The core idea of the SE module is **"Feature Recalibration"**. Not all 34 channels are equally important:
*   When judging arrhythmia, the network might need to focus more on wavelet scale channels representing the fundamental heart rate.
*   When judging baseline drift, the weights of low-frequency channels should be amplified.

We embedded SE Blocks in every downsampling and upsampling module of the UNet. This is like equipping the network with a "mixing console" fader, automatically suppressing the volume of irrelevant noise channels while boosting critical signal channels based on input characteristics.

# Achievements and Costs

The V3 series was a milestone. With the aid of SE-Attention and CWT, our segmentation accuracy rose from 98.5% to 99.2%, and classification accuracy stabilized at 99.9% (after resolving early V3 gradient conflicts).

However, the V3 series left a hidden trouble: **Explosion of computation**. CWT preprocessing drastically increased input data dimensions, making the model heavy. And although the SE module alleviated feature competition, the fundamental contradiction of the shared encoder remained, paving the way for the complete decoupling in the final V4.0 version.
