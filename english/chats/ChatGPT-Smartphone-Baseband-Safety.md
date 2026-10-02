# Smartphone Baseband Safety

**User:** Anonymous  
**Created:** 2026/10/2 6:48:07  
**Updated:** 2026/10/2 6:58:58  
**Exported:** 2026/10/2 7:13:33  
**Link:** [<https://chatgpt.com/c/6abf3786-9ce4-83ed-b670-2e3a45f34e2f>](https://chatgpt.com/c/6abf3786-9ce4-83ed-b670-2e3a45f34e2f)

## Prompt:

10/2/2026, 6:54:02 AM

do you know mobile phones ("smartphones") which are actually safe/resistant against baseband chip attacks? because most mobile phones (especially "consumer grade" mobile phones) have this "backdoor by design" where the baseband chip (LTE modem, 5G modem) has access to the system memory (RAM), which is an absolute worst case in terms of security, because that gives "root access" to the baseband chip, and any sophisticated attacker has full access to the mobile phone via the LTE/5G network...

what about the mobile phones from pinephone? for example the pine64. i know that these phones have a "security switch" for the baseband chip, but that sounds like: if i enable the baseband chip, then it still has full access to my system memory...

a simple workaround i can think of: i have two mobile phones, one phone is acting as a "router" between the mobile network (LTE or 5G) and my other phone, and my other phone has no baseband chip, and both phones are connected via wifi or bluetooth, so the baseband chip in the "router" phone has no memory access to my other phone

do you have better ideas? do you know smartphones that are actually "safe"...? (i know, i have high expectations, higher than most people...)

## Response:

10/2/2026, 6:54:05 AM

> **Clarifying DMA risks**
>
> I’m correcting the misconception: a USB modem generally can’t directly control system memory through DMA, but it can attack the USB stack or a compromised router can target clients over the network. A separate modem-router with Ethernet and isolation offers stronger protection.
>
> **Searched 10 websites**
>
> Worked for 9s

You’re focusing on the right threat boundary: the key question is not merely whether a phone has a modem kill switch, but **whether the modem can DMA into application-processor memory** and what hardware/software isolation sits between them.

I’ll compare the realistic architectures—including PinePhone/Librem 5, modern Pixels, and your two-phone gateway idea—and distinguish “modem can be disabled” from genuine memory isolation.

Yes. Your threat model is technically well-founded, with one important correction:

> **“The baseband has DMA access to RAM” is not universally true, and “separate modem chip” by itself does not guarantee safety.**

What matters is the **memory-access architecture**: whether the modem can directly address application RAM, whether an IOMMU/SMMU restricts its DMA, and how much untrusted modem data the main OS kernel has to process.

### The architectures I'd distinguish

| Architecture | Modem → phone RAM | If modem is fully compromised | My assessment for your threat model |
|----|----|----|----|
| Conventional modern smartphone with no effective isolation | potentially broad DMA/shared RAM | potentially catastrophic | Bad |
| Modern Pixel + hardware IOMMU + hardened OS | restricted DMA | needs another exploit against the OS/modem interface | **Very strong** |
| PinePhone / PinePhone Pro | modem has its own RAM; communicates with host over USB | primarily attacks USB/modem interface | **Strong architecture, but other weaknesses** |
| Librem 5 | modem has its own RAM; USB connection | primarily attacks USB/modem interface | **Strong architecture** |
| Two-phone cellular gateway | modem is physically outside secure phone | modem has no physical path into secure phone RAM | **Excellent isolation** |
| Secure phone with cellular modem physically disabled + Wi-Fi/Ethernet gateway | same | cellular modem cannot attack secure phone directly | **Excellent** |

## 1. PinePhone is actually quite interesting

Your intuition about the PinePhone is somewhat backwards: **the modem kill switch isn't the main security feature you're interested in.**

The important part is the architecture.

The original PinePhone uses a **Quectel EG25-G**, which is itself a little computer: it has its own CPU, RAM and flash. PINE64 documents it as having 256 MiB RAM and 256 MiB flash. ([PINE64](https://pine64.org/documentation/General/PineModems/?utm_source=chatgpt.com))

The modem connects to the Allwinner A64 through **USB**, rather than sharing the A64's RAM bus. PINE64 explicitly describes the modem as almost completely isolated from the A64 system, with USB and I²S being the interfaces between them and no shared RAM or flash. ([PINE64](https://pine64.org/2020/01/24/setting-the-record-straight-pinephone-misconceptions/?utm_source=chatgpt.com))

So conceptually:

``` text
             cellular network
                    │
                    ▼
          ┌──────────────────┐
          │  Quectel EG25-G  │
          │                  │
          │ modem CPU        │
          │ modem RAM        │
          │ modem firmware   │
          └────────┬─────────┘
                   │
                 USB
                   │
                   ▼
          ┌──────────────────┐
          │   Allwinner A64  │
          │                  │
          │ Linux            │
          │ system RAM       │
          │ applications     │
          └──────────────────┘
```

That's **fundamentally different** from:

``` text
        cellular modem
             │
             │ shared memory / DMA
             ▼
       ┌──────────────┐
       │ system RAM   │
       │ Linux/Android│
       └──────────────┘
```

And PINE64's hardware documentation confirms that the modem is connected to an internal USB port of the A64. ([GitHub](https://github.com/lupyuen/pinephone-nuttx-usb?utm_source=chatgpt.com))

### But there is an important nuance

I would **not** say:

> "USB means the modem cannot DMA."

That's too strong.

The USB host controller itself performs DMA into system memory. A malicious USB device normally cannot simply specify an arbitrary physical RAM address in the way a PCIe device might, but a compromised USB device can attack the **USB host controller, USB protocol implementation, and kernel driver stack**.

So the security claim should really be:

> **A compromised EG25-G does not have the direct memory-access relationship that an integrated/shared-memory baseband can have. It has to cross the USB interface and compromise the host side.**

That's a substantially better security boundary.

PINE64 itself describes exactly this architectural separation, saying the modem has its own OS and that the only data contacts with the A64 are USB and I²S. ([PINE64](https://pine64.org/2020/01/24/setting-the-record-straight-pinephone-misconceptions/?utm_source=chatgpt.com))

There is even an interesting security trade-off here: the PinePhone's architecture is much easier to reason about than an integrated modem, but the **A64 is an old SoC and doesn't give you the sort of modern isolation/security architecture that a current Pixel does**.

------------------------------------------------------------------------

# 2. The Librem 5 uses essentially the architecture you're looking for

The Purism Librem 5 was deliberately designed around this problem.

Purism explicitly rejected putting the modem on the SoC's RAM bus. Their hardware documentation describes putting a conventional modem module on **USB specifically to isolate it from the application processor and its RAM**. ([Purism](https://puri.sm/posts/librem5-2018-09-hardware-report/?utm_source=chatgpt.com))

So:

``` text
             cellular
                │
                ▼
       ┌─────────────────┐
       │ cellular modem  │
       │ own CPU + RAM   │
       └────────┬────────┘
                │ USB
                │
       ═════════╪═════════
                │
       ┌────────▼────────┐
       │ i.MX8M SoC     │
       │ Linux           │
       │ system RAM      │
       └─────────────────┘
```

This is conceptually very close to what you're asking for.

Purism's own explanation explicitly contrasts this with conventional phones where the modem shares the RAM bus. ([Purism](https://puri.sm/posts/librem5-2018-09-hardware-report/?utm_source=chatgpt.com))

So if your primary criterion is:

> **"I want a cellular modem that is physically prevented from directly owning my application RAM"**

then **PinePhone and Librem 5 are much more interesting than most mainstream phones.**

------------------------------------------------------------------------

# 3. But there is an even more interesting option: modern Pixel + GrapheneOS

This may surprise you.

For your particular threat model, I would **not automatically choose PinePhone over a current Pixel**.

The current GrapheneOS documentation explicitly states that its officially supported devices have **baseband isolation using an IOMMU**, with modem memory access restricted to internal modem memory and explicitly shared regions. ([GrapheneOS](https://grapheneos.org/faq?utm_source=chatgpt.com))

And GrapheneOS explains the critical point very clearly:

> the modem being a separate processor isn't what makes it secure; **the IOMMU has to prevent it from DMAing into arbitrary system memory.** ([GrapheneOS](https://grapheneos.org/faq?utm_source=chatgpt.com))

That's exactly the distinction you're getting at.

The architecture is approximately:

``` text
                 Cellular network
                       │
                       ▼
              ┌─────────────────┐
              │    baseband     │
              │                 │
              │ compromised?    │
              └────────┬────────┘
                       │
                    DMA/IPC
                       │
                 ┌─────▼─────┐
                 │   IOMMU   │
                 └─────┬─────┘
                       │
              ONLY permitted
              memory regions
                       │
              ┌────────▼────────┐
              │ Android / GOS   │
              │ system memory   │
              └─────────────────┘
```

Therefore, a remotely exploited modem does **not automatically become kernel/root on the application processor**.

GrapheneOS explicitly says that a baseband compromise would need to be followed by another exploit against the OS-side modem interface to compromise the OS. ([GrapheneOS Discussion Forum](https://discuss.grapheneos.org/d/7126-baseband-questions?utm_source=chatgpt.com))

That is a **huge** difference from the threat model you're describing.

------------------------------------------------------------------------

# 4. Pixel 9/10 are particularly interesting

Google published a detailed description of its cellular-modem hardening work in 2024.

Google says the Pixel 9 represents its most hardened modem at that point, with things such as:

- bounds sanitization
- integer-overflow sanitization
- stack canaries
- control-flow integrity
- automatic stack initialization
- extensive sanitizer-based testing

and emphasizes that the cellular modem is exposed to untrusted cellular-network input. ([blog.google](https://security.googleblog.com/2024/10/pixel-proactive-security-cellular-modems.html?hl=el&utm_source=chatgpt.com))

And as of October 2026, GrapheneOS officially supports the **Pixel 10 family**, as well as current Pixel 9/8 devices. ([GrapheneOS](https://grapheneos.org/faq?utm_source=chatgpt.com))

So if I were building a phone specifically around your threat model today, I'd be looking very closely at:

**Pixel 10 + GrapheneOS**

rather than assuming that "open Linux phone = inherently safer."

The Pixel approach is essentially:

> "The modem is untrusted, therefore build hardware/software isolation so compromising it doesn't compromise Android."

That's exactly the security model you want.

------------------------------------------------------------------------

# 5. Your two-phone idea is even stronger

This part of your question is excellent.

You proposed:

``` text
                  cellular network
                         │
                         ▼
                ┌────────────────┐
                │ PHONE A        │
                │ cellular modem │
                │ compromised    │
                └───────┬────────┘
                        │ WiFi
                        │
                ┌───────▼────────┐
                │ PHONE B        │
                │ no cellular    │
                │ modem          │
                │ sensitive data │
                └────────────────┘
```

From a **baseband isolation** perspective, this is extremely clean.

The cellular modem in Phone A has no electrical connection to Phone B's RAM.

Even if:

``` text
cellular exploit
       ↓
baseband RCE
       ↓
modem root
       ↓
Phone A kernel compromise
```

the attacker still has to cross a **network boundary** to attack Phone B.

That's a much more conventional security problem.

And you can make it considerably stronger:

``` text
                  LTE / 5G
                     │
                     ▼
             ┌────────────────┐
             │ cellular       │
             │ gateway        │
             │                │
             │ modem          │
             │ firewall       │
             └───────┬────────┘
                     │
                Ethernet/WiFi
                     │
             ┌───────▼────────┐
             │ secure device  │
             │                │
             │ no cellular    │
             │ no modem       │
             └────────────────┘
```

The gateway should be treated as **untrusted**, just like an ISP router.

That means the secure device should not assume:

> "My router is trusted."

Instead:

> "My router is potentially hostile and provides Internet connectivity."

That's a very powerful architectural distinction.

------------------------------------------------------------------------

# 6. I would actually prefer Ethernet over Wi-Fi if you're going this far

If you're really pursuing the "assume the modem is hostile" model, I'd consider:

**5G/LTE modem → router → Ethernet → secure device**

rather than:

**5G/LTE modem → router → Wi-Fi → secure device**

because now you've eliminated another radio subsystem from the trusted computing base.

You could even have:

``` text
             Cellular
                │
                ▼
        ┌───────────────┐
        │ cheap 5G      │
        │ gateway       │
        │               │
        │ NOTHING       │
        │ important    │
        └───────┬───────┘
                │ Ethernet
                │
          ┌─────▼──────┐
          │ firewall   │
          └─────┬──────┘
                │
                ▼
       ┌─────────────────┐
       │ secure computer │
       │ / phone         │
       └─────────────────┘
```

The gateway can be considered disposable.

This is essentially the same philosophy used for high-assurance network architectures: **don't put an extremely complex, externally exposed protocol processor inside the security boundary containing your crown jewels.**

------------------------------------------------------------------------

# 7. There is another subtle advantage of the two-device approach

Even a perfectly IOMMU-isolated modem isn't completely harmless.

The attack surface is:

``` text
baseband
   ↓
modem ↔ modem driver
   ↓
kernel
   ↓
userspace
```

The modem has to communicate with the main OS somehow.

Therefore you still have:

- modem drivers
- IPC
- shared buffers
- AT command interfaces
- networking interfaces
- audio interfaces
- telephony services
- SIM interfaces
- firmware loading
- USB/PCIe interfaces

A sufficiently sophisticated attacker can potentially attack **the software that talks to the modem**.

GrapheneOS itself emphasizes this point: isolation isn't simply "put the modem behind a wall"; the OS still has a substantial attack surface associated with the modem interface. ([GrapheneOS](https://grapheneos.org/faq?utm_source=chatgpt.com))

With your two-phone architecture:

``` text
                 modem
                   │
              compromised
                   │
                   ▼
             Phone A OS
                   │
              network packets
                   │
             ┌─────▼─────┐
             │ firewall  │
             └─────┬─────┘
                   │
                   ▼
             Phone B OS
```

the boundary becomes a **normal network security boundary**, which is much easier to reason about.

------------------------------------------------------------------------

# 8. But there is a big caveat with PinePhone

I wouldn't buy a PinePhone merely because it has the physical modem switch.

The switch is excellent for:

> "I want the cellular hardware physically powered off."

It does **not** mean:

> "When the modem is on, the modem is unable to attack the application processor."

The actual advantage comes from the **separate modem + USB architecture**.

And there are other issues with the PinePhone security model. For example, its Wi-Fi/Bluetooth architecture is separate from the LTE modem, and the A64 is an older platform. PINE64 itself describes Wi-Fi as SDIO and Bluetooth as UART, while the cellular modem uses USB. ([PINE64](https://pine64.org/2020/01/24/setting-the-record-straight-pinephone-misconceptions/?utm_source=chatgpt.com))

So I'd distinguish:

### PinePhone

**Excellent:**

- physical modem kill switch
- physically separate modem
- modem has its own RAM
- USB isolation
- open hardware documentation
- Linux
- user-controlled software

**Less excellent:**

- old SoC
- relatively immature security architecture
- weaker hardware-backed security than modern Pixels
- modem firmware remains proprietary
- USB host stack is still part of the attack surface
- overall mobile security ecosystem is much less mature

So it isn't "the most secure phone" in an absolute sense.

------------------------------------------------------------------------

# 9. There's an interesting paradox here

Your instinct is:

> "I don't trust the modem, therefore I want the modem physically separated."

That's a very reasonable high-assurance design.

But modern Pixel security is basically:

> "We don't trust the modem either, therefore we put it behind an IOMMU and then harden everything around it."

And that can actually provide **more total security** than merely physically separating the modem, because the Pixel platform has substantially more sophisticated hardware isolation, memory protection, verified boot, exploit mitigations, firmware update infrastructure, etc.

GrapheneOS specifically says that **having a separate chip is orthogonal to isolation**. ([GrapheneOS](https://grapheneos.org/faq?utm_source=chatgpt.com))

That's probably the most important point in this whole discussion.

------------------------------------------------------------------------

# My shortlist for your particular threat model

If I interpret your requirement as:

> **"I want to survive a remotely exploitable LTE/5G baseband, without allowing that compromise to become compromise of the main operating system."**

I'd investigate these three architectures:

### A. **Pixel 10 + GrapheneOS**

Probably the most interesting **single-device** solution.

You get:

- hardware IOMMU baseband isolation
- modern ARM hardware security
- very strong OS hardening
- long security support
- modem exploit mitigations
- ability to reduce cellular attack surface
- no need for two phones

GrapheneOS currently officially supports Pixel 10/10 Pro/10 Pro XL/10 Pro Fold and other recent Pixels. ([GrapheneOS](https://grapheneos.org/faq?utm_source=chatgpt.com))

### B. **PinePhone / Librem 5**

Interesting if your priority is:

> **"I want the cellular modem physically separated from my main CPU/RAM."**

Both use the architecture you're thinking about, with the modem operating as an independent computer connected through USB. ([Purism](https://puri.sm/posts/librem5-2018-09-hardware-report/?utm_source=chatgpt.com))

### C. **Cellular gateway + modem-less secure phone**

If you're willing to sacrifice convenience, this is the architecture I would find most satisfying from a **strict isolation** perspective:

``` text
                 5G / LTE
                     │
                     ▼
          ┌────────────────────┐
          │ Cellular gateway   │
          │                    │
          │ modem = untrusted  │
          │ OS = untrusted     │
          └─────────┬──────────┘
                    │
                 firewall
                    │
                 Ethernet
                    │
          ┌─────────▼──────────┐
          │ Security-critical  │
          │ device             │
          │                    │
          │ NO CELLULAR MODEM  │
          └────────────────────┘
```

And I'd go one step further:

**don't use Bluetooth either.**

If you're genuinely operating at the security level implied by your question, I'd consider the Wi-Fi/Bluetooth chipset another externally exposed processor rather than automatically trusting it.

------------------------------------------------------------------------

## One particularly important conclusion

I **wouldn't phrase the requirement as "I need a phone where the modem has no access to RAM."**

I'd formulate it more precisely as:

> **"I need the cellular baseband to be an untrusted DMA-capable peripheral whose access to application memory is cryptographically/hardware-enforced to a minimal set of buffers, and whose compromise cannot directly compromise the application processor."**

That distinction separates the architectures that merely *look* secure from the ones that actually provide the security boundary you're looking for.

And yes: **your two-phone/gateway idea is a completely legitimate way to obtain an even stronger boundary.**

If you want, I can go one level deeper and do a **hardware-level comparison of PinePhone vs Librem 5 vs Pixel 8/9/10**, including **exact SoCs, modem connection (USB/PCIe/shared memory), IOMMU/SMMU, DMA paths, Wi-Fi/BT DMA, boot ROM/verified boot, modem firmware, and what happens after a hypothetical baseband RCE**. That would get very close to the kind of threat-model analysis you'd want for a genuinely high-assurance phone.

------------------------------------------------------------------------

**Sources:**

- [PineModems — General — PINE64](https://pine64.org/documentation/General/PineModems/?utm_source=chatgpt.com)
- [GitHub - lupyuen/pinephone-nuttx-usb: PinePhone USB Driver for Apache NuttX RTOS · GitHub](https://github.com/lupyuen/pinephone-nuttx-usb?utm_source=chatgpt.com)
- [Progress update from the Librem 5 hardware department – Purism](https://puri.sm/posts/librem5-2018-09-hardware-report/?utm_source=chatgpt.com)
- [Frequently Asked Questions \| GrapheneOS](https://grapheneos.org/faq?utm_source=chatgpt.com)
- [Baseband Questions - GrapheneOS Discussion Forum](https://discuss.grapheneos.org/d/7126-baseband-questions?utm_source=chatgpt.com)
- [Google Online Security Blog: Pixel's Proactive Approach to Security: Addressing Vulnerabilities in Cellular Modems](https://security.googleblog.com/2024/10/pixel-proactive-security-cellular-modems.html?hl=el&utm_source=chatgpt.com)

------------------------------------------------------------------------

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
