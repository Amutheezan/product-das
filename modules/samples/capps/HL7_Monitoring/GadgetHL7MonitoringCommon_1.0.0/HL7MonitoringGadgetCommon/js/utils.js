var CONTEXT = "/portal/apis/data";

function getQueryString() {
    var queryStringKeyValue = window.parent.location.search.replace('?', '').split('&');
    var qsJsonObject = {};
    if (queryStringKeyValue != '') {
        for (i = 0; i < queryStringKeyValue.length; i++) {
            qsJsonObject[queryStringKeyValue[i].split('=')[0]] = queryStringKeyValue[i].split('=')[1];
        }
    }
    return qsJsonObject;
}

function fetchData(params, callback, error) {
var gadgetLocation = "/portal/store/carbon.super/fs/gadget/HL7MonitoringGadgetCommon";
var CONTEXT = gadgetLocation + "/jaggery-api/hl7.jag";
    $.ajax({
        url: CONTEXT+"?msgType=" + params.msgType + "&timeFrom=" + params.timeFrom + "&timeTo=" + params.timeTo,
        type: "GET",
        success: function(data) {
            callback(data);
        },
        error: function(msg) {
            error(msg);
        }
    });

}
