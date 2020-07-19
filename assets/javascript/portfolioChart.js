google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

// Re-draw the chart every 5 minutes
setInterval(async function() {
    await drawBasic();
}, 300000);

function calcPercentDiff(first, current) {
    let trueDiff = (current - first).toFixed(2);
    let diffPercent = ((trueDiff / first) * 100).toFixed(2);
    let plusMinus = (trueDiff >= 0) ? "+" : "-";
    let diff = Math.abs(trueDiff);
    diffPercent = Math.abs(diffPercent);
    return `${plusMinus}$${diff} (${plusMinus}${diffPercent}%) Today`;
};

async function aggregatePrice (transaction) {
    const intradayPriceRequest = await fetch(`/api/chart/intraday-prices/${transaction.symbol}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const intradayPrice = await intradayPriceRequest.json();

    let tempArr = [transaction.share_quantity];

    for(let i = 0; i < intradayPrice.length - 1; i++) {
        if(!intradayPrice[i].average) {
            intradayPrice[i].average = intradayPrice[i - 1].average;
        }
        tempArr.push(intradayPrice[i].average);
    }
    return tempArr;
};

async function drawBasic() {
    const balanceDisplay = document.getElementById('current-balance__text');
    const diffDisplay = document.getElementById('percent-diff');

    // This is hardcoded to get transactinos for user #2 ""
    const user = document.getElementsByName("uId")[0];
    const cashBalanceRequest = await fetch(`/api/balance/${user.value}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const cashBalance = await cashBalanceRequest.json();

    const transactionsRequest = await fetch(`/api/transactions/${user.value}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const transactionsTestUser = await transactionsRequest.json();

    const intradayTimeRequest = await fetch(`/api/chart/intraday-prices/AAPL`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const intradayTime = await intradayTimeRequest.json()

    let agg = new Array();
    if (transactionsTestUser.length === 0) {
        for(let i = 0; i < intradayTime.length; i++) {
            agg.push(Number(cashBalance));
        }
    }
    let userStocks = new Array();

    transactionsTestUser.forEach(uStock => {
        userStocks.push(aggregatePrice(uStock));
    })

    await Promise.all(userStocks).then(val => {
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
    console.log(agg)
    let rows = new Array();
    for (let i = 0; i < intradayTime.length; i++) {
        rows.push([intradayTime[i].minute, agg[i], intradayTime[i].label]);
    }

    let ratio = `${(agg.length / 390) * 100}%`;
    let lastRowBalance = agg[agg.length - 1];
    let firstRowBalance = agg[0];
    let lineColor = (lastRowBalance >= firstRowBalance) ? "#00C805" : "#E64800";

    let data = new google.visualization.DataTable();
    data.addColumn('string', '');
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
            width: ratio,
            height: '100%'
        },
        width: 680,
        height: 300,
        hAxis: {
            gridlines: {
                count: 0
            }
        },
        vAxis: {
            baseline: firstRowBalance,
            baselineColor: 'pink',
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

    function changePrice(data, row) {
        const selectedTime = data.cache[row][0].We;
        let selectedPrice = data.cache[row][1].We;
        if (selectedPrice && selectedTime) {
            balanceDisplay.innerHTML = `$ ${selectedPrice}`
        }
        selectedPrice = Number(selectedPrice.replace(",", ""));
        diffDisplay.innerHTML = calcPercentDiff(firstRowBalance, selectedPrice);
    }

    let currentBalance = data.cache[data.cache.length - 2][1].We;
    balanceDisplay.innerHTML = `$ ${currentBalance}`;
    diffDisplay.innerHTML = calcPercentDiff(firstRowBalance, lastRowBalance);

    google.visualization.events.addListener(chart, 'ready', (event) => {
        balanceDisplay.innerHTML = `$ ${currentBalance}`
    });
    google.visualization.events.addListener(chart, 'onmouseover', (event) => {
        changePrice(data, event.row);
    });

    google.visualization.events.addListener(chart, 'onmouseout', (event) => {
        balanceDisplay.innerHTML = `$ ${currentBalance}`;
        diffDisplay.innerHTML = calcPercentDiff(firstRowBalance, lastRowBalance);
    });
}
