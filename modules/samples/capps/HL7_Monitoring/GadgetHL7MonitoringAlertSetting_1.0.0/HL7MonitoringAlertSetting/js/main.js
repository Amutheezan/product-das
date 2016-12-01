var CONTEXT = "/portal/apis/notificationSetting";
var DEFAULT_DISEASE_ALERT_LIMIT=1000;
var DEFAULT_WAITINGTIME_ALERT_LIMIT=1000;
var TYPE_ALERT_SET=1;
var TYPE_ALERT_UNSET=2;

var diseaseAlertLimit=0;
var waitingTimeAlertLimit=0;
$(function(){
var type=null;
$("#set").click(function(){
type=TYPE_ALERT_SET;
diseaseAlertLimit=$('#diseaseAlert').val()
waitingTimeAlertLimit=$('#waitingTimeAlert').val();
if(isNull(diseaseAlertLimit)){
  diseaseAlertLimit=DEFAULT_DISEASE_ALERT_LIMIT;
}
if(isNull(waitingTimeAlertLimit)){
  waitingTimeAlertLimit=DEFAULT_WAITINGTIME_ALERT_LIMIT;
}
var params={ type:type,
  diseaseAlertLimit:diseaseAlertLimit,
        waitingTimeAlertLimit:waitingTimeAlertLimit
      }
      fetchData(CONTEXT,params,onData,onError);
});

$("#clear").click(function(){
  type=TYPE_ALERT_UNSET;
  var params={ type:type
        }
        fetchData(CONTEXT,params,onData,onError);

});


});

function isNull(value){
  var isNull=false;
  if(typeof value === "undefined" || value === null || value === "" ){
    isNull=true;
  }
  return isNull;
}

function fetchData(context,params, callback, error) {
  var url = "?";
  for (var param in params) {
      url = url + param + "=" + params[param] + "&";
  }
  $.ajax({
      url: context + url,
      type: "GET",
      success: function(data) {
          callback(data);
      },
      error: function(msg) {
          error(msg);
      }
  });

}

function onData(data){
}

function onError(data){
}
