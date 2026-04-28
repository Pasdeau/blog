---
title: "MOP-MCML GPU Version: 175x Faster 2D Light Transport Simulation"
date: 2025-12-16
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Research Projects
  - Optical Simulation
tags:
  - MCML
  - GPU
  - CUDA
  - Simulation
  - MOP
description: A detailed introduction to the GPU-accelerated 2D version of MOP-MCML, achieving a 175x performance leap on NVIDIA A100 via CUDA, with batch parameter scanning, Python visualization, and full HPC cluster integration.
---

## Project Background

The **Monte Carlo Multi-Layered (MCML)** method is the gold standard algorithm in biomedical optics for simulating photon transport in multi-layered turbid media. By statistically tracing large numbers of random-walking photons, it estimates key physical quantities — reflectance ($R_d$), transmittance ($T_t$), and the **Mean Optical Path (MOP, $L_{eff}$)** — providing a theoretical basis for optical diagnosis, photoplethysmography (PPG), and photodynamic therapy.

This project implements both a CPU and a high-performance GPU version of the 2D MOP-MCML simulator. The original CPU implementation was developed by Songlin Li. It was extended with GPU acceleration and improved I/O by **Wenzheng Wang** under the supervision of Prof. Sylvain Feruglio at the LIP6 Laboratory, Sorbonne University.

> **Note**: For the 3D Cartesian grid extension (full-volume OP visualization), see [MOP-MCML 3D Version](../mop_mcml_3d).

---

## Why GPU Acceleration?

The CPU version processes photons serially. While sufficient for hundreds of thousands of photons, computation time grows prohibitively for the millions of photons required for high statistical accuracy. Simulating 2 million photons on a CPU takes approximately **70 seconds per wavelength**. A full parameter scan across tissue thicknesses and wavelengths can therefore take hours.

The GPU's massively parallel architecture is a natural fit: each photon's transport path is **statistically independent** and follows identical computational logic — a textbook case for data-level parallelism.

---

## Core Features of the GPU Version

### 1. Significant Performance Improvement

Benchmarked on an NVIDIA A100 GPU:

<div align="center">

| Metric | CPU Version | GPU Version (CUDA) | Speedup |
|:------:|:-----------:|:------------------:|:-------:|
| **Runtime** | ~70.0 s | **~0.4 s** | **175×** |
| **Photon execution** | Serial | Thousands in parallel | — |
| **Precision** | Double | Double + atomic ops | — |

</div>

> Test condition: 2 million photons per run on a single layer tissue model.

A full scan that previously required hours now completes in minutes. For iterative inverse-problem workflows or multi-wavelength studies, this speedup is decisive.

### 2. Implementation Highlights

The GPU implementation is a deep re-engineering for the parallel computing paradigm, not a naïve code port:

- **Parallel RNG**: Uses the CUDA `curand` library to generate independent high-quality random number streams per thread, eliminating correlation artifacts.
- **Atomic accumulation**: Photon weight contributions to `Rd_ra`, `A_rz`, and `Tt_ra` arrays use `atomicAdd` to guarantee correctness under concurrent writes from thousands of threads.
- **Flattened memory layout**: Multi-dimensional output arrays are stored in contiguous 1D blocks, maximizing coalesced global memory access on the GPU.
- **Double precision throughout**: The full double-precision arithmetic of the CPU version is preserved, ensuring numerical equivalence.

The physical Hop-Drop-Spin algorithm remains identical to the CPU version; only the execution model changes from serial to massively parallel.

### 3. Batch Workflow and Auto-CSV Summary

A key practical addition is **automatic per-run CSV summary generation**. After each simulation, the program appends a row to a `summary_<label>.csv` file:

```
output, Rd, Tt
3mm_1500.mco, 0.0412, 0.3187
```

This makes it easy to aggregate results from a parameter sweep without post-processing scripts.

#### Local Compilation and Execution

On a workstation with an NVIDIA GPU:

```bash
cd version_gpu
make                      # compiles mcml_gpu via Makefile (nvcc + gcc)
./mcml_gpu input.mci      # runs simulation, auto-generates summary CSV
```

#### HPC Cluster Integration (SLURM)

For large-scale parameter scanning on the LIP6 Convergence cluster (A100 partition):

```bash
# Single run
sbatch version_gpu/run_gpu.slurm

# Batch: 3mm / 4mm / 5mm tissue at 1500 photon packets each
sbatch version_gpu/run_batch.slurm
```

The `run_batch.slurm` script recompiles the code, removes stale `.mco` files, and sequentially runs `3mm_1500.mci`, `4mm_1500.mci`, and `5mm_1500.mci`:

```bash
#!/bin/bash
#SBATCH --partition=convergence
#SBATCH --gres=gpu:a100_3g.40gb:1
module load gcc/11 cuda/11.8

make clean && make
./mcml_gpu 3mm_1500.mci
./mcml_gpu 4mm_1500.mci
./mcml_gpu 5mm_1500.mci
```

For multi-mode variant runs (Ronly / Tonly / RT), use `run_gpu_variants.slurm` — this also serves as the entry point for the 3D GPU extension.

### 4. Visualization Tools

Beyond MATLAB scripts, a Python visualization tool `plot_results.py` generates publication-ready figures (300 DPI):

- **Reflectance ($R_d$) curves** as a function of wavelength, for 3 mm / 4 mm / 5 mm tissue.
- **Transmittance ($T_t$) trends** across wavelengths and thicknesses.
- **Multi-condition overlay plots** for comparing the influence of optical parameters.

```bash
python3 version_gpu/plot_results.py
```

{% asset_img fig_2D_gpu.png 2D GPU Simulation Results %}

---

## Application Scenarios

The GPU-accelerated 2D version is particularly well-suited for:

1. **Large-scale parameter sweeps**: Rapidly scanning wavelength, tissue thickness, and $\mu_a / \mu_s$ combinations.
2. **Inverse problem solving**: Iteratively retrieving tissue optical properties from measured $R_d$ / $T_t$ data.
3. **Sensor design optimization**: Finding the optimal source-detector separation (SDS) for wearable or implantable photonic sensors.
4. **Educational demonstrations**: Near-instant classroom demos of how tissue properties alter light transport.

---

## Technical Requirements

- **Hardware**: NVIDIA GPU (Compute Capability 5.0+; A100 / V100 / RTX A-series recommended for research).
- **Software**: CUDA Toolkit ≥ 11.8, GCC ≥ 9.

For users without a GPU, the CPU version remains available for small-scale verification and debugging.

---

## Summary

The GPU port of MOP-MCML reduces 2D simulation time by two orders of magnitude — from ~70 s to ~0.4 s per run. Combined with automatic CSV logging, HPC SLURM integration, and the Python visualization pipeline, it forms a complete parameter-scanning workflow for biomedical optics research.

For scenarios requiring full volumetric 3D resolution, see the **[MOP-MCML 3D Extension](../mop_mcml_3d)**, which extends the same GPU engine to a Cartesian $N_x \times N_y \times N_z$ grid with interactive MATLAB slice viewer.

---

**Project Link**: [GitHub - Pasdeau/MOP-MCML](https://github.com/Pasdeau/MOP-MCML)
