---
title: User Guide of nRF5340 DK
date: 2025-10-15
mathjax: false
description: Building upon the two officially recommended workflows, this chapter details, from first principles, how to configure and use the nRF5340 DK on a local workstation. The Nordic nRF Connect SDK (NCS), built on Zephyr, is the preferred toolchain; for most projects, the official guidance is to build within the nRF Connect for VS Code extension.
---

# Introduction to the nRF5340 DK

The nRF5340 DK (PCA10095) is a single-board development kit intended for evaluation and application development on Nordic’s nRF5340 System-on-Chip (SoC).  
The nRF5340 is a dual-core SoC based on the Arm® Cortex®-M33 architecture, comprising:

- a full-featured Arm Cortex-M33F core with DSP instructions, FPU, and the Armv8-M Security Extension, operating at up to 128 MHz, hereafter the **application core**; and
    
- a secondary Arm Cortex-M33 core with a reduced feature set, operating at a fixed 64 MHz, hereafter the **network core**.

For this board, the appropriate CMake/Zephyr board target in the project is `nrf5340dk_nrf5340_cpuapp`, i.e., the application core of the DK.

---

# General Preparation

- An **nRF5340 DK (PCA10095)** connected via USB to the **DEBUG** port (on-board J-Link OB).
    
- **SEGGER J-Link drivers / nRF Command Line Tools**.

- If using a command-line workflow: install **Python 3, Git, CMake, Ninja**, and an appropriate cross-compiler (Zephyr SDK or GNU Arm Embedded). The [Zephyr Getting Started Guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html) provides detailed system requirements and installation steps.

---

# Development in VS Code

1. Install **Visual Studio Code**, then add the **nRF Connect for VS Code** extension pack.
    
2. In VS Code, open the left-hand **nRF Connect** view → **Toolchains / SDK management** and, following the guided prompts, install the desired **NCS version** together with a **matching toolchain**.
    
3. Via **nRF Connect → Browse Sample**, open `zephyr/samples/basic/blinky`. Choose **Add Build Configuration**, then in **Board target** select `nrf5340dk/nrf5340/cpuapp/ns`. For the first build configuration, pick a compatible board target from the drop-down list.
    
4. Connect the DK over USB (DEBUG port). In the extension panel, select the detected device and **Flash**. Then LED1 should begin blinking.

For a comprehensive walkthrough, consult the [official documentation](https://docs.nordicsemi.com/bundle/nrf-connect-vscode/page/index.html).

---

# Verification

- The `blinky` sample relies on Zephyr’s **devicetree plus GPIO/LED drivers**. Once the board target is selected, the LED mapping to **LED1** is resolved automatically—no manual pin configuration is required. After flashing, LED1 blinks with a fixed period.
    
- To adjust the blink period, edit `SLEEP_TIME_MS` in `samples/basic/blinky/src/main.c`.

---

# Frequently Asked Questions (FAQ)

- **Flashing fails / board not detected**: Verify the USB cable is connected to the **DEBUG** port and that J-Link drivers are installed. On Linux, check udev permissions; on Windows, confirm the device appears as a J-Link adapter in Device Manager.
    
- **Toolchain or dependency missing**: Use **Toolchains / SDK management** in the extension to install or bind the correct versions.
    
- **Accidentally built for the network core or LED does not blink**: Confirm the **Board** is set to `nrf5340dk_nrf5340_cpuapp` (application core).

---

# Useful References

- NCS: Installing the nRF Connect SDK. ([nRF Connect SDK](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/installation/install_ncs.html?utm_source=chatgpt.com "Installing the nRF Connect SDK - Technical Documentation"))
    
- Zephyr: Getting Started. [Zephyr Getting Started Guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html)
    
- nRF Command Line Tools (`nrfjprog`): installation guide and macOS Homebrew. ([nRF Command Line Tools](https://docs.nordicsemi.com/bundle/ug_nrf_cltools/page/UG/cltools/nrf_installation.html?utm_source=chatgpt.com "Installing the nRF Command Line Tools"))
    
- System source code, **September 2025 edition [latest]**: [GitHub](https://github.com/Pasdeau/Sys_collect)
