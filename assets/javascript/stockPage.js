document.addEventListener("DOMContentLoaded", () => {
    let costSpan = document.getElementById("estimate-cost__span");
    let creditSpan = document.getElementById("estimate-credit__span");
    let currentPrice = document.getElementsByName("current-price")[0].value;
    let title = document.querySelector('.titlePrice')
    let marketPrice = document.querySelector('.marketPrice')
    let marketPriceValue = document.createElement('h4')
    marketPriceValue.innerHTML = currentPrice
    title.innerHTML += ` - $${currentPrice}`
    marketPrice.appendChild(marketPriceValue)


    document.getElementById("number-shares__buy")
        .addEventListener('change', e => {
            let estimateCost = (e.target.value * currentPrice).toFixed(2);
            costSpan.innerHTML = `     $${estimateCost}`;
        });

    document.getElementById("number-shares__sell")
        .addEventListener('change', e => {
            let estimateCredit = (e.target.value * currentPrice).toFixed(2);
            creditSpan.innerHTML = `$${estimateCredit}`;
        });

    let buyTabButton = document.getElementById("buy-tab__button");
    let sellTabButton = document.getElementById("sell-tab__button");
    let buyForm = document.getElementById("transaction-form__buy");
    let sellForm = document.getElementById("transaction-form__sell");

    sellTabButton.addEventListener('click', e => {
        if(!buyForm.classList.contains("hidden") && sellForm.classList.contains("hidden")) {
            buyForm.classList.add("hidden");
            sellForm.classList.remove("hidden");
        }
    })

    buyTabButton.addEventListener("click", e => {
        if(!sellForm.classList.contains("hidden") && buyForm.classList.contains("hidden")) {
            sellForm.classList.add("hidden");
            buyForm.classList.remove("hidden");
        }
    });
});
