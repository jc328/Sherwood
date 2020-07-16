google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

// Re-draw the chart every 5 minutes
// setInterval(async function() {
//     await drawBasic();
// }, 300000);
async function aggregatePrice (transaction) {
    let symbol = transaction.symbol;
    let shares = transaction.share_quantity;

    const intradayPriceRequest = await fetch(`/api/chart/intraday-prices/${symbol}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const intradayPrice = await intradayPriceRequest.json();

    let tempArr = new Array();
    tempArr.push(shares)
    intradayPrice.forEach(thing => {
        if( (thing.minute).endsWith("0") ||
            (thing.minute).endsWith("5")) {
            tempArr.push(thing.average);
        }
    })

    return tempArr;
}

async function drawBasic() {
    const balanceDisplay = document.getElementById('current-balance__text');

    const transactionsRequest = await fetch(`/api/transactions/2`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const transactionsTestUser = await transactionsRequest.json();

    let stonks = new Array();

    transactionsTestUser.forEach(stonk => {
        stonks.push(aggregatePrice(stonk));
    })

    // This is hardcoded to get transactinos for user #2 ""
    const cashBalanceRequest = await fetch(`/api/balance/2`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const cashBalance = await cashBalanceRequest.json();
    // console.log(cashBalance)
    let agg = new Array();

    await Promise.all(stonks).then(val => {
        val.forEach(ele => {
            let shar = ele.shift();

            for (let i = 0; i < ele.length; i++) {
                let current = ele[i];

                if (i >= agg.length) {
                    agg.push((current * shar) + Number(cashBalance));
                } else {
                    agg[i] += ((current * shar) + Number(cashBalance));
                }
            }
        });
    });

    balanceDisplay.innerHTML = `$ ${agg[0].toFixed(2)}`;

    let rows = new Array();
    const intradayPriceRequest = await fetch(`/api/chart/intraday-prices/AAPL`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const intradayPrice = await intradayPriceRequest.json()
    for (let i = 0; i < intradayPrice.length; i++) {
        let fullTime = intradayPrice[i].minute;
        let hour = parseInt(fullTime.split(':')[0]);
        let minutes = parseInt(fullTime.split(':')[1]);
        let label = intradayPrice[i].label;
        if (fullTime.endsWith(0) || fullTime.endsWith(5)) {
            rows.push([[hour, minutes, 0], agg[i], label]);
        }
    }

    // TODO REFACTOR FOR PORTFOLIO
    let lastRowPrice = agg[agg.length - 1];
    let firstRowPrice = agg[0];
    let lineColor = (lastRowPrice > firstRowPrice) ? "#00C805" : "#E64800";

    let data = new google.visualization.DataTable();
    data.addColumn('timeofday', '');
    data.addColumn('number', '');
    data.addColumn({type: 'string', role: 'tooltip'})

    data.addRows(rows);

    let options = {
        backgroundColor: 'transparent',
        tooltip: {
            isHtml: true,
            ignoreBounds: true,
            trigger: 'focus',
        },
        scaleType: 'log',
        chartArea: {
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        },
        width: 680,
        height: 300,
        hAxis: {
            textPosition: 'none',
            gridlines: {
                count: 0
            }
        },
        vAxis: {
            textPosition: 'none',
            gridlines: {
                count: 0
            }
        },
        focusTarget: 'category',
        crosshair: {
            orientation: 'vertical',
            trigger: 'focus',
            color: 'grey'
        },
        legend: {
            position: 'none'
        },
        colors: [lineColor]
    };

    let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    // TODO REFACTOR FOR PORTFOLIO
    function changePrice(data, row) {
        const selectedTime = data.cache[row][0].We;
        const selectedPrice = data.cache[row][1].We;
        if (selectedPrice && selectedTime) {
            balanceDisplay.innerHTML = `$ ${selectedPrice}`
        }
    }

    let currentLastPrice = data.cache[data.cache.length - 1][1].We;
    balanceDisplay.innerHTML = `$ ${currentLastPrice}`

    google.visualization.events.addListener(chart, 'onmouseover', (event) => {
        changePrice(data, event.row);
    });

    google.visualization.events.addListener(chart, 'onmouseout', (event) => {
        balanceDisplay.innerHTML = `$ ${lastRowPrice.toFixed(2)}`
    });
}

//THIS IS ALL SET FOR TEST USER
// document.addEventListener("DOMContentLoaded", async () => {
//     const cashBalanceRequest = await fetch(`/api/balance/2`, {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json' }
//         })
//     const cashBalance = await cashBalanceRequest.json();

//     const runningBalanceSpan = document.getElementById('current-balance__text');

//     const transactionsRequest = await fetch(`/api/transactions/2`, {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json' }
//         })
//     const transactionsTestUser = await transactionsRequest.json();

//     let stonks = new Array();

//     async function aggregatePrice (transaction) {
//         let symbol = transaction.symbol;
//         let shares = transaction.share_quantity;
//         const intradayPriceRequest = await fetch(`/api/chart/intraday-prices/${symbol}`, {
//             method: 'get',
//             headers: { 'Content-Type': 'application/json' }
//             })
//         const intradayPrice = await intradayPriceRequest.json();

//         let tempArr = new Array();
//         tempArr.push(shares)
//         intradayPrice.forEach(thing => {
//             if( (thing.minute).endsWith("0") ||
//                 (thing.minute).endsWith("5")) {
//                 tempArr.push(thing.average);
//             }
//         })

//         return tempArr;
//     }

//     transactionsTestUser.forEach(stonk => {
//         stonks.push(aggregatePrice(stonk));
//     })

//     let agg = new Array();

//     Promise.all(stonks).then(val => {
//         val.forEach(ele => {
//             let shar = ele.shift();

//             for (let i = 0; i < ele.length; i++) {
//                 let current = ele[i];

//                 if (i >= agg.length) {
//                     agg.push(current * shar);
//                 } else {
//                     agg[i] += (current * shar);
//                 }
//             }
//         });
//     });
// });
