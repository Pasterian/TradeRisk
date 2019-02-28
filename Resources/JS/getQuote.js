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

function getQuote(elem) {
    var id = document.getElementById(elem.id);
    console.log(id);
    readTextFile("../JSON/data.json", function (text) {
        var data = JSON.parse(text);
        for (var i = 0; i < data.length; i++) {

            document.getElementById('quote').innerText = data[0][id];
            document.getElementById('author').innerText = data[0][id];

        }
    });
}
