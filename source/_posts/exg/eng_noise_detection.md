---
title: Solving Low SNR in ENG Signals
date: 2025-12-23
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Research Projects
  - Neural Engineering
tags:
  - ENG
  - Simulation
  - Deep Learning
  - Physics-based
description: Exploring a physics-driven Electroneurography (ENG) simulator using Gaussian Difference functions and Colored Noise models to address low SNR and labeling challenges in real neural data.
---

# Why Simulate Neural Signals?

In the research of Brain-Computer Interfaces (BCI) and Peripheral Nervous Systems (PNS), we face an awkward reality: **"Real data" is often too noisy to be useful directly.**

When attempting to record signals from a neural bundle less than 1mm in diameter, what you capture is often not clear neural spikes, but a "noise soup" composed of muscle movement, heartbeat, and power line interference. In this Low SNR environment, the truly effective Electroneurography (ENG) signals are faint and hard to distinguish.

If we train AI models directly on this contaminated data, they might learn incorrect features (e.g., mistaking muscle twitches for neural signals). To solve this, our strategy is: **Return to physics and construct perfect "synthetic data" using mathematical equations.**

# Deconstructing the "Noise Soup": Physics Modeling

Our simulator is not just simple noise superimposition; it is a "signal synthesizer" based on neural physics. We precisely model every component starting from the signal source.

## 1. Mathematical Form of SNAP

This is the effective signal we want to extract. The potential change generated when a nerve fiber is triggered is not a square wave, but a sharp waveform with a specific shape. We use the **Difference of Gaussians (DoG)** to fit the action potential of a single nerve fiber $V_{fiber}(t)$:

$$
V_{fiber}(t) = \frac{A_1}{\sqrt{2\pi}\sigma_1} e^{-\frac{(t-\mu_1)^2}{2\sigma_1^2}} - \frac{A_2}{\sqrt{2\pi}\sigma_2} e^{-\frac{(t-\mu_2)^2}{2\sigma_2^2}}
$$

Where:
*   $A_1, A_2$ control amplitude.
*   $\sigma_1, \sigma_2$ determine width and sharpness.
*   $\mu_1, \mu_2$ determine peak and trough timing.

By adjusting these parameters, we can simulate conduction characteristics of different fiber diameters. The final Compound Action Potential (SNAP) is the superposition of hundreds of such microscopic fiber potentials:

$$
V_{SNAP}(t) = \sum_{i=1}^{N} V_{fiber, i}(t - \Delta t_i)
$$

## 2. Background: Colored Noise

Background noise in biological systems is distinct from "White Noise". It has significant **spectral characteristics**, usually following a $1/f^\alpha$ power law decay:

$$
S(f) \propto \frac{1}{f^\alpha}
$$

*   **Pink Noise ($\alpha \approx 1$)**: Simulates the baseline noise of biological electrical activity, with energy concentrated in low frequencies.
*   **Brown Noise ($\alpha \approx 2$)**: Used to simulate baseline wander caused by unstable electrode contact.

We generate these noise spectra in the frequency domain and synthesize time-domain waveforms via Inverse Fast Fourier Transform (IFFT), ensuring the background is close to real "biological silence" in both auditory and spectral terms.

## 3. Burst Artifacts: Markov Chain

To simulate unpredictable interference in the real world (such as sudden EMG or motion artifacts), we introduce a Markov process. The system switches randomly between "Quiet" and "Artifact" states, with transition matrix $P$ determining frequency and duration:

$$
P = \begin{pmatrix}
p_{qq} & p_{qa} \\
p_{aq} & p_{aa}
\end{pmatrix}
$$

When entering the artifact state, we inject high-amplitude interference, forcing the model to learn how to "survive" in extreme conditions.

# Why is "Fake" Data More Effective?

Through this physics simulator, we generated massive amounts of ENG data. This synthetic data has a core advantage over real experiments: **God-view Ground Truth.**

In real experiments, you can never be 100% sure if a waveform fluctuation is a neural discharge or EMG interference. But in our simulation, every microsecond of signal component is known. We provide pixel-level precise labels for the neural network (Modified 1D U-Net).

This is like giving AI a pair of "X-ray glasses," allowing it to see the essence of the signal directly through the noise.

# Results

*   **Extreme Noise Resistance**: Even with SNR as low as -10dB (noise is 10x signal), the model can still accurately locate neural spikes.
*   **Strong Generalization**: Although the model has only seen "fake data," because it learned physical laws rather than just morphology, it outperforms traditional algorithms fine-tuned on limited real data when applied to real rat sciatic nerve data.

This is the charm of Data-Centric AI: **A virtual world built on physical laws can sometimes reveal the essence of reality better than chaotic reality itself.**

---
*Related code is open-sourced at [GitHub Repository](https://github.com/Pasdeau/ExG_Generator).*
