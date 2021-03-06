var baseURL;

function getDocument(url) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {parseJson(templateXHR.responseText);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}

function parseJson(information) {
    var result = JSON.parse(information);
    var movies ="";
    for(i = 0; i < result.length; i++) {
        movies += '<lockup><img src="' + baseURL + result[i].url + '" width="182" height="274" /><title>' + result[i].title + '</title></lockup>';
    }
    var template = '<document><stackTemplate><banner><title>JSON Shelf</title></banner><collectionList><shelf><section>' + movies + '</section></shelf></collectionList></stackTemplate></document>';
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
}

App.onLaunch = function(options) {
    
    baseURL = options.BASEURL;
    var jsonURL = baseURL + "Images.json";
    getDocument(jsonURL);
}
