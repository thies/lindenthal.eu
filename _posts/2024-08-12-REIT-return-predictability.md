---
title: "Finally, a working paper!"
date: 2024-08-12
header:
  teaser: "/assets/images/teaser/2024-reit-return-predictability.svg"
excerpt: "We add to the emerging literature on machine learning empirical asset pricing by
analyzing a comprehensive set of return prediction factors on REITs. We show that ma-
chine learning models are superior to traditional ordinary least square models and we
find that REIT investors experience significant economic gains when using machine
learning forecasts. Comparing to the stock market, we show that REITs are more pre-
dictable than stocks, and that the higher predictability is stable across time and across
industry types."
---

Large Language Models (LLM) forcefully demonstrate the potential of Machine Learning (ML) models in upending the way we work with text, language and documents. Since its launch in 2022, ChatGPT has become synonymous with a wonderfully capable, fast and untiring assistant. The technological revolution powered by ML has started to reshape our world many years earlier, though. In asset pricing, investors and academics apply ML to understand and distinguish between different components of expected returns, such as those due to systemic risk and idiosyncratic risk, as well as potential mispricing.

In this study, we build on the pioneering work of Gu et al. (2020) who combine a broad repertoire of machine learning methods with modern empirical asset pricing research to understand the dynamics of market risk premia for U.S. stock returns. Their results suggest that machine learning improves the description of expected returns. They find that portfolio performance improves most prominently among the more sophisticated machine learning models and are due in large part to non-linear predictor interactions that are missed by simpler methods. Researchers have replicated Gu et al. (2020)’s work in a number of specific xts. For example, Bianchi et al. (2021) employ machine learning methods to predict U.S. Treasury bond returns and find strong statistical evidence in favor of extreme trees and neural networks. Leippold et al. (2022) adds to the burgeoning financial machine learning literature by expanding to China, where they find that the predictability of the Chinese stock market is higher than that of the U.S. stock market (Gu et al. 2020) by a fewfold. Researchers have yet to apply the latest techniques in machine learning to REITs. Given the fundamental differences between stocks and real estate, such research is warranted.

Our study is motivated by two questions. First, do the findings of Gu et al. (2020), Bianchi et al. (2021) and Leippold et al. (2022) apply to the real estate market? If true, the implica- tion is that machine learning will aid in solving practical problems, such as market timing, portfolio choice, and risk management, justifying its role in public real estate markets.

Second, because of fundamental underlying differences between stocks and real estate, are there differences in the predictability of stock returns versus real estate returns? One hypothesis is that the larger heterogeneity in the stock market makes it a more natural candidate for machine learning techniques than REITs. Another hypothesis cited by Nelling and Gyourko (1998), who find that REITs have a low level of predictability compared to that of the stock returns, is that the REIT market has a smaller sample size of firms compared to the
general stock market, a numerical difference that has only grown bigger since 1998.

We conduct a large-scale empirical analysis, investigating 486 REITs over 30 years from 1990 to 2021. Our predictor set includes 94 firm-level characteristics for each REIT, interactions of each characteristic with eight macroeconomic time series variables, and 17 sector dummy variables, totaling 863 baseline signals. In our study, our benchmark ordinary least
squares (OLS) regression models using only size and book-to-market as predictors (OLS-2) and size, book-to-market and 12-month momentum as predictors (OLS-3) generate out-of-sample R<sup>2</sup>s of 0.36 and 0.31 percent per month respectively. When we expand the OLS panel model to include our set of 800+ predictors, predictability vanishes as evidenced by the R<sup>2</sup> dropping into negative territory. With so many parameters to estimate, this is not surprising.

Our first evidence that machine learning aids in return prediction in the real estate market emerges from the fact that principal component regression (PCR), which reduces the
dimension of the predictor set to a few linear combinations of predictors, pulls the out-of-sample R<sup>2</sup> into positive territory at 0.28 percent. Least absolute shrinkage and selection
operator (LASSO) and elastic net regularisation (ENet), which use parameter shrinkage and variable selection, further raise the out-of-sample R<sup>2</sup>s to 2.49 and 3.37 percent respectively.
Next, we expand the model to accommodate nonlinear predictive relationships via regression trees and neural networks. By allowing for nonlinearities, it further improves predictions. We find that random forests (RF), gradient boosted regression trees (GBRT) and extremely randomised trees (ERT) give out-of-sample R<sup>2</sup>s of 2.71, 2.70 and 4.52 percent respectively. The best neural network model produces out-of-sample R<sup>2</sup> of 5.01 percent.  Similar to Gu et al. (2020) and Bianchi et al. (2021), we also find that shallow learning outperforms deeper learning. In the case of REITs, neural network performance peaks at one hidden layer, in contrast to stock performance which peaks at three hidden layers (Gu et al. 2020) but similar to bond performance which peaks at one hidden layer (Bianchi et al. 2021).

Finally, we compare the predictive performance of machine learning techniques between real estate and stocks. In Gu et al. (2020), their best neural network NN3 has a monthly
out-of-sample R<sup>2</sup> of 0.40 percent, whereas our NN1’s R<sup>2</sup> of 5.01 percent is more than ten times higher. Gu et al. (2020)’s best regression tree model GBRT has a monthly out-of-sample 2R<sup>2</sup> of 0.34 percent, a figure that is much lower than our best regression tree model ERT’s R<sup>2</sup> of 4.52 percent. Noting that Gu et al. (2020)’s empirical analysis of the U.S. stock market spans from 1957 to 2016 while our period of study for REITs is from 1990 to 2021, we rerun the analysis on the stock market using the same time period (1990-2021). The qualitative conclusions are unchanged: REIT returns are more predictable than stock returns when using machine learning methods.

With R<sup>2</sup>s ranging from three to five percent, they translate to economic benefits in the real world. We compare a long-only value-weighted portfolio of REITs versus a long-only portfolio comprised of REITs with the highest machine-learning forecasts. The former has a Sharpe ratio of 0.49 while the latter has a Sharpe ratio of 0.60, an outperformance of 22 percent. If we look at portfolios constructed by mean-variance optimization, a long-short sample-based mean-variance portfolio has a Sharpe ratio of 0.18 while a long-short mean- variance portfolio incorporating machine learning forecasts has a Sharpe ratio of 0.54, a staggering outperformance of 200 percent. In short, if one has predictive ability, it can lead to significant economic gains.



<img src="/assets/images/teaser/2024-reit-return-predictability.svg" />

*Notes: The first two columns report monthly R<sub>oos</sub> for the entire panel of REITs and stocks using OLS with all variables (OLS), OLS using only size and book-to-market (OLS-2), OLS using only size, book-to-market, and 12-month momentum (OLS-3), least absolute shrinkage and selection operator (LASSO), elastic net (ENet), principal component regression (PCR), random forest (RF), gradient boosted regression trees (GBRT), extremely randomised trees (ERT), and neural networks with one to five layers (NN1–NN5). The third column displays the corresponding prediction performance for the U.S. stock market as presented in Gu et al. (2020). The fourth columns displays the out-of-sample performance for the U.S. bond market as presented in the corrigendum for Bianchi et al. (2021), for bonds with 13-24 months of maturity, and with forward rates and macroeconomic variables as forecasting variables. The last column displays the corresponding prediction performance for the Chinese stock market as presented in Leippold et al. (2022). All the numbers are expressed as a percentage.*


