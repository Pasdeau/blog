---
title: Posts
layout: page
comments: false
---

<div class="topic-nav-pills" aria-label="Post display mode">
<a href="#topics" class="topic-nav-pill" data-post-view="topics"><i class="fa fa-layer-group"></i> By Topic</a>
<a href="#timeline" class="topic-nav-pill" data-post-view="timeline"><i class="fa fa-clock"></i> All Posts by Date</a>
</div>

<div id="topics" class="topic-groups">
<div class="topic-category-section">
<h2 class="topic-category-header" id="optics">
<a href="#optics" class="topic-category-link"><i class="fa fa-lightbulb"></i> Biomedical Optics <span class="badge">5</span></a>
</h2>
<div class="topic-series-header" id="optics-mop-mcml"><a class="topic-series-link" href="#optics-mop-mcml">MOP-MCML Simulator Evolution</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-09-09</span>
<a class="topic-post-title" href="/2025/09/09/optics/MOP_MCML/">MOP-MCML: A User Guide and Technical Introduction</a>
</div>
<div class="topic-post-task"><strong>Forward MCML lacks detected path awareness:</strong> Simulates photon migration through multilayer tissue and maps detected mean optical path (MOP) distributions for custom probe geometries.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/MOP-MCML/">#MOP-MCML</a><a class="topic-tag-pill" href="/tags/Optical-Simulation/">#Optical Simulation</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2026-03-05</span>
<a class="topic-post-title" href="/2026/03/05/optics/mop_mcml_3d/">MOP-MCML 3D: Volumetric Optical Path Mapping</a>
</div>
<div class="topic-post-task"><strong>2D cylindrical symmetry cannot represent 3D anatomy:</strong> Upgrades photon tracking to a 3D Cartesian voxel grid for volumetric visualization.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/MOP-MCML/">#MOP-MCML</a><a class="topic-tag-pill" href="/tags/Optical-Simulation/">#Optical Simulation</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-16</span>
<a class="topic-post-title" href="/2025/12/16/optics/mop_mcml_gpu/">MOP-MCML GPU: 175x Faster 2D Simulation</a>
</div>
<div class="topic-post-task"><strong>CPU Monte Carlo takes hours for multi-layer parameter sweeps:</strong> Accelerates light transport by 175&times; on NVIDIA A100 via CUDA batch simulation.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/MOP-MCML/">#MOP-MCML</a><a class="topic-tag-pill" href="/tags/CUDA/">#CUDA</a></span>
</li>
</ul>

<div class="topic-series-header" id="optics-measurement"><a class="topic-series-link" href="#optics-measurement">Optical Property Measurement &amp; Validation</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-11-23</span>
<a class="topic-post-title" href="/2025/11/23/optics/Phantom_test/">Phantom Validation of MOP-MCML</a>
</div>
<div class="topic-post-task"><strong>Simulation models require experimental grounding:</strong> Validates MOP-MCML depth profiles against calibrated solid silicone and liquid intralipid phantoms.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/IAD/">#IAD</a><a class="topic-tag-pill" href="/tags/MOP-MCML/">#MOP-MCML</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-08-23</span>
<a class="topic-post-title" href="/2025/08/23/optics/IAD and MCML/">Introduction to Inverse Adding-Doubling (IAD)</a>
</div>
<div class="topic-post-task"><strong>Direct measurement cannot isolate absorption and scattering:</strong> Inverts integrating sphere reflectance and transmittance into intrinsic optical properties.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/IAD/">#IAD</a><a class="topic-tag-pill" href="/tags/Optical-Simulation/">#Optical Simulation</a></span>
</li>
</ul>
</div>

<div class="topic-category-section">
<h2 class="topic-category-header" id="biosignal">
<a href="#biosignal" class="topic-category-link"><i class="fa fa-heartbeat"></i> Biosignal Processing <span class="badge">10</span></a>
</h2>
<div class="topic-series-header" id="biosignal-ppg"><a class="topic-series-link" href="#biosignal-ppg">PPG Signal Modeling &amp; Deep Learning</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-26</span>
<a class="topic-post-title" href="/2025/12/26/ppg/Final_Model_Architecture/">PPG Signal Analysis: Dual-Stream Architecture</a>
</div>
<div class="topic-post-task"><strong>Shared-backbone models suffer negative transfer between tasks:</strong> Decouples morphological classification from temporal pulse boundary localization with dual ResNet-UNet streams.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PPG/">#PPG</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-24</span>
<a class="topic-post-title" href="/2025/12/24/ppg/PPGmodel_Evolution/">PPG Signal Analysis: Time-Frequency &amp; Attention</a>
</div>
<div class="topic-post-task"><strong>Time-domain 1D CNNs fail under severe motion artifacts:</strong> Combines Continuous Wavelet Transform (CWT) scalograms with SE-Attention for robust pulse segmentation.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PPG/">#PPG</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-22</span>
<a class="topic-post-title" href="/2025/12/22/ppg/Classification_vs_Localization/">PPG Signal Analysis: The Dilemma of Task Conflict</a>
</div>
<div class="topic-post-task"><strong>Classification requires translation invariance while boundary detection requires equivariance:</strong> Analyzes the fundamental architectural dilemma in deep networks.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PPG/">#PPG</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-21</span>
<a class="topic-post-title" href="/2025/12/21/ppg/Matlab_to_Python/">PPG Signal Generation: From MATLAB to Python</a>
</div>
<div class="topic-post-task"><strong>MATLAB file I/O creates neural network training bottlenecks:</strong> Migrates synthetic PPG pulse generation to high-throughput native Python/NumPy data pipelines.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PPG/">#PPG</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-07-15</span>
<a class="topic-post-title" href="/2025/07/15/misc/Algorithm explanation/">ECG and PPG Signal Simulation in MATLAB</a>
</div>
<div class="topic-post-task"><strong>Machine learning models need diverse labeled training data:</strong> Simulates customizable multi-channel ECG/PPG with configurable baseline wander and motion artifacts.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PPG/">#PPG</a><a class="topic-tag-pill" href="/tags/ECG/">#ECG</a></span>
</li>
</ul>

<div class="topic-series-header" id="biosignal-emg"><a class="topic-series-link" href="#biosignal-emg">EMG Gesture Recognition Series</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-28</span>
<a class="topic-post-title" href="/2025/12/28/exg/emg_cross_subject/">EMG Gesture Recognition Across Subjects</a>
</div>
<div class="topic-post-task"><strong>Anatomical differences between subjects cause distribution shifts:</strong> Combines universal pre-trained representations with rapid few-shot calibration.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/EMG/">#EMG</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-26</span>
<a class="topic-post-title" href="/2025/12/26/exg/emg_cross_day/">EMG Gesture Recognition: Robustness Research</a>
</div>
<div class="topic-post-task"><strong>Electrode repositioning across days degrades classification accuracy:</strong> Employs causal filtering and spatial rotation augmentation to maintain cross-day robustness.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/EMG/">#EMG</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-25</span>
<a class="topic-post-title" href="/2025/12/25/exg/emg_intra_day/">EMG Gesture Recognition: Intra-Baseline</a>
</div>
<div class="topic-post-task"><strong>Setting an ideal benchmark for multi-channel surface EMG:</strong> Evaluates TCN temporal convolutions under ideal single-session conditions.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/EMG/">#EMG</a></span>
</li>
</ul>

<div class="topic-series-header" id="biosignal-neural"><a class="topic-series-link" href="#biosignal-neural">Neural Electrophysiology &amp; Clinical Data</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-23</span>
<a class="topic-post-title" href="/2025/12/23/exg/eng_noise_detection/">Solving Low SNR in ENG Signals</a>
</div>
<div class="topic-post-task"><strong>Extreme noise and missing ground truth in electroneurography:</strong> Simulates compound action potentials with physics-driven Gaussian difference models.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/ENG/">#ENG</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-06-29</span>
<a class="topic-post-title" href="/2025/06/29/misc/Datasets on PhysioNet/">Curated Physiological Datasets on PhysioNet</a>
</div>
<div class="topic-post-task"><strong>Finding high-quality clinical benchmark data:</strong> Navigates open-access PhysioNet databases for validating cardiac, respiratory, and blood pressure algorithms.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PPG/">#PPG</a><a class="topic-tag-pill" href="/tags/ECG/">#ECG</a></span>
</li>
</ul>
</div>

<div class="topic-category-section">
<h2 class="topic-category-header" id="embedded">
<a href="#embedded" class="topic-category-link"><i class="fa fa-microchip"></i> Embedded Systems <span class="badge">5</span></a>
</h2>
<div class="topic-series-header" id="embedded-nordic"><a class="topic-series-link" href="#embedded-nordic">Nordic Wireless Development</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2026-01-24</span>
<a class="topic-post-title" href="/2026/01/24/embedded/nrf5340_ble_issue/">Solving nRF5340 BLE Failure After Erase</a>
</div>
<div class="topic-post-task"><strong>BLE fails to advertise after a full erase:</strong> Explains the missing network-core firmware and how to restore it with VS Code or the command line.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/nRF5340/">#nRF5340</a><a class="topic-tag-pill" href="/tags/BLE/">#BLE</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-10-22</span>
<a class="topic-post-title" href="/2025/10/22/embedded/intro_dongle/">nRF52840 Dongle Firmware Quick Start</a>
</div>
<div class="topic-post-task"><strong>Deploying custom BLE firmware without a J-Link debugger:</strong> Compiles and flashes DFU packages directly over USB using nrfutil.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/nRF52840/">#nRF52840</a><a class="topic-tag-pill" href="/tags/BLE/">#BLE</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-10-15</span>
<a class="topic-post-title" href="/2025/10/15/embedded/nRF/">Getting Started with nRF5340 DK</a>
</div>
<div class="topic-post-task"><strong>Dual-core Cortex-M33 architecture makes project setup tricky:</strong> Configures Zephyr/NCS build targets, domain separation, and hardware peripherals.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/nRF5340/">#nRF5340</a><a class="topic-tag-pill" href="/tags/BLE/">#BLE</a></span>
</li>
</ul>

<div class="topic-series-header" id="embedded-robotics"><a class="topic-series-link" href="#embedded-robotics">Robotics &amp; Actuation</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2026-07-25</span>
<a class="topic-post-title" href="/2026/07/25/embedded/drv8825_nema17_guide/">Arduino UNO + DRV8825: NEMA 17 Motor Control</a>
</div>
<div class="topic-post-task"><strong>Arduino GPIO cannot drive stepper motor coils directly:</strong> Wires a DRV8825, sets the current limit and microstepping mode, and compares it with the A4988.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/Robotics/">#Robotics</a><a class="topic-tag-pill" href="/tags/Arduino/">#Arduino</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-12</span>
<a class="topic-post-title" href="/2025/12/12/embedded/amd_robot/">AMD LeRobot Challenge Development Guide</a>
</div>
<div class="topic-post-task"><strong>Building an autonomous manipulation platform:</strong> Covers teleoperation control, joint calibration, sensor data logging, and motor control for robotic arms.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/Robotics/">#Robotics</a></span>
</li>
</ul>
</div>

<div class="topic-category-section">
<h2 class="topic-category-header" id="tools">
<a href="#tools" class="topic-category-link"><i class="fa fa-wrench"></i> Tools &amp; Workflows <span class="badge">2</span></a>
</h2>
<div class="topic-series-header" id="tools-computing"><a class="topic-series-link" href="#tools-computing">Computing Infrastructure</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-12-14</span>
<a class="topic-post-title" href="/2025/12/14/optics/lip6-gpu-intro/">LIP6 GPU Cluster User Guide</a>
</div>
<div class="topic-post-task"><strong>Running high-performance simulations on shared compute nodes:</strong> Step-by-step guide for SSH access, conda environments, and Slurm batch job scheduling.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/Slurm/">#Slurm</a></span>
</li>
</ul>

<div class="topic-series-header" id="tools-site"><a class="topic-series-link" href="#tools-site">Site &amp; Workflow Tooling</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2026-03-29</span>
<a class="topic-post-title" href="/2026/03/29/misc/hexo_blog_setup/">用 Hexo 搭建个人博客</a>
</div>
<div class="topic-post-task"><strong>从零搭建现代化个人学术博客：</strong> 涵盖 Hexo 本地环境配置、GitHub 代码托管以及 Vercel 自动化持续集成与部署。</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PhD-Life/">#PhD Life</a></span>
</li>
</ul>
</div>

<div class="topic-category-section">
<h2 class="topic-category-header" id="life">
<a href="#life" class="topic-category-link"><i class="fa fa-mug-hot"></i> Life &amp; Activities <span class="badge">3</span></a>
</h2>
<div class="topic-series-header" id="life-academic"><a class="topic-series-link" href="#life-academic">Academic Milestones</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-10-10</span>
<a class="topic-post-title" href="/2025/10/10/misc/portrait/">Interview at LIP6 Laboratory</a>
</div>
<div class="topic-post-task"><strong>Reflecting on interdisciplinary doctoral research:</strong> Describes work on biomedical sensors and optics at Sorbonne University's LIP6 laboratory.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PhD-Life/">#PhD Life</a></span>
</li>
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2025-07-12</span>
<a class="topic-post-title" href="/2025/07/12/misc/News_award/">Received Two IEEE Best Student Paper Awards</a>
</div>
<div class="topic-post-task"><strong>Two IEEE Best Student Paper Awards:</strong> Recounts conference experiences and research recognition at IEEE PRIME and BioCAS.</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/PhD-Life/">#PhD Life</a></span>
</li>
</ul>

<div class="topic-series-header" id="life-leisure"><a class="topic-series-link" href="#life-leisure">Leisure</a></div>
<ul class="topic-post-list">
<li class="topic-post-item">
<div class="topic-post-main">
<span class="topic-post-date">2026-02-08</span>
<a class="topic-post-title" href="/2026/02/08/misc/cheese/">奶酪大盗保姆级教程</a>
</div>
<div class="topic-post-task"><strong>聚会桌游快速开局指引：</strong> 《奶酪大盗》4–8 人局规则梳理、主持流程拆解与全套语音音频配套指引。</div>
<span class="topic-post-tags"><a class="topic-tag-pill" href="/tags/Board-Games/">#Board Games</a></span>
</li>
</ul>
</div>
</div>

<section id="timeline" class="topic-timeline" hidden aria-label="All posts by date">
<h2 class="topic-category-header"><i class="fa fa-clock"></i> All Posts by Date</h2>
<ul class="topic-post-list"></ul>
</section>

<script src="/js/posts-view.js" defer></script>
