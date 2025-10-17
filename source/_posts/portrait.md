---
title: Portrait on website of LIP6
date: 2025-10-10
mathjax: false
description: Sharing an experience of being interviewed by a laboratory researcher.
---

In October 2025, I was honored to be interviewed by LIP6. Below is the content of that interview.

# Where do you come from, and where are you headed?

My name is Wenzheng WANG, and I am a second-year Ph.D. candidate (soon entering the third year) in the SYEL team at LIP6. Before beginning my doctorate, I earned an engineering degree specializing in embedded systems from ISEP, a digital engineering school based in Paris and Bordeaux.

I first joined LIP6 for my final-year internship in February 2023. Following an EDITE call for Ph.D. topics, I began my doctoral studies in November 2023—an organic continuation of that internship.

Upon completion of the thesis, I hope to pursue a postdoctoral position, should the opportunity arise.

# What are you working on now?

My objective is to design a non-invasive, multimodal health-monitoring system that acquires both bioelectrical and physiological signals. The aim is to retain the portability of consumer devices (e.g., smartwatches) while enabling reliable, accurate, real-time multiparameter assessment of a person’s health status.

{% asset_img fig2_w.jpg Schematic of photon propagation through biological tissue %}

Concretely, the prototype leverages near-infrared spectroscopy (NIRS) over 700–2500 nm. By analyzing absorption and scattering in biological tissues, it estimates parameters such as oxygen saturation (SpO₂) and blood-flow variations, and investigates coupling between bioelectrical and physiological modalities.

Because these signals are highly susceptible to ambient noise and motion artifacts, pre-processing and feature-extraction algorithms are pivotal. In building the prototype, energy consumption is also a consideration; however, acquisition accuracy and latency remain the primary performance drivers for this class of system. Data throughput and power draw are additional constraints. Collectively, these factors make the design particularly challenging.

{% asset_img fig3_w.jpg Schematic of the photoplethysmography (PPG) signal composition %}

# How is your week organized?

I do not follow a fixed timetable. At times, I teach laboratory and tutorial sessions (TP/TD) at Polytech Sorbonne—the engineering school of Sorbonne Université—as well as in the **Licence** EEA (Électronique, Énergie Électrique, Automatique) and the **Master** in Computer Science, SESI track (Systèmes Électroniques et Systèmes Informatique). On other days, I am in the lab working on the hardware and software components of the prototype. I am currently preparing for my second individual thesis follow-up committee meeting—an obligatory milestone to launch my third year effectively. In the coming year, I will devote substantial time to writing and will conduct in vivo tests to validate the prototype.

# What do you hope to accomplish during your time at LIP6?

My primary goal is to complete the thesis and earn the Ph.D. In parallel, my teaching activities (e.g., microcontrollers, analog electronics) have allowed me to gain pedagogical experience and further consolidate my technical foundations.

# What is one thing people often misunderstand about your topic?

People usually grasp the general idea quickly, but the technical details can be demanding. It is tempting to equate my project with consumer devices based on photoplethysmography (PPG), such as smartwatches. In practice, those devices deliver only basic functions and a limited set of parameters. By contrast, my prototype employs longer near-infrared wavelengths, enabling deeper tissue penetration and producing more stable, accurate physiological measurements. It aims to combine everyday usability with genuine clinical relevance, ultimately supporting more effective health management.

# What excites you about your research?

I enjoy the full cycle: modeling, hardware design, data processing, and prototype validation. The project lets me deepen my expertise in real-time systems and integrate multiple skill sets. The forthcoming in vivo experiments are a major challenge, and I am eager to deliver a working multimodal system.

# Anything to add?

I am very happy to be at LIP6 and to be part of this journey. If you would like to discuss any of these topics, I would be delighted to talk.
