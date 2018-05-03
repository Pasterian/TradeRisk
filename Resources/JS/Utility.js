let inputs = ["StockName",
              "StockDate",
              "ChartType"];

let primarySignals = {
    "Breakout Quality": null,
    "Volume Quality": null,
    "SMA 89 Daily": null,
    "OBV": null,
    "MACDs": null,
    "RSI": null,
    "Williams": null,
    "Accum/Dist": null
};

let chartPatterns = [
    "Double Top Reversal", "Double Bottom Reversal",
    "Head And Shoulders Top", "Head And Shoulders bottom",
    "Falling Wedge", "Rising Wedge", "Rounding Bottom",
    "Triple Top Reversal", "Triple Bottom Reversal",
    "Bump and Run Reversal", "Flag, Pennant",
    "Ascending Triangle", "Descending Triangle",
    "Rectangle", "Price Channel", "Measured Move - Bullish",
    "Measured Move - Bearish", "Cup and handle"
];


let stockName;
let selectedChartPatterns = [];
let primarySignalScore = 0;
let stockData = {};
let percentage;

function writeData(elem) {
    let id = elem.id;
    stockData[id] = document.getElementById(id).value;
    console.log(stockData);
}

function getID(id) {
    return document.getElementById(id);
}

function getName(name) {
    return document.getElementById(name);
}

function l(msg) {
    return console.log(msg);

}
function getDate() {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    if (month.length !== 2) {
        month = "0" + month;
    }

    if (day.length !== 2) {
        day = "0" + day;
    }

    return "£-$-%".replace('£', day).replace('$', month).replace('%', year);
}

function selectChartPattern(btn) {
    let target = getID('selectedPatterns');
    //Create Elements
    let li = document.createElement('li');
    let id = document.createAttribute('id');

    id.value = btn.id;
    li = function() {
        li.setAttributeNode(id);
        li.innerText = id.toString();
        return li;
    };


    //CREATE LIST ITEM
    switch (btn.getAttribute('class')) {

        case('btn btn-primary'):
            btn.setAttribute('class', 'btn btn-success');
            selectedChartPatterns.push(id.toString());
            target.appendChild(li);
            break;

        case('btn btn-success'):
            btn.setAttribute('class', 'btn btn-primary');
            selectedChartPatterns.pop(id.toString());
            target.removeChild(li);
            break;
        default:
            return;
    }

    return selectedChartPatterns;
}

function setPrimarySignalScore(btn) {
    let btnClass = btn.getAttribute('class');
    let id = btn.parentNode.id;
    let score = btn.innerText;

    switch (btnClass) {
        case "btn btn-primary":
            if (!primarySignals.includes(id)) {
                primarySignals[btn.parentNode.id] = score;
                primarySignalScore += btn.innerText;
            }

            btn.setAttribute('class', 'btn btn-success');
            break;

        case "btn btn-success":
            primarySignalScore -= score;
            primarySignals.removeItem(id);
            break;

        default:
            return;
    }

    getID('primarySignalsTotal').innerHTML = "<p><b>$/20</b></p>".replace('$', primarySignalScore);
}


function createAlert(type, title, msg) {
    let alert = document.createElement('div');
    alert.setAttribute('class', 'alert alert-{type} alert-dismissible fade show'.replace('{type}', type));
    alert.setAttribute('role', 'alert');

    let alertTitle = document.createElement('strong');
    alertTitle.innerText = "{title}".replace('{title}', title);
    alert.appendChild(alertTitle);

    let alertMessage = document.createElement('a');
    alertMessage.innerText = "| {msg}".replace('{msg}', msg);

    alert.appendChild(alertMessage);
    let alertButton = document.createElement('button');
    alertButton.setAttribute('type', 'button');
    alertButton.setAttribute('class', 'close');
    alertButton.setAttribute('data-dismiss', 'alert');

    alertButton.setAttribute('aria-label', 'Close');
    alert.appendChild(alertButton);

    let alertSpan = document.createElement('span');
    alertSpan.setAttribute('aria-hidden', 'true');
    alertSpan.innerText = '&amp;times';
    alertButton.append(alertSpan);

    console.log('Alert Created', alert);

    return alert;
}

function updatePercentage(percent) {
    'use strict';

    let progressBar = document.getElementById('formProgressBar');
    let baseClass = 'progress-bar progress-bar-striped progress-bar-animated ';
    progressBar.setAttribute('aria-volumenow', percent);
    progressBar.setAttribute('style', 'width:{p}%;'.replace('{p}', percent));
    progressBar.innerText="{p}% Complete".replace('{p}', percent);

    let success = 'var(--success)';
    let warning = 'var(--warning)';
    let danger = 'var(--danger)';

    progressBar.classList = baseClass;

    let quarter = Boolean(percent >= 25);
    let half = Boolean(percent >= 50);
    let third = Boolean(percent >= 75);

if(quarter) {
    l('danger');
    progressBar.style.backgroundColor = danger;

}

if(half) {
    l('warning');
    progressBar.style.backgroundColor = warning;

}

if(third) {
    l('success')
    progressBar.style.backgroundColor = success;



}

}

document.onchange = function() {
    "use strict";
        let validInputs = document.entryForm.querySelectorAll('input:valid');
        let invalidInputs = document.entryForm.querySelectorAll('input:invalid');

        percentage = Math.round(validInputs.length / invalidInputs.length * 100);
        updatePercentage(percentage);

    };

/*
FUNCTION SetAnswer:

ON CLICK:
    IF BTN IS NOT ALREADY ACTIVE:
        ADD NAME AND VALUE TO DICT
        CHANGE COLOR
    IF ACTIVE:
        REMOVE CURRENT PRESSED FROM DICT
        CHANGE TO ORIGINAL COLOR
        ADD NEW STATE TO DICT
*/
