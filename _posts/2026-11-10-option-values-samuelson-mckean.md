---
layout: single
title: "Option Values: Samuelson-McKean approach"
date: 2026-11-10
categories: [teaching]
tags: [real options, land value, valuation, teaching]
excerpt: "An interactive chart: how volatility, yields and construction costs shape the value of undeveloped land as an American call option."
---

Vacant land is a call option: the owner has the right, but not the obligation, to pay the construction cost *K* and receive a built property worth *V*. Because the owner can build at any time, this is an *American* option without expiry, and it can be priced with the classic formula for perpetual American warrants by Paul Samuelson and Henry McKean ([Samuelson, 1965](https://doi.org/10.1007/978-3-319-22237-0_11), with McKean's mathematical appendix).

Move the sliders to see how the land value (blue) changes, and when it becomes optimal to develop (the dashed line). Tick "Compare σ<sub>V</sub>" to add a second land value curve with a different volatility (green).

<div class="smck" data-sigma="15" data-yv="8" data-rf="5" data-gk="1" data-k="100" data-sigma2="20"></div>
<noscript><p><em>This chart needs JavaScript.</em></p></noscript>

## The formula

With *y<sub>V</sub>* the cash yield of the built property (its cap rate), *σ<sub>V</sub>* the volatility of property values, *r<sub>f</sub>* the risk-free rate and *g<sub>K</sub>* the real growth rate of construction costs:

- "Construction yield": *y<sub>K</sub>* = *r<sub>f</sub>* &minus; *g<sub>K</sub>*
- Option elasticity: *η* = [ *y<sub>V</sub>* &minus; *y<sub>K</sub>* + *σ<sub>V</sub>*²/2 + √( (*y<sub>K</sub>* &minus; *y<sub>V</sub>* &minus; *σ<sub>V</sub>*²/2)² + 2 *y<sub>K</sub>* *σ<sub>V</sub>*² ) ] / *σ<sub>V</sub>*²
- Optimal development trigger (hurdle value): *V\** = *K* · *η* / (*η* &minus; 1)
- Land value: *C*<sub>0</sub> = (*V\** &minus; *K*) (*V*<sub>0</sub> / *V\**)<sup>*η*</sup> while *V*<sub>0</sub> &lt; *V\**, and *V*<sub>0</sub> &minus; *K* (build now!) above the trigger.

## Things to try

- **Volatility.** More uncertainty makes the option to wait more valuable: land value rises, and the development trigger *V\** moves to the right. Developers wait for a larger cushion before they build.
- **Asset yield.** A higher yield on the built property means you forgo more income by waiting, so it pays to build earlier.
- **Construction cost growth.** If costs are expected to rise quickly, waiting becomes expensive too.
- **Elasticity.** Below the trigger, a 1% change in property values moves land values by *η*%. Land is a leveraged bet on the property market, and its values are much more volatile than those of built property.

The assumptions behind the formula (frictionless, efficient markets; property values following a random walk; known and constant volatility) are strong for real estate. Treat the numbers as a benchmark, not a price.

## References

- Samuelson, P. A. (1965). Rational Theory of Warrant Pricing. *Industrial Management Review*, 6(2), 13–31. With McKean, H. P. Jr. (1965). Appendix: A Free Boundary Problem for the Heat Equation Arising from a Problem in Mathematical Economics. *Industrial Management Review*, 6(2), 32–39. Reprinted in *Henry P. McKean Jr. Selecta*, Springer 2015: [doi:10.1007/978-3-319-22237-0_11](https://doi.org/10.1007/978-3-319-22237-0_11).
- Geltner, D., Miller, N., Van de Minne, A., Eichholtz, P., Lindenthal, T. & Shen, J. [*Commercial Real Estate Analysis for Investment, Finance, and Development*](https://www.routledge.com/Commercial-Real-Estate-Analysis-for-Investment-Finance-and-Development/Geltner-Miller-VanDeMinne-Eichholtz-Lindenthal-Shen/p/book/9781041076391) (4th ed., 2026), on real options and land valuation.

<style>
.smck-wrap { display: flex; flex-wrap: wrap; gap: 1em; margin: 1.5em 0; }
.smck-svg { width: 100%; height: auto; flex: 1 1 100%; font-family: inherit; }
.smck-tick { font-size: 17px; fill: #222; }
.smck-axt, .smck-note { font-size: 21px; font-weight: bold; fill: #004586; }
.smck-panel { flex: 1 1 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); column-gap: 1.5em; font-size: 0.8em; line-height: 1.25; }
.smck-panel label { display: grid; grid-template-columns: 1fr auto; margin: 0 0 0.6em; font-weight: normal; cursor: pointer; }
.smck-panel .smck-val { font-weight: bold; color: #004586; }
.smck-panel input[type=range] { grid-column: 1 / span 2; width: 100%; margin: 4px 0 0; padding: 0; border: 0; box-shadow: none; background: none; accent-color: #004586; }
.smck-panel input[type=checkbox] { width: auto; margin: 0 0.3em 0 0; }
.smck-panel .smck-cmp input[type=range] { accent-color: #579d1c; }
.smck-panel input[type=range]:disabled { opacity: 0.35; }
.smck-out { grid-column: 1 / -1; border-top: 1px solid #ccc; padding-top: 0.5em; margin-bottom: 0.5em; }
.smck-reset { justify-self: start; font-size: 0.9em; padding: 0.2em 1em; cursor: pointer; }
</style>
<script src="{{ '/assets/js/samuelson-mckean.js' | relative_url }}"></script>
