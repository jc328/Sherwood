google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

async function drawBasic() {
    let currentStock = document.getElementsByName("currentStock")[0].value;

    const priceRequest = await fetch(`/api/chart/price/${currentStock}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const price = await priceRequest.json();

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
        let label = price.label;
        // rows.push([[hour, minutes, 0], price.average, label]);
        if (minutes % 5 === 0 && price.average) {
            let formattedPrice = parseFloat(price.average.toFixed(2));
            rows.push([[hour, minutes, 0], formattedPrice, label]);
        }
    })
    console.log(intradayPrice)
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
    };

    let chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    function changePrice(data, row) {
        // TODO: Fix price, it is currently off slightly
        const selectedTime= data.cache[row][0].We;
        const selectedPrice = data.cache[row][1].We;
        if (selectedPrice && selectedTime) {
            priceDisplay.innerHTML = `$ ${selectedPrice}`
        }
    }

    chart.draw(data, options);
    // google.visualization.events.addListener(chart, 'ready', (event) => {

    // });
    google.visualization.events.addListener(chart, 'onmouseover', (event) => {
        changePrice(data, event.row);
    });

}
