# Crypto Energy Consumption

**User:** Milan Hauth (<milahu@gmail.com>)  
**Created:** 2026/2/3 15:04:09  
**Updated:** 2026/2/3 15:13:14  
**Exported:** 2026/2/14 18:26:19  
**Link:** [<https://chatgpt.com/c/69820028-a1bc-8332-bf9d-950516e8ba10>](https://chatgpt.com/c/69820028-a1bc-8332-bf9d-950516e8ba10)

## Prompt:

what is the energy consumption of different cryptocurrencies per transaction?

i know:  
Nano (XNO) - about 0.0693 Wh per transaction  
Bitcoin (BTC) - about 1215 kWh per transaction

source:  
<https://nanocharts.info/nano-energy-comparison/>

try to find the energy consumption per transaction of some popular coins:  
XMR  
Ethereum  
Solana  
USDT  
Litecoin  
Cardano  
Bitcoin Cash  
Tron  
XRP

## Response:

Here are **estimates of energy consumption per transaction** for several popular cryptocurrencies — based on publicly available research and reports. ⚠️ *These figures are approximate and vary widely depending on methodology (network throughput, total energy use, consensus model, and time period). They are best interpreted as rough comparisons rather than precise measurements.*

| Cryptocurrency | Approx. Energy per Transaction | Notes / Source |
|----|----|----|
| **Nano (XNO)** | ~0.0693 Wh (~0.0000693 kWh) | From your source. |
| **Bitcoin (BTC)** | ~1,135 kWh – 1,375 kWh (~1,135,000 – 1,375,000 Wh) | Very high; PoW mining scales energy with difficulty. [SolarTech+1](https://solartechonline.com/blog/most-energy-efficient-cryptocurrency-guide-2025/?utm_source=chatgpt.com) |
| **Ethereum (ETH)** | ~0.03 kWh (30 Wh) | After transition to Proof-of-Stake (PoS); \>99% reduction vs PoW. [SolarTech](https://solartechonline.com/blog/most-energy-efficient-cryptocurrency-guide-2025/?utm_source=chatgpt.com) |
| **Solana (SOL)** | ~0.00051 kWh (~0.51 Wh) | PoS/PoH consensus, among lowest per-tx in major chains. [SolarTech](https://solartechonline.com/blog/most-energy-efficient-cryptocurrency-guide-2025/?utm_source=chatgpt.com) |
| **XRP (XRP)** | ~0.0079 kWh (7.9 Wh) | One of the most energy-efficient chains. [SolarTech+1](https://solartechonline.com/blog/most-energy-efficient-cryptocurrency-guide-2025/?utm_source=chatgpt.com) |
| **Cardano (ADA)** | ~0.0516 kWh (51.6 Wh) | PoS network with low energy use. [SolarTech](https://solartechonline.com/blog/most-energy-efficient-cryptocurrency-guide-2025/?utm_source=chatgpt.com) |
| **Litecoin (LTC)** | ~18.5 kWh | PoW network much more energy-intensive than PoS chains. [techjury.net](https://techjury.net/research/cryptocurrency-energy-consumption/?utm_source=chatgpt.com) |
| **Bitcoin Cash (BCH)** | ~19 kWh | Also PoW (uses Satoshi-derived SHA-256 mining similar to LTC/BTC). [techjury.net](https://techjury.net/research/cryptocurrency-energy-consumption/?utm_source=chatgpt.com) |
| **Monero (XMR)** | Estimates vary widely (possibly **\>20 kWh to hundreds of kWh**) | Because XMR is PoW and fewer transactions per block, some rough studies suggest per-tx is high but methodology varies; a very rough energy-based “per tx” calculation can be tens of kWh or more. [Monero Stack Exchange](https://monero.stackexchange.com/questions/12620/how-much-energy-per-transaction?utm_source=chatgpt.com) |
| **USDT (Tether)** | Not a native blockchain; energy depends on network used | USDT doesn’t have its own blockchain — it runs on others (ETH, Tron, Solana, etc.). On **Tron**, transfers burn TRX-blockchain “energy units”, not direct kWh. [support.token.im](https://support.token.im/hc/en-us/articles/27669064968729-Want-Low-Cost-Transfer-of-Tron-USDT-Don-t-Miss-This-Energy-Guide?utm_source=chatgpt.com) |
| **TRON (TRX)** | Not usually measured in kWh — uses bandwidth/energy units (~6–13 TRX) | TRON’s “energy” model is different — these are resource units used for transaction fees, not direct electricity measurements; converting to actual kWh is non-standard. [support.token.im](https://support.token.im/hc/en-us/articles/27669064968729-Want-Low-Cost-Transfer-of-Tron-USDT-Don-t-Miss-This-Energy-Guide?utm_source=chatgpt.com) |

### Notes & Context

- **Proof-of-Work (PoW) vs Proof-of-Stake (PoS):** PoW networks like Bitcoin, Litecoin, Bitcoin Cash and historically Monero require miners to run energy-intensive hardware; their *per-transaction* energy is high because the network uses continuous global mining to secure blocks. PoS and other consensus mechanisms (used by Ethereum, Cardano, Solana, XRP, Nano) avoid this and consume far less energy per transaction. [daytrading.com](https://www.daytrading.com/cryptocurrency/greenest-cryptos?utm_source=chatgpt.com)
- **USDT energy use is not inherent:** Tether (USDT) is a *token* on various blockchains (Ethereum, Tron, Solana, BNB Chain etc.). Its “energy per transaction” depends entirely on the host chain’s energy profile — there’s no fixed USDT figure. [Wikipedia](https://en.wikipedia.org/wiki/Tether_%28cryptocurrency%29?utm_source=chatgpt.com)
- **Methodology varies:** Some estimates compute *network energy / transactions per year* and attribute that to each transaction; others measure transaction resource usage (like Tron “energy units”), which don’t map directly to electrical energy consumption in Wh. Therefore, figures should be seen as **indicative rather than exact**.

### Rounded Comparison (kWh per TX)

- **Ultra-efficient (low energy):** Solana ~0.0005, XRP ~0.008, Nano ~0.00007, Cardano ~0.05, Ethereum (PoS) ~0.03. [SolarTech](https://solartechonline.com/blog/most-energy-efficient-cryptocurrency-guide-2025/?utm_source=chatgpt.com)
- **Moderate (PoW lightweight or older estimates):** Litecoin & Bitcoin Cash ~18–19. [techjury.net](https://techjury.net/research/cryptocurrency-energy-consumption/?utm_source=chatgpt.com)
- **High (traditional PoW):** Bitcoin ~1,100+ kWh, Monero possibly tens+ kWh (varies). [CoinLaw+1](https://coinlaw.io/bitcoin-energy-consumption-statistics/?utm_source=chatgpt.com)

If you want, I can convert all of these into **Wh values per transaction** on a single table and normalize them for easier comparison. Would that be helpful?

## Prompt:

If you want, I can convert all of these into \*\*Wh values per transaction\*\* on a single table and normalize them for easier comparison. Would that be helpful? \![\](<https://www.google.com/s2/favicons?domain=https://monero.stackexchange.com&sz=32>) \![\](<https://www.google.com/s2/favicons?domain=https://techjury.net&sz=32>) \![\](<https://www.google.com/s2/favicons?domain=https://solartechonline.com&sz=32>) Sources

yes

## Response:

Here’s a **normalized table** showing the *approximate energy consumption per transaction* (in **watt-hours, Wh**) for various popular cryptocurrencies. These estimates come from multiple studies comparing network energy use and transaction volume (note: numbers vary by methodology and year — see sources). [CoinLaw+1](https://coinlaw.io/bitcoin-energy-consumption-statistics/?utm_source=chatgpt.com)

| **Cryptocurrency** | **Estimated Energy per Transaction (Wh)** | **Consensus Type / Notes** |
|----|----|----|
| **Nano (XNO)** | ~0.0693 Wh | Very low by design (block-lattice) |
| **Solana (SOL)** | ~0.166 Wh (~0.000166 kWh) | PoS/PoH; high throughput & low energy per tx [MDPI](https://www.mdpi.com/1996-1073/16/18/6610?utm_source=chatgpt.com) |
| **XRP (XRPL)** | ~7.9 Wh | Efficient federated consensus [MDPI](https://www.mdpi.com/1996-1073/16/18/6610?utm_source=chatgpt.com) |
| **Ethereum (ETH)** | ~30 Wh – 35 Wh | PoS (post-Merge) efficiency, much lower than PoW [CoinLaw](https://coinlaw.io/bitcoin-energy-consumption-statistics/?utm_source=chatgpt.com) |
| **Cardano (ADA)** | ~51.6 Wh | PoS consensus, low energy [MDPI](https://www.mdpi.com/1996-1073/16/18/6610?utm_source=chatgpt.com) |
| **Litecoin (LTC)** | ~18,500 Wh (18.5 kWh) | PoW, more energy intense [Reddit](https://www.reddit.com/r/dogecoin/comments/nc4tvw?utm_source=chatgpt.com) |
| **Bitcoin Cash (BCH)** | ~19,000 Wh (19 kWh) | PoW, similar to Litecoin/BTC family [Reddit](https://www.reddit.com/r/dogecoin/comments/nc4tvw?utm_source=chatgpt.com) |
| **Bitcoin (BTC)** | ~1,135,000 Wh (1,135 kWh) – ~1,215,000 Wh | Very high PoW network energy usage [CoinLaw](https://coinlaw.io/bitcoin-energy-consumption-statistics/?utm_source=chatgpt.com) |
| **Monero (XMR)** | ~399,000 Wh (~400 kWh) *(older study)* | PoW; rough estimate based on total network model [MDPI](https://www.mdpi.com/1996-1073/16/18/6610?utm_source=chatgpt.com) |
| **Tron (TRX)** | *Not directly in Wh* | Uses bandwidth/“energy units” for tx fees — not directly measured in electricity |
| **USDT (Tether)** | *Varies by host chain* | USDT runs on other blockchains — energy depends on that chain (e.g., Ethereum, Tron, Solana) |

### Notes on Methodology

**Why these numbers vary widely**

- **PoW vs PoS:** Proof-of-Work (e.g., Bitcoin, Litecoin, Monero) secures networks via energy-intensive mining, so per-transaction figures are large. Proof-of-Stake and similar mechanisms (Ethereum PoS, Solana, Cardano, XRP) avoid mining and thus are orders of magnitude more efficient. [CoinLaw+1](https://coinlaw.io/bitcoin-energy-consumption-statistics/?utm_source=chatgpt.com)
- **Calculation differences:** Many studies compute *network-wide energy / total yearly transactions*. That treats every transaction equally even though blockchains consume similar energy whether they process few or many transactions — so per-tx figures are only approximations, not precise measurements. [EU Blockchain Observatory and Forum](https://blockchain-observatory.ec.europa.eu/document/download/4e612a85-eac1-44fd-b7b6-bf97e51abaea_en?filename=Energy+Efficiency+of+Blockchain+Technologies_1_0.pdf&prefLang=fi&utm_source=chatgpt.com)
- **Monero’s uncertainty:** Precise Monero per-transaction energy usage isn’t widely published; one older study estimated ~399,576 Wh per tx based on 2018 data. [MDPI](https://www.mdpi.com/1996-1073/16/18/6610?utm_source=chatgpt.com)

### Quick Interpretation (Wh per txn)

- **Ultra-low energy:** Nano, Solana, XRP — \<10 Wh
- **Low-moderate:** Ethereum (PoS), Cardano — ~30–50 Wh
- **Moderate-high:** Litecoin, Bitcoin Cash — ~10⁴–10⁵ Wh
- **Very high:** Bitcoin — ~10⁶ Wh
- **Variable / uncertain:** Monero, Tron, USDT (host chain)

If you want, I can also provide *relative comparisons* (e.g., how many Visa or Google searches these transactions equal in energy) to give more context. Would that be useful?

------------------------------------------------------------------------

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
