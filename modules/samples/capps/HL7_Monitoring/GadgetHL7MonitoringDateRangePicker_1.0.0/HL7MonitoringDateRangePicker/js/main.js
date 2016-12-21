var href = parent.window.location.href,
    hrefLastSegment = href.substr(href.lastIndexOf('/') + 1),
    resolveURI = parent.ues.global.dashboard.id == hrefLastSegment ? '../' : '../../',
    parentWindow = window.parent.document,
    gadgetWrapper = $('#' + gadgets.rpc.RPC_ID, parentWindow).closest('.grid-stack-item');

var page=gadgetUtil.getCurrentPageName();
var TOPIC = "range-selected";
$(function() {
    var dateLabel = $('#reportrange'),
        datePickerBtn = $('#btnCustomRange');
    var timeFrom = moment().subtract(29, 'days');
    var timeTo = moment();
    var message = {};

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

        $("#btnDropdown").addClass('active');
        $("#btnDropdown > span:first-child").html("Last 30 Days");


    cb(moment(timeFrom), moment(timeTo));
    console.log(page);
    function cb(start, end) {
        dateLabel.html(start.format('MMMM D, YYYY hh:mm A') + ' - ' + end.format('MMMM D, YYYY hh:mm A'));
        if (count != 0) {
            var ta=gadgetUtil.getURLParams();
            var msgType=ta["msgType"][0];
              message = {
                  timeFrom: new Date(start).getTime(),
                  timeTo: new Date(end).getTime(),
                  msgType:msgType,
                  timeUnit: "Custom"
              };
              gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
              gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
              if(page == TYPE_LANDING || page == TYPE_SUMMARY){
                gadgetUtil.updateURLParam("msgType", message.msgType.toString());
              }
        gadgets.Hub.publish(TOPIC, message);
        }
        count++;
        if (message.timeUnit && (message.timeUnit == 'Custom')) {
            $("#date-select button").removeClass("active");
            $(datePickerBtn).addClass("active");
        }
    }

    $(datePickerBtn).on('apply.daterangepicker', function(ev, picker) {
        cb(picker.startDate, picker.endDate);
    });

    $(datePickerBtn).on('show.daterangepicker', function(ev, picker) {
        $(this).attr('aria-expanded', 'true');
        wso2.gadgets.controls.resizeGadget({
            height: "710px"
        });
    });

    $(datePickerBtn).on('hide.daterangepicker', function(ev, picker) {
        $(this).attr('aria-expanded', 'false');

        wso2.gadgets.controls.restoreGadget();
    });

    $(datePickerBtn).daterangepicker({
        "timePicker": true,
        "autoApply": true,
        "alwaysShowCalendars": true,
        "opens": "left"
    });

    $("#date-select [role=date-update]").click(function(){

        $("#date-select button").removeClass("active");
        $("#date-select [data-value=" + $(this).data('value') + "]").addClass("active");
        $('#btnDropdown > span:first-child').html($(this).html());
        $('#btnDropdown').addClass('active');
        switch($(this).data('value')){
            case 'LastHour':
                dateLabel.html(moment().subtract(1, 'hours').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
                try{
                  if(page == TYPE_LANDING){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }else if(page == TYPE_SUMMARY){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }
                }catch(e)
                {
                  var msgType="ADT";
                }


                  message = {
                      timeFrom: new Date(moment().subtract(1, 'hour')).getTime(),
                      timeTo: new Date(moment()).getTime(),
                      msgType:msgType,
                      timeUnit: "Hour"

                  };
                gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                if(page == TYPE_LANDING || page == TYPE_SUMMARY){
                  gadgetUtil.updateURLParam("msgType", message.msgType.toString());
                }
                break;
            case 'LastDay':
                dateLabel.html(moment().subtract(1, 'day').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
                try{
                  if(page == TYPE_LANDING){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }else if(page == TYPE_SUMMARY){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }
                }catch(e)
                {
                  var msgType="ADT";
                }

                  message = {
                      timeFrom: new Date(moment().subtract(1, 'day')).getTime(),
                      timeTo: new Date(moment()).getTime(),
                      msgType:msgType,
                      timeUnit: "Day"

                  };
                  gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                  gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                  if(page == TYPE_LANDING || page == TYPE_SUMMARY){
                    gadgetUtil.updateURLParam("msgType", message.msgType.toString());
                  }

                break;
            case 'LastMonth':
                dateLabel.html(moment().subtract(29, 'days').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
                try{
                  if(page == TYPE_LANDING){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }else if(page == TYPE_SUMMARY){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }
                }catch(e)
                {
                  var msgType="ADT";
                }

                  message = {
                      timeFrom: new Date(moment().subtract(1, 'month')).getTime(),
                      timeTo: new Date(moment()).getTime(),
                      msgType:msgType,
                      timeUnit: "Month"

                  };
                  gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                  gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                  if(page == TYPE_LANDING || page == TYPE_SUMMARY){
                    gadgetUtil.updateURLParam("msgType", message.msgType.toString());
                  }
                break;
            case 'LastYear':
                dateLabel.html(moment().subtract(1, 'year').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
                try{
                  if(page == TYPE_LANDING){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }else if(page == TYPE_SUMMARY){
                    var ta=gadgetUtil.getURLParams();
                    var msgType=ta["msgType"][0];
                  }
                }catch(e)
                {
                  var msgType="ADT";
                }
                  message = {
                      timeFrom: new Date(moment().subtract(1, 'year')).getTime(),
                      timeTo: new Date(moment()).getTime(),
                      msgType:msgType,
                      timeUnit: "Year"

                  };
                  gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                  gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                  if(page == TYPE_LANDING || page == TYPE_SUMMARY){
                    gadgetUtil.updateURLParam("msgType", message.msgType.toString());
                  }
                break;
            default:
                return;
        }
        gadgets.Hub.publish(TOPIC, message);

        $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
        $('#btnDropdown').attr('aria-expanded', 'false');
    });

    $('.date-shortcuts').on('show.bs.dropdown', function(e){
        wso2.gadgets.controls.resizeGadget({
            height: "180px"
        });
    });

    $('.date-shortcuts').on('hide.bs.dropdown', function(e){
        wso2.gadgets.controls.restoreGadget();
    });

});

gadgets.HubSettings.onConnect = function() {
    gadgets.Hub.subscribe("chart-zoomed", function(topic, data, subscriberData) {
        onChartZoomed(data);
    });
};

function onChartZoomed(data) {
    var message = {
        timeFrom: data.timeFrom,
        timeTo: data.timeTo,
        msgType: data.msgType,
        timeUnit: "Custom"
    };
    gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
    gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
    if(page == TYPE_LANDING || page == TYPE_SUMMARY){
      gadgetUtil.updateURLParam("msgType", message.msgType.toString());
    }
    gadgets.Hub.publish(TOPIC, message);
    var start = data.timeFrom;
    var end = data.timeTo;
    var msgType = data.msgType
    dateLabel.html(start.format('MMMM D, YYYY hh:mm A') + ' - ' + end.format('MMMM D, YYYY hh:mm A'));
    if (data.timeUnit && (data.timeUnit == 'Custom')) {
        $("#date-select button").removeClass("active");
        $(datePickerBtn).addClass("active");
    }
};

$(window).resize(function() {
    if(($('body').attr('media-screen') == 'md') || ($('body').attr('media-screen') == 'lg') || ($('body').attr('media-screen') == 'sm')){
        $('#btnDropdown').attr('aria-expanded', 'false');
    }
});
