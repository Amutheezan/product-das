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
createDynamicDropDownMenu(MSG_TYPES,"Select Message Type : ");
}else if(type==TYPE_SEARCH){
createDynamicDropDownMenu(MAXROW_TYPES,"Select Row Limit : ");
}else if(type==TYPE_NOTIFY){
createDynamicDropDownMenu(DSE_TYPES,"Select diseaseType : ");
}
    var count = 0;
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
          for(var i=0;i<MSG_TYPES.length;i++){
            if($(this).data('value') === MSG_TYPES[i]){
             var msgType=MSG_TYPES_SHORT[i];
            }
          }

          message = {
              timeFrom: timeFrom,
              timeTo: timeTo,
              msgType:msgType
          };
          gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
          gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
          gadgetUtil.updateURLParam("msgType", message.msgType.toString());
        } else if(type==TYPE_SEARCH){
             var maxRows=$(this).data('value');
             var ta=gadgetUtil.getURLParams();
             try{
               var timeFrom=ta["timeFrom"][0];
               var timeTo=ta["timeTo"][0];
             }catch(e){
               var timeFrom= new Date(moment().subtract(29, 'days')).getTime();
               var timeTo = new Date(moment()).getTime();
             }

             message = {
                 timeFrom: timeFrom,
                 timeTo: timeTo,
                 maxRows:maxRows
             };
             gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
             gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
             gadgetUtil.updateURLParam("maxRows", message.maxRows.toString());
                }
        else if(type==TYPE_NOTIFY){
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
function createDynamicDropDownMenu(types,description){
  var dropDownSpan='<button id="btnDropdown" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'
      +'<span>'+ types[0]+ '</span> <span class="caret"></span>'
    +'</button>'
    var role="type-update";
    var href="javascript:void";
    var dropDownMenu=getDropDownMenu(types,href,role);
       $('#dropdown-menu').append( description + '<div class="btn-group pull-left" id="type-select">'
                              +'<div class="btn-group pull-left type-shortcuts" role="group">'
                                  +dropDownSpan
                                  +'<ul class="dropdown-menu btn-dropdown-menu pull-left" role="menu">'
                                    + dropDownMenu
                                  + '</ul>'
                                +'</div>'
                              +' </div>');
}

$(window).resize(function() {
    if(($('body').attr('media-screen') == 'md') || ($('body').attr('media-screen') == 'lg') || ($('body').attr('media-screen') == 'sm')){
        $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
        $('#btnDropdown').attr('aria-expanded', 'false');
    }
});
