import numpy as np
import json
import base64

mco_file = '/Users/wang/Documents/PhD/Article/MCML_code/validate_RT/3d_cpu_RT.mco'
output_json = 'source/_posts/optics/mop_mcml_3d/volume_data.json'

print("Parsing MCO file...")
with open(mco_file, 'r') as f:
    lines = f.readlines()

start_idx = -1
for i, line in enumerate(lines):
    if line.strip() == "OP_3D":
        start_idx = i + 1
        break

nx, ny, nz = 300, 300, 200
total = nx * ny * nz
data = []
for line in lines[start_idx:]:
    parts = line.split()
    for p in parts:
        try:
            data.append(float(p))
            if len(data) >= total: break
        except ValueError: pass
    if len(data) >= total: break

data = np.array(data)
data_3d = data.reshape((nx, ny, nz))

print("Taking log10...")
nonzero = data_3d > 0
data_3d_log = np.full_like(data_3d, -10.0)
data_3d_log[nonzero] = np.log10(data_3d[nonzero])

# Downsample by 2 to significantly improve rendering performance (150 x 150 x 100 elements)
ds_factor = 2
data_ds = data_3d_log[::ds_factor, ::ds_factor, ::ds_factor]

vis_min = -5.0
vis_max = float(np.percentile(data_ds[data_ds > -10.0], 99.9))

# Scale to 0-255 uint8
print(f"Quantizing to uint8 (vis_min={vis_min:.2f}, vis_max={vis_max:.2f})...")
data_norm = np.clip(data_ds, -10.0, vis_max)  # keep backgrounds at -10
data_uint8 = ((data_norm - (-10.0)) / (vis_max - (-10.0)) * 255.0).astype(np.uint8)

# Encode as base64
print("Encoding as Base64 (uint8, no downsampling)...")
b64_data = base64.b64encode(data_uint8.flatten(order='C').tobytes()).decode('utf-8')

out = {
    "shape": list(data_uint8.shape),
    "b64_data": b64_data,
    "dtype": "uint8",
    "vis_min": vis_min,  # log10 value that maps to 0
    "vis_max": vis_max,  # log10 value that maps to 255
    "bg_val": 0          # background (no photons): uint8 pixel = 0
}

import json
with open(output_json, 'w') as f:
    json.dump(out, f)

import os
size_mb = os.path.getsize(output_json) / (1024 * 1024)
print(f"Saved {output_json}. Size: {size_mb:.1f} MB")
