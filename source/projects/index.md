---
title: PhD Subject Introduction
layout: page
---

# 1. Research Background

In everyday life, people commonly rely on basic home devices—such as thermometers and blood pressure monitors—when they feel unwell. While convenient, these instruments provide only limited insight and cannot capture the complexity of human physiology. More comprehensive assessments typically require hospital visits and sophisticated clinical equipment capable of acquiring multiple physiological signals. Such systems, however, are often bulky, expensive, and difficult to operate without trained personnel, which limits their suitability for routine use. Enabling comprehensive, continuous monitoring of physiological data outside clinical settings has therefore become a central challenge in health management and disease prevention.

Current monitoring technologies face a persistent trade-off. On one side, portable devices are easy to use and relatively affordable but yield a narrow set of health indicators. On the other, hospital-grade instruments offer high precision and rich multimodal measurements but are costly and operationally complex, hindering everyday adoption. Developing a system that is both portable and user-friendly while supporting accurate, multi-parameter health monitoring is thus a key objective for the field.

This dissertation addresses these limitations by designing and implementing a new physiological monitoring system that combines the portability and usability of consumer devices with the multi-parameter accuracy of clinical platforms. The system is intended to provide a practical solution for daily health management and disease prevention, allowing users to assess their health status anytime and anywhere, to receive early warnings of potential risks, and to engage in proactive, evidence-based self-care.

Recent advances in wearable monitoring illustrate both the promise and the gaps that remain. Examples include smart contact lenses for assessing visual function [[1](#ref1)], mouthguard sensors for salivary glucose [[2](#ref2)], fatigue detection based on surface electromyography (EMG) [[3](#ref3)], emotion recognition from electroencephalography (EEG) [[4](#ref4)], and pain assessment using electrodermal activity (EDA) [[5](#ref5)]. Despite notable progress, such devices often remain expensive, require nontrivial setup, or target a single modality, limiting their utility for comprehensive day-to-day health monitoring.

Among candidate technologies, near-infrared spectroscopy (NIRS) has emerged as a compelling approach due to its non-invasive nature, portability, and comparatively low cost. Operating in the 700–2500 nm band, NIRS infers physiological variables—such as oxygenation and hemodynamic changes—by measuring wavelength-dependent absorption and scattering in tissue [[6](#ref6), [7](#ref7)]. These characteristics make NIRS particularly suitable for integration into everyday wearables to enable real-time monitoring.

The widespread use of photoplethysmography (PPG) further strengthens the practical feasibility of NIRS-based monitoring. For instance, Přibil et al. developed a dual-channel PPG sensor that maintains high-quality output even under radio-frequency and electromagnetic interference, transmitting data via Bluetooth Low Energy (BLE) for downstream analysis [[8](#ref8), [9](#ref9)]. Murmu et al. demonstrated a deep-learning framework to reconstruct ECG waveforms from PPG, improving heart-rate estimation accuracy and enabling on-device recalibration and energy-efficient real-time operation [[10](#ref10)]. These studies point to new avenues for multi-parameter monitoring.

Additional work has explored multi-wavelength and multi-parameter PPG. Cause et al. reported a five-wavelength LED/photodiode system that also records contact pressure and temperature to improve signal quality and robustness [[11](#ref11)]. Hammour et al. proposed an in-ear, single-wavelength (880 nm) non-invasive glucose monitor that streams PPG via BLE to a computer for machine-learning-based glycemic analysis [[12](#ref12)]. Beyond PPG, Kimoto et al. devised a wireless sensor that simultaneously acquires EMG and NIRS to predict muscular fatigue during physical activity [[13](#ref13)], while Zang et al. built a µC/OS-III-based platform combining sEMG and peripheral oxygen saturation (SpO₂) to study the correlation between muscle fatigue and oxygenation [[14](#ref14)]. In the clinical realm, von Aspern and colleagues demonstrated the feasibility of NIRS for noninvasive monitoring of spinal cord oxygenation, underscoring its potential for peri-operative and postoperative management [[15](#ref15), [16](#ref16)].

Despite this progress, many available NIRS systems still employ one or two wavelengths, often below 900 nm. By contrast, multi-wavelength designs—especially those extending beyond 1000 nm—can increase penetration depth, mitigate superficial noise, and yield more stable and accurate information from deeper tissue layers [[17](#ref17)]. This capability is critical for the next generation of high-performance health-monitoring systems.

Building on prior work, the LIP6 laboratory in collaboration with Hôpital Armand-Trousseau developed the SpinalMED platform for dynamic monitoring of spinal cord oxygenation using a five-wavelength (600–900 nm) NIRS device with BLE connectivity. In-vivo experiments on a porcine model produced encouraging results [[18](#ref18), [19](#ref19)]. However, that system targets intraoperative monitoring, limiting its transferability to daily use, and its functionality is largely confined to PPG-NIRS. A related rehabilitation-monitoring device from the same team (LigaPC) also exhibits constraints in monitored parameters and scope of application [[20](#ref20)].

To meet the dual needs of postoperative rehabilitation and daily health management, this dissertation proposes a system that integrates multiple bioelectrical (ExG) signals—such as EEG, EMG, electroneurography (ENG), and electrocardiography (ECG)—together with PPG-NIRS-derived physiological parameters (e.g., SpO₂, respiratory rate, and body temperature). By combining advanced sensing with intelligent data processing, the system aims to provide comprehensive, real-time health information for users and efficient monitoring tools for clinical stakeholders.

# 2. Research Objectives

The central objective of this dissertation is to design and implement a non-invasive health-monitoring system that integrates multimodal bioelectrical (ExG) and physiological signals to enable real-time perception and assessment of a user’s health status. The system seeks to balance the light-weight, portable form factor of consumer devices with the functional richness of clinical systems, supporting continuous monitoring and real-time analytics for personalised health management and translational clinical use.

At its core, the architecture leverages NIRS to monitor key indicators such as SpO₂ while accommodating the acquisition of multiple ExG signals. The acquired data will undergo preprocessing (e.g., smoothing, denoising, and feature extraction) and be analysed using machine-learning models to infer health states and identify potential risks.

A key research focus is the coupling between bioelectrical and physiological signals. Through multimodal data fusion, the system aims to deliver personalised monitoring while enabling early detection of functional abnormalities in the nervous, cardiovascular, and musculoskeletal systems—thereby supporting proactive health management and disease prevention.

Achieving millisecond-level responsiveness is a principal engineering challenge. Physiological measurements are susceptible to environmental noise and motion artefacts, making robust preprocessing and feature-engineering pipelines essential. To ensure both accuracy and timeliness, the system prioritises efficient, resilient signal-processing methods. Although energy consumption is an important design consideration, the primary constraints for a health-monitoring platform of this kind are acquisition accuracy and end-to-end latency. Accordingly, the system emphasises optimised sensing fidelity, transmission throughput, and response time.

Figure below outlines the overall system architecture, highlighting the implemented PPG-NIRS module and the ExG module slated for integration. The platform supports multi-site signal acquisition. Data processing and analysis are performed primarily on a PC host, including filtering, curve-fitting/smoothing, and deep-learning-based estimation of physiological parameters for health-state evaluation.

<img src="/images/fig1.jpg" alt="Overview of the system architecture" loading="lazy">

To streamline the user experience, companion software will be developed to control the system, including selection among ExG sensors and wavelength switching within the PPG-NIRS module.

Through iterative optimisation, the proposed system is expected to provide an innovative and effective approach for daily health management—enabling proactive monitoring and early warning—while also supplying clinically meaningful data to support diagnosis and rehabilitation.

# References
<span id="ref1">[1]</span> K. Acuña et al. Functional Near-Infrared Spectrometry as a Useful Diagnostic Tool for Understanding the Visual System: A Review. J. Clin. Med. 2024, 13, 282. DOI : 10.3390/jcm13010282.

<span id="ref2">[2]</span> T. Arakawa et al. A Wearable Cellulose Acetate-Coated Mouthguard Biosensor for In Vivo Salivary Glucose Measurement. Analytical Chemistry, 2020, Volume 92, 12201—12207. DOI : 10.1021/acs.analchem.0c01201.

<span id="ref3">[3]</span> A. Veronica et al. Ionogels and eutectogels for stable and long-term EEG and EMG signal acquisition[J]. Materials Futures, 2024, 3(3): 033501. DOI : 10.1088/2752-5724/ad5c84.

<span id="ref4">[4]</span> Y. Cai et al. Emotion Recognition Using Different Sensors, Emotion Models, Methods and Datasets: A Comprehensive Review. Sensors 2023, 23, 2455. DOI : 10.3390/s23052455.

<span id="ref5">[5]</span> Y. Kong et al. Electrodermal activity in pain assessment and its clinical applications. Applied Physics Reviews, 2024, 11(3). DOI : 10.1063/5.0200395.

<span id="ref6">[6]</span> A. Villringer et al. Near infrared spectroscopy (NIRS): a new tool to study hemodynamic changes during activation of brain function in human adults[J]. Neuroscience letters, 1993. DOI : 10.1016/0304-3940(93)90181-J.

<span id="ref7">[7]</span> H. Sørensen et al. A note on arterial to venous oxygen saturation as reference for NIRS-determined frontal lobe oxygen saturation in healthy humans[J]. Frontiers in Physiology, 2014, 4: 403. DOI : 10.3389/fphys.2013.00403.

<span id="ref8">[8]</span> J. Přibil et al. Comparison of Three Prototypes of PPG Sensors for Continual Real-Time Measurement in Weak Magnetic Field. Sensors 2022, 22, 3769. DOI : 10.3390/s22103769.

<span id="ref9">[9]</span> J. Přibil et al. Wearable Two-Channel PPG Optical Sensor with Integrated Thermometers for Contact Measurement of Skin Temperature. 2023, 58, 108. DOI : 10.3390/ecsa-10-16249.

<span id="ref10">[10]</span> N. Murmu et al. Real-time PPG-to-ECG Reconstruction Model with On-Device Recalibration Facility. IEEE Transactions on Instrumentation and Measurement. DOI : 10.1109/TIM.2024.3450120.

<span id="ref11">[11]</span> J.L. Cause et al. Novel Multi-Parametric Sensor System for Comprehensive Multi-Wavelength Photoplethysmography Characterization. Sensors 2023, 23, 6628. DOI : 10.3390/s23146628.

<span id="ref12">[12]</span> G. Hammour et al. An In-Ear PPG-Based Blood Glucose Monitor: A Proof-of-Concept Study. Sensors 2023, 23, 3319. DOI : 10.3390/s23063319.

<span id="ref13">[13]</span> A. Kimoto et al. A Wireless Multi-Layered EMG/MMG/NIRS Sensor for Muscular Activity Evaluation. Sensors 2023, 23, 1539. DOI : 10.3390/s23031539.

<span id="ref14">[14]</span> M. Zang et al. Design and Experimental Research of Synchronous Acquisition System of EMG and Blood Oxygen Signal [J]. China Medical Device Journal, 2023, 47(1):54-60. DOI : 10.3969/j.issn.1671-7104.2023.01.009.

<span id="ref15">[15]</span> K. von Aspern et al. Mapping the collateral network: Optimal near-infrared spectroscopy optode placement. The Journal of Thoracic and Cardiovascular Surgery. Volume 164, Issue 1, 2022, DOI : 10.1016/j.jtcvs.2020.07.103.

<span id="ref16">[16]</span> K. von Aspern et al. Near-Infrared Spectroscopy for Spinal Cord Monitoring—A Roadmap to Translational Research in Aortic Medicine. Aorta (Stamford) 2023; 11(04): 145-151. DOI : 10.1055/s-0043-1772774.

<span id="ref17">[17]</span> N. Erhart et al. 15 minutes to understand the near-infrared spectroscopy (NIRS) in cerebral functional imaging. 2023. DOI : 10.1016/j.jidi.2022.07.001.

<span id="ref18">[18]</span> O. Tsiakaka. Contribution à la réalisation d’un dispositif multimodal pour l’imagerie de la moelle épinière. Electronique. Sorbonne Université, 2018. Français. https://theses.hal.science/tel-02266472v2.

<span id="ref19">[19]</span> S. Li. Modélisation d’un implant médical intelligent dans son environnement pour le monitorage fonctionnel de la moelle épinière. Ingénierie biomédicale. Sorbonne Université, 2022. Français. https://theses.hal.science/tel-04028226.

<span id="ref20">[20]</span> I. Saliba et al. A Review of Chronic Lateral Ankle Instability and Emerging Alternative Outcome Monitoring Tools in Patients following Ankle Ligament Reconstruction Surgery. J. Clin. Med. 2024, 13, 442. DOI : 10.3390/jcm13020442.
