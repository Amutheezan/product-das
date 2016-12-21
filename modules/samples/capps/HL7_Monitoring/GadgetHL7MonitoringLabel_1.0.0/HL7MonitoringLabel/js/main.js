var href = parent.window.location.href,
    hrefLastSegment = href.substr(href.lastIndexOf('/') + 1),
    resolveURI = parent.ues.global.dashboard.id == hrefLastSegment ? '../' : '../../',
    parentWindow = window.parent.document,
    gadgetWrapper = $('#' + gadgets.rpc.RPC_ID, parentWindow).closest('.grid-stack-item');

var prefs = new gadgets.Prefs();
var type=prefs.getString(PARAM_GADGET_ROLE);

$(function() {
if(type==TYPE_SUMMARY){
$('#label').append("Message Type : ")
}else if(type==TYPE_SEARCH){
  $('#label').append("Max Rows : ")
}else if(type==TYPE_NOTIFY){
  $('#label').append("Disease Type : ")

}


});
