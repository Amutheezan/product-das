var TYPE_UPDATE=31;
var TYPE_GET_CURRENT_SETTING=32;
var DEFAULT_ALERT_LIMIT=1000;
var DEFAULT_DISTANCE_LIMIT=1;
var DEFAULT_TIME_LIMIT=1;
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
	    $("#diseaseEmail").val(data.message[0]["emailDisease"]);
	    $("#diseasePhoneNo").val(data.message[0]["smsDisease"]);
	    $("#waitTimeEmail").val(data.message[0]["emailWaitTime"]);
	    $("#waitTimePhoneNo").val(data.message[0]["smsWaitTime"]);
	    $("#waitTimeupdate").html(data.message[0]["diseaseinitialize"]);
	    $("#diseaseupdate").html(data.message[0]["waitTimeinitialize"]);
    },
    error: function(data){
    }
  });
    $('#alertSetting').accordion({
      collapsible:true,
      heightStyle: "content",
      icons:{
        header:"ui-icon-circle-arrow-e",
        activeHeader:"ui-icon-circle-arrow-s"
      }
    });
  $("#diseaseupdate").click(function(){
    type=TYPE_UPDATE;
    AlertType="disease";
    AlertLimit=$("#diseaseAlert").val();
    EmailAddress=$("#diseaseEmail").val();
    PhoneNo=$("#diseasePhoneNo").val();
    PhoneNo=PhoneNo.substring(1);
    if(isNull(AlertLimit) == true || AlertLimit <= 0){
      AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#diseaseAlert").val(DEFAULT_ALERT_LIMIT);
    }else {
    if(AlertLimit === parseInt(AlertLimit, 10)){
     AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#diseaseAlert").val(DEFAULT_ALERT_LIMIT);
    } else{
    }
    }


    if(isNull(EmailAddress)== true ){
    }
    else{
      if(isAValidEmailAddress(EmailAddress)==true){
      }else{
        $("#diseaseEmail").val("");
        EmailAddress=null;
      }
    }

      var params={ type:type,
        AlertType:AlertType,
        AlertLimit:AlertLimit,
        EmailAddress:EmailAddress,
        PhoneNo:PhoneNo
          }
        $.ajax({
            url: url +"?type=" + params.type + "&AlertType=" + params.AlertType + "&AlertLimit=" + params.AlertLimit +
            "&EmailAddress=" + params.EmailAddress + "&PhoneNo=" + params.PhoneNo,
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
    PhoneNo=PhoneNo.substring(1);
    if(isNull(AlertLimit) == true || AlertLimit <= 0){
      AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#waitTimeAlert").val(DEFAULT_ALERT_LIMIT);
    }else {
    if(AlertLimit === parseInt(AlertLimit, 10)){
     AlertLimit=DEFAULT_ALERT_LIMIT;
      $("#waitTimeAlert").val(DEFAULT_ALERT_LIMIT);
    } else{
    }
    }
    if(isNull(EmailAddress) == true){
    }
    else{
      if(isAValidEmailAddress(EmailAddress)== true){
      }else{
        $("#waitTimeEmail").val("");
        EmailAddress=null;
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
  if(typeof value === "undefined" || value === null || value === ""  || value === "null" ){
    isNull=true;
  }
    if(typeof value == "undefined" || value == null || value == "" || value == "null"){
      isNull=true;
    }
  return isNull;
}

function isAValidEmailAddress(Email){
  var isAValidEmailAddress=false;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(Email.match(mailformat)){
    isAValidEmailAddress=true;
  }
  return isAValidEmailAddress;
}
