var latitude = [];
var longitude = [];
var UserID = [];

var geolocation = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDVRn7G1vFTSRtIagHFwzTgze5CFD5EhvE';
(function () {
  xhr = new XMLHttpRequest();
  xhr.open('POST', geolocation);
  xhr.onload = function () {
    var response = JSON.parse(this.responseText);
    // console.log(response);
    latitude = response.location.lat;
    longitude = response.location.lng;

    //initial map 開始
    var position = [
      { "Lat": latitude, "Long": longitude }];

    //金鑰:AIzaSyDVRn7G1vFTSRtIagHFwzTgze5CFD5EhvE
    var map, geocoder;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
          lat: parseFloat(position[0]["Lat"]),
          lng: parseFloat(position[0]["Long"])
        },
        mapTypeControl: true,
        fullscreenControl: true,
        rotateControl: true,
        scaleControl: true,
        streetViewControl: true,
        zoomControl: true,
        mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_CENTER },
        fullscreenControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
        rotateControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
        scaleControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        streetViewControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM }
      });
      //Zoom 0 到 21
      //mapTypeId:"roadmap",hybrid、roadmap、satellite 和 terrain
      //initial map中的迴圈去call orgmarker新增標記

      for (var i = 0; i < position.length; i++) {
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(position[0]["Lat"]),
            lng: parseFloat(position[0]["Long"])
          },
          map: map,
          label: { text: position[0]["Storename"], fontSize: "0px" },
          icon: {
            url: 'http://maps.google.com/mapfiles/kml/paddle/blu-square.png',
            scaledSize: new google.maps.Size(50, 50)
          }
        });
      };
    }
    initMap()
    //initial map 結束

  }
  xhr.send();
})();


function geoFindMe() {
  xhr = new XMLHttpRequest();
  xhr.open('POST', geolocation);
  //print geocoding to webpage
  xhr.onload = function () {
    var response = JSON.parse(this.responseText);
    var output = document.getElementById("geocode");
    latitude = response.location.lat;
    longitude = response.location.lng;
    UserID = document.getElementById("UserID").value;
    // console.log(UserID);
    output.innerHTML = '<p>' + ' Infomation submitted as below' + '</br>' + 'UserID: ' + UserID + '</br>' + 'Time: ' + currenttime + '</br>' + 'Latitude: ' + latitude + '</br>' + ' Longitude: ' + longitude + '</p>'
    document.getElementById('UserID').value = ""
    document.getElementById('imgInp').value = ""
    // document.getElementById('preview_progressbarTW_img').src = "./images/In it together v2.jpg"
  }
  xhr.send();

  //Write geocoding to google sheet
  //Google script
  //https://script.google.com/macros/s/AKfycbyLrVEKTnJ7ibGJYNBIG8a4n0vGL0ZgOBJyb4hQMGJBSs_q869K/exec

  //Google sheet
  //https://docs.google.com/spreadsheets/d/1cuWT3grQ2PAND6tW6frJaGSRgBDEvQnDiUHPsHgs1CU/edit?usp=sharing

  //Google Sheet Name
  //Attendance

  //  var time =currenttime
  var NowDate = new Date();
  var y = NowDate.getFullYear()
  var mm = NowDate.getMonth()
  var dd = NowDate.getDate()
  var h = NowDate.getHours();
  var m = NowDate.getMinutes();
  var s = NowDate.getSeconds();
  if (h < 10) {
    h = "0" + h;
  };
  if (m < 10) {
    m = "0" + m;
  };
  if (s < 10) {
    s = "0" + s;
  };
  const currenttime = y + '/' + mm + '/' + dd + ' ' + h + ':' + m + ':' + s;
  // console.log(currenttime)

  var appUrl = 'https://script.google.com/macros/s/AKfycbw6uecMW5812ryTtdZQJNk2uinh2SyfE6jUVwGQKV9M7t0LilA/exec';
  // var appimgUrl = 'https://script.google.com/macros/s/AKfycbw6uecMW5812ryTtdZQJNk2uinh2SyfE6jUVwGQKV9M7t0LilA/exec';
  var sheetsUrl = 'https://docs.google.com/spreadsheets/d/1cuWT3grQ2PAND6tW6frJaGSRgBDEvQnDiUHPsHgs1CU/edit?usp=sharing';
  var sheetName = 'Attendance';
  var UserID = document.getElementById("UserID").value;
  // var Uploadimg = document.getElementById('preview_progressbarTW_img').src
  var Uploadimg = 'test'
  var formdata = new FormData();
  // formdata.append('file',Uploadimg.files[0])
  console.log(Uploadimg);
  // console.log('formdata'+formdata)
  // console.log(Uploadimg.texture.toDataURL("image/jpeg"))

  var data = [[UserID, longitude, latitude, currenttime,Uploadimg]];
  var parameter = {};
  parameter = {
    url: sheetsUrl,
    name: sheetName,
    data: data.toString(),
    row: data.length,
    column: data[0].length,
    insertType: 'top'
  };
  // console.log(parameter);
  $.get(appUrl, parameter);
  // $.get(appUrl, parameter);

}
