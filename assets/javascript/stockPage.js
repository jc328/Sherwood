document.addEventListener("DOMContentLoaded", () => {
    let investInSelect = document.getElementById("invest-in");
    let tradeInput = document.getElementById("shares-or-dollars");

    investInSelect.addEventListener('change', e => {
        if (event.target.value === 'Dollars') {
            tradeInput.innerHTML = "DOLLARS"
        } else if (event.target.value === "Shares") {
            tradeInput.innerHTML = "Shares"
        }
    })
});
