var baseURL;
 
function loadingTemplate() {
    var template = '<document><loadingTemplate><activityIndicator><text>Loading</text></activityIndicator></loadingTemplate></document>';
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    return parsedTemplate;
}
 
function getDocument(extension) {
    var templateXHR = new XMLHttpRequest();
    var url = baseURL + extension;
    var loadingScreen = loadingTemplate();
 
    
    navigationDocument.pushDocument(loadingScreen);
//    pushPage(loadingScreen);

    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushPage(templateXHR.responseXML);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}
 
function pushPage(page) {
    var currentDoc = getActiveDocument();
    navigationDocument.replaceDocument(page, currentDoc);
}
 
App.onLaunch = function(options) {
    baseURL = options.BASEURL;
    var extension = "templates/PageNavigation.xml";
    getDocument(extension);
}
