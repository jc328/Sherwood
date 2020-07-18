google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

async function drawBasic() {
    // TODO Change to get the stock from each stock owned
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
            if ((price.minute).endsWith('0') || (price.minute).endsWith('9')) {
                rows.push([price.minute, formattedPrice]);
            }
            prices.push(formattedPrice);
        }
    })

    let startPrice = prices[0];

    let lastRowPrice = rows[rows.length - 1][1];
    let firstRowPrice = rows[0][1];
    let lineColor = (lastRowPrice > firstRowPrice) ? "#00C805" : "#E64800";

    let data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');

    data.addRows(rows);

    let options = {
        enableInteractivity: false,
        backgroundColor: 'transparent',
        tooltip: {
            isHtml: true,
            ignoreBounds: true,
            trigger: 'focus',
        },
        chartArea: {
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        },
        width: 60,
        height: 25,
        hAxis: {
            gridlines: {
                count: 0
            }
        },
        vAxis: {
            baseline: startPrice,
            baselineColor: 'lightgrey',
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

    let chart = new google.visualization.LineChart(document.getElementById('mini-chart'));
    chart.draw(data, options);
}
