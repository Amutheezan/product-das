var TYPE_UPDATE=31;
var TYPE_GET_CURRENT_SETTING=32;
var DEFAULT_ALERT_LIMIT=1000;

var url= "/portal/store/carbon.super/fs/gadget/HL7MonitoringGadgetCommon/jaggery-api/hl7.jag";
var type=null;
var AlertLimit=0;
var AlertType,EmailAddress,PhoneNo=null;

$(function(){
type=TYPE_GET_CURRENT_SETTING;
$.ajax({
    url: url +"?type=" + type,
    type: "GET",
    success: function(data) {
    $("#diseaseAlert").val(data.message[0]["diseaseAlertLimit"]);
    $("#waitTimeAlert").val(data.message[0]["waitTimeAlertLimit"]/1000);
    $("#daEmail").val(data.message[0]["daEmail"]);
    $("#daPhoneNo").val(data.message[0]["daPhoneNo"]);
    $("#wtaEmail").val(data.message[0]["wtaEmail"]);
    $("#wtaPhoneNo").val(data.message[0]["wtaPhoneNo"]);
    $("#waitTimeupdate").html(data.message[0]["dainitialize"]);
    $("#diseaseupdate").html(data.message[0]["wtainitialize"]);

    },
    error: function(data){
    }

});

  $("#diseaseupdate").click(function(){
    type=TYPE_UPDATE;
    AlertType="disease";
    AlertLimit=$("#diseaseAlert").val();
    EmailAddress=$("#diseaseEmail").val();
    PhoneNo=$("#diseasePhoneNo").val();
    if(isNull(AlertLimit) || AlertLimit <= 0){
      AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#diseaseAlert").val(DEFAULT_ALERT_LIMIT);
    }else {
    if(AlertLimit === parseInt(AlertLimit, 10)){
     AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#diseaseAlert").val(DEFAULT_ALERT_LIMIT);
    } else{
    }
    }
      var params={ type:type,
        AlertType:AlertType,
        AlertLimit:AlertLimit,
        EmailAddress:EmailAddress,
        PhoneNo:PhoneNo
          }
        $.ajax({
            url: url +"?type=" + params.type + "&AlertType=" + params.AlertType + "&AlertLimit=" + params.AlertLimit + "&EmailAddress=" + params.EmailAddress + "&PhoneNo=" + params.PhoneNo,
            type: "GET",
             success: function(data) {
              $("#diseaseupdate").html(data.message[0]["initialize"]);
              },
        });
  });

  $("#waitTimeupdate").click(function(){
    type=TYPE_UPDATE;
    AlertType="waitTime";
    AlertLimit=$("#waitTimeAlert").val();
    EmailAddress=$("#waitTimeEmail").val();
    PhoneNo=$("#waitTimePhoneNo").val();
    if(isNull(AlertLimit) || AlertLimit <= 0){
      AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#waitTimeAlert").val(DEFAULT_ALERT_LIMIT);
    }else {
    if(AlertLimit === parseInt(AlertLimit, 10)){
     AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#waitTimeAlert").val(DEFAULT_ALERT_LIMIT);
    } else{
    }
    }
      var params={ type:type,
        AlertType:AlertType,
        AlertLimit:AlertLimit,
        EmailAddress:EmailAddress,
        PhoneNo:PhoneNo
          }
        $.ajax({
            url: url +"?type=" + params.type + "&AlertType=" + params.AlertType + "&AlertLimit=" + params.AlertLimit + "&EmailAddress=" + params.EmailAddress + "&PhoneNo=" + params.PhoneNo,
            type: "GET",
             success: function(data) {
              $("#waitTimeupdate").html(data.message[0]["initialize"]);
              },
        });
  });






});


function isNull(value){
  var isNull=false;
  if(typeof value === "undefined" || value === null || value === ""  ){
    isNull=true;
  }
  return isNull;
}
