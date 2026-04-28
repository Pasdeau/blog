import numpy as np
import json
import gzip

def read_mco(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    # Simple parser: skip lines until we see A_rz or similar wait, the 3D post says "OP_3D[nx * ny * nz]".
    # Let me check the structure of the MCO file first.
    return lines[:50]

print(read_mco('/Users/wang/Documents/PhD/Article/MCML_code/validate_RT/3d_cpu_RT.mco'))
