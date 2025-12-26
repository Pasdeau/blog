---
title: "MOP-MCML GPU Version: Performance Boost"
date: 2025-12-16
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Research Projects
  - Biomedical Optics
tags:
  - MCML
  - GPU Acceleration
  - CUDA
  - Light Transport Simulation
description: A detailed introduction to the GPU-accelerated version of MOP-MCML, achieving a 175x performance leap based on CUDA architecture, supporting efficient simulation of millions of photons.
---

## Project Background

The **Monte Carlo Multi-Layered (MCML)** method is a classic algorithm in biomedical optics for simulating light transport in multi-layered turbid media. By tracing the random walk of a large number of photons in tissue, it statistically estimates key physical quantities such as reflectance and transmittance, providing a theoretical basis for applications like optical diagnosis and photodynamic therapy.

This project implements both a standard CPU version and a high-performance GPU version of the MCML simulator based on the **Mean Optical Path (MOP)** method. Initially developed by Songlin Li, it was improved and ported to GPU by **Wenzheng Wang** under the supervision of Professor Sylvain Feruglio at the LIP6 Laboratory, Sorbonne University.

## Why GPU Acceleration?

The traditional CPU version processes photons serially, one by one. While acceptable for small-scale simulations (e.g., hundreds of thousands of photons), the computation time grows drastically when millions of photons are required for higher statistical accuracy. For instance, simulating 2 million photons on a CPU takes about 70 seconds. This becomes prohibitively slow for research scenarios requiring scans across multiple wavelengths and diverse tissue parameters.

The massive parallel architecture of GPUs is naturally suited for such "embarrassingly parallel" tasks. Since the transport process of each photon is independent and follows the same computational logic, it presents an ideal scenario for GPU acceleration.

## Core Features of the GPU Version

### 1. Significant Performance Improvement

We benchmarked the system on an NVIDIA A100 GPU, yielding impressive results:

<div align="center">

| Metric | CPU Version | GPU Version (CUDA) | Speedup |
|:---:|:---:|:---:|:---:|
| **Simulation Time** | ~70.0 s | **~0.4 s** | **175x** |
| **Photon Transport** | Serial (Sequential) | Parallel (Thousands simultaneously) | - |
| **Precision** | Double Precision | Double Precision + Atomic Operations | - |

</div>

> Test Condition: 2 million photons per run.

This means a simulation process that originally took two hours can now be completed in minutes. For research requiring rapid iteration, this boost is decisive.

### 2. Implementation Highlights

The GPU implementation is not a simple code port but a deep optimization tailored for parallel computing characteristics:

- **Parallel Random Number Generation**: Uses the CUDA `curand` library to generate high-quality random numbers independently for each thread, avoiding pseudo-random sequence correlation issues.
- **Atomic Operations for Consistency**: Photon weight accumulation uses `atomicAdd` to ensure data consistency during concurrent writes by multiple threads.
- **Memory Access Optimization**: Adopts a flattened array layout to improve GPU global memory access efficiency.
- **Double Precision Computing**: Maintain the same double-precision floating-point arithmetic as the CPU version to ensure numerical accuracy.

The core physical algorithm logic (Hop-Drop-Spin) remains identical to the CPU version, with the execution mode shifting from serial to parallel.

### 3. User-Friendly Workflow

#### Local Compilation and Execution

On a workstation equipped with an NVIDIA GPU, running the simulation is straightforward:

```bash
cd version_gpu
make                    # Compile to generate mcml_gpu executable
./mcml_gpu input.mci    # Run simulation
```

The program automatically generates a corresponding CSV summary file (e.g., `summary_3mm_1500.csv`) for each input file (e.g., `3mm_1500.mci`).

#### HPC Cluster Integration

For large-scale parameter scanning, we provide SLURM job scripts for seamless integration into High-Performance Computing clusters:

```bash
# Single file simulation
sbatch version_gpu/run_gpu.slurm

# Batch processing multiple files
sbatch version_gpu/run_batch.slurm
```

The scripts are configured for the LIP6 Convergence cluster (A100 3g.40gb partition) but can be adapted to other HPC environments by simply modifying partition and module load commands.

### 4. Visualization Tools

In addition to MATLAB scripts, we developed a Python visualization tool (`plot_results.py`) to quickly generate:

- Reflectance (Rd) curves for different tissue thicknesses (3mm/4mm/5mm).
- Transmittance (Tt) trends across wavelengths.
- Multi-condition comparison plots to visualize the impact of tissue parameters on light transport.

```bash
python3 version_gpu/plot_results.py
```

The generated high-resolution images (300 DPI) are ready for publication.

## Application Scenarios

The GPU-accelerated version is particularly suitable for:

1.  **Large-scale Parameter Space Scanning**: Rapidly exploring combinations of different wavelengths, tissue thicknesses, and absorption/scattering coefficients.
2.  **Inverse Problem Solving**: Retrieving tissue optical parameters from measured data via iterative optimization.
3.  **Real-time Feedback Systems**: Providing near real-time theoretical predictions for clinical optical diagnostic devices.
4.  **Educational Demonstrations**: Live classroom demonstrations of how parameter changes affect light transport.

## Technical Requirements

-   **Hardware**: NVIDIA GPU (Compute Capability 5.0+, A100/V100/RTX A-series recommended).
-   **Software**: CUDA Toolkit (e.g., v11.8), GCC Compiler.

For users without a GPU, the standard CPU version remains available for small-scale verification and debugging.

## Summary

The translation of MOP-MCML to GPU has improved the efficiency of light transport simulation by two orders of magnitude, reducing computation tasks from hours or days to minutes. This not only accelerates research but also enables the exploration of more complex light-tissue interaction models.

Whether you are a biomedical optics researcher, a medical physics engineer, or a developer interested in parallel computing, this project offers a practical and efficient tool. We hope it facilitates more scientific discoveries.

---

**Project Link**: [GitHub - Pasdeau/MOP-MCML](https://github.com/Pasdeau/MOP-MCML)
