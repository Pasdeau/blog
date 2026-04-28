---
title: Curated Physiological Datasets on PhysioNet
date: 2025-06-29
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Research Projects
  - Biomedical Resources
tags:
  - PhysioNet
  - Datasets
  - ECG
  - PPG
  - EEG
description: An overview of openly accessible physiological signal repositories from PhysioNet, serving as essential resources for training advanced models and validating biomedical algorithms.
---

> **Access Note**: All datasets described below have been mirrored for easier access at the [LIP6 Nuage Repository](https://nuage.lip6.fr/index.php/s/9JYzo9A7rHkFHNZ).

---

# 1. ECG & PPG Signal with Arrhythmia Episodes (2022)
**Source**: [doi.org/10.13026/s32e-sv15](https://doi.org/10.13026/s32e-sv15)

## Overview
This resource provides a dedicated software tool for generating synthetic ECG and PPG signals populated with a broad range of arrhythmic events. It is designed to augment training data for arrhythmia detection algorithms.

## Key Features
*   **Arrhythmia Types**: Normal sinus rhythm, Atrial Fibrillation (AF), Bradycardia, Ventricular Tachycardia (VT), and Atrial Premature Beats (APB).
*   **Customization**:
    *   **Sampling Frequency**: 75–1000 Hz for PPG, 250–1000 Hz for ECG.
    *   **Signal Parameters**: Configurable duration, timing of abnormal episodes, and noise characteristics.
*   **Realism**: Supports the superimposition of realistic measurement noise to simulate authentic acquisition environments.

---

# 2. Motion Artifact Contaminated fNIRS and EEG (2014)
**Source**: [physionet.org/content/motion-artifact/1.0.0](https://physionet.org/content/motion-artifact/1.0.0/)

## Overview
This dataset contains simultaneous fNIRS and EEG recordings designed to study motion artifact removal. Data was collected in an experimental setting with controlled motion artifacts.

## Acquisition Setup
*   **fNIRS**: ~25 Hz sampling, dual wavelengths (690 nm and 830 nm).
*   **EEG**: 2048 Hz sampling.
*   **Motion Reference**: Triaxial accelerometer sampled at 200 Hz.
*   **Protocol**: One sensor group was deliberately moved to induce artifacts, while a second control group remained stationary.

## Data Structure
The dataset includes synchronized fNIRS, EEG, and accelerometer streams.

**fNIRS Data Format**:
<div align="center">

| Column | Description |
| :---: | :---: |
| 1 | Sample number |
| 2-3 | Raw Light Intensity (690/830 nm) - Channel 1 (25 Hz) |
| 4-5 | Raw Light Intensity (690/830 nm) - Channel 2 (25 Hz) |
| 6 | Trigger Signal (Rise=Start, Low=Motion, High=Clean) |
| 7-12 | Accelerometer Data (Sensor 1 & 2 X/Y/Z) |
| 13 | Accelerometer Trigger |

</div>

**EEG Data Format**:
<div align="center">

| Column | Description |
| :---: | :---: |
| 1 | Sample number |
| 2 | Raw EEG - Channel 1 (2048 Hz) |
| 3 | Raw EEG - Channel 2 (2048 Hz) |
| 4 | Trigger Signal |
| 5-10 | Accelerometer Data |
| 11 | Accelerometer Trigger |

</div>

> **Note**: Channel 1 is generally the stationary (clean) reference, while Channel 2 contains induced motion artifacts.

---

# 3. ScientISST MOVE (2024)
**Source**: [doi.org/10.13026/hyxq-r919](https://doi.org/10.13026/hyxq-r919)

## Overview
ScientISST MOVE provides multimodal biosignal recordings captured in natural living environments. It features 17 participants performing annotated daily activities such as walking, running, and social interactions.

## Device Configuration
<div align="center">

| Signal Type | ScientISST (Chest/Forearm) | Empatica E4 (Wrist) |
| :---: | :---: | :---: |
| **ECG** | 500 Hz (Gel electrodes) | N/A |
| **PPG** | 500 Hz | 64 Hz |
| **EDA** | 500 Hz | 4 Hz |
| **EMG** | 500 Hz | N/A |
| **ACC** | 500 Hz | 32 Hz |
| **Temp** | N/A | 4 Hz |

</div>

---

# 4. BIG IDEAs Glycemic Variability (2023)
**Source**: [physionet.org/content/big-ideas-glycemic-wearable](https://physionet.org/content/big-ideas-glycemic-wearable/1.1.2/)

## Overview
This dataset explores the relationship between non-invasive physiological signals and glycemic variability. It combines continuous glucose monitoring (CGM) with wearable data from 16 participants.

## Features
*   **Physiological Data**: Heart rate, accelerometry, Blood Volume Pulse (PPG), EDA, and skin temperature from Apple Watch and Empatica E4.
*   **Glucose Data**: Measurements every 5 minutes.
*   **Nutritional Logs**: Detailed intake records (calories, macros) in `Food_Log_xxx.csv`.
*   **Application**: Ideal for researching non-invasive glucose estimation using time-aligned PPG and metabolic data.

---

# 5. Labeled Raw Accelerometry Data (2021)
**Source**: [doi.org/10.13026/51h0-a262](https://doi.org/10.13026/51h0-a262)

## Overview
A human activity recognition (HAR) dataset featuring high-frequency accelerometry from 32 healthy adults (13 males, 19 females).

## Protocol
*   **Sensors**: 4x ActiGraph GT3X+ (Left Wrist, Left Hip, Left Ankle, Right Ankle).
*   **Sampling**: 100 Hz.
*   **Activities**: Walking (~1 km), Stair Climbing (Up/Down 6x), Driving (~12.8 miles).

## Format
Each file contains time-series data with activity codes:
*   `1`: Walk
*   `2`: Downstairs
*   `3`: Upstairs
*   `4`: Drive
*   `77`: Clap (Sync)
*   `99`: Off-protocol

---

# 6. Stress and Structured Exercise Sessions (2025)
**Source**: [physionet.org/content/wearable-device-dataset](https://physionet.org/content/wearable-device-dataset/1.0.1/)

## Overview
A multimodal dataset recording physiological responses to induced acute stress and structured physical exercise using Empatica E4 wristbands.

## Protocols
1.  **Acute Stress (STRESS)**: Mental arithmetic and emotional stimulation tasks ($n=36$).
2.  **Aerobic Exercise**: Moderate, rhythmic cycling ($n=30$).
3.  **Anaerobic Exercise**: Short, high-intensity cycling ($n=31$).

## File Structure
*   `BVP.csv`: 64 Hz signal for HRV and waveform quality analysis.
*   `EDA.csv`: Electrodermal activity.
*   `TEMP.csv`: Skin temperature.
*   `tags.csv`: Event markers.

---

# 7. BigIdeasLab_STEP (2021)
**Source**: [physionet.org/content/bigideaslab-step-hr-smartwatch](https://physionet.org/content/bigideaslab-step-hr-smartwatch/1.0/)

## Overview
This study assesses the impact of skin tone (Fitzpatrick scale 1–6), activity type, and device model on the accuracy of optical heart rate monitoring.

## Demographics & Protocol
*   **Participants**: 53 individuals (ages 18–54), balanced across skin tones.
*   **Activities**: Rest, Paced Breathing, Brisk Walking, Typing.
*   **Devices**: Apple Watch 4, Empatica E4, Fitbit Charge 2, Garmin Vivosmart 3, Xiaomi Miband 3, Biovotion Everion.
*   **Reference**: Bittium Faros 180 ECG (~1000 Hz).

> **Note**: This dataset provides processed Heart Rate (BPM) values, not raw PPG waveforms.

---

# Summary

The majority of these datasets utilize the **Empatica E4** for acquiring PPG, EDA, and temperature signals, establishing it as a common reference in the field. However, researchers should note that the E4 has notably been succeeded by the **EmbracePlus**, which offers enhanced energy efficiency and multi-channel capabilities.
