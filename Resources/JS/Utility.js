var document = document;

var primarySignals = {
    "Breakout Quality": null,
    "Volume Quality": null,
    "SMA 89 Daily": null,
    "OBV": null,
    "MACDs": null,
    "RSI": null,
    "Williams": null,
    "Accum/Dist": null
};

var chartPatterns = [
    "Double Top Reversal", "Double Bottom Reversal",
    "Head And Shoulders Top", "Head And Shoulders bottom",
    "Falling Wedge", "Rising Wedge", "Rounding Bottom",
    "Triple Top Reversal", "Triple Bottom Reversal",
    "Bump and Run Reversal", "Flag, Pennant",
    "Ascending Triangle", "Descending Triangle",
    "Rectangle", "Price Channel", "Measured Move - Bullish",
    "Measured Move - Bearish", "Cup and handle"
];


var stockName;
var selectedChartPatterns = [];
var primarySignalScore = 0;
var stockData = {};
var percentage;


function writeData(elem) {
    "use strict";
    var id = elem.id;
    stockData[id] = document.getElementById(id).value;
    console.log(stockData);
}

function getID(id) {
    "use strict";
    return document.getElementById(id);
}

function getName(name) {
    "use strict";
    return document.getElementById(name);
}

function printmsg(msg) {
    "use strict";
    return console.log(msg);

}

function getDate() {
    "use strict";
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    if (month.length !== 2) {
        month = "0" + month;
    }

    if (day.length !== 2) {
        day = "0" + day;
    }

    return "£-$-%".replace('£', day).replace('$', month).replace('%', year);
}

function selectChartPattern(btn) {
    "use strict";
    var target = getID('ChartPatterns');
    //Create Elements
    var li = document.createElement('li');
    var id = document.createAttribute('id');

    id.value = btn.id;
    li = function () {
        "use strict";
        li.setAttributeNode(id);
        li.innerText = id.toString();
        return li;
    };

    //CREATE LIST ITEM
    switch (btn.getAttribute('class')) {

        case ('btn btn-primary'):
            btn.setAttribute('class', 'btn btn-success checkboxButton');
            selectedChartPatterns.push(id.toString());
            target.appendChild(li);
            break;

        case ('btn btn-success'):
            btn.setAttribute('class', 'btn btn-primary checkboxButton');
            selectedChartPatterns.pop(id.toString());
            target.removeChild(li);
            break;
        default:
            return;
    }

    return selectedChartPatterns;
}

function setPrimarySignalScore(btn) {
    "use strict";
    var btnClass = btn.getAttribute('class');
    var id = btn.parentNode.id;
    var score = btn.innerText;

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
    "use strict";
    var alert = document.createElement('div');
    alert.setAttribute('class', 'alert alert-{type} alert-dismissible fade show'.replace('{type}', type));
    alert.setAttribute('role', 'alert');

    var alertTitle = document.createElement('strong');
    alertTitle.innerText = "{title}".replace('{title}', title);
    alert.appendChild(alertTitle);

    var alertMessage = document.createElement('a');
    alertMessage.innerText = "| {msg}".replace('{msg}', msg);

    alert.appendChild(alertMessage);
    var alertButton = document.createElement('button');
    alertButton.setAttribute('type', 'button');
    alertButton.setAttribute('class', 'close');
    alertButton.setAttribute('data-dismiss', 'alert');

    alertButton.setAttribute('aria-label', 'Close');
    alert.appendChild(alertButton);

    var alertSpan = document.createElement('span');
    alertSpan.setAttribute('aria-hidden', 'true');
    alertSpan.innerText = '&amp;times';
    alertButton.append(alertSpan);

    console.log('Alert Created', alert);

    return alert;
}

function updatePercentage(percent) {
    'use strict';

    var progressBar = document.getElementById('formProgressBar');
    var baseClass = 'progress-bar bg-success';
    progressBar.setAttribute('aria-volumenow', percent);
    progressBar.setAttribute('style', 'width:{p}%;'.replace('{p}', percent));

    var success = 'var(--success)';
    var warning = 'var(--warning)';
    var danger = 'var(--danger)';

}

document.onchange = function () {
    "use strict";
    var validInputs = document.entryForm.querySelectorAll('valid');
    var invalidInputs = document.entryForm.querySelectorAll('invalid');

    percentage = Math.round(validInputs.length / invalidInputs.length * 100);
    updatePercentage(percentage);

    for (var i; i < validInputs.length; i += 1) {
        var output = validInputs[i];
        printmsg(output);

    }
};
