var blockResponseHeaders = ["blocking", "responseHeaders"];
var bcbits = { urls: ["http://*.bcbits.com/download/*"] };
var bandcamp = { urls: ["http://*.bandcamp.com/download/*"] };

function getId(url) {
  return url.match(/id=(\d+)/).pop();
}

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var filename = details.url.split("#").pop();
  var id = getId(details.url);

  var listener = function(details) {
    var modified = !!details.responseHeaders.filter(function(header) {
      return header.name === "Content-Disposition";
    }).length;

    if (!modified && id === getId(details.url)) {
      details.responseHeaders.push({
        name: "Content-Disposition",
        value: "attachment; filename=" + filename
      });

      setTimeout(function() {
        chrome.webRequest.onHeadersReceived.removeListener(listener);
      });
    }

    return { responseHeaders: details.responseHeaders };
  }

  chrome.webRequest.onHeadersReceived.addListener(listener, bcbits, blockResponseHeaders);

  return { responseHeaders: details.responseHeaders };
}, bandcamp, blockResponseHeaders);