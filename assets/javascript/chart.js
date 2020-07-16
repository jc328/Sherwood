google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

// Re-draws chart every 5 min
setInterval(async function() {
    await drawBasic();
}, 300000);

async function drawBasic() {
    let currentStock = document.getElementsByName("currentStock")[0].value;

    const priceDisplay = document.getElementById('current-price-span');

    // const priceRequest = await fetch(`/api/chart/price/${currentStock}`, {
    //     method: 'get',
    //     headers: { 'Content-Type': 'application/json' }
    //     })
    // const recentPrice = await priceRequest.json();

    // priceDisplay.innerHTML = `$ ${recentPrice.toFixed(2)}`

    const intradayPriceRequest = await fetch(`/api/chart/intraday-prices/${currentStock}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        })
    const intradayPrice = await intradayPriceRequest.json()

    let rows = new Array();
    let prices = new Array();
    intradayPrice.forEach((price) => {
        let fullTime = price.minute;
        let hour = parseInt(fullTime.split(':')[0]);
        let minutes = parseInt(fullTime.split(':')[1]);
        let label = price.label;
        if (minutes % 5 === 0 && price.average) {
            let formattedPrice = parseFloat(price.average.toFixed(2));
            rows.push([[hour, minutes, 0], formattedPrice, label]);
            prices.push(formattedPrice);
        }
    })

    let maxPrice = Math.max(...prices);
    let minPrice = Math.min(...prices);

    let ratio = '100%';

    let lastRowPrice = rows[rows.length - 1][1];
    let firstRowPrice = rows[0][1];
    let lineColor = (lastRowPrice > firstRowPrice) ? "#00C805" : "#E64800";
    console.log(lineColor)

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
        scaleType: 'linear',
        chartArea: {
            left: 0,
            top: 0,
            width: ratio,
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
            },
            viewWindow: {
                max: maxPrice,
                min: minPrice
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
        const selectedPrice = data.cache[row][1].We;
        if (selectedPrice && selectedTime) {
            priceDisplay.innerHTML = `$ ${selectedPrice}`
        }
    }

    let currentLastPrice = data.cache[data.cache.length - 1][1].We;
    priceDisplay.innerHTML = `$ ${currentLastPrice}`

    google.visualization.events.addListener(chart, 'onmouseover', (event) => {
        changePrice(data, event.row);
    });

    google.visualization.events.addListener(chart, 'onmouseout', (event) => {
        priceDisplay.innerHTML = `$ ${currentLastPrice}`
    });
}
