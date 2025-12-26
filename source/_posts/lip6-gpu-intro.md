---
title: LIP6 GPU Cluster User Guide
date: 2025-12-14
comments: true
lang: en
mathjax: false
toc: true
categories:
  - Lab Guides
tags:
  - HPC
  - GPU
  - SSH
  - Slurm
description: A comprehensive guide for LIP6 lab members on accessing and utilizing the GPU cluster, covering SSH connections, environment setup, and Slurm job submission.
---

This guide aims to provide new members of the LIP6 laboratory with a concise overview of how to connect to and utilize the lab's computing resources (CPU cluster and GPU cluster). Whether you are accessing from the internal network or an external network, this document covers the necessary configuration steps.

> **References**
> - [LIP6 Official Documentation](https://front.convergence.lip6.fr) (Intranet access only)
> - [LIP6 Cluster Documentation](https://cluster.lip6.fr/doc/big_en.html)
> - [Guide by Dr. Giasemis](https://fotisgiasemis.com/blog/lip6-cluster-usage/)

## 1. Credentials Preparation

Before starting, ensure you have the following credentials:
- **LIP6 Username**
- **Secure Password**: This is the password for logging into the lab's Linux systems and computing resources, which is different from your email password. If you need a reset, please contact the system administrator (e.g., Manuel Bouyer).

## 2. Connecting to the Cluster

The connection method varies slightly depending on your network environment.

### 2.1 From Internal Network

If you are already connected to the LIP6 wired network or Wi-Fi (LIP6-dot1x), you can connect via SSH directly.

#### Connect to CPU Cluster
Used for data preprocessing, scripting, and lightweight calculations.
```bash
ssh your_username@cluster.lip6.fr
```

#### Connect to GPU Cluster Front-end
Used for submitting GPU jobs and managing environments. **Note: The front-end node is NOT for running computational tasks.**
```bash
ssh your_username@front.convergence.lip6.fr
```

### 2.2 From External Network

Outside the lab, you need to connect via a **Gateway** (Jump Host). Different research groups might use different gateways:
- **SYEL / CIAN Groups**: Typically use `barder.lip6.fr` or `ducas.lip6.fr`.
- **Other Groups**: Please consult your supervisor or admin. The general gateway is usually `ssh.lip6.fr`.

*The following examples assume `barder.lip6.fr`.*

#### Method A: SSH Jump (Recommended)

Directly use the `-J` flag to specify the gateway:

```bash
# Connect to CPU Cluster
ssh -J your_username@barder.lip6.fr your_username@cluster.lip6.fr

# Connect to GPU Cluster Front-end
ssh -J your_username@barder.lip6.fr your_username@front.convergence.lip6.fr
```

You will need to enter your password twice (once for the gateway, once for the target).

#### Method B: SSH Config (Efficient)

To avoid typing long commands every time, it is recommended to configure your `~/.ssh/config` file. Edit (or create) this file on your local machine:

```ssh
# Define Gateway
Host lip6-gateway
    HostName barder.lip6.fr
    User your_username
    ForwardAgent yes

# Define CPU Cluster
Host lip6-cluster
    HostName cluster.lip6.fr
    User your_username
    ProxyJump lip6-gateway

# Define GPU Cluster Front-end
Host lip6-gpu
    HostName front.convergence.lip6.fr
    User your_username
    ProxyJump lip6-gateway
```

Once configured, simply run `ssh lip6-cluster` or `ssh lip6-gpu` to connect.

### 2.3 Passwordless Login (Optional)

To skip typing passwords frequently, set up SSH key-based authentication.

1.  **Generate Key Pair** (Skip if you already have one):
    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```
2.  **Copy Public Key to Gateway and Targets**:
    ```bash
    ssh-copy-id -i ~/.ssh/id_ed25519.pub lip6-gateway
    ssh-copy-id -i ~/.ssh/id_ed25519.pub lip6-cluster
    ssh-copy-id -i ~/.ssh/id_ed25519.pub lip6-gpu
    ```

After these steps, you should be able to log in without a password.

## 3. Using the GPU Cluster (Convergence)

After logging into `front.convergence.lip6.fr`, you are on the **frontend node** of the cluster. **Never run heavy computational tasks on the frontend node**. You must use the **Slurm Workload Manager** to request compute nodes.

### 3.1 Common Slurm Commands

- `sinfo`: View partition and node states.
- `squeue`: View currently running and queued jobs.
- `squeue -u your_username`: View only your jobs.
- `scancel [job_id]`: Cancel a job.

### 3.2 Requesting GPU Resources

#### Interactive Mode
Suitable for code debugging and environment exploration.

**Option 1: Request a Shell (srun)**
Request 1 node, 1 GPU, for 30 minutes:
```bash
srun --partition=convergence --nodes=1 --gpus=1 --time=00:30:00 --pty bash -i
```

**Option 2: Two-step Allocation (salloc)**
Reserve resources first, then connect.
```bash
# 1. Allocate resources
salloc --partition=convergence --nodes=1 --gpus=1 --time=01:00:00

# 2. After allocation is granted (you are still on front, but in job context)
# Run srun to connect to the allocated node
srun --pty bash -i
```
After successful entry, the command prompt will change to `your_username@nodeXX`, indicating you now have access to that node's GPU.

#### Batch Mode
Suitable for long-running training tasks. Write a script (e.g., `job.sh`):

```bash
#!/bin/bash
#SBATCH --job-name=my_training
#SBATCH --output=logs/%x_%j.out
#SBATCH --error=logs/%x_%j.err
#SBATCH --partition=convergence
#SBATCH --nodes=1
#SBATCH --gpus=1
#SBATCH --time=24:00:00
#SBATCH --cpus-per-task=8
#SBATCH --mem=64G

# Load environment
module load cuda/11.8
source activate my_env

# Run code
python train.py
```

Submit the job:
```bash
sbatch job.sh
```

### 3.3 Hardware Overview

The LIP6 Convergence cluster consists of 1 frontend and 10 compute nodes:

<div align="center">

| Node Name | CPU | Memory | GPU Configuration |
| :---: | :---: | :---: | :---: |
| **node01** | 2× AMD EPYC 7543 | 2 TB | **4× NVIDIA A100 80GB (SXM)** |
| **node02-06** | 2× Intel Xeon Gold 6330 | 2 TB | **4× NVIDIA A100 80GB (PCIe)** |
| **node07-10** | 2× Intel Xeon Gold 6330 | 1 TB | **MIG Mode** (For smaller tasks) |

</div>

> **Tip**: `node01` is the most powerful and suitable for large-scale training; `node07-10` have MIG (Multi-Instance GPU) enabled, splitting each A100 into two 40GB instances. Specify the type when requesting resources.

Hope this guide helps you get started quickly. Happy coding!
