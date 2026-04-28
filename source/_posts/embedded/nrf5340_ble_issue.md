---
title: "Solving nRF5340 BLE Failure After Erase"
date: 2026-01-24
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Embedded Systems
  - Troubleshooting
tags:
  - nRF5340
  - BLE
  - NCS
  - Dual-Core
description: An in-depth analysis of why BLE fails on the nRF5340 DK after a "Recover" or "Erase All" operation, along with engineering-grade solutions using VS Code and the command line.
---

# 1. Background

When working with the nRF5340 DK (PCA10095) for the first time, developers often encounter a situation where the Network Core is locked by **Readback Protection**. To unlock the device or clean the development environment, it is common to use the **"Recover"** or **"Erase All"** operation via the Programmer in nRF Connect for Desktop.

However, after performing these "full erase" operations and flashing a BLE project (such as `peripheral_uart`), many developers find that **BLE functionality fails completely** (no advertising, no connection). Surprisingly, the exact same firmware works perfectly on another "fresh" board that hasn't been erased.

This article analyzes the root cause of this phenomenon based on the nRF5340's dual-core architecture and provides standard engineering solutions.

## Environment
- **Hardware**: nRF5340 DK (PCA10095)
- **SDK**: nRF Connect SDK (NCS) v2.9.1
- **IDE**: [nRF Connect Extension for VS Code](https://docs.nordicsemi.com/bundle/nrf-connect-vscode/page/index.html) and [nRF Connect for Desktop](https://www.nordicsemi.com/Products/Development-tools/nRF-Connect-for-Desktop)

---

# 2. Reproduction & Root Cause Analysis

## 2.1 The Symptoms
1. Execute **Recover** or **Erase All** using the Programmer. This action erases the Flash of both the **Application Core (App Core)** and the **Network Core (Net Core)**.
2. Click **Flash** in VS Code to program a project containing BLE functionality.
3. After flashing, the logs indicate that the App Core is running normally, but BLE fails to initialize or broadcast.
4. Inspecting the Net Core Flash reveals that it remains empty, missing the BLE Controller firmware.

## 2.2 The Root Cause: The Forgotten Network Core
The nRF5340 is a dual-core SoC:
- **Application Core**: Runs user application code and the BLE Host stack.
- **Network Core**: Dedicated to running low-level radio protocols (e.g., BLE Controller).

In the standard build process of NCS, when compiling a BLE project (like `peripheral_hbs`), the generated `merged.hex` usually **only contains firmware for the App Core**.

When clicking "Flash" in the nRF Connect Extension for VS Code, the default behavior is often to **flash only the App Core**.
- **Result**: `Start Application` -> `BLE Host` -> `HCI Open` -> **(Empty Net Core)** -> `Timeout/Error`.

Before executing "Erase All", the board ships from the factory with the BLE Controller pre-programmed on the Net Core, so flashing just the App Core works fine. However, once "Erase All" is performed, the Net Core's Controller is wiped. If it is not explicitly re-flashed, the BLE functionality will inevitably fail.

---

# 3. Solutions

To resolve this, we must ensure that the **BLE Controller firmware for the Net Core is strictly rebuilt and flashed** after a full erase. Two methods are provided below.

## Method 1: Using VS Code (Recommended)
This method fits seamlessly into the IDE workflow without requiring complex commands.

1. **Add Build Configuration for Net Core**:
   - In the **Applications** view of VS Code, click `Add Build Configuration`.
   - **Board**: `nrf5340dk/nrf5340/cpunet` (Note: select the Net Core via `/cpunet`).
   - **Sample**: Select `zephyr/samples/bluetooth/hci_rpmsg` (This is the standard BLE Controller firmware).
   - Click **Build Configuration**.

2. **Recovery Workflow**:
   - **Step 1**: Select the `hci_rpmsg` configuration you just created and click **Flash**. This revives the Net Core.
   - **Step 2**: Select your own application configuration (App Core) and click **Flash**. This deploys your business logic.

From this point on, as long as "Erase All" is not performed again, you only need to repeat Step 2 to debug your application code.

## Method 2: Using Command Line (CLI)
Suitable for CI/CD environments or developers who prefer the command line.

```bash
# 1. Build and Flash Net Core Controller
west build -b nrf5340dk/nrf5340/cpunet zephyr/samples/bluetooth/hci_rpmsg -d build_net
west flash -d build_net --erase

# 2. Build and Flash App Core Application
west build -b nrf5340dk/nrf5340/cpuapp my_project -d build_app
west flash -d build_app --erase
```

## Alternative: Merged Flashing
If you prefer a single Hex file that can "flash both cores at once," you need to configure a Multi-image build in CMake. However, this typically increases build time. for the debugging phase, the step-by-step flashing method described above is recommended.

---

# 4. Summary & Recommendations

The dual-core architecture of the nRF5340 brings flexibility but also changes our traditional understanding of "flashing."

**Core Principles**:
- **Recover/Erase All = Wipes Both Cores**.
- **BLE Functionality = App Core (Host) + Net Core (Controller)**.
- **Never Forget the Net Core**: When your BLE fails to run for no apparent reason, ask yourself: "Is there anything on the Net Core?"

It is recommended to keep the `hci_rpmsg` build configuration available in your VS Code workspace so that you can perform "CPR" on your board whenever needed.
