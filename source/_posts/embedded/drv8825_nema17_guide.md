---
title: "Arduino UNO + DRV8825: NEMA 17 Motor Control"
date: 2026-07-25 18:30:00
published: true
comments: true
lang: en
mathjax: true
toc: true
categories:
  - Embedded Systems
tags:
  - Robotics
  - Arduino
  - DRV8825
description: Wire and control a NEMA 17 stepper motor with an Arduino UNO and DRV8825, set the current limit and microstepping mode, and compare the driver with the A4988.
---

A stepper motor can position a camera slider, XY stage, or lead screw by counting steps. An Arduino UNO cannot drive the motor coils directly: its pins provide control signals, while a **DRV8825** switches and limits the coil current. This guide uses an external 12 V supply, a four-wire NEMA 17 motor, and the wiring shown below.

**NEMA 17** specifies an approximately 42 × 42 mm mounting face, not an electrical rating. Check your motor's **rated current per phase** before setting the driver. A typical 1.8° motor takes 200 full steps per revolution.

## Driver pins and wiring

{% asset_img drv8825_pinout.jpg DRV8825 carrier pin layout %}

The carrier accepts a motor supply at `VMOT` and `GND`; it does **not** need a separate logic-power (`VDD`) pin. `STEP` advances one full step or microstep on each rising edge, and `DIR` selects the direction. `ENABLE` is active low. Both `RESET` and `SLEEP` must be high for the driver to respond to pulses. `MODE0`–`MODE2` select the microstep resolution. Clockwise and counterclockwise depend on the motor wiring and mounting orientation.

{% asset_img drv8825_wiring.png Arduino UNO, DRV8825, and NEMA 17 wiring diagram %}

| Arduino UNO / supply | DRV8825 | Purpose |
| --- | --- | --- |
| D2 | `DIR` | Direction |
| D3 | `STEP` | Step pulses |
| D4, D5, D6 | `MODE0`, `MODE1`, `MODE2` | Microstepping |
| D8 | `ENABLE` | Output enable |
| 5 V | `RESET` and `SLEEP` | Keep the driver awake |
| GND | `GND` | Common signal ground |
| External 12 V + / − | `VMOT` / motor `GND` | Motor power |
| Motor winding A | `A1`, `A2` | First coil |
| Motor winding B | `B1`, `B2` | Second coil |

Connect the Arduino, driver, and motor supply grounds. Identify each motor winding with a multimeter: the two leads of one winding show a low resistance; leads from different windings do not. Wire one pair to `A1`/`A2` and the other to `B1`/`B2`. Wire colors vary by motor, so do not rely on the colors in the drawing. To reverse rotation, change `DIR` or swap the two leads of **one** winding while power is off.

Place an electrolytic capacitor of **at least 47 µF** across `VMOT` and motor `GND`, close to the carrier. For this 12 V example, a **100 µF / 25 V** capacitor is suitable; observe its polarity. Long supply leads can produce voltage spikes. **Never connect or disconnect the motor while the driver is powered.**

## Set the current limit

The DRV8825 regulates winding current independently of the 12 V supply voltage. Set its current limit before running the motor. The DRV8825 relationship is

$$I_{\text{limit}}=\frac{V_{\text{REF}}}{5R_{\text{sense}}}.$$

For a carrier with $R_{\text{sense}}=0.10\,\Omega$, this becomes $I_{\text{limit}}=2V_{\text{REF}}$: a **1.2 A** limit calls for approximately **0.6 V** at `VREF`. Check the resistor value on *your* board; carriers with different sense resistors need different settings. The limit should not exceed the motor's rated phase current, and the small carrier may need cooling well below the chip's nominal maximum current. Start with a conservative setting, test at low speed, then check motor and driver temperatures. Supply current is not the same as winding current.

## Select microstepping

| `MODE0` | `MODE1` | `MODE2` | Resolution | Pulses per turn for a 1.8° motor |
| --- | --- | --- | --- | ---: |
| LOW | LOW | LOW | Full step | 200 |
| HIGH | LOW | LOW | 1/2 | 400 |
| LOW | HIGH | LOW | 1/4 | 800 |
| HIGH | HIGH | LOW | 1/8 | 1,600 |
| LOW | LOW | HIGH | 1/16 | 3,200 |
| HIGH | LOW | HIGH | 1/32 | 6,400 |

The other two combinations with `MODE2` high also select 1/32. The example sketch sets **1/16**, so two revolutions require $2\times200\times16=6{,}400$ pulses. More microsteps improve command resolution; they do not increase the motor's torque or speed.

## Test both directions

Upload this sketch after wiring the circuit and setting the current limit. It turns two revolutions in each direction, with a one-second pause. The 5 µs high pulse exceeds the DRV8825's 1.9 µs minimum; the full pulse period is approximately 1 ms.

```cpp
const int DIR_PIN = 2;
const int STEP_PIN = 3;
const int MODE0_PIN = 4;
const int MODE1_PIN = 5;
const int MODE2_PIN = 6;
const int ENABLE_PIN = 8;

const long STEPS_PER_REV = 200;
const long MICROSTEPS = 16;

void rotate(long revolutions, bool direction) {
  digitalWrite(DIR_PIN, direction);
  delayMicroseconds(2);  // Set DIR before the first STEP edge.
  const long pulses = revolutions * STEPS_PER_REV * MICROSTEPS;
  for (long i = 0; i < pulses; ++i) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(5);
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(995);
  }
}

void setup() {
  pinMode(DIR_PIN, OUTPUT);
  pinMode(STEP_PIN, OUTPUT);
  pinMode(MODE0_PIN, OUTPUT);
  pinMode(MODE1_PIN, OUTPUT);
  pinMode(MODE2_PIN, OUTPUT);
  pinMode(ENABLE_PIN, OUTPUT);

  digitalWrite(STEP_PIN, LOW);
  digitalWrite(MODE0_PIN, LOW);
  digitalWrite(MODE1_PIN, LOW);
  digitalWrite(MODE2_PIN, HIGH);  // 1/16 microstepping
  digitalWrite(ENABLE_PIN, LOW);  // Enable outputs
}

void loop() {
  rotate(2, HIGH);
  delay(1000);
  rotate(2, LOW);
  delay(1000);
}
```

At 1,000 pulses/s and 3,200 pulses/revolution, the ideal speed is **18.75 RPM**. If the motor hums or loses steps at higher speeds, lower the starting pulse rate and add acceleration before increasing `VREF`. A loaded axis cannot necessarily start at its target speed. For manual control, connect forward and reverse buttons from D9 and D10 to GND, configure both pins as `INPUT_PULLUP`, and emit pulses only while one button is pressed. Add limit switches before moving a slider or lead screw near a mechanical stop. Keeping `ENABLE` low preserves holding torque during pauses; disabling it can let a vertical load fall.

## Replacing an A4988

Both carriers use `STEP`/`DIR` control and a similar footprint, but check these differences before swapping them:

| Check | A4988 | DRV8825 |
| --- | --- | --- |
| Finest resolution | 1/16 step | 1/32 step |
| Maximum motor supply | 35 V | 45 V |
| Minimum `STEP` high and low time | 1 µs each | 1.9 µs each |
| Logic supply pin | `VDD` input | `FAULT` output on the corresponding pin |

The same mode-pin settings that select 1/16 on an A4988 can select 1/32 on a DRV8825: a 3,200-pulse move could become half a turn instead of one turn. Recheck the board orientation, microstep mode, `VREF`, and pulse timing after a swap. Do not copy the A4988's `VREF` setting; its current-limit relationship differs.

For the first power-up, verify the coil pairs, ground connection, capacitor polarity, `RESET`/`SLEEP` levels, and current limit. Test at low speed in both directions, then add acceleration and controls for the intended mechanism.

**References:** [TI DRV8825 datasheet](https://www.ti.com/lit/ds/symlink/drv8825.pdf) · [Pololu DRV8825 carrier guide](https://www.pololu.com/product/2133)
