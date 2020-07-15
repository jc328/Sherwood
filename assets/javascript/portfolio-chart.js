google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);
setInterval(async function() {
    await drawBasic();
    // console.log('rEDRAW')
}, 300000);

async function drawBasic() {
    const balanceDisplay = document.getElementById('current-balance__text');

    balanceDisplay.innerHTML = 'oop';

    //TODO REFACTOR FOR PORTFOLIO
    let lastRowPrice = rows[rows.length - 1][1];
    let firstRowPrice = rows[0][1];
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
