/*

Author: Lloyd Walker lloyd
Created: 04/05/2018

*/

function download(data, filename, type) {
    "use strict";
    var window = Window;
    var file;

    file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
    }
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function generateConfig() {
    var filename = "../../config";
    var extention = ".json";
    var config = {};
    var options = [
        'showJumbotron',
        'showEmojies'
    ];

    for (var i = 0; i < options.length; i += 1) {
       var config = JSON.stringify(options[i]);
    }
    //download(config, filename, extention);
}

generateConfig();