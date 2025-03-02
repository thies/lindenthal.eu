---
title: "New Paper: Enhancing Real Estate Investment Trust (REIT) Return Forecasts via Machine Learning"
date: 2025-02-20
header:
  teaser: "/assets/images/teaser/2024-reit-return-predictability.svg"
excerpt: "Paper forthcoming in Real Estate Economics: We add to the emerging literature on machine learning empirical asset pricing by analyzing a comprehensive set of return prediction factors on REITs. We show that machine learning models are superior to traditional ordinary least square models and we find that REIT investors experience significant economic gains when using machine learning forecasts. Comparing to the stock market, we show that REITs are more predictable than stocks, and that the higher predictability is stable across time and across industry types."
---

<h3><a href="https://onlinelibrary.wiley.com/doi/full/10.1111/1540-6229.12527">DOWNLOAD PDF HERE</a></h3>

<br>


In a study recently published in *Real Estate Economics*, Kahshin Leow and I explore how machine learning (ML) techniques can partially predict the returns of Real Estate Investment Trusts (REITs). Their findings reveal that ML models significantly outperform traditional regression techniques, presenting opportunities for investors seeking better market timing and portfolio allocations.

### Key Findings

* Machine Learning Beats Traditional Models
    - Traditional ordinary least squares (OLS) models fail to capture complex interactions in REIT return prediction. Expanding the OLS model with over 800 predictors leads to poor performance, whereas ML models thrive with high-dimensional data.
* Principal Component Regression (PCR) improves predictability slightly, but advanced ML techniques like LASSO, Elastic Net (ENet), regression trees, and neural networks (NNs) provide much stronger results.
* REIT Returns Are More Predictable Than Stocks
    - Contrary to prior research, REITs exhibit significantly higher predictability than stocks, with ML models achieving up to 12 times greater predictive accuracy.
    - Regression tree models and neural networks perform exceptionally well, with the best-performing neural network (NN1) achieving an out-of-sample R² of 5.01%, compared to 0.40% for the best stock market models.
    - The predictability has faded since ~2015, coinciding with the proliferation of ML models and strategies in the industry. In efficient markets, one would expect an arms race in which investors seek an edge from ever-improving data and algorithms.
* Predictability Varies by REIT Type
    - Large REITs are more predictable than smaller ones.
    -  Sector specialization enhances predictability, with retail, healthcare, and residential REITs showing higher forecast accuracy than diversified REITs.
* ML Models Adapt to Market Conditions
    - ML models successfully learn from past crises. While they struggled during the 2007–2008 financial crisis, they performed exceptionally well in 2020, likely due to their ability to recognize and adapt to market downturn patterns.

As financial markets continue to evolve with the rise of AI and big data, the role of ML in asset pricing will only grow. This paper serves as a crucial step in demonstrating how cutting-edge technology can unlock new insights and drive superior investment performance in the real estate sector.

This study highlights the immense potential of ML in empirical asset pricing for REITs. By leveraging ML models, investors can improve risk management, optimize portfolios, and make more informed real estate investment decisions. Additionally, the research underscores the need for further exploration into ML applications in real estate finance, particularly in understanding the fundamental drivers of REIT predictability.


<img src="/assets/images/teaser/2024-reit-return-predictability.svg" />

*Notes: The first two columns report monthly R<sub>oos</sub> for the entire panel of REITs and stocks using OLS with all variables (OLS), OLS using only size and book-to-market (OLS-2), OLS using only size, book-to-market, and 12-month momentum (OLS-3), least absolute shrinkage and selection operator (LASSO), elastic net (ENet), principal component regression (PCR), random forest (RF), gradient boosted regression trees (GBRT), extremely randomised trees (ERT), and neural networks with one to five layers (NN1–NN5). The third column displays the corresponding prediction performance for the U.S. stock market as presented in Gu et al. (2020). The fourth columns displays the out-of-sample performance for the U.S. bond market as presented in the corrigendum for Bianchi et al. (2021), for bonds with 13-24 months of maturity, and with forward rates and macroeconomic variables as forecasting variables. The last column displays the corresponding prediction performance for the Chinese stock market as presented in Leippold et al. (2022). All the numbers are expressed as a percentage.*


