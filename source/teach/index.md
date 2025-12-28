---
title: Teaching Experience | 教学经历
layout: page
comments: false
---

<style>
.en-text {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 8px;
}
.zh-text {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;
}
</style>

<p class="en-text">
During my PhD, I taught laboratory (TP) and tutorial (TD) sessions at Polytech Sorbonne—the engineering school of Sorbonne University. I also instructed in the <strong>Licence</strong> EEA track (Électronique, Énergie Électrique, Automatique) and the <strong>Master</strong> SESI track (Systèmes Électroniques et Systèmes Informatiques) at Sorbonne University.
</p>
<p class="zh-text">
攻读博士期间，我在索邦大学工程师学院（Polytech Sorbonne）负责实验课（TP）和习题课（TD）的教学。同时，我也在索邦大学的<strong>本科</strong> EEA 方向（电子、电气能源、自动化）和<strong>硕士</strong> SESI 方向（电子系统与信息系统）担任教学工作。
</p>

---

# Simulation of Electronic Circuits | 电子电路仿真

<p class="en-text">
For second-year undergraduate students, conduct simulation experiments in PSpice to implement the fundamental workflow of modeling→simulation→result verification, making the key metrics of common linear networks, operational amplifiers, and CMOS logic quantifiable, interpretable, and reproducible. The experiments cover linear networks, operational amplifiers, and CMOS logic. Netlists are written, and <code>.OP/.DC/.AC/.TRAN</code> analyses are configured to complete bias-point, Bode, and transient verification. Capture CIS/Probe is used to establish standard modeling and plotting workflows. Design cases include Thevenin equivalent circuits, −3 dB determination for cascaded RC networks, and parameter scans for peak detection, with FFT-based spectrum and tolerance evaluation. Extensions cover LF411 GBW/slew-rate measurements and CMOS inverter ringing-frequency assessment.
</p>
<p class="zh-text">
面向本科二年级学生，在 PSpice 中进行仿真实验，实现建模→仿真→结果验证的基础工作流程，使常见线性网络、运算放大器和 CMOS 逻辑的关键指标可量化、可解释、可重现。实验涵盖线性网络、运算放大器和 CMOS 逻辑。编写网表，配置 <code>.OP/.DC/.AC/.TRAN</code> 分析以完成偏置点、波特图和瞬态验证。使用 Capture CIS/Probe 建立标准的建模和绘图工作流程。设计案例包括戴维南等效电路、级联 RC 网络的 −3 dB 确定，以及用于峰值检测的参数扫描，包含基于 FFT 的频谱和容差评估。扩展内容涵盖 LF411 增益带宽积/压摆率测量以及 CMOS 反相器振铃频率评估。
</p>

---

# Analog Electronics | 模拟电子学

<p class="en-text">
For third-year undergraduate students, using LTspice and breadboards, establish a closed-loop process of design→implementation→verification, producing reusable prototypes and documentation. During experiments, build foundational models for diodes, BJTs/MOSFETs, and operational amplifiers to perform DC/AC/transient simulations. Use these models to design prototypes for bias circuits, common-emitter/common-source amplifiers, differential amplifiers, and op-amp applications (inverting/non-inverting, active filtering, rectification/voltage regulation). Develop a physical-measurement workflow using oscilloscopes, function generators, and multimeters to evaluate bandwidth, distortion, and phase margin. Document reproducible results to ensure consistency between simulation and physical measurements.
</p>
<p class="zh-text">
面向本科三年级学生，使用 LTspice 和面包板，建立设计→实现→验证的闭环流程，生成可重用的原型和文档。在实验中，为二极管、双极型晶体管/MOSFET 和运算放大器构建基础模型，以执行直流/交流/瞬态仿真。使用这些模型设计偏置电路、共发射极/共源极放大器、差分放大器和运放应用（反相/同相、有源滤波、整流/稳压）的原型。使用示波器、函数发生器和万用表开发物理测量工作流程，以评估带宽、失真和相位裕度。记录可重现的结果，以确保仿真与物理测量之间的一致性。
</p>

---

# Microcontroller | 单片机

<p class="en-text">
For third-year undergraduate students, using the STM32F103 series microcontroller, complete bare-metal development from scratch and implement interrupt/timer coordination on the Keil µVision5 platform to achieve measurable and reproducible timing and peripheral control. The experiment involves setting up the project and debugging environment, initializing GPIO and the system clock via register access, and verifying functionality on the board. Design time- and event-management based on SysTick/EXTI, standardize interrupt-priority and response testing, implement dual-timer coordination and PWM to generate 40 kHz ultrasonic pulse trains, and evaluate jitter and resource utilization. Example code and documentation are organized to form a reusable experimental framework.
</p>
<p class="zh-text">
面向本科三年级学生，使用 STM32F103 系列单片机，从零开始完成裸机开发，并在 Keil µVision5 平台上实现中断/定时器协调，以实现可测量和可重现的定时和外设控制。实验包括设置项目和调试环境，通过寄存器访问初始化 GPIO 和系统时钟，并在开发板上验证功能。基于 SysTick/EXTI 设计时间和事件管理，标准化中断优先级和响应测试，实现双定时器协调和 PWM 以生成 40 kHz 超声波脉冲串，并评估抖动和资源利用率。示例代码和文档被组织成可重用的实验框架。
</p>
