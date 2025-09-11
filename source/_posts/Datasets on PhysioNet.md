---
title: Datasets on PhysioNet
date: 2025-06-29
mathjax: true
description: PhysioNet provides a practical database of physiological signals available for open-source use, proving highly effective for training models and acquiring physiological signal data.
---

Source de toutes les bases de données sur [Nuage](https://nuage.lip6.fr/index.php/s/9JYzo9A7rHkFHNZ)
## [ECG & PPG Signal with Arrhythmia Episodes](https://doi.org/10.13026/s32e-sv15) – 2022  
*Modèle de simulation de signaux ECG et PPG avec épisodes d’arythmie*

Outil logiciel permettant de générer des signaux ECG et PPG simulés contenant divers épisodes d’arythmie (fibrillation auriculaire, bradycardie, tachycardie ventriculaire, etc.) :
- Rythme sinusal normal  
- Fibrillation auriculaire (FA)  
- Bradycardie  
- Tachycardie ventriculaire (TV)  
- Extrasystole auriculaire (APB)  

Possibilité d’ajouter des bruits réalistes selon les conditions de mesure. Le logiciel permet de personnaliser la durée du signal, la fréquence d’échantillonnage (PPG : 75 à 1000 Hz ; ECG : 250 à 1000 Hz), les périodes anormales, le type et le niveau de bruit.  
Ce simulateur permet de générer des cas réalistes pour enrichir les bases de données.

- ## [Motion Artifact Contaminated fNIRS and EEG](https://physionet.org/content/motion-artifact/1.0.0/) - 2014
*Motion Artifact Contaminated fNIRS and EEG Data*

Les signaux fNIRS et EEG ont été enregistrés simultanément lors d’une expérimentation impliquant deux groupes de capteurs : l’un soumis à des artefacts de mouvement induits volontairement, l’autre maintenu immobile. Un accéléromètre triaxial a également été utilisé pour enregistrer les données de mouvement. Le signal fNIRS a été échantillonné à une fréquence d’environ 25 Hz à deux longueurs d’onde (690 nm et 830 nm), tandis que le signal EEG a été enregistré à 2048 Hz. L'accéléromètre a une fréquence d’échantillonnage de 200 Hz.

### **Détails des fichiers CSV :**

Les signaux fNIRS (ou EEG) et les données des accéléromètres ont été capturés à l’aide de deux systèmes indépendants. Leur synchronisation temporelle est assurée via un signal de déclenchement (trigger).  
Les données fNIRS comprennent 9 sessions expérimentales (**les sessions 5 et 8 présentent des données de moindre qualité**) avec deux canaux optiques par longueur d’onde.  
Les données EEG contiennent 23 enregistrements avec deux canaux frontaux.

- **Trigger associé au fNIRS** :
    - Montée initiale → début de l’expérience ;
    - Passage à un niveau bas → phase avec artefacts de mouvement induits ;
    - Retour à un niveau haut → période de signal propre ;
    - Descente finale → fin de l’expérience.
        
- **Trigger associé à l’EEG** :
    - Contient uniquement 2 transitions : début (montée) et fin (descente) de l’expérience ;
    - Ne comporte pas de marquage des phases "propres" ou "avec artefacts".

#### **Structure des données fNIRS :**

|Colonne|Description|
|---|---|
|Colonne 1|Numéro d’échantillon|
|Colonne 2|Intensité lumineuse brute 690 nm - Canal 1 (25 Hz)|
|Colonne 3|Intensité lumineuse brute 830 nm - Canal 1 (25 Hz)|
|Colonne 4|Intensité lumineuse brute 690 nm - Canal 2 (25 Hz)|
|Colonne 5|Intensité lumineuse brute 830 nm - Canal 2 (25 Hz)|
|Colonne 6|Trigger fNIRS (25 Hz)|
|Colonnes 7-9|Accéléromètre 1 - Axes X/Y/Z (200 Hz)|
|Colonnes 10-12|Accéléromètre 2 - Axes X/Y/Z (200 Hz)|
|Colonne 13|Trigger accéléromètre (200 Hz)|

#### **Structure des données EEG :**

|Colonne|Description|
|---|---|
|Colonne 1|Numéro d’échantillon|
|Colonne 2|EEG brut - Canal 1 (2048 Hz)|
|Colonne 3|EEG brut - Canal 2 (2048 Hz)|
|Colonne 4|Trigger EEG (2048 Hz)|
|Colonnes 5-7|Accéléromètre 1 - Axes X/Y/Z (200 Hz)|
|Colonnes 8-10|Accéléromètre 2 - Axes X/Y/Z (200 Hz)|
|Colonne 11|Trigger accéléromètre (200 Hz)|

**Remarque : en général, le canal 1 est immobile, tandis que le canal 2 est en mouvement.**

## [ScientISST MOVE](https://doi.org/10.13026/hyxq-r919) – 2024  
*Enregistrement multimodal de biosignaux dans des environnements de vie naturelle, avec annotation des activités quotidiennes*

17 participants, chacun mesuré pendant environ 37 minutes au cours d’activités réelles (station debout, marche, course, déplacement de chaise, salutation, etc.). Les phases d’activité sont annotées.

Appareils utilisés :
- **ScientISST‑Chest** (poitrine) et **ScientISST‑Forearm** (avant-bras) : 500 Hz, signaux ECG, EMG, EDA, PPG digital.  
- **Bracelet Empatica E4** : collecte PPG poignet, EDA, température de la peau, accéléromètre.

| Paramètre                        | Fréquence d’échantillonnage (SST / E4) |
| -------------------------------- | -------------------------------------- |
| ECG (électrodes gel)             | 500 Hz                                 |
| PPG                              | 500 Hz / 64 Hz                         |
| EDA                              | 500 Hz / 4 Hz                          |
| EMG                              | 500 Hz                                 |
| Accéléromètre (poitrine/poignet) | 500 Hz / 32 Hz                         |
| Température                      | - / 4 Hz                               |

## [BIG IDEAs](https://physionet.org/content/big-ideas-glycemic-wearable/1.1.2/) – 2023  
*Variabilité glycémique et données de dispositifs portables – BIG IDEAs Lab*

Suivi de la glycémie en continu avec Apple Watch ou Empatica E4. Données disponibles : fréquence cardiaque, accéléromètre, BVP (PPG), EDA, température.  
Mesure glycémique toutes les 5 minutes. Échantillonnage PPG à **64 Hz**, suffisant pour analyse de forme d’onde.  
16 participants. Les mesures incluent l’ingestion d’aliments.

Les fichiers `Food_Log_xxx.csv` fournissent des détails nutritionnels par sujet : type d’aliment, heure, quantité, calories, glucides, protéines, lipides, fibres, etc.

==Étude des liens entre PPG et glycémie, avec extraction de caractéristiques temporelles autour des fenêtres de 5 minutes==.

## [Labeled raw accelerometry data](https://doi.org/10.13026/51h0-a262) – 2021  
*Données brutes d’accélérométrie annotées durant la marche, la montée/descente d’escaliers et la conduite*

32 adultes en bonne santé (13 hommes, 19 femmes) portant chacun 4 accéléromètres ActiGraph GT3X+ (poignet gauche, hanche gauche, cheville gauche et cheville droite) – **100 Hz**.

Tâches : marcher ~1 km, monter/descendre 6 fois, conduire 12.8 miles. Claquement des mains au début et à la fin comme repère.

Chaque sujet = un fichier CSV contenant :  

| Paramètre       | Signification           |
| --------------- | ----------------------- |
| activity        | Codage de l’activité    |
| time_s          | Temps cumulé en secondes |
| lw_x, y, z      | Poignet gauche          |
| lh_x, y, z      | Hanche gauche           |
| la_x, y, z      | Cheville gauche         |
| ra_x, y, z      | Cheville droite         |

Codes d’activités :  
1 = marche, 2 = descente escaliers, 3 = montée, 4 = conduite, 77 = clap, 99 = hors expérience  

Permet de comprendre les signatures d'accélération des mouvements.

## [Stress and Structured Exercise Sessions](https://physionet.org/content/wearable-device-dataset/1.0.1/) – 2025  
*Base de données physiologiques lors de stress induit et d'exercices structurés*

Mesures via **bracelet Empatica E4** dans 3 conditions :
1. **Stress aigu (STRESS)**  
   - Tâche mathématique et stimulation émotionnelle, en alternance avec repos.  
   - Niveau de stress auto-évalué (2 fichiers CSV par sujet).
2. **Exercice aérobie (AEROBIC)**  
   - Vélo stationnaire, effort rythmique modéré.
3. **Exercice anaérobie (ANAEROBIC)**  
   - Exercice intense et court, toujours à vélo.

- 36 sujets (STRESS), 30 (AEROBIC), 31 (ANAEROBIC)

==Fichier `BVP.csv` contient PPG à **64 Hz**, incluant fréquence cardiaque, HRV, forme du signal, qualité selon l'activité==

| Accéléromètre  | PPG       | EDA       | HR        | IBI        | Événements | Température |
| -------------- | --------- | --------- | --------- | ---------- | ---------- | ----------- |
| ACC.csv        | BVP.csv   | EDA.csv   | HR.csv    | IBI.csv    | tags.csv   | TEMP.csv    |

## [BigIdeasLab_STEP](https://physionet.org/content/bigideaslab-step-hr-smartwatch/1.0/) – 2021  
*Mesure de la fréquence cardiaque par montres connectées selon le type de peau*

Analyse de l’impact de la teinte de peau (Fitzpatrick 1 à 6), du type d’activité et du modèle de montre sur la précision de mesure de la fréquence cardiaque optique.

53 participants (32 femmes, 21 hommes), âgés de 18 à 54 ans, répartis également sur les 6 types de peau.

**Protocole répété 3 fois** :
1. Repos assis – 4 minutes  
2. Respiration rythmée – 1 minute  
3. Marche rapide (50 % FC max) – 5 minutes  
4. Repos assis – 2 minutes  
5. Tâche de frappe au clavier – 1 minute  

ECG référence via patch Bittium (≈1000 Hz).  
==Pas de PPG fourni, seulement les BPM mesurés par différents dispositifs==

| Paramètre     | Signification                     |
| ------------- | --------------------------------- |
| ECG           | Bittium Faros 180, référence      |
| Apple Watch   | Apple Watch 4                     |
| Empatica      | Empatica E4                       |
| Fitbit        | Fitbit Charge 2                   |
| Garmin        | Garmin Vivosmart 3                |
| Miband        | Xiaomi Miband 3                   |
| Biovotion     | Biovotion Everion                 |
| Teinte de peau| Fitzpatrick (1–6)                 |
| ID            | Identifiant du participant        |
| Activité      | Repos, exercice, respiration, frappe |

## Conclusion

La majorité des bases de données citées utilisent [Empatica E4](https://www.empatica.com/en-int/research/e4/) pour collecter les signaux PPG, EDA et TEMP.  
Cependant, ce dispositif est désormais obsolète. Il est remplacé par l’**EmbracePlus**, qui consomme moins d’énergie et propose jusqu’à 4 canaux de mesure simultanés.
