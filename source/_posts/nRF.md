---
title: Getting Started with nRF5340 DK
date: 2025-10-15
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Technical Share
  - Embedded Systems
tags:
  - nRF5340
  - Zephyr
  - DevKit
description: A comprehensive guide to configuring and configuring the nRF5340 DK (PCA10095) for local development, differentiating between the application and network cores.
---

# Introduction to the nRF5340 DK

The **nRF5340 DK (PCA10095)** is the premier single-board development kit for evaluating Nordic Semiconductor’s flagship nRF5340 System-on-Chip (SoC).

The **nRF5340** is the world's first wireless SoC with two Arm® Cortex®-M33 processors:
1.  **Application Core (High Performance)**:
    *   Arm Cortex-M33F running at up to 128 MHz.
    *   Features DSP instructions, FPU, and Armv8-M TrustZone®.
    *   Full feature set for complex application logic.
2.  **Network Core (High Efficiency)**:
    *   Arm Cortex-M33 running at a fixed 64 MHz.
    *   Optimized for low-power wireless protocol handling (BLE, Thread, Zigbee).

> **Important**: For general application development, you will primarily target the Application Core using the board target `nrf5340dk/nrf5340/cpuapp`.

---

# General Preparation

To get started, ensure you have the following hardware and software stack:

### Hardware
*   **nRF5340 DK (PCA10095)** connected via Micro-USB to the **DEBUG** port (labeled **J2** on most boards, connecting to the on-board J-Link OB).

### Software
1.  **nRF Command Line Tools** (includes SEGGER J-Link drivers).
2.  **Development Toolchain**:
    *   **VS Code** (Recommended): Install the **nRF Connect for VS Code** extension pack.
    *   *Command Line*: Python 3, Git, CMake, Ninja, and the Zephyr SDK (refer to the [Zephyr Getting Started Guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html)).

---

# Development in VS Code

The VS Code extension provides the most streamlined workflow.

1.  **Setup Toolchain**:
    *   Open the **nRF Connect**  sidebar.
    *   Navigate to **Toolchains / SDK management**.
    *   Follow the prompts to install the recommended **nRF Connect SDK (NCS)** version and toolchain.

2.  **Create a Project**:
    *   Click **Browse Sample** or **Create New Application**.
    *   Select `zephyr/samples/basic/blinky` for a quick test.

3.  **Configure Build**:
    *   Click **Add Build Configuration**.
    *   **Board Target**: Select `nrf5340dk/nrf5340/cpuapp`.
    *   *Tip*: Ensure you don't select `cpunet` unless you are specifically developing low-level radio firmware.

4.  **Flash and Run**:
    *   Connect your DK.
    *   Select the device in the **Connected Devices** panel.
    *   Click **Flash**.
    *   Observe **LED1** blinking on the board.

For more details, consult the [official nRF Connect for VS Code documentation](https://docs.nordicsemi.com/bundle/nrf-connect-vscode/page/index.html).

---

# Verification & Troubleshooting

## Verifying the Setup
The `blinky` sample uses Zephyr's device tree to automatically map the logical LED alias to the physical **LED1** pin. No manual pin configuration is needed.
*   To change the blink rate, modify `SLEEP_TIME_MS` in `src/main.c` and re-flash.

## Common Issues (FAQ)

### 1. Board not detected
*   **Check connection**: Ensure the cable is in the **DEBUG** port, not the nRF USB port.
*   **Drivers**: Reinstall nRF Command Line Tools / J-Link drivers.
*   **Permissions (Linux)**: Verify `udev` rules are set up correctly.

### 2. Compilation fails / missing toolchain
*   Use the **Toolchains / SDK management** UI in VS Code to repair the installation. Ensure the toolchain version matches the SDK version.

### 3. LED not blinking
*   **Wrong Core**: Did you build for `nrf5340dk/nrf5340/cpunet`? The network core cannot directly control LED1 in standard configurations. Switch to `.../cpuapp`.

### 4. Identifying Serial Ports
When connected, multiple serial ports appear (e.g., `/dev/tty.usbmodem...` on macOS).
*   Run `ls /dev/tty.*` in the terminal.
*   If you see suffixes like `1` and `3`:
    *   **`3`** typically maps to the **Application Core** UART.
    *   **`1`** typically maps to the **Network Core** UART.

---

# Useful References

*   **nRF Connect SDK Installation**: [Docs](https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/installation/install_ncs.html)
*   **Zephyr Getting Started**: [Docs](https://docs.zephyrproject.org/latest/develop/getting_started/index.html)
*   **nRF Command Line Tools**: [Docs](https://docs.nordicsemi.com/bundle/ug_nrf_cltools/page/UG/cltools/nrf_installation.html)
*   **System Source Code (Latest)**: [GitHub Repository](https://github.com/Pasdeau/Sys_collect)
