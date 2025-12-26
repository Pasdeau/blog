---
title: PhD Subject Introduction | 博士研究课题介绍
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

# 1. Research Background | 研究背景

<p class="en-text">
In everyday life, people commonly rely on basic home devices—such as thermometers and blood pressure monitors—when they feel unwell. While convenient, these instruments provide only limited insight and cannot capture the complexity of human physiology. More comprehensive assessments typically require hospital visits and sophisticated clinical equipment capable of acquiring multiple physiological signals. Such systems, however, are often bulky, expensive, and difficult to operate without trained personnel, which limits their suitability for routine use. Enabling comprehensive, continuous monitoring of physiological data outside clinical settings has therefore become a central challenge in health management and disease prevention.
</p>
<p class="zh-text">
在日常生活中，人们身体不适时通常依赖基本的家用设备——如温度计和血压计。尽管这些仪器使用方便，但它们只能提供有限的健康信息，无法捕捉人体生理的复杂性。更全面的评估通常需要到医院就诊，使用能够采集多种生理信号的精密临床设备。然而，这些系统往往体积庞大、价格昂贵，且需要专业人员操作，这限制了它们在日常使用中的适用性。因此，在临床环境之外实现全面、连续的生理数据监测已成为健康管理和疾病预防领域的核心挑战。
</p>

<p class="en-text">
Current monitoring technologies face a persistent trade-off. On one side, portable devices are easy to use and relatively affordable but yield a narrow set of health indicators. On the other, hospital-grade instruments offer high precision and rich multimodal measurements but are costly and operationally complex, hindering everyday adoption. Developing a system that is both portable and user-friendly while supporting accurate, multi-parameter health monitoring is thus a key objective for the field.
</p>
<p class="zh-text">
当前的监测技术面临着一个持续的权衡。一方面，便携式设备易于使用且价格相对实惠，但只能提供有限的健康指标。另一方面，医院级仪器提供高精度和丰富的多模态测量，但成本高昂且操作复杂，阻碍了日常应用。因此，开发一种既便携又易用，同时支持准确的多参数健康监测的系统，成为该领域的关键目标。
</p>

<p class="en-text">
This dissertation addresses these limitations by designing and implementing a new physiological monitoring system that combines the portability and usability of consumer devices with the multi-parameter accuracy of clinical platforms. The system is intended to provide a practical solution for daily health management and disease prevention, allowing users to assess their health status anytime and anywhere, to receive early warnings of potential risks, and to engage in proactive, evidence-based self-care.
</p>
<p class="zh-text">
本论文通过设计和实现一个新的生理监测系统来解决这些局限性，该系统结合了消费类设备的便携性和易用性与临床平台的多参数准确性。该系统旨在为日常健康管理和疾病预防提供实用解决方案，使用户能够随时随地评估自己的健康状态，接收潜在风险的早期预警，并进行主动的、基于证据的自我保健。
</p>

<p class="en-text">
Recent advances in wearable monitoring illustrate both the promise and the gaps that remain. Examples include smart contact lenses for assessing visual function [<a href="#ref1">1</a>], mouthguard sensors for salivary glucose [<a href="#ref2">2</a>], fatigue detection based on surface electromyography (EMG) [<a href="#ref3">3</a>], emotion recognition from electroencephalography (EEG) [<a href="#ref4">4</a>], and pain assessment using electrodermal activity (EDA) [<a href="#ref5">5</a>]. Despite notable progress, such devices often remain expensive, require nontrivial setup, or target a single modality, limiting their utility for comprehensive day-to-day health monitoring.
</p>
<p class="zh-text">
可穿戴监测的最新进展既展示了前景，也揭示了仍然存在的不足。例如用于评估视觉功能的智能隐形眼镜、用于唾液葡萄糖检测的护齿传感器、基于表面肌电图（EMG）的疲劳检测、基于脑电图（EEG）的情绪识别，以及使用皮肤电活动（EDA）的疼痛评估。尽管取得了显著进展，但这些设备往往仍然价格昂贵、需要复杂的设置，或仅针对单一模态，限制了它们在全面日常健康监测中的实用性。
</p>

<p class="en-text">
Among candidate technologies, near-infrared spectroscopy (NIRS) has emerged as a compelling approach due to its non-invasive nature, portability, and comparatively low cost. Operating in the 700–2500 nm band, NIRS infers physiological variables—such as oxygenation and hemodynamic changes—by measuring wavelength-dependent absorption and scattering in tissue [<a href="#ref6">6</a>, <a href="#ref7">7</a>]. These characteristics make NIRS particularly suitable for integration into everyday wearables to enable real-time monitoring.
</p>
<p class="zh-text">
在候选技术中，近红外光谱（NIRS）因其无创性、便携性和相对较低的成本而成为一种引人注目的方法。NIRS 工作在 700-2500 nm 波段，通过测量组织中与波长相关的吸收和散射来推断生理变量——如氧合和血流动力学变化。这些特性使 NIRS 特别适合集成到日常可穿戴设备中以实现实时监测。
</p>

<p class="en-text">
The widespread use of photoplethysmography (PPG) further strengthens the practical feasibility of NIRS-based monitoring. For instance, Přibil et al. developed a dual-channel PPG sensor that maintains high-quality output even under radio-frequency and electromagnetic interference, transmitting data via Bluetooth Low Energy (BLE) for downstream analysis [<a href="#ref8">8</a>, <a href="#ref9">9</a>]. Murmu et al. demonstrated a deep-learning framework to reconstruct ECG waveforms from PPG, improving heart-rate estimation accuracy and enabling on-device recalibration and energy-efficient real-time operation [<a href="#ref10">10</a>]. These studies point to new avenues for multi-parameter monitoring.
</p>
<p class="zh-text">
光电容积描记（PPG）的广泛应用进一步增强了基于 NIRS 监测的实际可行性。例如，Přibil 等人开发了一种双通道 PPG 传感器，即使在射频和电磁干扰下也能保持高质量输出，通过低功耗蓝牙（BLE）传输数据供后续分析。Murmu 等人展示了一个深度学习框架，可从 PPG 重建 ECG 波形，提高心率估计精度，并实现设备端重新校准和节能的实时操作。这些研究为多参数监测指出了新的途径。
</p>

<p class="en-text">
Additional work has explored multi-wavelength and multi-parameter PPG. Cause et al. reported a five-wavelength LED/photodiode system that also records contact pressure and temperature to improve signal quality and robustness [<a href="#ref11">11</a>]. Hammour et al. proposed an in-ear, single-wavelength (880 nm) non-invasive glucose monitor that streams PPG via BLE to a computer for machine-learning-based glycemic analysis [<a href="#ref12">12</a>]. Beyond PPG, Kimoto et al. devised a wireless sensor that simultaneously acquires EMG and NIRS to predict muscular fatigue during physical activity [<a href="#ref13">13</a>], while Zang et al. built a µC/OS-III-based platform combining sEMG and peripheral oxygen saturation (SpO₂) to study the correlation between muscle fatigue and oxygenation [<a href="#ref14">14</a>]. In the clinical realm, von Aspern and colleagues demonstrated the feasibility of NIRS for noninvasive monitoring of spinal cord oxygenation, underscoring its potential for peri-operative and postoperative management [<a href="#ref15">15</a>, <a href="#ref16">16</a>].
</p>
<p class="zh-text">
其他研究探索了多波长和多参数 PPG。Cause 等人报告了一个五波长 LED/光电二极管系统，该系统还记录接触压力和温度以提高信号质量和鲁棒性。Hammour 等人提出了一种耳内单波长（880 nm）无创血糖监测仪，通过 BLE 将 PPG 数据传输到计算机进行基于机器学习的血糖分析。除了 PPG，Kimoto 等人设计了一种无线传感器，同时采集 EMG 和 NIRS 以预测体力活动期间的肌肉疲劳，而 Zang 等人构建了一个基于 µC/OS-III 的平台，结合 sEMG 和外周血氧饱和度（SpO₂）来研究肌肉疲劳与氧合之间的相关性。在临床领域，von Aspern 及其同事证明了 NIRS 用于脊髓氧合无创监测的可行性，强调了其在围手术期和术后管理中的潜力。
</p>

<p class="en-text">
Despite this progress, many available NIRS systems still employ one or two wavelengths, often below 900 nm. By contrast, multi-wavelength designs—especially those extending beyond 1000 nm—can increase penetration depth, mitigate superficial noise, and yield more stable and accurate information from deeper tissue layers [<a href="#ref17">17</a>]. This capability is critical for the next generation of high-performance health-monitoring systems.
</p>
<p class="zh-text">
尽管取得了这些进展，许多现有的 NIRS 系统仍然只使用一到两个波长，通常低于 900 nm。相比之下，多波长设计——尤其是那些延伸到 1000 nm 以上的——can 增加穿透深度，减轻表面噪声，并从更深的组织层获得更稳定和准确的信息。这种能力对于下一代高性能健康监测系统至关重要。
</p>

<p class="en-text">
Building on prior work, the LIP6 laboratory in collaboration with Hôpital Armand-Trousseau developed the SpinalMED platform for dynamic monitoring of spinal cord oxygenation using a five-wavelength (600–900 nm) NIRS device with BLE connectivity. In-vivo experiments on a porcine model produced encouraging results [<a href="#ref18">18</a>, <a href="#ref19">19</a>]. However, that system targets intraoperative monitoring, limiting its transferability to daily use, and its functionality is largely confined to PPG-NIRS. A related rehabilitation-monitoring device from the same team (LigaPC) also exhibits constraints in monitored parameters and scope of application [<a href="#ref20">20</a>].
</p>
<p class="zh-text">
在先前工作的基础上，LIP6 实验室与 Armand-Trousseau 医院合作开发了 SpinalMED 平台，使用具有 BLE 连接的五波长（600-900 nm）NIRS 设备动态监测脊髓氧合。在猪模型上的体内实验产生了令人鼓舞的结果。然而，该系统主要针对术中监测，限制了其在日常使用中的可移植性，其功能主要局限于 PPG-NIRS。来自同一团队的相关康复监测设备（LigaPC）在监测参数和应用范围方面也存在限制。
</p>

<p class="en-text">
To meet the dual needs of postoperative rehabilitation and daily health management, this dissertation proposes a system that integrates multiple bioelectrical (ExG) signals—such as EEG, EMG, electroneurography (ENG), and electrocardiography (ECG)—together with PPG-NIRS-derived physiological parameters (e.g., SpO₂, respiratory rate, and body temperature). By combining advanced sensing with intelligent data processing, the system aims to provide comprehensive, real-time health information for users and efficient monitoring tools for clinical stakeholders.
</p>
<p class="zh-text">
为了满足术后康复和日常健康管理的双重需求，本论文提出了一个系统，该系统集成了多种生物电（ExG）信号——如 EEG、EMG、神经电图（ENG）和心电图（ECG）——以及 PPG-NIRS 衍生的生理参数（如 SpO₂、呼吸率和体温）。通过将先进的传感技术与智能数据处理相结合，该系统旨在为用户提供全面的实时健康信息，并为临床利益相关者提供高效的监测工具。
</p>

# 2. Research Objectives | 研究目标

<p class="en-text">
The central objective of this dissertation is to design and implement a non-invasive health-monitoring system that integrates multimodal bioelectrical (ExG) and physiological signals to enable real-time perception and assessment of a user's health status. The system seeks to balance the light-weight, portable form factor of consumer devices with the functional richness of clinical systems, supporting continuous monitoring and real-time analytics for personalised health management and translational clinical use.
</p>
<p class="zh-text">
本论文的核心目标是设计和实现一个无创健康监测系统，该系统集成多模态生物电（ExG）和生理信号，以实现对用户健康状态的实时感知和评估。该系统力求平衡消费类设备的轻量、便携外形与临床系统的功能丰富性，支持个性化健康管理和转化临床应用的连续监测和实时分析。
</p>

<p class="en-text">
At its core, the architecture leverages NIRS to monitor key indicators such as SpO₂ while accommodating the acquisition of multiple ExG signals. The acquired data will undergo preprocessing (e.g., smoothing, denoising, and feature extraction) and be analysed using machine-learning models to infer health states and identify potential risks.
</p>
<p class="zh-text">
在其核心架构中，利用 NIRS 监测关键指标如 SpO₂，同时兼容多个 ExG 信号的采集。获取的数据将经过预处理（如平滑、去噪和特征提取），并使用机器学习模型进行分析，以推断健康状态并识别潜在风险。
</p>

<p class="en-text">
A key research focus is the coupling between bioelectrical and physiological signals. Through multimodal data fusion, the system aims to deliver personalised monitoring while enabling early detection of functional abnormalities in the nervous, cardiovascular, and musculoskeletal systems—thereby supporting proactive health management and disease prevention.
</p>
<p class="zh-text">
一个关键的研究重点是生物电信号和生理信号之间的耦合。通过多模态数据融合，该系统旨在提供个性化监测，同时实现对神经、心血管和肌肉骨骼系统功能异常的早期检测——从而支持主动的健康管理和疾病预防。
</p>

<p class="en-text">
Achieving millisecond-level responsiveness is a principal engineering challenge. Physiological measurements are susceptible to environmental noise and motion artefacts, making robust preprocessing and feature-engineering pipelines essential. To ensure both accuracy and timeliness, the system prioritises efficient, resilient signal-processing methods. Although energy consumption is an important design consideration, the primary constraints for a health-monitoring platform of this kind are acquisition accuracy and end-to-end latency. Accordingly, the system emphasises optimised sensing fidelity, transmission throughput, and response time.
</p>
<p class="zh-text">
实现毫秒级响应是一项主要的工程挑战。生理测量易受环境噪声和运动伪影的影响，因此需要鲁棒的预处理和特征工程流程。为确保准确性和及时性，系统优先采用高效、弹性的信号处理方法。尽管能耗是一个重要的设计考虑因素，但这类健康监测平台的主要约束是采集精度和端到端延迟。因此，系统强调优化的传感保真度、传输吞吐量和响应时间。
</p>

<p class="en-text">
Figure below outlines the overall system architecture, highlighting the implemented PPG-NIRS module and the ExG module slated for integration. The platform supports multi-site signal acquisition. Data processing and analysis are performed primarily on a PC host, including filtering, curve-fitting/smoothing, and deep-learning-based estimation of physiological parameters for health-state evaluation.
</p>
<p class="zh-text">
下图概述了整体系统架构，突出显示了已实现的 PPG-NIRS 模块和计划集成的 ExG 模块。该平台支持多部位信号采集。数据处理和分析主要在 PC 主机上执行，包括滤波、曲线拟合/平滑，以及基于深度学习的生理参数估计，用于健康状态评估。
</p>

<img src="/images/fig1.jpg" alt="Overview of the system architecture" loading="lazy">

<p class="en-text">
To streamline the user experience, companion software will be developed to control the system, including selection among ExG sensors and wavelength switching within the PPG-NIRS module.
</p>
<p class="zh-text">
为简化用户体验，将开发配套软件来控制系统，包括在 ExG 传感器之间进行选择以及在 PPG-NIRS 模块内进行波长切换。
</p>

<p class="en-text">
Through iterative optimisation, the proposed system is expected to provide an innovative and effective approach for daily health management—enabling proactive monitoring and early warning—while also supplying clinically meaningful data to support diagnosis and rehabilitation.
</p>
<p class="zh-text">
通过迭代优化，所提出的系统有望为日常健康管理提供创新且有效的方法——实现主动监测和早期预警——同时还提供具有临床意义的数据以支持诊断和康复。
</p>

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

<span id="ref18">[18]</span> O. Tsiakaka. Contribution à la réalisation d'un dispositif multimodal pour l'imagerie de la moelle épinière. Electronique. Sorbonne Université, 2018. Français. https://theses.hal.science/tel-02266472v2.

<span id="ref19">[19]</span> S. Li. Modélisation d'un implant médical intelligent dans son environnement pour le monitorage fonctionnel de la moelle épinière. Ingénierie biomédicale. Sorbonne Université, 2022. Français. https://theses.hal.science/tel-04028226.

<span id="ref20">[20]</span> I. Saliba et al. A Review of Chronic Lateral Ankle Instability and Emerging Alternative Outcome Monitoring Tools in Patients following Ankle Ligament Reconstruction Surgery. J. Clin. Med. 2024, 13, 442. DOI : 10.3390/jcm13020442.
