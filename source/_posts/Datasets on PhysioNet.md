---
title: Datasets on PhysioNet
date: 2025-06-29
mathjax: true
description: PhysioNet provides an extensive, openly accessible repository of physiological signals, serving as a cornerstone for training advanced models and acquiring high‑quality physiological data.
---

Source for all datasets: [LIP6 Nuage Repository](https://nuage.lip6.fr/index.php/s/9JYzo9A7rHkFHNZ)

# [ECG & PPG Signal with Arrhythmia Episodes](https://doi.org/10.13026/s32e-sv15) – 2022
*Simulation model for ECG and PPG signals with arrhythmia episodes*

A dedicated software tool capable of generating synthetic ECG and PPG signals containing a broad range of arrhythmic events (e.g., atrial fibrillation, bradycardia, ventricular tachycardia). Key features include:
- Normal sinus rhythm  
- Atrial fibrillation (AF)  
- Bradycardia  
- Ventricular tachycardia (VT)  
- Atrial premature beats (APB)

Realistic measurement noise can be superimposed to mimic real acquisition conditions. Users can configure signal duration, sampling frequency (PPG: 75–1000 Hz; ECG: 250–1000 Hz), abnormal episode timing, and noise type/level. This simulator facilitates generation of realistic cases to augment training datasets.

# [Motion Artifact Contaminated fNIRS and EEG](https://physionet.org/content/motion-artifact/1.0.0/) – 2014
*Simultaneous fNIRS and EEG recordings with controlled motion artifacts*

fNIRS and EEG signals were recorded simultaneously in an experimental setting using two sensor groups: one deliberately exposed to motion artifacts and one kept still. A triaxial accelerometer captured the motion data.  
- fNIRS: ~25 Hz at two wavelengths (690 nm and 830 nm)  
- EEG: 2048 Hz  
- Accelerometer: 200 Hz

## CSV File Details
fNIRS/EEG signals and accelerometer data were acquired on independent systems but synchronized by trigger signals.

**fNIRS data (9 experimental sessions, with sessions 5 and 8 of lower quality):** two optical channels per wavelength.

**EEG data (23 recordings):** two frontal channels.

Trigger coding:  
- fNIRS trigger: rising edge = experiment start; low level = motion‑artifact phase; high level = clean phase; final drop = experiment end.  
- EEG trigger: only start (rise) and end (fall) markers; no phase segmentation.

**fNIRS data structure:**  
|Column|Description|
|:------:|:-----------:|
|1|Sample number|
|2|Raw light intensity 690 nm – Channel 1 (25 Hz)|
|3|Raw light intensity 830 nm – Channel 1 (25 Hz)|
|4|Raw light intensity 690 nm – Channel 2 (25 Hz)|
|5|Raw light intensity 830 nm – Channel 2 (25 Hz)|
|6|fNIRS trigger (25 Hz)|
|7–9|Accelerometer 1 – X/Y/Z (200 Hz)|
|10–12|Accelerometer 2 – X/Y/Z (200 Hz)|
|13|Accelerometer trigger (200 Hz)|

**EEG data structure:**  
|Column|Description|
|:------:|:-----------:|
|1|Sample number|
|2|Raw EEG – Channel 1 (2048 Hz)|
|3|Raw EEG – Channel 2 (2048 Hz)|
|4|EEG trigger (2048 Hz)|
|5–7|Accelerometer 1 – X/Y/Z (200 Hz)|
|8–10|Accelerometer 2 – X/Y/Z (200 Hz)|
|11|Accelerometer trigger (200 Hz)|

*Note: Channel 1 is generally motion‑free, whereas Channel 2 is deliberately moved.*

# [ScientISST MOVE](https://doi.org/10.13026/hyxq-r919) – 2024
*Multimodal biosignal recordings in natural living environments with annotated daily activities*

Seventeen participants were monitored for ~37 minutes each during natural activities (standing, walking, running, chair displacement, greeting, etc.), with precise activity annotations.

Devices and sampling frequencies:  
- **ScientISST‑Chest and ScientISST‑Forearm**: ECG, EMG, EDA, and finger PPG at 500 Hz.  
- **Empatica E4 wristband**: PPG, EDA, skin temperature, and accelerometry.

|Signal type|Sampling frequency (ScientISST / E4)|
|:-----------:|:--------------------------------------:|
|ECG (gel electrodes)|500 Hz|
|PPG|500 Hz / 64 Hz|
|EDA|500 Hz / 4 Hz|
|EMG|500 Hz|
|Accelerometer (chest/wrist)|500 Hz / 32 Hz|
|Temperature|– / 4 Hz|

# [BIG IDEAs](https://physionet.org/content/big-ideas-glycemic-wearable/1.1.2/) – 2023
*Glycemic variability and wearable-device data*

Continuous glucose monitoring combined with Apple Watch or Empatica E4 recordings provides heart rate, accelerometry, blood volume pulse (PPG), electrodermal activity, and temperature.  
- Glucose measurement every 5 min  
- PPG sampling at 64 Hz (sufficient for waveform analysis)  
- 16 participants including controlled food intake

`Food_Log_xxx.csv` files detail nutritional intake (type, time, amount, calories, carbohydrates, proteins, lipids, fibers, etc.). The dataset supports time‑aligned PPG–glucose analysis.

# [Labeled Raw Accelerometry Data](https://doi.org/10.13026/51h0-a262) – 2021
*Annotated raw accelerometry during walking, stair climbing/descending, and driving*

Thirty‑two healthy adults (13 males, 19 females) each wore four ActiGraph GT3X+ accelerometers (left wrist, left hip, left ankle, right ankle) sampling at 100 Hz.

Activities: walking ~1 km, ascending/descending stairs six times, and driving ~12.8 miles. Each trial began and ended with a hand clap for synchronization.

Each subject file contains:  
|Parameter|Meaning|
|:---------:|:-------:|
|activity|Activity code|
|time_s|Elapsed time (s)|
|lw_x,y,z|Left wrist axes|
|lh_x,y,z|Left hip axes|
|la_x,y,z|Left ankle axes|
|ra_x,y,z|Right ankle axes|

Activity codes: 1=walk, 2=downstairs, 3=upstairs, 4=drive, 77=clap, 99=off‑protocol.

# [Stress and Structured Exercise Sessions](https://physionet.org/content/wearable-device-dataset/1.0.1/) – 2025
*Physiological recordings during induced stress and structured exercise*

Recordings with **Empatica E4** wristbands under three protocols:
1. **Acute Stress (STRESS)** – alternating mental arithmetic and emotional stimulation with rest; subjective stress levels logged (two CSVs per subject).  
2. **Aerobic Exercise (AEROBIC)** – moderate, rhythmic cycling.  
3. **Anaerobic Exercise (ANAEROBIC)** – short, high‑intensity cycling.

Sample sizes: 36 (STRESS), 30 (AEROBIC), 31 (ANAEROBIC).  
`BVP.csv` provides 64 Hz PPG for heart‑rate, HRV, and waveform‑quality analysis.

|Accelerometer|PPG|EDA|Heart rate|IBI|Events|Temperature|
|:-------------:|:---:|:---:|:----------:|:---:|:------:|:----------:|
|ACC.csv|BVP.csv|EDA.csv|HR.csv|IBI.csv|tags.csv|TEMP.csv|

# [BigIdeasLab_STEP](https://physionet.org/content/bigideaslab-step-hr-smartwatch/1.0/) – 2021
*Skin‑tone effects on optical heart‑rate sensing in smartwatches*

Assesses how skin tone (Fitzpatrick types 1–6), activity type, and device model influence optical heart‑rate accuracy.

Fifty‑three participants (32 females, 21 males; ages 18–54) balanced across six skin‑tone categories completed a standardized protocol repeated three times:
1. Seated rest – 4 min  
2. Paced breathing – 1 min  
3. Brisk walking (≈50 % HRmax) – 5 min  
4. Seated rest – 2 min  
5. Keyboard typing – 1 min

Reference ECG was recorded with a Bittium Faros patch at ~1000 Hz. Only heart‑rate values (BPM) from multiple devices are provided—no raw PPG.

|Parameter|Description|
|:---------:|:-----------:|
|ECG|Reference (Bittium Faros 180)|
|Apple Watch|Apple Watch 4|
|Empatica|Empatica E4|
|Fitbit|Fitbit Charge 2|
|Garmin|Garmin Vivosmart 3|
|Miband|Xiaomi Miband 3|
|Biovotion|Biovotion Everion|
|Skin tone|Fitzpatrick type (1–6)|
|ID|Participant identifier|
|Activity|Rest, exercise, breathing, typing|

# Conclusion

Most datasets cited here employed the [Empatica E4](https://www.empatica.com/en-int/research/e4/) to acquire PPG, EDA, and temperature signals.  
However, the E4 has been superseded by **EmbracePlus**, which offers lower energy consumption and supports up to four concurrent measurement channels.
