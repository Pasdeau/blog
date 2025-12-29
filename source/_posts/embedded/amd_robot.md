---
title: AMD LeRobot Challenge Development Guide
date: 2025-12-12
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Competitions
  - Robotics
tags:
  - LeRobot
  - AMD
  - Robotics
  - Python
description: A comprehensive development guide for the AMD LeRobot Challenge, covering environment setup, robot calibration, teleoperation, dataset recording, and hardware maintenance.
---

This document records the complete workflow for robot development using the AMD LeRobot platform, prepared for the [AMD Robotics Hackathon](https://amdroboticshackathon.datamonsters.com). It covers everything from environment setup, dual-arm robot (Leader-Follower) calibration, and teleoperation configuration, to dataset recording and uploading. I also document my experience with hardware maintenance, specifically replacing damaged motors.

## 1. Environment Configuration

### 1.1 Installing LeRobot

First, clone the LeRobot repository from GitHub and install the dependencies.

```bash
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -U pip
pip install -e .
```

### 1.2 Port Identification

After connecting the robots, you need to identify the serial ports corresponding to the Leader and the Follower.

```bash
ls /dev/tty.*
```

Distinguish them by device ID:
- **Leader**: `/dev/tty.usbmodem5AE60848661`
- **Follower**: `/dev/tty.usbmodem5AE60570611`

> **Note**: The IDs above are examples. Please refer to the `ls` command output for your actual device IDs.

## 2. Robot Calibration

Before performing any operations, the robotic arms must be calibrated.

### 2.1 Calibrating the Leader
```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/tty.usbmodem5AE60848661 \
  --teleop.id=so101_leader_mac
```

### 2.2 Calibrating the Follower
```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AE60570611 \
  --robot.id=so101_follower_mac
```

## 3. Teleoperation

Teleoperation is a core feature of LeRobot, allowing you to control the Follower via the Leader.

### 3.1 No Display Mode
Suitable for low-latency operations where real-time video feedback is not required.

```bash
lerobot-teleoperate \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AE60570611 \
  --robot.id=so101_follower_mac \
  --teleop.type=so101_leader \
  --teleop.port=/dev/tty.usbmodem5AE60848661 \
  --teleop.id=so101_leader_mac \
  --fps=30 \
  --display_data=false
```

### 3.2 With UI Display
Enables the UI interface to facilitate observation of joint states.

```bash
lerobot-teleoperate \
  ... (same as above) ...
  --fps=60 \
  --display_data=true
```

### 3.3 Multi-Camera Configuration

For Visual Imitation Learning, multiple cameras need to be configured.

#### Step 1: Confirm Camera Indices
Use the following Python script to iterate through and display all available cameras, noting the index ID for different views.

```python
import cv2

for idx in range(6):
    cap = cv2.VideoCapture(idx)
    if not cap.isOpened():
        continue
    print(f"Displaying camera index {idx}. Press 'q' to exit and switch to the next one.")
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        cv2.imshow(f"Camera {idx}", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
```

**Typical Configuration**:
- `index_0`: Side View, 30fps
- `index_1`: Top View, 25fps
- `index_2`: Arm View, 30fps

> Tip: You can also use the `lerobot-find-cameras opencv` command to find cameras.

#### Step 2: Teleoperation with Cameras
Specify the path and resolution for each camera in the configuration parameters.

```bash
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AE60570611 \
    --robot.id=so101_follower_mac \
    --robot.cameras="{side: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 30}, arm: {type: opencv, index_or_path: 2, width: 1920, height: 1080, fps: 30}, top: {type: opencv, index_or_path: 1, width: 1920, height: 1080, fps: 24}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AE60848661 \
    --teleop.id=so101_leader_mac \
    --display_data=false
```

## 4. Record Dataset

### 4.1 Hugging Face Authentication
To upload datasets, you first need to log in to Hugging Face.

```bash
# Login (Token required)
huggingface-cli login --token hf_YOUR_TOKEN_HERE --add-to-git-credential

# Get username
HF_USER=$(huggingface-cli whoami | head -n 1)
```

### 4.2 Recording Process

**Test Recording (No Upload)**:
Record a small amount of data (e.g., 3 episodes) to verify system stability.

```bash
lerobot-record \
    ... (robot config) ...
    --dataset.repo_id=cfu/record_test_ball_002 \
    --dataset.num_episodes=30 \
    --dataset.single_task="pickup a red ball" \
    --dataset.push_to_hub=false
```

**Formal Recording (With Upload)**:
Record 100 episodes and upload automatically.

```bash
lerobot-record \
  ... (robot and camera config) ...
  --display_data=true \
  --dataset.repo_id=${HF_USER}/so101_catch_red_ball \
  --dataset.single_task="catch a red ball" \
  --dataset.num_episodes=100 \
  --dataset.push_to_hub=true
```

**Operation Shortcuts**:
- `->` (Right Arrow): Save current episode and start the next one
- `<-` (Left Arrow): Discard current episode and re-record
- `ESC`: Exit recording

### 4.3 Dataset Management

**Merge Datasets**:
```bash
lerobot-edit-dataset \
  --repo_id "cfu/record_test_ball" \
  --operation.type merge \
  --operation.repo_ids "['cfu/record_test_ball_001', 'cfu/record_test_ball_002']"
```

**Manual Upload**:
```bash
hf repo create "cfu/record_test_ball" --repo-type dataset --exist-ok

hf upload-large-folder "cfu/record_test_ball" \
  --repo-type dataset \
  "$LEROBOT_HOME/cfu/record_test_ball" \
  --num-workers 8
```

## 5. Hardware Maintenance: Replacing Motors and Resetting IDs

During a mishap, the #4 motor of the Follower was damaged. After replacing it with a new motor, the new motor's ID defaults to 1 and needs to be changed to 4 to be correctly identified by the system.

### 5.1 Check Motor ID
Use the following script to scan for motors on the bus.

```python
from scservo_sdk import PortHandler, PacketHandler, COMM_SUCCESS

PORT = "/dev/tty.usbmodem5AE60570611" # Change to your port
baud_candidates = [1000000, 500000, 250000, 115200]

for baud in baud_candidates:
    port = PortHandler(PORT)
    if not port.openPort(): break
    if not port.setBaudRate(baud): port.closePort(); continue

    packet = PacketHandler(0)
    print(f"Scanning at {baud}...")
    
    for sid in range(31):
        model, res, err = packet.ping(port, sid)
        if res == COMM_SUCCESS:
            print(f"Found servo: ID={sid}, Baud={baud}")
            
    port.closePort()
```

### 5.2 Modify Motor ID
Complete script to change ID from 1 to 4:

```python
from scservo_sdk import PortHandler, PacketHandler, COMM_SUCCESS

PORT     = "/dev/tty.usbmodem5AE60570611"
BAUDRATE = 1000000
OLD_ID   = 1    # Current ID
NEW_ID   = 4    # Target ID

# Register Addresses (STS3215)
ADDR_ID   = 0x05
ADDR_LOCK = 0x37

port = PortHandler(PORT)
port.openPort()
port.setBaudRate(BAUDRATE)
packet = PacketHandler(0)

# 1. Unlock EEPROM
packet.write1ByteTxRx(port, OLD_ID, ADDR_LOCK, 0)
print("Unlocked")

# 2. Write New ID
packet.write1ByteTxRx(port, OLD_ID, ADDR_ID, NEW_ID)
print(f"Changed ID from {OLD_ID} to {NEW_ID}")

# 3. Verify
model, res, _ = packet.ping(port, NEW_ID)
if res == COMM_SUCCESS:
    print(f"Success! New ID is {NEW_ID}")

# 4. Lock
packet.write1ByteTxRx(port, NEW_ID, ADDR_LOCK, 1)
port.closePort()
```

With these steps complete, we have covered everything from software environment setup to hardware maintenance, allowing us to focus on the development of robot control algorithms.
