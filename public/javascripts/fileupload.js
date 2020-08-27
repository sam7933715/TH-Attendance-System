

(function($) {
    var appUrl = "https://script.google.com/macros/s/AKfycbw6uecMW5812ryTtdZQJNk2uinh2SyfE6jUVwGQKV9M7t0LilA/exec", // 網路應用程式網址
    file, fileReader;
    $("#input").change(function() {
    file = this.files[0];
    if (file) {
    fileReader = new FileReader();
    fileReader.onload = getFileInfo;
    fileReader.readAsDataURL(file);
    }
    });
    function getFileInfo(evt) {
    var fileName = file.name,
    fileType = file.type,
    dataUrl = evt.target.result,
    base64Data = dataUrl.split(",")[1];
    uploadFile(fileName, fileType, base64Data);
    }
    function uploadFile(fileName, fileType, base64Data) {
    $.ajax({
    type: "get",
    data: {
    "fileName": fileName,
    "fileType": fileType,
    "base64Data": base64Data
    },
    url: appUrl,
    success: function(fileUrl) { // 成功時回傳檔案網址
    $("#fileUrl").html(fileUrl);
    },
    error: function(e) {
    console.log(JSON.stringify(e));
    }
    });
    }
    })(jQuery);