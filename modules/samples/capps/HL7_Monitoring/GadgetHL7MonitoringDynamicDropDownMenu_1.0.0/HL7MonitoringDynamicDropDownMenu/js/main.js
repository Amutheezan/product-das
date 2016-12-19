var href = parent.window.location.href,
    hrefLastSegment = href.substr(href.lastIndexOf('/') + 1),
    resolveURI = parent.ues.global.dashboard.id == hrefLastSegment ? '../' : '../../',
    parentWindow = window.parent.document,
    gadgetWrapper = $('#' + gadgets.rpc.RPC_ID, parentWindow).closest('.grid-stack-item');

var TOPIC = "type-selected";
var prefs = new gadgets.Prefs();
var type=prefs.getString(PARAM_GADGET_ROLE);
window.onload=function temp() {
    $('#btnDropdown').addClass('active');
}
$(function() {
if(type==TYPE_SUMMARY){
  var dropDownSpan='<button id="btnDropdown" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'
      +'<span>ADT</span> <span class="caret"></span>'
    +'</button>'
    var role="type-update";
    var href="javascript:void";
    var dropDownMenu=getDropDownMenu(MSG_TYPES,href,role);
       $('#dropdown-menu').append('<div class="btn-group pull-left" id="type-select">'
                              +'<div class="btn-group pull-left type-shortcuts" role="group">'
                                  +dropDownSpan
                                  +'<ul class="dropdown-menu btn-dropdown-menu pull-left" role="menu">'
                                    + dropDownMenu
                                  + '</ul>'
                                +'</div>'
                              +' </div>');

}else if(type==TYPE_NOTIFY){
  var dropDownSpan='<button id="btnDropdown" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'
      +'<span>AIDS</span> <span class="caret"></span>'
    +'</button>'
    var role="type-update";
    var href="javascript:void";
    var dropDownMenu=getDropDownMenu(DSE_TYPES,href,role);
       $('#dropdown-menu').append('<div class="btn-group pull-left" id="type-select">'
                              +'<div class="btn-group pull-left type-shortcuts" role="group">'
                                  +dropDownSpan
                                  +'<ul class="dropdown-menu btn-dropdown-menu pull-left" role="menu">'
                                    + dropDownMenu
                                  + '</ul>'
                                +'</div>'
                              +' </div>');

}

    var qs = gadgetUtil.getQueryString();
    if (qs.timeFrom != null) {
        timeFrom = parseInt(qs.timeFrom);
    }
    if (qs.timeTo != null) {
        timeTo = parseInt(qs.timeTo);
    }
    if (qs.msgType != null){
    	 var msgType=toString(qs.msgType);
    }
    var count = 0;
     var timeUnit = qs.timeUnit;
    var message = {};

    $("#type-select [role=type-update]").click(function(){
        $('#btnDropdown > span:first-child').html($(this).html());
        $('#btnDropdown').addClass('active');
        if(type==TYPE_SUMMARY){
          var ta=gadgetUtil.getURLParams();
          try{
            var timeFrom=ta["timeFrom"][0];
            var timeTo=ta["timeTo"][0];
          }catch(e){
            var timeFrom= new Date(moment().subtract(29, 'days')).getTime();
            var timeTo = new Date(moment()).getTime();
          }
          var msgType=$(this).data('value');
          message = {
              timeFrom: timeFrom,
              timeTo: timeTo,
              msgType:msgType
          };
          gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
          gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
          gadgetUtil.updateURLParam("msgType", message.msgType.toString());
        }else if(type==TYPE_NOTIFY){
        var diseaseType=$(this).data('value');
		message={
		diseaseType:diseaseType
		}
        }

          gadgets.Hub.publish(TOPIC, message);

          $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
          $('#btnDropdown').attr('aria-expanded', 'false');
      });

    $('.type-shortcuts').on('show.bs.dropdown', function(e){
        wso2.gadgets.controls.resizeGadget({
            height: "180px"
        });
    });

    $('.type-shortcuts').on('hide.bs.dropdown', function(e){
        wso2.gadgets.controls.restoreGadget();
    });

});


$(window).resize(function() {
    if(($('body').attr('media-screen') == 'md') || ($('body').attr('media-screen') == 'lg') || ($('body').attr('media-screen') == 'sm')){
        $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
        $('#btnDropdown').attr('aria-expanded', 'false');
    }
});
