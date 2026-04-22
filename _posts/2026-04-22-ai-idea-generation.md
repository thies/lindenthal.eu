---
layout: single
title: "Can AI be a PI? Mapping real estate research and testing AI idea generation"
date: 2026-04-22
categories: [research]
tags: [AI, real estate, working paper, idea generation, LLM]
header:
  teaser: /assets/images/umap_fig1b.png
---

*Under active development — findings and figures may change.*

AI is everywhere in academic research. Kobak et al. (2025, *Science Advances*) tracked words that language models overuse — "delve," "nuanced," "meticulous" — across 14 million biomedical abstracts and found at least 13.5% of 2024 papers were processed by an LLM. The same pattern shows up in the real estate literature, as a [quick replication on 100K real estate papers indexed by OpenAlex](https://www.lindenthal.eu/talks/talk-ai-re-research/#/2) shows.

That is the writing layer in the research process. The more consequential shift is deeper. A growing number of papers rely on AI not for drafting but for execution — work that could not exist without machine learning carrying out the core analysis. [Bartik, Gupta and Milo (2025)](https://doi.org/10.1257/jep.20241428) read thousands of municipal zoning codes and built regulation measures that no research team could produce by hand. [Calainho, van de Minne and Francke (2024)](https://doi.org/10.1111/1540-6229.12494) replaced linear hedonic models with ML on 30,000 New York transactions and showed systematic gains in out-of-sample accuracy. [Shen and Ross (2021)](https://doi.org/10.1016/j.jue.2020.103299) extracted a description-quality measure from MLS listing text that captures soft information about property quality invisible to structured data. [Leow and Lindenthal (2025)](https://doi.org/10.1111/1540-6229.12527) applied the Gu-Kelly-Xiu ML asset-pricing framework to REIT factor returns and showed substantial forecast improvements over OLS.

In each case, AI enables a measurement or prediction the research requires. Remove it and the paper disappears. But the role is still that of a skilled research assistant: executing tasks specified by a human. The PI — the person deciding what to study and why — remains human.


<div style="max-width:600px; margin: 2em auto;">
  <p style="text-align:center; font-size:0.85em; color:#555; margin-bottom:0.4em;">Core research competencies: AI vs human (self-assessment)</p>
  <canvas id="radar-chart" style="width:100%; max-height:420px;"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script>
(function() {
  var ctx = document.getElementById('radar-chart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Literature', 'Theory', 'Empirics', 'Getting Things Done', 'Quality Control', 'Innovation'],
      datasets: [
        {
          label: 'AI',
          data: [9, 8, 9, 8, 4, 4],
          backgroundColor: 'rgba(59,154,178,0.18)',
          borderColor: '#3B9AB2',
          borderWidth: 2.5,
          pointBackgroundColor: '#3B9AB2',
          pointRadius: 4
        },
        {
          label: 'Thies',
          data: [6, 7, 7, 6, 9, 9],
          backgroundColor: 'rgba(242,26,0,0.12)',
          borderColor: '#F21A00',
          borderWidth: 2.5,
          pointBackgroundColor: '#F21A00',
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0, max: 10,
          ticks: { stepSize: 2, font: { size: 12 }, backdropColor: 'transparent' },
          pointLabels: { font: { size: 14 } },
          grid: { color: '#ddd' },
          angleLines: { color: '#ddd' }
        }
      },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 13 }, boxWidth: 16 } }
      }
    }
  });
})();
</script>

AI outperforms human researcher in many dimension (speaking for myself, obviously). The question is whether it can shine higher up the value chain. Can LLMs suggest research topics that are genuinely innovative and plausibly doable — functioning more as a PI than as an RA? Do humans still have a competitive edge?

The new working paper tests this. I mapped the full published corpus of *Real Estate Economics* (1,676 articles, 1973–2026) and real-estate-relevant subsets of JREFE, JUE, AER, JF, and RFS into a shared semantic embedding space. The result is a coordinate system for the field — not a literature review, but a map. Against that map, I generated 1,499 research ideas under eight conditions, varying what context the model received: nothing, the full corpus, individual cluster seeds, methods borrowed from economics and finance, methods from psychology. Each idea was scored on atypicality (a measure of unusual knowledge combination that retroactively predicts citations) and mapped back into the research space.

The figure below shows where generated ideas land. Grey dots are the full corpus; blue dots are REE papers; red dots are AI-generated ideas. Condition A is naïve generation from training data alone. Condition F draws on methods and paradigms from economics and finance journals.

<div style="display:flex; gap:1.5em; flex-wrap:wrap; justify-content:center; margin: 2em 0;">
  <figure style="margin:0; text-align:center; max-width:340px;">
    <img src="/assets/images/ideas_umap_a_unconstrained.png" alt="Naïve generation (Condition A)" style="width:100%; border:1px solid #eee;">
    <figcaption style="font-size:0.8em; color:#555; margin-top:0.4em;">A: Naïve — no context provided</figcaption>
  </figure>
  <figure style="margin:0; text-align:center; max-width:340px;">
    <img src="/assets/images/ideas_umap_e_econ_unconstrained.png" alt="Econ/finance paradigm transfer (Condition F)" style="width:100%; border:1px solid #eee;">
    <figcaption style="font-size:0.8em; color:#555; margin-top:0.4em;">F: Paradigm transfer from economics &amp; finance</figcaption>
  </figure>
</div>

Methodological scaffolding moves ideas outward into less-explored territory. Topical scaffolding alone does not. The best ideas — particularly those generated through method transfer from economics and finance — score comparably to the median published paper on the citation-predictive criterion. Some land squarely on papers published twenty years ago, having rediscovered questions the field already answered. But that is also true of human research proposals.

There is an uncomfortable regularity in how AI gets adopted: if a system offers a plausible-looking shortcut for a task it was never designed for, people will happily use it anyway, and it takes a lot of effort to convince them of the limits. Researchers will use LLMs to generate research ideas. They already do. The useful question is not whether this is a misguided idea but what the machines actually serve them when they try — and under what conditions the output is worth anything. That is what this paper is about.

[**Working paper (PDF)**](/assets/papers/WP-AI-idea-generation.pdf) — [**Interactive idea explorer**](https://thies.github.io/idea-explorer/)
