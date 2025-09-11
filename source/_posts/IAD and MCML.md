---
title: IAD et MOP-MCML
date: 2025-08-23
mathjax: true
description: IAD (Inverse Adding-Doubling) is based on the AD (Adding-Doubling) method, supplemented by a Monte Carlo correction. It allows the intrinsic optical parameters of the sample to be deduced from the measured values of reflectance R and transmittance T.
---

# 1. Introduction IAD
## Présentation
L’IAD (Inverse Adding-Doubling) repose sur la méthode AD (Adding-Doubling), complétée par une correction de type Monte-Carlo. Il permet, à partir des valeurs mesurées de la réflectance R et de la transmittance T, de déduire les paramètres optiques intrinsèques de l’échantillon : le coefficient d’absorption $μ_a$, le coefficient de diffusion réduite $μ_s'$ et le paramètre d’anisotropie $g$.
Le logiciel comprend deux processus :
- **IAD (inversion)** : il consiste à estimer itérativement un jeu de paramètres, à générer R et T par l’algorithme AD et à les comparer aux valeurs expérimentales, jusqu’à convergence dans la limite d’erreur fixée.
- **AD (simulation directe)** : il calcule les valeurs correspondantes de R et T à partir de paramètres optiques connus.
Sous des conditions géométriques et aux frontières données, cette approche reste valide dans une large gamme d’albédo, d’épaisseurs optiques et de fonctions de phase, et permet généralement de retrouver les paramètres avec une erreur limitée.
## Relations fondamentales
- Coefficient de diffusion réel
$$
μ_s = \frac{μ_s'}{1 - g}
$$
- Albédo de diffusion unique
$$
	a = \frac{μ_s}{μ_a + μ_s}
$$
- Épaisseur physique de l’échantillon
$$
d = 10 \,\text{mm}
$$
- Épaisseur optique de l’échantillon
$$
b = (μ_a + μ_s) \times d
$$
## Remarques sur $a$ et $b$
En ce qui concerne le calcul de $a$ et $b$, le code source disponible sur _GitHub_ précise que ceux-ci sont obtenus directement à partir de $μ_s'$. Cela s’explique par le fait que, dans les programmes d’exemple proposés, le paramètre $g$ est fixé à 0 ; dans ce cas particulier, $μ_s'$ et $μ_s$ sont équivalents, ce qui rend l’utilisation de $μ_s'$ pour le calcul de $a$ et $b$ identique à celle de $μ_s$.  
Cependant, dans les contextes optiques étudiés, on considère généralement $g \approx 0.9$, ce qui implique une différence notable entre $μ_s'$ et $μ_s$. Étant donné que la définition de $a$ et $b$ repose sur $μ_s$, continuer à utiliser  reviendrait implicitement à poser $g=0$, ce qui introduirait une sous-estimation systématique de la diffusion et, en parallèle, une surestimation de l’absorption et de la transmission, rendant ainsi les résultats non conformes à la réalité physique.
Lors de la première expérimentation, j’ai appliqué directement la méthode indiquée dans le code source, en calculant $a$ et $b$ à partir de $μ_a$ et $μ_s'$. Or, les valeurs de R et T obtenues se sont révélées fortement incohérentes avec les paramètres optiques inversés via l’IAD. À la suite de recherches et d’analyses, j’ai conclu que cette approche était inappropriée. Après avoir corrigé la méthode de calcul en utilisant $μ_s$ conformément à la définition, les écarts entre les données issues de l’AD et celles validées par l’IAD se sont considérablement réduits, ce qui accroît la pertinence pratique de l’IAD. Ce résultat sera détaillé dans la section comparative.
# 2. Tests MOP-MCML
## Sélection des paramètres optiques (unité : mm)
Plusieurs travaux ont déjà étudié les propriétés optiques des tissus humains. Par exemple, Bashkatov et al. [1](#ref1) ont mené en 2005 une étude sur la graisse sous-cutanée prélevée lors d’interventions chirurgicales. Les échantillons, découpés en tranches planes, étaient soigneusement débarrassés de leur sang résiduel et maintenus humides afin de préserver leurs propriétés. Les valeurs de R et de T ont été mesurées pour différentes longueurs d’onde, puis inversées par la méthode de la double sphère intégrante associée à l’IAD, permettant ainsi de déterminer les spectres d’absorption $μ_a$ et de diffusion $μ_s$ des tissus adipeux humains dans la gamme 400–2000 nm.
De leur côté, Simpson et al. [2](#ref2) ont appliqué en 1998 la méthode comparative par sphère intégrante unique (comparison method), combinée à un algorithme de Monte Carlo inverse, afin de déduire à partir de R et T les paramètres optiques de l’épiderme, de la graisse sous-cutanée et du muscle humain dans la plage 620–1000 nm.
Bashkatov a par ailleurs proposé une loi de puissance pour l’ajustement de $μ_s'$ de la graisse humaine dans l’intervalle 600–1500 nm :
$$
\mu_s’ = 1.05 \times 10^3 \, \lambda^{-0.68}
$$
Dans nos travaux, nous avons retenu certaines longueurs d’onde d’intérêt ainsi que deux types de tissus (graisse et muscle) pour la réalisation des tests correspondants, avec une épaisseur fixée à $d = 10 \,\text{mm}$.

| Tissus  | $μ_a(cm⁻¹)$ | $μ_s'(cm⁻¹)$ | $μ_s(cm⁻¹)$ |     $a$     | $b(mm)$ |  $n$  | $g$ |
| :-----: | :---------: | :----------: | :---------: | :---------: | :-----: | :---: | :-: |
| fat 700 |    1.11     |    12.20     |     122     | 0.990983673 | 123.11  | 1.455 | 0.9 |
| fat 800 |    1.07     |    11.15     |    111.5    | 0.990494803 | 112.57  | 1.455 | 0.9 |
| fat 900 |    1.06     |    10.29     |    102.9    | 0.989803771 | 103.96  | 1.455 | 0.9 |
| mus 700 |    0.48     |     8.18     |    81.8     | 0.994166262 |  82.28  | 1.37  | 0.9 |
| mus 800 |    0.28     |     7.04     |    70.4     | 0.996038483 |  70.68  | 1.37  | 0.9 |
| mus 900 |    0.32     |     6.21     |    62.1     | 0.994873438 |  62.42  | 1.37  | 0.9 |
## Fichier d'entrée de MOP-MCML
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
## Graisse
### 700nm
```
R = 0.246177   T = 0.00108857
```
### 800nm
```
R = 0.240579   T = 0.00166073
```
### 900nm
```
R = 0.230887   T = 0.00215007
```
## Muscle
### 700nm
```
R = 0.345293   T = 0.0236438
```
### 800nm
```
R = 0.406412   T = 0.0631558
```
### 900nm
```
R = 0.364507   T = 0.0644091
```
# 3. Test en mode AD (Déduire $R,T$ à partir de $μ_a,μ_s'$)
## Graisse
### 700nm
#### Commande
```
./ad -a 0.990983673 -b 123.11 -g 0.9
```
#### Résultat
```
R = 0.2830231429296444   T = 0.0010930802183922405
```
### 800nm
#### Commande
```
./ad -a 0.990494803 -b 112.57 -g 0.9
```
#### Résultat
```
R = 0.27539070448930375   T = 0.001622275392566738
```
### 900nm
#### Commande
```
./ad -a 0.989803771 -b 103.96 -g 0.9
```
#### Résultat
```
R = 0.26537438334599106   T = 0.0021053395468718567
```
## Muscle
### 700nm
#### Commande
```
./ad -a 0.994166262 -b 82.28 -g 0.9
```
#### Résultat
```
R = 0.34842633123318656   T = 0.022562949774397136
```
### 800nm
#### Commande
```
./ad -a 0.996038483 -b 70.68 -g 0.9
```
#### Résultat
```
R = 0.4080569824320218   T = 0.06126586355782593
```
### 900nm
#### Commande
```
./ad -a 0.994873438 -b 62.42 -g 0.9
```
#### Résultat
```
R = 0.3678904511387823   T = 0.06152422024329378
```
# 4. Test en mode IAD (Déduire $μ_a,μ_s'$ à partir de $R,T$)
## Graisse
### 700nm
#### Commande
```iad
./iad -r 0.2830231429296444 -t 0.0010930802183922405 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.246177 -t 0.00108857 -d 10.0 -g 0.9
```
#### Résultat ($mm^{-1}$)
```iad
mu_a = 0.1696     mu_s' = 0.8615
```

```mcml
mu_a = 0.1880     mu_s' = 0.7637
```
### 800nm
#### Commande
```iad
./iad -r 0.27539070448930375 -t 0.001622275392566738 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.240579 -t 0.00166073 -d 10.0 -g 0.9
```
#### Résultat ($mm^{-1}$)
```iad
mu_a = 0.1616     mu_s' = 0.7848
```

```mcml
mu_a = 0.1789     mu_s' = 0.7021
```
### 900nm
#### Commande
```iad
./iad -r 0.26537438334599106 -t 0.0021053395468718567 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.230887 -t 0.00215007 -d 10.0 -g 0.9
```
#### Résultat ($mm^{-1}$)
```iad
mu_a = 0.1609     mu_s' = 0.7354
```

```mcml
mu_a = 0.1761     mu_s' = 0.6500
```
## Muscle
### 700nm
#### Commande
```iad
./iad -r 0.34842633123318656 -t 0.022562949774397136 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.345293 -t 0.0236438 -d 10.0 -g 0.9
```
#### Résultat ($mm^{-1}$)
```iad
mu_a = 0.0783     mu_s' = 0.5808
```

```mcml
mu_a = 0.0781     mu_s' = 0.5694
```
### 800nm
#### Commande
```iad
./iad -r 0.4080569824320218 -t 0.06126586355782593 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.406412 -t 0.0631558 -d 10.0 -g 0.9
```
#### Résultat ($mm^{-1}$)
```iad
mu_a = 0.0478     mu_s' = 0.5014
```

```mcml
mu_a = 0.0475     mu_s' = 0.4939
```
### 900nm
#### Commande
```iad
./iad -r 0.3678904511387823 -t 0.06152422024329378 -d 10.0 -g 0.9
```

```mcml
./iad -r 0.364507 -t 0.0644091 -d 10.0 -g 0.9
```
#### Résultat ($mm^{-1}$)
```iad
mu_a = 0.0542     mu_s' = 0.4526
```

```mcml
mu_a = 0.0538     mu_s' = 0.4414
```
# 5. Comparaison des résultats IAD
L’analyse comparative montre que les méthodes MCML et AD aboutissent à des valeurs de R et de T très proches, la transmittance étant pratiquement identique. En appliquant l’IAD pour inverser les valeurs de R et T obtenues par ces deux approches, il apparaît que la combinaison AD+IAD permet d’estimer les paramètres optiques initiaux avec une meilleure précision. Toutefois, quelle que soit la méthode utilisée, l’erreur associée au coefficient d’absorption $μ_a$ demeure systématiquement bien inférieure à celle liée au coefficient de diffusion réduite $μ_s'$.
## Graisse
### 700nm
| Paramètres | MCML  | MCML -> IAD |       AD -> IAD       |
| :--------: | :---: | :---------: | :-------------------: |
|   $μ_a$    | 0.111 |   0.1880    |        0.1696         |
|   $μ_s'$   | 1.22  |   0.7637    |        0.8615         |
|     R      |   -   |  0.246177   |  0.2830231429296444   |
|     T      |   -   | 0.00108857  | 0.0010930802183922405 |
### 800nm
| Paramètres | MCML  | MCML -> IAD |      AD -> IAD       |
| :--------: | :---: | :---------: | :------------------: |
|   $μ_a$    | 0.107 |   0.1789    |        0.1616        |
|   $μ_s'$   | 1.115 |   0.7021    |        0.7848        |
|     R      |   -   |  0.240579   | 0.27539070448930375  |
|     T      |   -   | 0.00166073  | 0.001622275392566738 |
### 900nm
| Paramètres | MCML  | MCML -> IAD |       AD -> IAD       |
| :--------: | :---: | :---------: | :-------------------: |
|   $μ_a$    | 0.106 |   0.1761    |        0.1609         |
|   $μ_s'$   | 1.029 |   0.6500    |        0.7354         |
|     R      |   -   |  0.230887   |  0.26537438334599106  |
|     T      |   -   | 0.00215007  | 0.0021053395468718567 |
## Muscle
### 700nm
| Paramètres | MCML  | MCML -> IAD |      AD -> IAD       |
| :--------: | :---: | :---------: | :------------------: |
|   $μ_a$    | 0.048 |   0.0781    |        0.0783        |
|   $μ_s'$   | 0.818 |   0.5694    |        0.5808        |
|     R      |   -   |  0.345293   | 0.34842633123318656  |
|     T      |   -   |  0.0236438  | 0.022562949774397136 |
### 800nm
| Paramètres | MCML  | MCML -> IAD |      AD -> IAD      |
| :--------: | :---: | :---------: | :-----------------: |
|   $μ_a$    | 0.028 |   0.0475    |       0.0478        |
|   $μ_s'$   | 0.704 |   0.4939    |       0.5014        |
|     R      |   -   |  0.406412   | 0.4080569824320218  |
|     T      |   -   |  0.0631558  | 0.06126586355782593 |
### 900nm
| Paramètres | MCML  | MCML -> IAD |      AD -> IAD      |
| :--------: | :---: | :---------: | :-----------------: |
|   $μ_a$    | 0.032 |   0.0538    |       0.0542        |
|   $μ_s'$   | 0.621 |   0.4414    |       0.4526        |
|     R      |   -   |  0.364507   | 0.3678904511387823  |
|     T      |   -   |  0.0644091  | 0.06152422024329378 |
# 6. Test sur un échantillon de polyuréthane
## Obtention des paramètres optiques à partir de R et T
Le matériau étudié est un échantillon de polyuréthane de type *port* d’un pouce, utilisé comme modèle optique pour simuler l’environnement de tissus mous tels que la peau ou la graisse. Les données proviennent du dépôt GitHub de l’IAD, fichier [vio-A](https://github.com/scottprahl/iad/blob/main/test/vio-A.rxt), qui fournit les valeurs de R et de T du polyuréthane entre 650 nm et 850 nm, avec un pas de 1 nm.
Dans cette configuration, la source lumineuse et la photodiode sont placées en opposition (mode T). La lumière incidente éclaire l’échantillon sous tous les angles et le flux transmis est collecté par le détecteur. À partir de ces mesures de R et T, il est possible, grâce au code présenté ci-dessous, de déterminer les coefficients d’absorption $μ_a$ et de diffusion réduite $μ_s'$ correspondants.
```iad
./iad -M 0 -q 4 -g 0.9 test/vio-A
```
Dans ce cadre, **M** désigne le modèle utilisé par *iad* ; la documentation ne le détaille pas davantage dans l’article et ne publie que le modèle **0**, qui correspond à l’option la plus couramment employée. Le paramètre **q** spécifie le type de source lumineuse et permet d’indiquer dans quelles conditions d’illumination les valeurs de R et T ont été mesurées. Afin de simuler des tissus humains, nous fixons **g = 0,9** et l’épaisseur de l’échantillon à **6,67 mm**. Le fichier généré est disponible ici : [vio-A.txt](https://nuage.lip6.fr/index.php/s/8nicSrkyFPZdMqR).
## Déduction de R et T à partir de l’AD
Compte tenu du volume des données, une exécution commande par commande n’est pas réaliste ; on s’appuie donc sur **iadpython** pour effectuer des traitements par lots. Le fichier d’entrée fournit les paramètres de base, puis les grandeurs calculées **$a$** et **$b$** sont exportées dans un fichier **CSV**. Il suffit ensuite d’exécuter le code ci-dessous pour lancer le calcul en série.
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
Le fichier CSV généré regroupe les valeurs de R et de T déduites par l’AD ; elles sont ensuite comparées aux valeurs initiales de R et T.
- Difference Reflectance: 7.34% ± 1.11% (n=201)
- Difference Transmittance: 0.83% ± 0.63% (n=201)
{% asset_img Diff_RT.png Diff RT %}
Les résultats montrent que, lorsque les paramètres sont correctement configurés, l’IAD est capable de reconstituer à partir de R et T des paramètres optiques avec une précision satisfaisante.
# 7. Notes de débogage
## Modification du fichier mci
Le fichier **mci** contient un paramètre permettant à l’utilisateur de définir le nombre d’exécutions. Dans les premières versions, il était possible d’effectuer plusieurs itérations, mais après certaines modifications, seules des exécutions uniques étaient autorisées.  
Au cours de cette phase de test, il est apparu que les lignes vides du fichier **mci** doivent être strictement contrôlées ; dans le cas contraire, la configuration pour plusieurs exécutions ne fonctionne pas. Le code suivant illustre une configuration valide pour des exécutions multiples, en soulignant l’importance de l’emplacement des lignes vides.
```python
1.0   # file version
1     # Number of runs

### Specify data for run 1 ###
fat800.mco A  # output filename, ASCII/Binary
2000000   # No. of photons
0.001 0.002  # dz, dr
1000 1000 1  # No. of dz, dr & da

1   # No. of layers
1.000000   # n for medium above 
#n     mua    mus    g    d # [DOI : 10.1142/S1793545811001319]
1.37  1.07  116  0.90  1 # Gras
1.000000   # n for medium below

1.2 0.1  0.05  0.8 0.1  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.1  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat; 
```
## Modification du fichier mco
Dans le fichier **mcmlio.c**, une modification a été effectuée à la ligne 910 afin que le fichier **mco** enregistre désormais les informations relatives aux coordonnées, aux dimensions ainsi qu’au type de la photodiode et de la source lumineuse.  
Cette adaptation implique que les scripts **Matlab** doivent également être ajustés afin de prendre en compte ces nouveaux paramètres et garantir la compatibilité avec la version modifiée.
```c
// Add coordinate information here
fprintf(file, "%G\t%G\t\t%G\t\t%G\t%G\t\t%G\t\t# PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)\n", In_Parm.PD_Rx, In_Parm.PD_Ry, In_Parm.PD_Rl, In_Parm.PD_Tx, In_Parm.PD_Ty, In_Parm.PD_Tl);

// The light type
fprintf(file, "%hd\t\t%G\t%G\t\t%G\t\t# light source : param 1: 1.point 2.Gaussian 3.Flat\n", In_Parm.lightType, In_Parm.light_x, In_Parm.light_y, In_Parm.light_l);
```
C’est-à-dire que le fichier **mco** contient désormais les éléments suivants :
```python
1.2 0.1  0.05  0.8 0.1  0.05  # PD : (Rx, Ry), Rl, (Tx, Ty), Tl (in cm)
1  0.8 0.1  0.05     # light source : param 1: 1.point 2.Gaussian 3.Flat; 
```
Il convient de noter qu’avant la modification du code **Matlab**, cette section d’information doit être ignorée ; autrement, l’exécution ne pourra pas aboutir.
## Modification du code MATLAB
En intégrant les nouvelles informations de coordonnées, les paramètres dimensionnels et les types de sources lumineuses pour les sources lumineuses et les photodiodes dans le fichier **mco**, nous avons encore optimisé le processus de visualisation. Plus précisément, les positions et les dimensions réelles des sources lumineuses et des photodiodes dans deux modes sont clairement indiquées, ce qui rend la disposition spatiale plus intuitive. De plus, différents symboles sont utilisés pour distinguer les types de sources lumineuses : les sources lumineuses ponctuelles sont représentées par des triangles inversés, tandis que les autres types de sources lumineuses sont indiqués en fonction de leurs dimensions réelles. Ce type de traitement améliore non seulement la clarté du diagramme du chemin optique, mais aussi l'interprétabilité des résultats de la simulation.
{% asset_img MOP-MCML.png MOP-MCML %}
# 8. References
<span id="ref1">[1]</span> Bashkatov et al. Optical properties of human skin, subcutaneous and mucous tissues in the wavelength range from 400 to 2000 nm. 2005 J. Phys. D: Appl. Phys. 38 2543. DOI: 10.1088/0022-3727/38/15/004.
<span id="ref2">[2]</span> Simpson et al. Near-infrared optical properties of ex vivo human skin and subcutaneous tissues measured using the Monte Carlo inversion technique. Phys Med Biol. 1998 Sep;43(9):2465-78. DOI: 10.1088/0031-9155/43/9/003.