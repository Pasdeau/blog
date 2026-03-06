import numpy as np
import nibabel as nib
import os

mco_file = '/Users/wang/Documents/PhD/Article/MCML_code/validate_RT/3d_cpu_RT.mco'
output_nii = 'source/_posts/optics/mop_mcml_3d/volume_3d_log.nii.gz'

print("Parsing MCO file...")
# Read the file
with open(mco_file, 'r') as f:
    lines = f.readlines()

# Find the start of OP_3D
start_idx = -1
for i, line in enumerate(lines):
    if line.strip() == "OP_3D":
        start_idx = i + 1
        break

if start_idx == -1:
    print("Error: OP_3D not found.")
    exit(1)

# Extract 3D data. The dimensions are 300x300x200 (nx, ny, nz)
nx, ny, nz = 300, 300, 200
total_elements = nx * ny * nz
print(f"Loading {total_elements} elements...")

# The data might be spread across multiple lines.
data_lines = lines[start_idx:]
data = []
for line in data_lines:
    parts = line.split()
    for p in parts:
        try:
            data.append(float(p))
        except ValueError:
            pass
    if len(data) >= total_elements:
        break

data = np.array(data[:total_elements])
# Reshape using C order (ix * ny * nz + iy * nz + iz)
# Actually, the file comment says:
# OP_3D[x][y][z].
# OP_3D[0][0][0], [0][0][1],..[0][0][nz-1]
# OP_3D[0][1][0], [0][1][1],..[0][1][nz-1]
# So fastest changing is z, then y, then x. This corresponds to C-order with shape (nx, ny, nz).
data_3d = data.reshape((nx, ny, nz))

# Take log10
print("Applying log10 and normalizing...")
# Avoid log(0)
nonzero = data_3d > 0
data_3d_log = np.full_like(data_3d, -10.0) # Background value
data_3d_log[nonzero] = np.log10(data_3d[nonzero])

# Normalize to 0-255 uint8 for maximum compression
min_val = np.percentile(data_3d_log[nonzero], 1)
max_val = np.percentile(data_3d_log[nonzero], 99.9)

data_3d_norm = np.clip(data_3d_log, min_val, max_val)
data_3d_norm = (data_3d_norm - min_val) / (max_val - min_val) * 255.0
data_3d_uint8 = data_3d_norm.astype(np.uint8)

# Save as NIfTI
print("Saving as NIfTI...")
# Create an identity affine matrix
affine = np.eye(4)
# Adjust voxel size (0.01 cm = 0.1 mm) -> length of a voxel in mm
affine[0,0] = 0.1
affine[1,1] = 0.1
affine[2,2] = 0.1
nii_img = nib.Nifti1Image(data_3d_uint8, affine)
nib.save(nii_img, output_nii)

size_mb = os.path.getsize(output_nii) / (1024 * 1024)
print(f"Saved {output_nii}. Size: {size_mb:.2f} MB")
