google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

// Re-draws chart every 5 min
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

async function drawBasic() {
    const priceDisplay = document.getElementById('current-price-span');
    const diffDisplay = document.getElementById('percent-diff');

    let currentStock = document.getElementsByName("currentStock")[0].value;

    const intradayPriceRequest = await fetch(`/api/chart/intraday-prices/${currentStock}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const intradayPrice = await intradayPriceRequest.json()

    let rows = new Array();
    let prices = new Array();
    intradayPrice.forEach((price) => {
        if (price.average) {
            let formattedPrice = parseFloat(price.average.toFixed(2));
            rows.push([price.minute, formattedPrice, price.label]);
            prices.push(formattedPrice);
        }
    })

    let startPrice = prices[0];

    let ratio = '100%';

    let lastRowPrice = rows[rows.length - 1][1];
    let firstRowPrice = rows[0][1];
    let lineColor = (lastRowPrice > firstRowPrice) ? "#00C805" : "#E64800";

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
            baseline: startPrice,
            baselineColor: 'lightgrey',
            logscale: true,
            gridlines: {
                count: 0
            },
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
        colors: [lineColor],
    };

    let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    let currentLastPrice = data.cache[data.cache.length - 1][1].We;
    priceDisplay.innerHTML = `$ ${currentLastPrice}`
    currentLastPrice = Number(currentLastPrice.replace(",", ""));
    diffDisplay.innerHTML = calcPercentDiff(firstRowPrice, currentLastPrice);

    function changePrice(data, row) {
        const selectedTime = data.cache[row][0].We;
        let selectedPrice = data.cache[row][1].We;
        if (selectedPrice && selectedTime) {
            priceDisplay.innerHTML = `$ ${selectedPrice}`
        }
        selectedPrice = Number(selectedPrice.replace(",", ""));
        diffDisplay.innerHTML = calcPercentDiff(firstRowPrice, selectedPrice);
    }

    google.visualization.events.addListener(chart, 'onmouseover', (event) => {
        changePrice(data, event.row);
    });

    google.visualization.events.addListener(chart, 'onmouseout', (event) => {
        priceDisplay.innerHTML = `$ ${currentLastPrice}`
        diffDisplay.innerHTML = calcPercentDiff(firstRowPrice, currentLastPrice);
    });
}
