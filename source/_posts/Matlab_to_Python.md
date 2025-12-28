---
title: "PPG Signal Generation: From MATLAB to Python"
date: 2024-12-21
comments: true
lang: en
mathjax: false
toc: true
categories: 
  - Technical Share
  - Signal Processing
tags:
  - Python
  - MATLAB
  - Migration
  - PPG
description: A detailed account of migrating core PPG signal generation logic from MATLAB to Python to overcome I/O bottlenecks and integrate with deep learning workflows.
---

# Introduction

In our previous article, [MATLAB Simulation for ECG and PPG Signal Generation](https://www.wenzheng.eu/2025/07/15/Algorithm%20explanation/), we introduced a Photoplethysmography (PPG) simulator based on MATLAB. MATLAB's authority in signal processing is undeniable, and its rich toolbox benefited us greatly during the algorithm verification phase. However, as our research deepened—particularly when we introduced deep learning models for waveform classification and noise robustness studies—MATLAB's limitations became apparent. It severely bottlenecked our data generation speed, prompting us to migrate the core generation logic entirely to Python.

This article shares the process of this migration and the key considerations behind it.

# Why Migrate?

The decision was not impulsive but driven by two critical technical bottlenecks:

1.  **Remote Server Environment**:
    Training high-precision deep learning models requires massive datasets. Our High-Performance Computing (HPC) cluster primarily runs on Linux and lacks MATLAB commercial licenses. To generate data in parallel across thousands of cores, Python is the native, lightweight choice.

2.  **Fragmented Deep Learning Ecosystem**:
    Our model training uses PyTorch. Keeping the MATLAB generator meant generating `.mat` files, saving them to disk, and then reading them with Python. This "disk relay" becomes a severe I/O bottleneck when scaling to millions of samples. We wanted "On-the-fly" data generation: CPU generating data while the GPU trains, completely eliminating I/O overhead.

# The Migration Path: More Than Syntax Translation

The transition from MATLAB to Python was implemented in the `ppg_generator.py` module. While `numpy` and `scipy` offer similar functionality, we had to be extremely careful with biomedical signal details.

## 1. The Challenge of Continuity

The original MATLAB code had obscure logic for stitching waveforms when generating each heartbeat. PPG signals must be continuous; the endpoint of the previous wave must strictly align with the start of the next. Any tiny jump introduces high-frequency "noise" artifacts, misleading the neural network.

In the Python refactoring, we introduced a key state variable, `previous_endpoint`:

```python
# Key Logic: Ensuring absolute continuity between waveforms
if previous_endpoint is not None:
    # Force alignment of current start to previous end
    actual_start = pulse[0]
    offset = previous_endpoint - actual_start
    pulse = pulse + offset
    
    # Correct baseline drift with cubic polynomial to ensure closure
    baseline_diff = pulse[-1] - pulse[0]
    # ... (Polynomial smoothing correction)
```

This not only achieved perfect baseline alignment but also added **Respiratory Modulation**, simulating the low-frequency modulation of the PPG baseline by breathing, making the generated signal spectrally more realistic.

## 2. Enabling "Big Data"

The biggest dividend of migration is scalability. Using Python's `multiprocessing` library, we can effortlessly parallelize generation across 128 CPU cores.

Previously, MATLAB took hours to generate 10,000 samples. With the Python optimized version and SLURM job scheduling, we can generate a training set of 20,000 high-quality labeled samples in just minutes. Crucially, this data is fed directly to PyTorch as Tensors without creating any temporary files.

# Conclusion

Moving from MATLAB to Python was not just a language switch; it was a workflow upgrade. This seemingly basic step laid the solid foundation for subsequent model training. We can now freely adjust parameters like noise types and heart rate variability in the cloud, verifying model robustness in real-time.
