---
title: PPG生成算法
date: 2025-07-15
mathjax: false
description: MATLAB代码程序，用于生成可修改的ECG和PPG模拟信号。可根据不同的情况添加噪声，用来模拟真实情况下的测量情况。可以灵活修改信号长度，采样频率（PPG - 75 to 1000 Hz；ECG - 250 to 1000 Hz），非正常ECG时间和噪声类型与强度。
---

# 数据集
目标使用该算法生成相应的噪声，训练一个分类算法。源代码可访问：
[PPG生成算法](https://nuage.lip6.fr/index.php/s/Mg2r8KswAPrE9Ta)
[修改后PPG生成算法](https://nuage.lip6.fr/index.php/s/NmpaTdCfmtRt6fX)
修改内容包括解决了源代码中无法给出噪声为0的PPG信号问题，下载该文件后替换算法中原来的对应文件即可。
## Type 1 with 50 RR
### 无噪声
#### 时域信号与FFT
{% asset_img PPG0_plot.png PPG0 %}
### Noise 1
#### 全段时域信号和FFT
{% asset_img PPG1_plot.png PPG1 %}
#### 正常时域信号和FFT
{% asset_img S1_plot.png S1 %}
#### 噪声时域信号和FFT
{% asset_img N1_plot.png N1 %}
#### 信噪对比
{% asset_img SN1_plot.png SN1 %}
### Noise 2
#### 全段时域信号和FFT
{% asset_img PPG2_plot.png PPG2 %}
#### 正常时域信号和FFT
{% asset_img S2_plot.png S2 %}
#### 噪声时域信号和FFT
{% asset_img N2_plot.png N2 %}
#### 信噪对比
{% asset_img SN2_plot.png SN2 %}
### Noise 3
#### 全段时域信号和FFT
{% asset_img PPG3_plot.png PPG3 %}
#### 正常时域信号和FFT
{% asset_img S3_plot.png S3 %}
#### 噪声时域信号和FFT
{% asset_img N3_plot.png N3 %}
#### 信噪对比
{% asset_img SN3_plot.png SN3 %}
### Noise 4
#### 全段时域信号和FFT
{% asset_img PPG4_plot.png PPG4 %}
#### 正常时域信号和FFT
{% asset_img S4_plot.png S4 %}
#### 噪声时域信号和FFT
{% asset_img N4_plot.png N4 %}
#### 信噪对比
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
