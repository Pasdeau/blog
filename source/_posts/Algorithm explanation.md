---
title: PPG Generation Simulation Software
date: 2025-07-15
mathjax: false
description: MATLAB code program for generating modifiable ECG and PPG simulation signals. Noise can be added according to different scenarios to simulate real-world measurement conditions. Flexible modification is possible for signal duration, sampling frequency (PPG - 75 to 1000 Hz; ECG - 250 to 1000 Hz), abnormal ECG duration, and noise type and intensity.
---

# Dataset
The objective is to generate corresponding noise using this algorithm to train a classification algorithm. Source code is accessible at: 
- [PPG Generation Algorithm](https://nuage.lip6.fr/index.php/s/Mg2r8KswAPrE9Ta)
- [Modified PPG Generation Algorithm](https://nuage.lip6.fr/index.php/s/NmpaTdCfmtRt6fX)

Modifications include resolving the issue where the original source code could not generate PPG signals with zero noise. After downloading this file, simply replace the corresponding file in the algorithm.

## Signal type 1 with 50 RR
### Noise-free signal
#### Time Domain and Frequency Domain
{% asset_img PPG0_plot.png PPG0 %}
### Noise 1
#### Time Domain and Frequency Domain
{% asset_img PPG1_plot.png PPG1 %}
#### Time Domain and Frequency Domain of Noise-Free Signals
{% asset_img S1_plot.png S1 %}
#### Time Domain and Frequency Domain of Noise Signals
{% asset_img N1_plot.png N1 %}
#### Signal-to-Noise Contrast
{% asset_img SN1_plot.png SN1 %}
### Noise 2
#### Time Domain and Frequency Domain
{% asset_img PPG2_plot.png PPG2 %}
#### Time Domain and Frequency Domain of Noise-Free Signals
{% asset_img S2_plot.png S2 %}
#### Time Domain and Frequency Domain of Noise Signals
{% asset_img N2_plot.png N2 %}
#### Signal-to-Noise Contrast
{% asset_img SN2_plot.png SN2 %}
### Noise 3
#### Time Domain and Frequency Domain
{% asset_img PPG3_plot.png PPG3 %}
#### Time Domain and Frequency Domain of Noise-Free Signals
{% asset_img S3_plot.png S3 %}
#### Time Domain and Frequency Domain of Noise Signals
{% asset_img N3_plot.png N3 %}
#### Signal-to-Noise Contrast
{% asset_img SN3_plot.png SN3 %}
### Noise 4
#### Time Domain and Frequency Domain
{% asset_img PPG4_plot.png PPG4 %}
#### Time Domain and Frequency Domain of Noise-Free Signals
{% asset_img S4_plot.png S4 %}
#### Time Domain and Frequency Domain of Noise Signals
{% asset_img N4_plot.png N4 %}
#### Signal-to-Noise Contrast
{% asset_img SN4_plot.png SN4 %}
## Type 1 with 10 RR
{% asset_img T1_plot.png T1 %}
## Type 2 with 10 RR
{% asset_img T2_plot.png T2 %}
## Type 3 with 10 RR
{% asset_img T3_plot.png T3 %}
## Type 4 with 10 RR
{% asset_img T4_plot.png T4 %}
## Type 5 with 10 RR
{% asset_img T5_plot.png T5 %}
