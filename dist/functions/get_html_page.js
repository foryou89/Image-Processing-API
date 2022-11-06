"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHtmlPage(pagename, message) {
    if (message === void 0) { message = ''; }
    var content = message == 'Error - Image Processing API' ? '' : message;
    var header = '<!DOCTYPE html><html><head><title>Image Processing API</title><style>*{font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;color:#fff;}html{height: 100%;width: 100%;display: flex;flex-direction: column;justify-content: center;text-align: center;}body{background-color: #121212;}h1,h2{color: #fff;}ul{list-style: none;}footer{margin-top:70px;}.footer p , a{color: #ddd;}</style></head><body>';
    var footer = '<footer><p>By ❤️ <a href="mailto:forex.terad@gmail.com">Ahmed Mohamed</a></p></footer></body></html>';
    if (pagename == 'error') {
        return header + '<h1>Error</h1><h2>' + content + '</h2>' + footer;
    }
    var indexContent = '<h1>Image Processing API</h1><p>Use this link to change the size of default images for example.</p><p><a href="http://localhost:3000/api/images?filename=test.png&width=500&height=500" target="_blank">http://localhost:3000/api/images?filename=test.png&width=500&height=500</a></p> <ul><li><strong>filename: </strong>It is the name of the image in addition to its extension.</li><li><strong>width: </strong>It is a new width of the image.</li><li><strong>height: </strong>It is a new height of the image.</li></ul>';
    return header + indexContent + footer;
}
exports.default = getHtmlPage;
