# Medical Device Isolation

**User:** Milan Hauth (<milahu@gmail.com>)  
**Created:** 2026/2/23 18:54:18  
**Updated:** 2026/2/23 19:06:17  
**Exported:** 2026/2/23 19:10:51  
**Link:** [<https://chatgpt.com/c/699c9449-aaec-832f-954e-31f98230c698>](https://chatgpt.com/c/699c9449-aaec-832f-954e-31f98230c698)

## Prompt:

how do medical devices  
solve the problem of electrical circuit isolation  
between the power grid  
and electrodes connected to a human body  
for example EEG electrodes connected to a human head

i assume they use 3 components:

1.  "analog" power supply with inductive coupling  
    (no switch-mode power supply)  
    cost:  
    such an "analog" power supply is less efficient  
    because it always draws the same amount of power  
    in its primary circuit  
    no matter how much power is needed  
    in the secondary circuit

2.  fuse in the secondary circuit  
    of the analog power supply  
    to limit the damage  
    if something goes wrong in the secondary circuit

3.  optical coupling of digital signals  
    between the ADC module (OpenBCI board)  
    and the data analysis module (computer)  
    so the data analysis module  
    can use a normal switch-mode power supply  
    and only the ADC module  
    is connected to the "analog" power supply

...is that correct?

## Response:

You’re thinking in the right direction (galvanic isolation is absolutely central), but **medical devices don’t rely on “analog power supplies + fuse + optocouplers” specifically**. Modern systems use a broader, standardized isolation architecture designed to meet strict safety standards like **IEC 60601-1**.

Here’s how it actually works.

------------------------------------------------------------------------

# The real solution: galvanic isolation barriers

Medical devices create an **isolation barrier** between:

- the **patient-connected circuitry** (EEG electrodes, ECG leads, etc.)
- and the **mains-connected circuitry** (computer, grid power, etc.)

This barrier prevents dangerous current from flowing through the patient.

Isolation is achieved using **three main technologies**:

| Function | Isolation method |
|----|----|
| Power transfer | Isolated DC-DC converter |
| Signal transfer | Isolation amplifiers / digital isolators / optocouplers |
| Physical safety backup | Insulation, creepage distance, protection components |

------------------------------------------------------------------------

# 1. Power isolation: not linear transformer supplies, but isolated DC-DC converters

Your assumption here is slightly outdated.

Modern devices **do NOT use inefficient linear transformer supplies**.

They use:

**isolated switch-mode DC-DC converters**

These include:

- high-frequency transformer inside
- reinforced insulation
- certified medical isolation rating

Example:

Input side:

- 5 V from USB

Output side:

- isolated 5 V powering EEG front-end

Isolation rating:

- 4 kV or more

Efficiency:

- 70–90%

So:

- efficient
- compact
- safe

------------------------------------------------------------------------

Important point:

Even though it's a switching converter, the **transformer provides galvanic isolation**.

------------------------------------------------------------------------

# 2. Signal isolation: multiple technologies used

You mentioned optical coupling — that’s one option, but not the only one.

Modern devices often use:

### Option A: Digital isolators (very common now)

Example manufacturers:

- Analog Devices
- Texas Instruments
- Silicon Labs

They use:

- capacitive isolation
- or magnetic isolation

Advantages over optocouplers:

- faster
- more reliable
- less aging
- lower power

Isolation rating:

- 2.5 kV to 6 kV

------------------------------------------------------------------------

### Option B: Optocouplers (older but still used)

Signal path:

LED → light → photodiode

Provides isolation.

------------------------------------------------------------------------

### Option C: Isolation amplifiers (for analog signals)

Used when analog signals must cross isolation barrier.

EEG devices often avoid this by placing ADC near electrodes.

------------------------------------------------------------------------

# 3. The most important protection is actually THIS:

# Very large input resistors

This is critical and often overlooked.

Each electrode typically connects through:

**100 kΩ to 10 MΩ resistor**

Purpose:

Limit maximum current into patient.

Example calculation:

Worst case:

240 V mains accidentally appears.

With 1 MΩ resistor:

Current:

240 V / 1 MΩ = 0.24 mA

This is below dangerous levels.

------------------------------------------------------------------------

This is REQUIRED by IEC 60601-1.

------------------------------------------------------------------------

# 4. Isolation is layered (multiple safety layers)

Medical devices use multiple independent protections:

Layer 1:

Isolation DC-DC converter

Layer 2:

Digital isolator

Layer 3:

High-value resistors

Layer 4:

Physical spacing on PCB

Layer 5:

Insulation materials

Layer 6:

Current limiting

Layer 7:

Battery operation (common in EEG)

------------------------------------------------------------------------

# 5. Battery powered front-end is very common

Many EEG systems use:

battery powered headstage

Benefits:

No direct connection to mains at all.

Computer connection is isolated.

Example:

OpenBCI boards use this approach.

------------------------------------------------------------------------

# 6. Fuses are NOT the primary patient protection

Fuses protect:

device from fire

NOT patient from shock.

Reason:

Fuses react too slowly.

Medical safety relies on:

current limiting resistors  
and isolation

------------------------------------------------------------------------

# 7. There is a strict current limit standard

IEC 60601-1 defines:

Maximum allowed leakage current:

Typical limits:

Patient leakage current:

Normal condition:

≤ 10 µA

Single fault condition:

≤ 50 µA

This is extremely small.

------------------------------------------------------------------------

# 8. The most important architectural principle

Critical design rule:

**The ADC is placed on the patient side of isolation**

Architecture:

Patient side:

- electrodes
- amplifier
- ADC
- isolated power

Isolation barrier

Non-patient side:

- USB
- computer
- mains power

This prevents analog signal crossing barrier.

Only digital data crosses.

------------------------------------------------------------------------

# 9. Typical EEG isolation architecture diagram

Patient side:

Electrodes  
↓  
Amplifier  
↓  
ADC  
↓  
Digital isolator  
↓  
Computer

Power:

Isolated DC-DC converter powers patient side.

------------------------------------------------------------------------

# 10. Your summary corrected

Your list:

1.  Analog power supply  
    → Not necessarily linear  
    → Instead isolated DC-DC switching converter
2.  Fuse  
    → Not primary safety  
    → Current limiting resistors are critical
3.  Optical coupling  
    → Yes, but often replaced by digital isolators

------------------------------------------------------------------------

# 11. The MOST important safety components ranked

Priority order:

1.  Isolation barrier (DC-DC converter + digital isolator)
2.  Input current limiting resistors
3.  PCB spacing and insulation
4.  Battery operation
5.  Certified medical isolation components

Fuse is much less important for patient safety.

------------------------------------------------------------------------

# 12. Why isolation is so strict for EEG

Because electrodes connect directly to brain.

Even tiny currents can:

- disturb signals
- or cause harm

------------------------------------------------------------------------

# 13. Summary in one sentence

Medical devices isolate patients using:

isolated DC-DC power + digital isolation + current-limiting resistors + strict physical insulation — NOT simply analog supplies and optocouplers.

------------------------------------------------------------------------

# If you want, I can also explain:

why EEG front-ends use extremely high impedance amplifiers (10 GΩ)  
and how they still remain safe

This is a fascinating design problem.
