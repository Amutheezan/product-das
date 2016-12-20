var url= "/portal/store/carbon.super/fs/gadget/HL7MonitoringGadgetCommon/jaggery-api/hl7.jag";
var mymap;
var markers = new L.LayerGroup();


var TOPIC="subscriber";
gadgets.HubSettings.onConnect = function() {
    gadgets.Hub.subscribe(TOPIC, function(topic, data, subscriberData) {
        onDataChanged(data);
    });
};


function onDataChanged(data){
var diseaseType=data.diseaseType;
$.ajax({
    url: url +"?type=3&diseaseType="+diseaseType,
    type: "GET",
    success: function(data) {
       onData(data);

    },
    error: function(data){
    }

});
}
setTimeout( function() {

mymap = L.map('mapid').setView([45, -180], 2);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoiYW11dGhlZXphbjkzIiwiYSI6ImNpd2dlOHQyOTAxNzUydG1tMGV4Z21jZnQifQ.Vyh1OXwNBgFz1nMVjSe41A'
}).addTo(mymap);

$.ajax({
    url: url +"?type=3&diseaseType=AIDS",
    type: "GET",
    success: function(data) {
       onData(data);

    },
    error: function(data){
    }

});

}, 10);

function onData(data){
markers.clearLayers();
var result=data.message[0].data;
for(var i=0;i<result.length;i++){
  if(isNull(result[i]["latitude"])){
  }else if( isNull(result[i]["longitude"])){
  }else{
    var popUp="<b>Alert Info</b>"+ "<br> Location Address : " + result[i]["formattedAddress"];
     "<br> Disease : "+ result[i]["Disease"]+
     "<br> Occurances : "+ result[i]["msgCount"];
    var marker = L.circle([result[i]["latitude"], result[i]["longitude"]],
    {
    color: 'blue',
    fillColor: '#0000FF',
    fillOpacity: 0.5,
    radius: 1000 * result[i]["radius"]
  }
  )
    .bindPopup(popUp);
    markers.addLayer(marker);
  }
}
mymap.addLayer(markers)

}

function isNull(value){
  var isNull=false;
  if(typeof value === "undefined" || value === null || value === "" || value ==="null" ){
    isNull=true;
  }
  if(typeof value == "undefined" || value == null || value == "" || value =="null"){
      isNull=true;
    }
  return isNull;
}
