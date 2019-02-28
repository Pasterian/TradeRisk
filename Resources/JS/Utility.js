var document = document;
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

function EmbedImage(url) {
    "use strict";

    var elem = document.getElementById('ChartImage');
    var modalElem = document.getElementById('ModalImage');
    var image = "<div class='container'> <img id='EmbeddedImage' class='img-fluid rounded' src='{}'><div>".replace('{}', url);
    elem.innerHTML = image;
    modalElem.innerHTML = image;


}

document.onchange = function () {
    "use strict";

    selectedChartPatterns = [];
    $('#ChartPatterns input:checked').each(function () {
        selectedChartPatterns.push($(this).innerText);
    });

    console.log(selectedChartPatterns);
    var validInputs = document.entryForm.querySelectorAll('valid');
    var invalidInputs = document.entryForm.querySelectorAll('invalid');

    percentage = Math.round(validInputs.length / invalidInputs.length * 100);
    updatePercentage(percentage);

    for (var i; i < validInputs.length; i += 1) {
        var output = validInputs[i];
        printmsg(output);

    }
};
