var trackTitleElement = document.querySelector("#name-section .trackTitle");

if (trackTitleElement) {
  var downloadAll = function(e) {
    var getFile = function(files) {
      for (var quality in files) return files[quality];
    };
    window.TralbumData.trackinfo.forEach(function (info) {
      var title = window.BandData.name + " - " + info.title;
      var a = document.createElement("a");
      a.href = getFile(info.file) + "#" + title;
      a.download = title;
      a.click();
    });
  };

  var toClickHandler = function (fn) {
    return "event.preventDefault(); (" + fn.toString().replace(/\s+/g, " ") + ").call(this, event);"
  }

  var downloadButton = "\\\\ <a onclick='" + toClickHandler(downloadAll) + "'>Download</a>";
  trackTitleElement.innerHTML += downloadButton;
}