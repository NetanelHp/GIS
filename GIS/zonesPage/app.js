const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let lat = urlParams.get("lat");
let lng = urlParams.get("lng");

let myMap = L.map("mapid").setView([lat, lng], 13);

console.log("" + lat, ",", lng);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/agdev21/cko5ucx731x0017rj27ycq0xf/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYWdkZXYyMSIsImEiOiJja281a3I4cGwwZjJwMnFseHFucXFzbmxiIn0.drtPGlGiQoYVmEFVFQ5Eqw",
  }
).addTo(myMap);

fetch("../assets/prohibited_airspace.kml")
  .then((res) => res.text())
  .then((kmltext) => {
    // Create new kml overlay
    const parser = new DOMParser();
    const kml = parser.parseFromString(kmltext, "text/xml");
    const track = new L.KML(kml);
    myMap.addLayer(track);
  });

var marker = L.marker([lat, lng]).addTo(myMap);
