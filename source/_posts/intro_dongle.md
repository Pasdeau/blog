---
title: "Quick Start Guide: nRF52840 Dongle Firmware Development"
date: 2025-10-22
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Technical Share
  - Embedded Systems
tags:
  - nRF52840
  - Zephyr
  - BLE
  - Firmware
description: A concise guide to compiling and flashing firmware for the nRF52840 Dongle on macOS using nRF Connect SDK, including nrfutil usage and DFU mode details.
---

The **nRF52840 Dongle (PCA10059)** is a cost-effective USB development board perfect for prototyping BLE, Zigbee, and Thread applications. Since it **does not feature an onboard J-Link debugger**, the development workflow differs slightly from standard Nordic Development Kits (DKs).

This guide outlines the standard workflow based on **macOS** and the **nRF Connect SDK (NCS)**: **Build -> Generate DFU Package -> USB Flashing**.

---

## 1. Environment Preparation

### Essential Tools
1.  **nRF Connect for Desktop**: [Download from Nordic Official Site](https://www.nordicsemi.com/Products/Development-tools/nrf-connect-for-desktop). After installation, it is recommended to add the **Programmer** and **Serial Terminal** apps.
2.  **nrfutil**: Required for packaging and flashing firmware.
    ```bash
    pip3 install nrfutil
    ```
3.  **nRF Connect SDK**: Recommended to install via the **VS Code Extension** ("nRF Connect for VS Code") for a one-click setup of the SDK and Toolchain.

---

## 2. Minimal Project Configuration (Hello World)

We will create a minimal project that supports the USB Virtual Serial Port (CDC ACM).

**`prj.conf` (Key Configuration)**
```ini
# Enable USB Stack and CDC ACM Class
CONFIG_USB_DEVICE_STACK=y
CONFIG_USB_CDC_ACM=y
# Redirect console to USB Serial
CONFIG_SERIAL=y
CONFIG_UART_CONSOLE=y
CONFIG_CONSOLE=y
CONFIG_UART_LINE_CTRL=y
# Logging Configuration
CONFIG_LOG=y
CONFIG_LOG_DEFAULT_LEVEL=3
```

**`src/main.c`**
```c
#include <zephyr/kernel.h>
#include <zephyr/usb/usb_device.h>
#include <zephyr/drivers/uart.h>
#include <zephyr/logging/log.h>

LOG_MODULE_REGISTER(main);

void main(void) {
    const struct device *dev = DEVICE_DT_GET(DT_CHOSEN(zephyr_console));
    uint32_t dtr = 0;

    if (usb_enable(NULL)) return;

    /* Wait for host to connect to serial port (DTR set) */
    while (!dtr) {
        uart_line_ctrl_get(dev, UART_LINE_CTRL_DTR, &dtr);
        k_sleep(K_MSEC(100));
    }

    int count = 0;
    while (1) {
        LOG_INF("Hello Dongle! Count: %d", count++);
        k_sleep(K_SECONDS(1));
    }
}
```

---

## 3. Build and Package

### 3.1 Build
In VS Code, add a **Build Configuration**. Select `nrf52840dongle_nrf52840` as the Board, then click **Build**.
Alternatively, use the command line:
```bash
west build -b nrf52840dongle_nrf52840
```
The build artifact is located at `build/zephyr/zephyr.hex`.

### 3.2 Generate DFU Package
The Dongle can only be updated via its Bootloader. The `.hex` file must be packaged into a `.zip` archive:
```bash
nrfutil pkg generate --hw-version 52 --sd-req 0x00 \
  --application build/zephyr/zephyr.hex \
  --application-version 1 app.zip
```

---

## 4. Enter DFU Mode and Flash

### Enter DFU Mode
1.  Press the sideways **Reset** button.
2.  Insert the Dongle into a USB port.
3.  Release the button. The **Red LED should pulse**, indicating DFU mode is active.

{% asset_img nRF52840_dongle_up.png nRF52840 Dongle Top View %}
{% asset_img nRF52840_dongle_back.png nRF52840 Dongle Bottom View %}

### Flash Firmware

1.  **Find Device Port**:
    ```bash
    ls /dev/tty.usbmodem*
    # Example Output: /dev/tty.usbmodem14201
    ```
2.  **Flash**:
    ```bash
    nrfutil dfu usb-serial -pkg app.zip -p /dev/tty.usbmodem14201
    ```
    *Note: Replace the port number in the command with the actual one observed.*

Upon successful flashing, the device will automatically reboot and run the new firmware.

---

## 5. FAQ

*   **Q: Flashing fails with `No DFU devices found`**
    *   **A**: Ensure the Red LED is pulsing (DFU mode). Verify the port number (the port in DFU mode may differ from the application runtime port).
*   **Q: No output on Serial Port**
    *   **A**: The serial tool must enable the **DTR** signal (the code waits for DTR). We recommend using the **Serial Terminal** in nRF Connect for Desktop, which handles DTR automatically.
*   **Q: `nrfutil` command not found**
    *   **A**: Ensure the Python `bin` directory is in your system `PATH`.

---

## 6. Advanced References

*   **Custom LED**: Use an `.overlay` file to modify the Device Tree.
*   **Reduce Firmware Size**: Add `CONFIG_SIZE_OPTIMIZATIONS=y` to `prj.conf`.
*   **Official Documentation**: [nRF52840 Dongle User Guide](https://infocenter.nordicsemi.com/topic/ug_nrf52840_dongle/UG/nrf52840_Dongle/intro.html)
