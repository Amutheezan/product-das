var TYPE_ALERT_LIMIT_UPDATE=31;
var TYPE_GET_CURRENT_EXECUTION_PLAN=32
var DEFAULT_DISEASE_ALERT_LIMIT=1000;
var DEFAULT_WAITINGTIME_ALERT_LIMIT=1000;
var url= "/portal/store/carbon.super/fs/gadget/HL7MonitoringGadgetCommon/jaggery-api/hl7.jag";
var type=null;
var diseaseAlertLimit=0;
var waitTimeAlertLimit=0;

$(function(){
type=TYPE_GET_CURRENT_EXECUTION_PLAN;
$.ajax({
    url: url +"?type=" + type,
    type: "GET",
    success: function(data) {
    $("#diseaseAlert").val(data.message[0]["diseaseAlertLimit"]/1000);
    $("#waitTimeAlert").val(data.message[0]["waitTimeAlertLimit"]);
    $("#update").html(data.message[0]["initialize"]);

    },
    error: function(data){
    }

});

$("#update").click(function(){
  diseaseAlertLimit=$('#diseaseAlert').val()
  waitTimeAlertLimit=$('#waitTimeAlert').val();
  createExecutionPlan(diseaseAlertLimit,waitTimeAlertLimit);
});


});

function createExecutionPlan(diseaseAlertLimit,waitTimeAlertLimit){
  type=TYPE_ALERT_LIMIT_UPDATE;
  if(isNull(diseaseAlertLimit) || diseaseAlertLimit <= 0){
    diseaseAlertLimit=DEFAULT_DISEASE_ALERT_LIMIT;
    $("#diseaseAlert").val(DEFAULT_DISEASE_ALERT_LIMIT);
  }
  if(isNull(waitTimeAlertLimit || waitTimeAlertLimit <= 0)){
    waitTimeAlertLimit=DEFAULT_WAITINGTIME_ALERT_LIMIT;
    $("#waitTimeAlert").val(DEFAULT_WAITINGTIME_ALERT_LIMIT);
  }
    var params={ type:type,
    diseaseAlertLimit:diseaseAlertLimit,
          waitTimeAlertLimit:waitTimeAlertLimit
        }
      $.ajax({
          url: url +"?type=" + params.type + "&diseaseAlertLimit=" + params.diseaseAlertLimit + "&waitTimeAlertLimit=" + params.waitTimeAlertLimit,
          type: "GET",
 	 success: function(data) {
    $("#update").html(data.message[0]["initialize"]);

    },
    error: function(data){
    }

          
      });

}

function setValues(data){
  console.log(data+" is the data");
}

function isNull(value){
  var isNull=false;
  if(typeof value === "undefined" || value === null || value === "" ){
    isNull=true;
  }
  return isNull;
}
