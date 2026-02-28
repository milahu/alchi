https://www.reddit.com/r/BCI/comments/1r8yral/measuring_personality_types_and_interpersonal/

# measuring personality types and interpersonal compatibility with EEG

i have created a hypothesis on interpersonal compatibility,
which i describe in my book
[Pallas. Who are my friends. Group composition by personality type](https://milahu.github.io/alchi/src/whoaremyfriends/whoaremyfriends.html)

so far, this is just a hypothesis,
with some anecdotal evidence,
but no serious scientific evaluation

the evaluation of my hypothesis poses two challenges

1. measuring personality types
2. measuring interpersonal compatibility

too many errors come from

- [self-report](https://en.wikipedia.org/wiki/Self-report_study): participants can lie to personality type questionnaires
- language-related misunderstanding: personality type questionnaires assume objective definitions of words, but different people have different subjective definitons of words
- [self-deception](https://en.wikipedia.org/wiki/Self-deception): unrealistic self-image, "living a lie", wishful thinking, behavior in low-stress settings ([pacifism](https://en.wikipedia.org/wiki/Pacifism)) (but personality type = typical stress response)

apparently there is some research
that found low to moderate correlations between EEG scans and personality traits

i dont have the money (about 1200 euros)
to buy all the hardware for this experiment,
so maybe someone who already owns the hardware
can conduct these experiments

## four personality types

1. type 1 = high stress reactivity + high recovery speed
2. type 2 = low stress reactivity + low recovery speed
3. type 3 = high stress reactivity + low recovery speed
4. type 4 = low stress reactivity + high recovery speed

see also: the strange situation

### metric 1: stress reactivity = stress-induced change in Alpha power and Beta power compared to baseline

- types 13 = large change = high stress reactivity = easy to distract = childish
- types 24 = small change = low stress reactivity = hard to distract = mature

### metric 2: recovery speed = how fast EEG returns to baseline after stress ends

- types 14 = high recovery speed = tough-minded = psychotic = masculine
- types 23 = low recovery speed = tender-minded = neurotic = feminine

### metric 3: synchrony between two brains

- higher synchrony = higher compatibility
- lower synchrony = lower compatibility

brain synchrony shows in

- synchronized alpha waves (8–12 Hz) in frontal regions (F3 F4 Fz)
- synchronized theta waves (4–8 Hz) in frontal and central regions (F3 F4 Fz C3 C4 Cz)

two participants interact, or at least are physically very close (eye contact, shaking hands, hugging). i assume that the two nervous systems can sense each other (RF sensing, aura, telepathy, subconscious) and there is not much need for active interaction.

active interaction could be: speaker and listener = teacher and student. person A tells a complex story, person B tries to listen and understand the story, and later reproduce the story as lossless as possible

effects appears within minutes.
true synchrony is stable over time

### metric 4: stress transfer

- upward regulation = escalation = low compatibility
- downward regulation = deescalation = high compatibility

problem: how to induce "stress"?
is physical proximity to an incompatible human enough stress?

#### Electrodermal activity

- high skin conductance = high stress = low compatibility
- low skin conductance = low stress = high compatibility

EDA = [Electrodermal activity](https://en.wikipedia.org/wiki/Electrodermal_activity)

aka: GSR = Galvanic Skin Response

Electrodermal activity offers higher time-resolution than Heart rate
(lower latency,
2 seconds in EDA versus 10 seconds in HRV)

Skin conductance =
sympathetic nervous system activation =
"fight or flight" response =
sweat gland activity increases =
skin becomes more electrically conductive =
emotional arousal =
threat detection =
anticipatory anxiety

### metric 5. Heart rate variability (HRV) synchrony

- higher synchrony = higher compatibility
- lower synchrony = lower compatibility

optional?
Heart rate offers lower time-resolution than Electrodermal activity

### metric 6: resting Heart rate variability (HRV)

- types 14 = high resting HRV = high recovery speed
- types 23 = low resting HRV = low recovery speed

## repeated pairings

example:
my thesis predicts:

- M1 and M2 are compatible
- M1 and M3 are incompatible

so we have a "three-body problem"

- M2 is in room A
- M3 is in room B
- M1 alternates between the rooms

expected result:
the alternations between compatible relation (M1 and M2)
and incompatible relation (M1 and M3)
correlate with the brain synchrony between the three brains

### speed dating

broad-first search

many persons, short time per person

only one person has EEG scanner

## hardware

3 times...

- EEG scanner 8-channel: 400 euros
  - [OpenBCI module 8-channel WiFi](https://www.alibaba.com/product-detail/One-set-of-OpenBCI-8-channel_1601281770688.html): 300 Euro (wireless operation is preferred for electrical isolation from the power grid)
  - [10x EEG electrode gold-plated 1.5m cable DIN 1.5mm plug](https://www.alibaba.com/product-detail/10pcs-Multicolor-Din-1-5mm-Female_1600232710963.html): 25 Euro (better: [silver electrodes](https://en.wikipedia.org/wiki/Silver_chloride_electrode))
  - [EEG head cap black](https://www.alibaba.com/product-detail/Smart-Health-Transcranial-Electrogram-Cap-for_1601523355047.html): 20 Euro
  - [8x Touch-Proof DIN 1.5mm male plug](https://www.alibaba.com/product-detail/DIN-1-5mm-Touch-Proof-Terminal_1601301159927.html): 15 Euro (required to [connect pin header and electrode cables](https://shop.openbci.com/products/touch-proof-electrode-cable-adapter))
- [Electrodermal activity sensor module + electrodes](https://wiki.seeedstudio.com/Grove-GSR_Sensor/): 10 Euro
- [Heart Rate sensor module](https://www.alibaba.com/product-detail/Keyestudio-XD-58C-Pulse-Sensor-Measurement_1601574934957.html): 2 Euro

challenges:

- connect EEG electrodes to human heads (use contact gel?) (use comb electrodes?)
- synchronize measurements between all devices
- [connect EDA sensor to OpenBCI module](https://openbci.com/forum/index.php?p=/discussion/156/gsr-openbci)
  - use AC current to drive the EDA sensor to avoid polarization of the EDA electrodes
  - no contact gel for the EDA electrodes
- [connect HRV sensor to OpenBCI module](https://docs.openbci.com/ThirdParty/Pulse_Sensor/Pulse_Sensor_Landing/)

## software

- [mne-python](https://github.com/mne-tools/mne-python)
- ...?

it would be nice to have some custom software
to plot all metrics of all participants on some display

joining metrics of all participants would require
a bluetooth/wifi network
with a shared clock signal for synchronization

the main node in this network
is broadcasting the clock signal to client nodes
and client nodes send their timestamped measurement data to the main node
so the main node can analyze and plot the measurement data

with a peer-to-peer network (client nodes talking to each other),
we could also measure the physical distance between nodes,
using ping latency as a proxy for physical distance,
so the system can correlate physical proximity and brain synchrony

## calibration of personality types

expected patterns of stress reactivity and recovery speed
can be established by measuring participants
who obviously fit into the two extreme body types:

- type 3 = endomorph = extreme broad, round face
- type 4 = ectomorph = extreme long, long face

## calibration of compatibility

expected patterns of brain synchrony
can be established by measuring stable romantic couples
who self-report a high relationship satisfaction

## see also

- [ChatGPT-Reliable-Personality-Tests.md](https://github.com/milahu/alchi/blob/master/english/chats/ChatGPT-Reliable-Personality-Tests.md#prompt-5)
- [alchi-types.html](https://milahu.github.io/alchi/src/alchi-types/alchi-types.html)

### studies based on EEG scans

hint: use `sci hub ru` to bypass paywalls

- [Neurocognitive correlates of liberalism and conservatism. Amodio 2007](https://doi.org/10.1038/nn1979)
- [The political (and physiological) divide: Political orientation, performance monitoring, and the anterior cingulate response. Weissflog 2013](https://doi.org/10.1080/17470919.2013.833549)
