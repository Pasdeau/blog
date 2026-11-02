---
title: Teaching Experience
layout: page
comments: false
---

Throughout my doctoral research, I served as a teaching assistant and lab instructor across lectures (CM), tutorials (TD), and practical laboratory sessions (TP) at Sorbonne University. My teaching spans two faculties: Polytech Sorbonne (the university’s engineering school) and the Faculty of Science and Engineering. The courses range from foundational first-year physics and electronics introductions up to third-year undergraduate engineering tracks in Electrical Engineering & Automation (Licence EEA) and graduate courses in Electronic & Computer Systems (Master SESI) and Healthcare Engineering (Master IPS).

---

# Introduction to Electronics — [Andrea Pinna](mailto:andrea.pinna@sorbonne-universite.fr)

First-year science students often arrive at the electronics lab having only encountered circuit diagrams on paper. In this introductory course, the goal is to make physical benchtop instrumentation second nature. Working with dual-channel digital oscilloscopes, function generators (GBF), regulated DC power supplies, and breadboards, students learn how to properly trigger a trace, isolate ground loops, and measure true RMS versus peak-to-peak voltages. The lab introduces the duality of time and frequency: using electroacoustic transducers (microphones and speakers), students observe audio waveforms in real time and watch their harmonic spectra unfold via the oscilloscope's FFT mode. Later units transition from passive networks to fundamental active components, exploring diode clipping thresholds, operational amplifier comparators, and a basic amplitude modulation (AM) radio transmission setup with envelope demodulation.

---

# Simulation of Electronic Circuits — [Sylvain Feruglio](mailto:sylvain.feruglio@sorbonne-universite.fr)

Before building hardware, second-year engineering students must learn how to model and interrogate circuits numerically. Using Cadence PSpice, this laboratory guides students through configuring netlists and running `.OP`, `.DC`, `.AC`, and `.TRAN` analyses to evaluate linear networks, operational amplifiers, and CMOS logic gates. Rather than relying on trial-and-error, students learn to extract precise quantities: verifying Thevenin/Norton equivalents, finding the exact -3 dB cutoff frequencies of cascaded RC filters, and using parametric sweeps to determine diode peak detector sensitivity. The exercises also confront practical non-idealities that textbook formulas gloss over, such as slew-rate and gain-bandwidth limitations in LF411 op-amps, and inductive ringing phenomena during rapid CMOS inverter switching transitions.

---

# Numerical Methods in MATLAB — [Yannis Cuypers](mailto:yannis.cuypers@sorbonne-universite.fr)

Calculus behaves very differently when forced onto finite-precision computing hardware. In this second-year methods course, students explore computational linear algebra and numerical analysis in MATLAB. The sessions begin by demonstrating how machine epsilon, catastrophic cancellation, and integer overflows can silently corrupt results. Students then code and analyze numerical tools from scratch: building polynomial interpolations via Vandermonde and Lagrange matrices to witness the Runge phenomenon, evaluating the convergence rates of composite Newton-Cotes rules (rectangle, midpoint, trapezoid, Simpson) alongside Gaussian quadrature, and formulating ordinary differential equation solvers (explicit Euler and Heun/RK2). By simulating the transient step responses of RC, RL, and resonant LC circuits, students see firsthand how numerical integration step sizes dictate numerical stability, alongside comparing direct LU and Cholesky matrix factorizations against iterative Gauss-Seidel schemes.

---

# Scientific Programming in Python — [Islem Ben Doudou](mailto:islem.ben_doudou@sorbonne-universite.fr)

In this programming course for second-year undergraduates, the objective is to guide students from informal script writing toward disciplined, modular algorithmic development in Jupyter Notebooks. The syllabus covers core control flow, iterative loops, and sequential collections (strings, lists, tuples, and dictionaries). Computational assignments center on practical algorithmic challenges: prime number sieving, run-length encoding (RLE) string compression and decompression, and structured text file parsing. Throughout the semester, an emphasis is placed on defensive coding practices. Every function must include a clear docstring contract, formal input assertions to prevent boundary violations, and an accompanying unit test suite to independently verify correctness before submission.

---

# Medical Device Design Project — [Sylvain Feruglio](mailto:sylvain.feruglio@sorbonne-universite.fr)

Translating biomedical sensing concepts into reliable healthcare instrumentation requires coordinating hardware design, embedded software, and structured project management. In this 28-hour project-based course for second-year Master's students in Healthcare Engineering (Master 2 IPS), student teams design and build a complete measurement device targeting physiological or environmental health parameters. Structured in two progressive phases, the module begins with rapid bring-up of elementary sensing prototypes—interfacing digital sensors with embedded platforms such as Arduino, ESP32, Nordic nRF, and Raspberry Pi, and characterizing signals with Digilent Analog Discovery 3 (AD3) benchtop instruments and Fablab prototyping tools. In the second phase, teams of three to four students—operating with defined hardware, software, verification, and coordination roles—develop and optimize custom hardware front-ends, firmware, and signal-processing blocks for applications ranging from multi-modal physiological monitoring (ExG, PPG/NIRS, and bioimpedance/EDA) and skin-tone-compensated pulse oximetry to non-contact thermometry, fall detection, smart insoles, and rehabilitation gloves, culminating in two oral defenses and an IEEE-format technical paper.

---

# Analog Electronics — [Mohamed Boutchich](mailto:mohamed.boutchich@sorbonne-universite.fr)

For third-year undergraduate engineers, this laboratory bridges computer simulation and physical breadboard reality. Using a closed-loop design workflow, students model semiconductor devices in LTspice—including rectifying diodes, BJTs, MOSFETs, and operational amplifiers—to establish DC operating points and frequency responses before heading to the workbench. On physical breadboards, they construct bias networks, common-emitter and common-source amplifier stages, differential pairs, and active filtering topologies. Using laboratory oscilloscopes, signal generators, and multimeters, students characterize voltage gain, -3 dB bandwidth, phase margin, and harmonic distortion. By comparing bench measurements directly against simulated curves, students learn to recognize the impact of parasitic capacitances, component tolerances, and non-ideal grounding.

---

# Microcontroller Systems — [Arouna Darga](mailto:arouna.darga@sorbonne-universite.fr)

High-level software libraries often hide the actual interaction between firmware and silicon. In this third-year lab, students work directly on the ARM Cortex-M3 (STM32F103) platform using Keil µVision5, building bare-metal embedded applications through direct register manipulation. Students establish their own hardware debug connections, configure the system clock tree, and initialize GPIO ports from the ground up without relying on prepackaged HAL libraries. Key lab milestones focus on deterministic timing: configuring the SysTick system timer for non-blocking task delays, managing nested external interrupt priorities (EXTI) with measurable latency, and synchronizing dual hardware timers to generate 40 kHz PWM bursts for ultrasonic ranging transducers while observing duty cycle accuracy and jitter directly on an oscilloscope.
