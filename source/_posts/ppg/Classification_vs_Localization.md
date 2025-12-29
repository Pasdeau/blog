---
title: "PPG Signal Analysis: The Dilemma of Task Conflict"
date: 2025-12-22
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Technical Share
  - Deep Learning
tags:
  - Multi-Task Learning
  - CNN
  - ResNet
  - PPG
description: Exploring the architectural conflict between classification (translation invariance) and localization (translation equivariance) in PPG signal analysis.
---

# The Problem

In our PPG signal analysis project, our initial goal was clear. Given a fixed-length PPG signal, the model needed to perform two tasks:
1.  **Classification**: Determine if the signal belongs to Sinus Rhythm, Premature Ventricular Contraction (PVC), or other arrhythmia categories.
2.  **Localization**: If the signal contains motion artifacts, precisely pinpoint the start and end times of these artifacts.

In the early V2.0 version, we used a classic ResNet1D architecture. The results were both exciting and confusing: **Classification accuracy easily exceeded 98%, but localization precision stagnated, often leading to "missed" or "inverted" labels.**

# The Essence of Contradiction: Invariance vs. Equivariance

Deep analysis revealed this wasn't due to insufficient model capacity, but a fundamental **Feature Conflict** between the two tasks.

## 1. Classification Needs "Translation Invariance"
For waveform classification, whether an ectopic beat occurs at the 1st second or the 7th second, the label for the entire signal remains "PVC". Pooling layers are designed to blur positional information and extract global features. Through layers of convolution and pooling, the network learns "there is an anomaly here," without caring exactly "where" it is.

## 2. Localization Needs "Translation Equivariance"
Noise localization is entirely different. It is a Semantic Segmentation task requiring a mask output equal in length to the input. If noise shifts right by 100ms, the output mask must also shift right by 100ms. This requires the network to preserve high temporal resolution features; any compression of positional information (like downsampling) is fatal.

# Failed Attempt: Single-Stream Multi-Task Learning

We initially tried forcing a shared Encoder to feed two separate Heads: a Fully Connected layer for classification and a Deconvolution layer for segmentation.

The results were disastrous:
*   Increasing the loss weight for classification caused the encoder to ignore positional info, degrading segmentation accuracy.
*   Increasing the loss weight for segmentation forced the encoder to retain too many low-level details, distracting the classifier with irrelevant noise. Classification accuracy once plummeted to 19.5% (a painful lesson from V3.0).

This is known as **Gradient Dominance**. In a shared feature extractor, two distinct tasks "fight" for control over the feature space.

# Reflection and Pivot

Since forced fusion failed, we reconsidered: Should we let each task excel in its own domain?

We realized that tweaking Loss functions or hyperparameters was merely treating symptoms. We needed an architectural solution. This realization directly led to the birth of the V3.0 and final V4.0 "Dual-Stream Architecture"—no longer serving two masters with one set of features, but tailoring a specialized feature stream for each task.
