---
title: Introduction of IAD
date: 2025-08-23
mathjax: true
description: IAD (Inverse Adding-Doubling) is based on the AD (Adding-Doubling) method, supplemented by a Monte Carlo correction. It allows the intrinsic optical parameters of the sample to be deduced from the measured values of reflectance $R$ and transmittance $T$.
---

# 1. Introduction to IAD

## Overview
IAD (Inverse Adding–Doubling) builds on the Adding–Doubling (AD) forward model and incorporates a Monte-Carlo–based correction to infer a sample’s intrinsic optical parameters from measured reflectance $R$ and transmittance $T$. The intrinsic parameters are the absorption coefficient $\mu_a$, the reduced scattering coefficient $\mu_s'$, and the anisotropy factor $g$.

The software exposes two complementary workflows:

- IAD (inversion). Iteratively propose a parameter set, generate $R$ and $T$ via AD, compare to the measurements, and iterate until the error falls below a prescribed tolerance.
- AD (forward). Given known optical parameters, compute the corresponding $R$ and $T$.

Under appropriate geometries and boundary conditions, this methodology is valid over a broad range of single-scattering albedo, optical thickness, and phase functions, and typically recovers parameters with small error.

## Fundamental relations

- True (non-reduced) scattering coefficient
$$
μ_s=\frac{μ_s'}{​1−g}
$$
- Single-scattering albedo
$$
a=\frac{μ_s}{μ_a+μ_s}
$$
- Physical thickness
$$
d = 10 mm
$$
- Optical thickness
$$
b=(μ_a+μ_s) × d
$$

## Notes on $a$ and $b$
Some example programs on GitHub compute $a$ and $b$ directly from $\mu_s'$ because those examples fix $g = 0$, making $\mu_s' \equiv \mu_s$. In realistic biomedical optics, one often assumes $g \approx 0.9$, in which case $\mu_s'$ and $\mu_s$ differ materially. Since the definitions of $a$ and $b$ depend on $\mu_s$ (not $\mu_s'$), continuing to use $\mu_s'$ is equivalent to implicitly setting $g=0$. This systematically underestimates scattering and overestimates absorption and transmittance, producing results that are not physically consistent.

In the first experiment, I followed the example approach and computed $a$ and $b$ from $\mu_a$ and $\mu_s'$. The resulting $R$ and $T$ were strongly inconsistent with parameters recovered by IAD. After revising the computation to use $\mu_s$ per the definitions, discrepancies between AD predictions and IAD-validated values were markedly reduced, which improved IAD’s practical utility (see the comparative section).  
Additionally, in early trials, optical thickness $b$ was mistakenly conflated with physical thickness $d$, which caused errors in AD-mode predictions of $R$ and $T$.

# 2. MOP-MCML Tests

## Choice of optical parameters (units: mm)
Optical properties of human tissues have been reported in prior work. For example, Bashkatov *et al.* [[1](#ref1)] measured reflectance and transmittance of ex-vivo subcutaneous fat (carefully de-blooded and kept moist), then used two integrating spheres with IAD to obtain spectra of $\mu_a$ and $\mu_s$ from 400–2000 nm. Simpson *et al.* [[2](#ref2)] used the single integrating-sphere comparison method with inverse Monte Carlo to retrieve optical parameters of epidermis, subcutaneous fat, and muscle in 620–1000 nm.

Bashkatov also proposed a power-law fit for human fat reduced scattering in 600–1500 nm:
$$
\mu_s’ = \frac {1.05 \times 10^3} {\lambda^{0.68}}
$$
with $\lambda$ in nm and $\mu_s'$ in $\text{cm}^{-1}$.

Below we select representative wavelengths and two tissues (fat and muscle) for testing, with fixed thickness $d = 10~\text{mm}$.

| Tissue  | $μ_a(cm⁻¹)$ | $μ_s'(cm⁻¹)$ | $μ_s(cm⁻¹)$ |     $a$     | $b(mm)$ |  $n$  | $g$ |
| :-----: | :---------: | :----------: | :---------: | :---------: | :-----: | :---: | :-: |
| fat 700 |    1.11     |    12.20     |     122     | 0.990983673 | 123.11  | 1.455 | 0.9 |
| fat 800 |    1.07     |    11.15     |    111.5    | 0.990494803 | 112.57  | 1.455 | 0.9 |
| fat 900 |    1.06     |    10.29     |    102.9    | 0.989803771 | 103.96  | 1.455 | 0.9 |
| mus 700 |    0.48     |     8.18     |    81.8     | 0.994166262 |  82.28  | 1.37  | 0.9 |
| mus 800 |    0.28     |     7.04     |    70.4     | 0.996038483 |  70.68  | 1.37  | 0.9 |
| mus 900 |    0.32     |     6.21     |    62.1     | 0.994873438 |  62.42  | 1.37  | 0.9 |

## MOP-MCML input file
```python
# File created automatically by create_MCML_input_file...

1.0   # file version
6   # Number of runs

### Specify data for run 1 ###
fat700.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.455  1.11  122  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat; 

### Specify data for run 2 ###
fat800.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.455  1.07  111.5  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat; 

### Specify data for run 3 ###
fat900.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.455  1.06  102.9  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat; 

### Specify data for run 4 ###
musc700.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.37  0.48  81.8  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat; 

### Specify data for run 5 ###
musc800.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.37  0.28  70.4  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat;

### Specify data for run 6 ###
musc900.mco A  # output filename, ASCII/Binary
200000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.37  0.32  62.1  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.0  0.05  0.8 0.0  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.0  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat;
```

## Fat
### 700 nm
```
R = 0.246177   T = 0.00108857
```
### 800 nm
```
R = 0.240579   T = 0.00166073
```
### 900 nm
```
R = 0.230887   T = 0.00215007
```

## Muscle
### 700 nm
```
R = 0.345293   T = 0.0236438
```
### 800 nm
```
R = 0.406412   T = 0.0631558
```
### 900 nm
```
R = 0.364507   T = 0.0644091
```

# 3. AD-Mode Tests (predict $R, T$ from $\mu_a, \mu_s'$)

## Fat
### 700 nm
#### Command
```sh
./ad -a 0.990983673 -b 123.11 -g 0.9
```
#### Result
```
R = 0.2830231429296444   T = 0.0010930802183922405
```

### 800 nm
#### Command
```sh
./ad -a 0.990494803 -b 112.57 -g 0.9
```
#### Result
```
R = 0.27539070448930375   T = 0.001622275392566738
```

### 900 nm
#### Command
```sh
./ad -a 0.989803771 -b 103.96 -g 0.9
```
#### Result
```
R = 0.26537438334599106   T = 0.0021053395468718567
```

## Muscle
### 700 nm
#### Command
```sh
./ad -a 0.994166262 -b 82.28 -g 0.9
```
#### Result
```
R = 0.34842633123318656   T = 0.022562949774397136
```

### 800 nm
#### Command
```sh
./ad -a 0.996038483 -b 70.68 -g 0.9
```
#### Result
```
R = 0.4080569824320218   T = 0.06126586355782593
```

### 900 nm
#### Command
```sh
./ad -a 0.994873438 -b 62.42 -g 0.9
```
#### Result
```
R = 0.3678904511387823   T = 0.06152422024329378
```

# 4. IAD-Mode Tests (recover $\mu_a, \mu_s'$ from $R,T$)

## Fat
### 700 nm
#### Commands
```iad
./iad -r 0.2830231429296444 -t 0.0010930802183922405 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.246177 -t 0.00108857 -d 10.0 -g 0.9
```
#### Results ($mm^{-1}$)
```iad
mu_a = 0.1696     mu_s' = 0.8615
```

```mcml
mu_a = 0.1880     mu_s' = 0.7637
```

### 800 nm
#### Commands
```iad
./iad -r 0.27539070448930375 -t 0.001622275392566738 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.240579 -t 0.00166073 -d 10.0 -g 0.9
```
#### Results ($mm^{-1}$)
```iad
mu_a = 0.1616     mu_s' = 0.7848
```

```mcml
mu_a = 0.1789     mu_s' = 0.7021
```

### 900 nm
#### Commands
```iad
./iad -r 0.26537438334599106 -t 0.0021053395468718567 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.230887 -t 0.00215007 -d 10.0 -g 0.9
```
#### Results ($mm^{-1}$)
```iad
mu_a = 0.1609     mu_s' = 0.7354
```

```mcml
mu_a = 0.1761     mu_s' = 0.6500
```
## Muscle
### 700 nm
#### Commands
```iad
./iad -r 0.34842633123318656 -t 0.022562949774397136 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.345293 -t 0.0236438 -d 10.0 -g 0.9
```
#### Results ($mm^{-1}$)
```iad
mu_a = 0.0783     mu_s' = 0.5808
```

```mcml
mu_a = 0.0781     mu_s' = 0.5694
```

### 800 nm
#### Commands
```iad
./iad -r 0.4080569824320218 -t 0.06126586355782593 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.406412 -t 0.0631558 -d 10.0 -g 0.9
```
#### Results ($mm^{-1}$)
```iad
mu_a = 0.0478     mu_s' = 0.5014
```

```mcml
mu_a = 0.0475     mu_s' = 0.4939
```

### 900 nm
#### Commands
```iad
./iad -r 0.3678904511387823 -t 0.06152422024329378 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.364507 -t 0.0644091 -d 10.0 -g 0.9
```
#### Results ($mm^{-1}$)
```iad
mu_a = 0.0542     mu_s' = 0.4526
```

```mcml
mu_a = 0.0538     mu_s' = 0.4414
```

# 5. Comparative Assessment of IAD Results
A cross-comparison shows that AD and MCML produce similar $R$ and $T$, with transmittance nearly identical. Inverting both with IAD indicates that AD → IAD tends to recover the original optical parameters slightly more faithfully. In all cases, the inversion error for $\mu_a$ is consistently smaller than for $\mu_s'$.

## Fat
### 700nm
| Parameter | MCML  | MCML -> IAD |       AD -> IAD       |
| :-------: | :---: | :---------: | :-------------------: |
|   $μ_a$   | 0.111 |   0.1880    |        0.1696         |
|  $μ_s'$   | 1.22  |   0.7637    |        0.8615         |
|     R     |   -   |  0.246177   |  0.2830231429296444   |
|     T     |   -   | 0.00108857  | 0.0010930802183922405 |
### 800nm
| Parameter | MCML  | MCML -> IAD |      AD -> IAD       |
| :-------: | :---: | :---------: | :------------------: |
|   $μ_a$   | 0.107 |   0.1789    |        0.1616        |
|  $μ_s'$   | 1.115 |   0.7021    |        0.7848        |
|     R     |   -   |  0.240579   | 0.27539070448930375  |
|     T     |   -   | 0.00166073  | 0.001622275392566738 |
### 900nm
| Parameter | MCML  | MCML -> IAD |       AD -> IAD       |
| :-------: | :---: | :---------: | :-------------------: |
|   $μ_a$   | 0.106 |   0.1761    |        0.1609         |
|  $μ_s'$   | 1.029 |   0.6500    |        0.7354         |
|     R     |   -   |  0.230887   |  0.26537438334599106  |
|     T     |   -   | 0.00215007  | 0.0021053395468718567 |

## Muscle
### 700nm
| Parameter | MCML  | MCML -> IAD |      AD -> IAD       |
| :-------: | :---: | :---------: | :------------------: |
|   $μ_a$   | 0.048 |   0.0781    |        0.0783        |
|  $μ_s'$   | 0.818 |   0.5694    |        0.5808        |
|     R     |   -   |  0.345293   | 0.34842633123318656  |
|     T     |   -   |  0.0236438  | 0.022562949774397136 |
### 800nm
| Parameter | MCML  | MCML -> IAD |      AD -> IAD      |
| :-------: | :---: | :---------: | :-----------------: |
|   $μ_a$   | 0.028 |   0.0475    |       0.0478        |
|  $μ_s'$   | 0.704 |   0.4939    |       0.5014        |
|     R     |   -   |  0.406412   | 0.4080569824320218  |
|     T     |   -   |  0.0631558  | 0.06126586355782593 |
### 900nm
| Parameter | MCML  | MCML -> IAD |      AD -> IAD      |
| :-------: | :---: | :---------: | :-----------------: |
|   $μ_a$   | 0.032 |   0.0538    |       0.0542        |
|  $μ_s'$   | 0.621 |   0.4414    |       0.4526        |
|     R     |   -   |  0.364507   | 0.3678904511387823  |
|     T     |   -   |  0.0644091  | 0.06152422024329378 |

# 6. Polyurethane Sample Test

## Recovering optical parameters from $R$ and $T$
The material is a one-inch port-type polyurethane sample used as a soft-tissue phantom (skin/fat analog). Data come from the IAD GitHub file [vio-A](https://github.com/scottprahl/iad/blob/main/test/vio-A.rxt), which provides $R$ and $T$ from 650 nm to 850 nm in 1 nm steps. The source and photodiode are placed in opposition (T-mode) so that a broad angular distribution illuminates the sample and the transmitted flux is collected.

We obtain $\mu_a$ and $\mu_s'$ from measured $R$ and $T$ via:
```sh
./iad -M 0 -q 4 -g 0.9 test/vio-A
```
Here, M denotes the model used by `iad`; only model 0 is publicly documented and commonly used. Parameter q specifies the illumination condition under which $R$ and $T$ were measured. To emulate human tissue, we set $g = 0.9$ and the sample thickness to 6.670 mm. A generated output example is available as *vio-A.txt* (shared link).

## Predicting $R$ and $T$ with IAD and MOP-MCML
Given the data volume, batch execution via iadpython is preferable. After preparing input parameters and exporting the computed $a$ and $b$ to CSV, run:

```python
import pandas as pd
import iadpython as iad

g = 0.9
n = 1.468
n_above  = 1.00
n_below  = 1.00

df = pd.read_csv("albedo.csv")
a_vals = df["a"].astype(float)
b_vals = df["b"].astype(float)

rows = []
for a_i, b_i in zip(a_vals, b_vals):
    s = iad.Sample(a=a_i, b=b_i, g=g, n=n, n_above=n_above, n_below=n_below)
    UR, UT, URU, UTU = s.rt()
    rows.append({
        "a": a_i, "b": b_i, "g": g,
        "UR_total": UR, "UT_total": UT,
        "URU_diffuse": URU, "UTU_diffuse": UTU
    })

pd.DataFrame(rows).to_csv("ad_results.csv", index=False)
```

**IAD baseline.** Comparing IAD-predicted $R$ and $T$ with the input measurements over 650–850 nm yields a mean reflectance difference of $7.34\\% \pm 1.11\\%$ and a mean transmittance difference of $0.83\\% \pm 0.63\\%$. Across the band, IAD errors remain modest—peaking at $\sim 8.7\\%$ for $R$ and $\sim 2.1\\%$ for $T$—with minima near 690 nm for $T$ approaching zero.

**MOP-MCML comparison.** Using the same preprocessing and evaluation pipeline, we forward-simulated $R$ and $T$ with MOP-MCML at the corresponding wavelengths and computed spectral differences relative to the original data. Overall, the MOP-MCML results give a mean reflectance difference of $29.78\\% \pm 7.80\\%$ and a mean transmittance difference of $9.65\\% \pm 5.57\\%$. When the two error sets are juxtaposed, the MOP-MCML curves exhibit **larger discrepancies**, particularly for reflectance, local maxima around 750-760 nm reaching $\sim 43\\%$, and for transmittance up to $\sim 19\\%$. 

{% asset_img Diff_RT_MCML.png Spectral Error in R/T: IAD vs. MOP-MCML %}

Why IAD fits closer to the measurements? Two factors explain the gap:

1. **Source-model mismatch.** The light-source types currently available in MOP-MCML do not exactly match those assumed in the reference documentation/measurements (spatial/angular profile and/or spectrum), leading to systematic deviations in the forward model.
2. **Embedded error feedback in IAD.** IAD is an inverse procedure that continuously compares predicted and measured R and T while estimating optical parameters, effectively “fitting to the data” at each iteration. In contrast, MCML uses the retrieved parameters to generate a single forward prediction, so any source or boundary mismatch propagates directly into larger residuals.

We note that commercially available phantoms priced at approximately \$1,000 exhibit optical-parameter errors on the order of $40\\%$. Accordingly, despite the differences discussed above, the errors produced by MOP-MCML remain within our study’s tolerance and are therefore considered acceptable.

# 8. References
<span id="ref1">[1]</span> Bashkatov et al. Optical properties of human skin, subcutaneous and mucous tissues in the wavelength range from 400 to 2000 nm. 2005 J. Phys. D: Appl. Phys. 38 2543. DOI: 10.1088/0022-3727/38/15/004.
<span id="ref2">[2]</span> Simpson et al. Near-infrared optical properties of ex vivo human skin and subcutaneous tissues measured using the Monte Carlo inversion technique. Phys Med Biol. 1998 Sep;43(9):2465-78. DOI: 10.1088/0031-9155/43/9/003.