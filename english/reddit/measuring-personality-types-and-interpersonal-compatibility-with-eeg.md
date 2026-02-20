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

- self-report: participants can game personality type questionnaires
- language: personality type questionnaires assume objective definitions of words
- self-deception: unrealistic self-image, "living a lie"

apparently there is some research
that found low to moderate correlations between EEG scans and personality traits

i dont have the money (about 4000 euros)
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

problem: what is "stress"? how to induce "stress" in only one person?

### metric 5. Heart rate variability (HRV) synchrony

- higher synchrony = higher compatibility
- lower synchrony = lower compatibility

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

## hardware

- 3 EEG devices
  - based on OpenBCI?
  - how many channels are needed? 6 channels? (F3 F4 Fz C3 C4 Cz)
  - about 1000 eur each
- 3 chest straps for HRV scanning
  - about 100 eur each

challenge: synchronize measurements between all devices

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

with a peer-to-peer network,
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
