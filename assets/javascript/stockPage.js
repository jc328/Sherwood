document.addEventListener("DOMContentLoaded", () => {
    let costSpan = document.getElementById("estimate-cost__span");
    let creditSpan = document.getElementById("estimate-credit__span");
    let currentPrice = document.getElementsByName("current-price")[0].value;
    let title = document.querySelector('.titlePrice')
    let marketPrice = document.querySelector('.marketPrice')
    let marketPriceValue = document.createElement('h4')
    let buysell = document.querySelector('.buysell')
    marketPriceValue.innerHTML = currentPrice
    marketPrice.appendChild(marketPriceValue)

    document.getElementById("number-shares__buy")
        .addEventListener('change', e => {
            let estimateCost = (e.target.value * currentPrice).toFixed(2);
            console.log(e.target.value)
            costSpan.innerHTML = `   $${estimateCost}`;

        });

    document.getElementById("number-shares__sell")
        .addEventListener('change', e => {
            let estimateCredit = (e.target.value * currentPrice).toFixed(2);
            creditSpan.innerHTML = `$${estimateCredit}`;

        });

    let buyButton = document.getElementById("buy-button")

    let buyTabButton = document.getElementById("buy-tab__button");
    let sellTabButton = document.getElementById("sell-tab__button");
    let buyForm = document.getElementById("transaction-form__buy");
    let sellForm = document.getElementById("transaction-form__sell");
    let estimatedCost = document.querySelector('.estimatedCost')

    sellTabButton.addEventListener('click', e => {
        // if(!buyForm.classList.contains("hidden") && sellForm.classList.contains("hidden")) {
        //     buyForm.classList.add("hidden");
        //     sellForm.classList.remove("hidden");
        // }
        buyButton.innerHTML = 'Submit Sell'
        buyButton.style.background = 'red'
        estimatedCost.innerHTML = 'Estimated Credit:'
        buysell.value = 'sell'
    })

    buyTabButton.addEventListener("click", e => {
        buyButton.innerHTML = 'Submit Buy'
        buyButton.style.background = '#77d42a'
        estimatedCost.innerHTML = 'Estimated Cost:'
        buysell.value = 'buy'
        if(!sellForm.classList.contains("hidden") && buyForm.classList.contains("hidden")) {
            sellForm.classList.add("hidden");
            buyForm.classList.remove("hidden");
        }
    });
});
