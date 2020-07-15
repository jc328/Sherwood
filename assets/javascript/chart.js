google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

async function drawBasic() {
    let currentStock = document.getElementsByName("currentStock")[0].value;

    const priceRequest = await fetch(`/api/chart/price/${currentStock}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const price = await priceRequest.json()

    const priceDisplay = document.getElementById('current-price-span')

    priceDisplay.innerHTML = `$ ${price}`

    const intradayPriceRequest = await fetch(`/api/chart/intraday-prices/${currentStock}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const intradayPrice = await intradayPriceRequest.json()

    let rows = new Array();
    intradayPrice.forEach((price) => {
        let fullTime = price.minute;
        let hour = parseInt(fullTime.split(':')[0]);
        let minutes = parseInt(fullTime.split(':')[1]);

        if (minutes % 5 === 0 && price.average !== null) {
            rows.push([[hour, minutes, 0], price.average]);
        }
    })

    let data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time of Day');
    data.addColumn('number', 'Price');

    data.addRows(rows);

    let options = {
        scaleType: 'log',
        width: 680,
        height: 300,
        hAxis: {
            display: 'none'
        },
        vAxis: {
            display: 'none'
        },
        focusTarget: 'category',
        crosshair: {
            orientation: 'vertical',
            trigger: 'focus'
        },
    };

    let chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    function changePrice(data, row) {
        // TODO: Fix price, it is currently off slightly
        const selectedPrice = chart.getChartLayoutInterface().getVAxisValue(row).toFixed(2);
        if (selectedPrice) {
            priceDisplay.innerHTML = `$ ${selectedPrice}`
        }
    }

    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'onmouseover', (event) => {
        changePrice(data, event.row);
    });

}
