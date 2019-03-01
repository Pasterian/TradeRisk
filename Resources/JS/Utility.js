var document = document;
var stockName;
var selectedChartPatterns = [];
var primarySignalScore = 0;
var stockData = {};
var percentage;

var options = {
    url: "../JSON/stocks.json",

    getValue: "Security Name",
    placeholder: "Apple, Inc.",

    list: {
        match: {
            enabled: true
        },
        sort: {
            enabled: false
        },
        showAnimation: {
            type: "fade", //normal|slide|fade
            time: 400,
            callback: function () {}
        },

        hideAnimation: {
            type: "slide", //normal|slide|fade
            time: 400,
            callback: function () {}
        }
    }
};

$("#StockName").easyAutocomplete(options);


$(document).ready(function () {
    $('#example').DataTable({
        "ajax": '../ajax/data/arrays.txt'
    });
});

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


var document = document;

function getID(id) {
    "use strict";
    return document.getElementById(id);
}

function readTextFile(file, callback) {
    "use strict";
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            callback(rawFile.responseText);

        }
    };
    rawFile.send(null);
    console.log(rawFile);
}

function getQuote() {
    //var id = document.getElementById(elem.id);
    //console.log(id);

    readTextFile("../JSON/data.json", function (text) {
        var data = JSON.parse(text);
        var ran = Math.floor(Math.random() * Math.floor(data.length));
        for (var i = 0; i < data.length; i++) {

            document.getElementById('quote').innerHTML = '<p id="quote" class="lead text-md-center"> {q} <p id="author" class="text-sm" style="font-style: oblique;">\"{a}\"</p>'.replace('{q}', data[ran]['quote']).replace('{a}', data[ran]['author']);

        }

    });
}

getQuote();
