var position = [
  { "Lat": latitude, "Long": longitude, "pics": "http://bi.smollanindia.com/siplphotodirectory/TW_PHARMA/2019/201905/20190528/Reporting/1092313.jpg" }];

// console.log(latitude);
// console.log(longitude);

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

}//initial map 結束
initMap()