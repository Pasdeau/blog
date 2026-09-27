---
title: "A Versatile Embedded System for Continuous Multimodal Physiological Monitoring"
layout: page
comments: false
mathjax: true
---

# Abstract

Capturing continuous multimodal physiological signals requires close coordination between optode geometry, hardware sampling, wireless telemetry, and data interpretation. In this doctoral work, I developed a configurable embedded system that simultaneously acquires multi-wavelength optical signals (PPG/NIRS) and electrophysiological waveforms (ExG). To link physical probe geometry to actual tissue interrogation depth, the system relies on a detector-oriented Monte Carlo modeling approach. At the hardware layer, a synchronous timing scheme locks optical switching to analog-to-digital conversion, preserving measurement states across continuous wireless streaming. Downstream, a traceable signal processing pipeline evaluates waveform quality and estimates physiological parameters without discarding or altering raw records. Each stage of this sensing chain was experimentally validated through optical phantoms, in vivo porcine spinal surgery, and human subject protocols.

---

# 1. Motivation & Scientific Scope

Commercial wearable monitors typically reduce continuous pulsatile waveforms into a handful of summary metrics—such as a single heart rate or arterial oxygen saturation value reported every few seconds. When sensor contact shifts or motion artifacts occur, evaluating why a reading failed becomes impossible because the raw waveforms and physical measurement states were never retained. Conversely, clinical benchtop instruments provide rich raw recordings, but their bulky form factors and rigid cabling confine them to controlled clinical environments.

Our goal was to bridge this divide by constructing an embedded research platform capable of sustained, high-resolution raw data recording across two complementary physiological domains: localized microvascular hemodynamics (via diffuse optical spectroscopy) and neuromuscular bioelectrical potentials (via electrophysiology).

The core difficulty in multimodal monitoring lies not in multiplying the sensor count, but in coordinating signals that differ fundamentally in bandwidth, dynamic range, and noise vulnerability:
- **Spatial depth ambiguity in diffuse optics**: Physical source-detector separation on the skin or tissue surface does not equate to the actual distance photons travel through turbid tissue. Without modeling, layer-specific interrogation depth remains ambiguous.
- **Hardware-level temporal coherence**: Channel phase skew, optical switching transients, and computer operating system delays can easily corrupt the microsecond-level alignment needed between bioelectrical spikes and optical illumination states.
- **Data traceability**: Post-processing algorithms—whether classical filters or neural networks—cannot compensate for flawed hardware acquisition. Every digitized sample must remain traceable to its exact conversion boundary and illumination condition.

This thesis links these challenges into an interconnected experimental chain, moving from tissue light transport modeling to deterministic hardware acquisition and robust state estimation.

---

# 2. Key Contributions

## Contribution 1: Detector-Oriented Monte Carlo Modeling for Light Transport

In multilayer biological tissues (such as skin, fat, muscle, ligament, and bone), the physical separation between an optical source and a photodetector provides little insight into where photons actually migrate. Standard forward Monte Carlo codes (like conventional MCML) simulate light radiating outward everywhere into a grid. However, for probe design, we care strictly about the small fraction of scattered photons that survive absorption and reach the finite active area of our photodiode.

To resolve this directly, we developed **MOP-MCML** (*Mean optical path Monte Carlo Multi-Layered*). The simulator reformulates photon tracking by computing detected photon probability distributions and recording layer-by-layer optical pathlengths under arbitrary source-detector separations (SDS) and multi-wavelength illumination.

Crucially, the simulator resolves photon migration in both measurement modes:
- **Reflection mode (R)**: Source and detector sit on the same tissue surface (*z* = 0). Detected light forms a curved, "banana-shaped" spatial corridor whose penetration depth is governed by the source-detector separation.
- **Transmission mode (T)**: Light enters from one surface and emerges through the opposite boundary, concentrating tightly along the optical axis between source and detector across the full tissue thickness.

We verified the model experimentally using double integrating spheres and the **Inverse Adding-Doubling (IAD)** method on calibrated solid silicone and liquid intralipid phantoms, confirming that simulated depth profiles reflect physical optical transport across complex musculoskeletal and vertebral targets.

![Optical Path Distributions in Reflection and Transmission Modes](/projects/fig2_mop_mcml_rt.png)
*Figure 1: Spatial optical path distributions in reflection (R) and transmission (T) modes for human subcutaneous tissue, resolving the effective exploration depth and photon migration corridors.*

---

## Contribution 2: Sample-Synchronous Embedded Acquisition & Lossless Streaming

Multi-wavelength optical monitoring relies on time-division multiplexing: rapidly sequencing multiple LEDs alongside an unilluminated dark state to subtract ambient light. If LED switching drifts relative to analog-to-digital conversion even by microseconds, optical states become ambiguous, corrupting subsequent chromophore absorption calculations.

To guarantee absolute phase coherence, our system locks optical switching directly to the hardware conversion strobe of the biopotential Analog Front-End (AFE):
- **Sample-Synchronous Timing**: Rather than relying on unsynchronized microsecond software delays, LED switching is triggered synchronously on hardware conversion boundaries. Operating at 4 kSPS, each optical illumination window spans **four consecutive analog-to-digital conversion periods (*T*<sub>slot</sub> = 1 ms)**. A full measurement cycle sequences five distinct time slots (four active optical wavelengths λ<sub>1</sub>–λ<sub>4</sub> plus an unilluminated dark frame for ambient subtraction) every **5 ms (200 Hz repetition rate)**.
- **Transient Settling & Plateau Sampling**: When switching high-current LEDs, the driver circuitry and receiver transimpedance amplifier require finite time to overcome parasitic capacitance and reach electrical equilibrium. Allocating four conversion periods per slot allows initial samples to absorb these switching transients, ensuring subsequent digitized readings represent the true, steady-state optical response before advancing to the next wavelength.
- **Synchronous Metadata & Lossless Telemetry**: Hardware illumination state tags are interleaved directly with 24-bit digitized biopotentials at the moment of conversion, preserving state identity through intermediate buffers. To prevent buffer overflow on host operating systems under sustained 4 kSPS streaming (52 kB/s net payload), an embedded relay bridge handles Bluetooth Low Energy reception and forwards the raw stream via high-speed UART.

The complete system sustained continuous transmission with **0% packet loss**, low bounded latency (<20 ms), and sub-millisecond timestamp precision across multi-hour surgical deployments. The recovered multi-channel recordings demonstrated strong inter-wavelength cardiac synchronization (cross-correlation with λ<sub>4</sub> up to 0.96) and robust relative spectral quality (RSQI).

![Synchronized Multi-Wavelength PPG Waveforms and Quality Metrics](/projects/waveform.png)
*Figure 2: Experimental acquisition results: Synchronized four-wavelength PPG recordings demonstrating tight cardiac phase coherence, high inter-channel cross-correlation (up to 0.96 with λ<sub>4</sub>), and robust relative spectral quality (RSQI).*

---

## Contribution 3: Kalman State Estimation & Subspace Noise Separation

In vivo optical recordings—especially those gathered directly on porcine vertebral lamina during spine surgery—suffer from severe baseline drift and motion artifacts. When evaluated over an entire multi-hour surgical recording, the static modified Beer-Lambert Law (mBLL) accumulated a large root-mean-square error of 9.66%. Purely incremental difference methods, on the other hand, produce unconstrained baseline drift and sudden update spikes.

We addressed this through two complementary Kalman filtering strategies:
1. **Subspace Kalman Filtering (SubspaceKF)**:
   - Multispectral optical observations are decomposed into two orthogonal subspaces: a physiological HbO<sub>2</sub> / HHb hemodynamic subspace and a complementary subspace assigned to wavelength-specific artifact drift. Rather than using empirical data-driven PCA, the projection operator is constructed directly from chromophore extinction spectra and differential pathlengths.
   - At each recursive step, the algorithm whitens measurement innovations to suppress noisy wavelengths, projects updates onto the physiological subspace to track true tissue oxygenation, and steers orthogonal discrepancies into an artifact bias state. This reduced full-record SpO<sub>2</sub> RMSE from **9.66% down to 3.21%**, effectively suppressing long-term baseline drift.

![SubspaceKF Geometry and Orthogonal Decomposition](/projects/subspace_geometry.png)
*Figure 3: Geometric formulation of SubspaceKF: (a) physiological HbO<sub>2</sub> / HHb state subspace, (b) projection of whitened measurement innovations onto physiological coordinates, and (c) complementary subspace capturing wavelength-specific artifact drift.*

2. **Causal Scalar Kalman Filtering with Adaptive Reset**:
   - Designed for strict real-time intraoperative monitoring where future-record lookahead is impossible.
   - Combined with automatic state reset, it constrains abnormal transient updates (reducing the maximum step jump from 6.46% to 1.07%) and achieves an SpO<sub>2</sub> RMSE of **2.13%** during acute hypoxemic crises.

![In Vivo SpO2 Trajectories under Hypoxia](/projects/spo2_kalman_results.png)
*Figure 4: In vivo validation during porcine vertebral hypoxia: Reference and estimated SpO<sub>2</sub> trajectories comparing static mBLL (RMSE 9.66%), offline SubspaceKF (RMSE 3.21%), and strictly causal scalar Kalman filtering with automatic reset (RMSE 2.13%) across the ventilation-stop window.*

---

# 3. Experimental Validation

The experimental methodology spans three complementary tiers, connecting computational modeling, operating theater deployment, and multimodal human physiology:

| Evaluation Tier | Experimental Protocol | Primary Outcomes & Validation Objectives |
| :---: | :---: | :---: |
| **Solid & Liquid Optical Phantoms** | Integrating spheres & spectrophotometry using calibrated solid silicone and liquid intralipid matrices | Validated the experimental feasibility of optical property extraction (*μ*<sub>a</sub>, *μ*<sub>s</sub>′) and verified that physical photon propagation depth in scattering media strictly matches MOP-MCML simulation predictions. |
| **In Vivo Porcine Surgery** | Long-duration intraoperative multi-wavelength monitoring in a surgical operating theater | Demonstrated continuous, long-distance wireless telemetry and robust data logging under realistic surgical conditions, maintaining uninterrupted recording despite severe electrocautery noise and metallic interference. |
| **Human Multimodal Protocols** | Synchronous recording of multi-wavelength PPG, ECG, and IMU inertial signals during rest and movement | Validated cooperative multi-signal processing across modalities, extracting key cardiovascular biomarkers such as Pulse Arrival Time (PAT) to facilitate downstream algorithm development for cuffless PPG blood pressure estimation. |

---

# 4. Publications & Research Resources

## Publications

### Journal Articles
- I. Saliba, A. Hardy, **W. Wang**, R. Vialle, S. Feruglio. "A Review of Chronic Lateral Ankle Instability and Emerging Alternative Outcome Monitoring Tools in Patients following Ankle Ligament Reconstruction Surgery." *Journal of Clinical Medicine*, 13(2):442, 2024. [\[PDF\]](https://hal.science/hal-04400429) · [\[DOI: 10.3390/jcm13020442\]](https://doi.org/10.3390/jcm13020442)

### International Conferences
- **W. Wang**, N. Mainard, J. Denoulet, M. Bouyer, M. Gaume, R. Vialle, S. Feruglio. "Artifact-Robust SpO₂ Estimation from Multi-Wavelength Vertebral PPG: In Vivo Evaluation in a Porcine Model." *24th IEEE Interregional NEWCAS Conference (NEWCAS)*, 2026. [\[PDF\]](https://hal.science/hal-05703322) · [\[DOI: 10.1109/NewCAS64543.2026.11674027\]](https://doi.org/10.1109/NewCAS64543.2026.11674027)
- **W. Wang**, H. Li, I. Saliba, A. Hardy, J. Denoulet, S. Feruglio. "Preliminary Development of an Opto-electronic System for Ankle Instability Assessment." *6th International Conference on Bio-engineering for Smart Technologies (BioSMART)*, 2025. **(Best Student Paper Award)**. [\[PDF\]](https://hal.science/hal-05065209) · [\[DOI: 10.1109/BioSMART66413.2025.11046076\]](https://doi.org/10.1109/BioSMART66413.2025.11046076)
- **W. Wang**, H. Li, R. Vialle, J. Denoulet, S. Feruglio. "Design of a Multi-Channel Wireless System for Physiological Signals Acquisition." *23rd IEEE Interregional NEWCAS Conference (NEWCAS)*, 2025. **(First Place in Young Professionals Competition)**. [\[PDF\]](https://hal.science/hal-05115174)
- **W. Wang**, S. Li, I. Saliba, A. Hardy, R. Vialle, J. Denoulet, S. Feruglio. "Optimizing the Monte-Carlo simulation program for NIRS modeling of biological tissues in optoelectronic devices." *31st IEEE International Conference on Electronics, Circuits and Systems (ICECS)*, 2024. [\[PDF\]](https://hal.science/hal-04709286) · [\[DOI: 10.1109/ICECS61496.2024.10849250\]](https://doi.org/10.1109/ICECS61496.2024.10849250) · [\[GitHub\]](https://github.com/Pasdeau/MOP-MCML)

## Open-Source Repositories
- **[Pasdeau/MOP-MCML](https://github.com/Pasdeau/MOP-MCML)**: Mean optical path Monte Carlo Multi-Layered simulator for photon migration in layered turbid media, supporting custom source-detector configurations, GPU acceleration, and 3D trajectory tracking.
- **[Pasdeau/Sys_collect](https://github.com/Pasdeau/Sys_collect)**: Firmware and multi-wavelength BLE-to-UART streaming pipeline for continuous multimodal physiological acquisition.
- **[Pasdeau/ExG_Generator](https://github.com/Pasdeau/ExG_Generator)**: Electrophysiological signal synthesis, realistic noise modeling, and evaluation suite for bioelectrical signal processing.

## Related Articles & Notes
- **Tissue Optics & MCML Simulation**:
  - [MOP-MCML User Guide and Technical Introduction](/2025/09/09/optics/MOP_MCML/)
  - [3D Cartesian Path Visualization in MOP-MCML](/2026/03/05/optics/mop_mcml_3d/)
  - [GPU Acceleration for Monte Carlo Simulations](/2025/11/12/optics/mop_mcml_gpu/)
  - [Inverse Adding-Doubling (IAD) and Optical Parameter Extraction](/2025/08/23/optics/IAD%20and%20MCML/)
- **Embedded Acquisition & Telemetry**:
  - [Getting Started with the nRF5340 Dual-Core SoC](/2025/10/15/embedded/nRF/)
- **PPG Signal Processing & Physiological Modeling**:
  - [Dual-Stream PPG Neural Network](/2025/12/26/ppg/Final_Model_Architecture/)
  - [Time-Frequency Representation of Pulse Waves](/2025/12/24/ppg/PPGmodel_Evolution/)
- **Electrophysiology & Neuromuscular Interfaces**:
  - [Cross-Day Gesture Recognition Stability](/2025/12/26/exg/emg_cross_day/)
  - [Cross-Subject Generalization in Neuromuscular Interfaces](/2025/12/28/exg/emg_cross_subject/)
  - [Electrophysiological Noise Modeling & Generator](/2025/11/04/exg/eng_noise_detection/)
