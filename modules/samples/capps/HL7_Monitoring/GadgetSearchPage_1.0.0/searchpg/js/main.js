var href = parent.window.location.href,
    hrefLastSegment = href.substr(href.lastIndexOf('/') + 1),
    resolveURI = parent.ues.global.dashboard.id == hrefLastSegment ? '../' : '../../',
    parentWindow = window.parent.document,
    gadgetWrapper = $('#' + gadgets.rpc.RPC_ID, parentWindow).closest('.grid-stack-item');

var timeFrom;
var timeTo;
var timeUnit = null;
var page = gadgetUtil.getCurrentPage();
var qs = gadgetUtil.getQueryString();
var SHARED_PARAM = "?shared=true&";
var query = "";
var type = "";
var LAST_STORED_DATA="";


$(function() {


    //// MESSAGE TABLE PORTION /////
    $("#specific").hide();
    timeFrom = gadgetUtil.timeFrom();
    timeTo = gadgetUtil.timeTo();
    type = "2";
    $.fn.dataTable.ext.errMode = 'none';
    oTable = $('#tblMessages').DataTable({
        dom: '<"dataTablesTop"' +
            'f' +
            '<"dataTables_toolbar">' +
            '>' +
            'rt' +
            '<"dataTablesBottom"' +
            'lip' +
            '>',
        language: {
            searchPlaceholder: "Enter Key Word"
        },
        clientside: true,
        fixedHeader: true,
        deferRender: true,
        scrollY: true,
        scroller: {
            loadingIndicator: true
        },
        "columns": [{
                title: "timestamp"
            }, {
                title: "correlation_activity_id"
            }, {
                title: "meta_host"
            }, {
                title: "message_direction"
            }

        ],
        "sErrMode": 'throw',

        grid: "on",
        "ajax": {
            "url": CONTEXT,
            "data": function(d) {
                d.type = type;
                d.timeFrom = timeFrom;
                d.timeTo = timeTo;
                d.query = query;
            },
            "success": function(data) {
                onData(data);
            },
            "error": function(data) {
                onError(data);
            }
        }
    });

    $('#tblMessages_filter input').unbind();
    $('#tblMessages_filter input').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            oTable.search(this.value).draw();
        }
    });

    $('#tblMessages').on('click', 'tbody tr', function() {
        var id = $(this).find("td:first").html();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            oTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        if (timeUnit == null) {
            timeUnit = qs.timeUnit;
        }

        var baseUrl = SEARCH_URL;
        if (gadgetUtil.isSharedDashboard()) {
            baseUrl += SHARED_PARAM;
        } else {
            baseUrl += "?";
        }
        displaySpecificTable(id);
        $('#main').toggle();
        $("#specific" ).toggle();
    });

    $( "#toggle" ).click(function() {
        $( "#specific" ).toggle();
        $('#main').show();
    });


    ///// DATE AND TIME PICKER PORTION////////




    var dateLabel = $('#reportrange'),
        datePickerBtn = $('#btnCustomRange');
    var timeFrom = moment().subtract(29, 'days');
    var timeTo = moment();
    var message = {};
    var count=0;
    $("#date-select [role=date-update][data-value=LastMonth]").addClass("active");

    cb(moment(timeFrom), moment(timeTo));

    function cb(start, end) {
        dateLabel.html(start.format('MMMM D, YYYY hh:mm A') + ' - ' + end.format('MMMM D, YYYY hh:mm A'));
        if (count != 0) {
            message = {
                timeFrom: new Date(start).getTime(),
                timeTo: new Date(end).getTime(),
                timeUnit: "Custom"
            };
            gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
            gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
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

    $("#date-select [role=date-update]").click(function() {
        $("#date-select button").removeClass("active");
        $("#date-select [data-value=" + $(this).data('value') + "]").addClass("active");
        $('#btnDropdown > span:first-child').html($(this).html());
        $('#btnDropdown').addClass('active');
        switch ($(this).data('value')) {
            case 'LastHour':
                dateLabel.html(moment().subtract(1, 'hours').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
                message = {
                    timeFrom: new Date(moment().subtract(1, 'hour')).getTime(),
                    timeTo: new Date(moment()).getTime(),
                    timeUnit: "Hour"
                };
                gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                break;
            case 'LastDay':
                dateLabel.html(moment().subtract(1, 'day').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
                message = {
                    timeFrom: new Date(moment().subtract(1, 'day')).getTime(),
                    timeTo: new Date(moment()).getTime(),
                    timeUnit: "Day"
                };
                gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                break;
            case 'LastMonth':
                dateLabel.html(moment().subtract(29, 'days').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
                message = {
                    timeFrom: new Date(moment().subtract(1, 'month')).getTime(),
                    timeTo: new Date(moment()).getTime(),
                    timeUnit: "Month"

                };
                gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                break;
            case 'LastYear':
                dateLabel.html(moment().subtract(1, 'year').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));

                message = {
                    timeFrom: new Date(moment().subtract(1, 'year')).getTime(),
                    timeTo: new Date(moment()).getTime(),
                    timeUnit: "Year"

                };
                gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
                gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
                break;
            default:
                return;
        }
        $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
        $('#btnDropdown').attr('aria-expanded', 'false');
    });

    $('.date-shortcuts').on('show.bs.dropdown', function(e) {
        wso2.gadgets.controls.resizeGadget({
            height: "180px"
        });
    });

    $('.date-shortcuts').on('hide.bs.dropdown', function(e) {
        wso2.gadgets.controls.restoreGadget();
    });

  /// ADDING ATTRIBUTES ///

    var message = {};
    $('#btnAutoGen').click(function() {
        createRowOfContents();
    });

  /// SEARCHING PART ///

    $('#Search').click(function() {
        QUERY_PARAM=[];
        for (var i = 0; i < COUNTER; i++) {
            var operValue= $('#type-oper_0'+i+'').val();
            var attrValue=$('#type-attr_0'+i+'').val();
            var equaValue=$('#type-equa_0'+i+'').val();
            var value=$('#inValue_0'+i+'').val();
            var tempResult=LuceneFy(operValue,attrValue,equaValue,value);
            if(tempResult != "Error"){
              QUERY_PARAM.push(tempResult);
            }
        };
      for (var i = 0; i < COUNTER; i++) {
            if (typeof QUERY_PARAM[i] === undefined || !QUERY_PARAM[i]){
            }else{
                if (i == 0) {
                    query = QUERY_PARAM[i] + " ";
                } else {
                    query += QUERY_PARAM[i] + " ";
                }
            }
        }
        var urlValues = gadgetUtil.getURLParams();
        try {
            timeFrom = urlValues["timeFrom"][0];
            timeTo = urlValues["timeTo"][0];
        } catch (e) {
            timeFrom = new Date(moment().subtract(29, 'days')).getTime();
            timeTo = new Date(moment()).getTime();
        }
        type = type;
        oTable.clear().draw();
        oTable.ajax.reload().draw();
    });

    $('.type-shortcuts').on('show.bs.dropdown', function(e) {
        wso2.gadgets.controls.resizeGadget({
            height: "180px"
        });
    });
    $('.type-shortcuts').on('hide.bs.dropdown', function(e) {
        wso2.gadgets.controls.restoreGadget();
    });

});


function displaySpecificTable(id){
  for(var i=0;i<LAST_STORED_DATA.length;i++){
    if(LAST_STORED_DATA[i]["timestamp"] == id){
      console.log(LAST_STORED_DATA[i])
  $("#tblSpecific").empty();
      for(var key in LAST_STORED_DATA[i]){
        $("#tblSpecific").append('<tr>'
        +'<th>'+key+'</th>'
        + '<th>'+LAST_STORED_DATA[i][key]+'</th>'
        +'</tr>');
      }


    }
  }
}

function onData(response) {
    try {
        var data = response.message[0]["data"];
        LAST_STORED_DATA=data;
        if (data.length <= 0) {
            //$("#canvas").html(gadgetUtil.getEmptyRecordsText());
            return;
        }
        $("#tblMessages thead tr").empty();
        $("#tblMessages tbody").empty();
        var columns = page.columns;
        var tbody = $("#tblMessages tbody");
        data.forEach(function(row, i) {
            var tr = jQuery('<tr/>');
            columns.forEach(function(column) {
                var td = jQuery('<td/>');
                var value = row[column.name];
                td.text(value);
                td.appendTo(tr);
            });
            tr.appendTo(tbody);

        });
    } catch (e) {
      //  $("#canvas").html(gadgetUtil.getErrorText(e));
    }
};

function onError(msg) {
    //  $("#canvas").html(gadgetUtil.getErrorText(msg));
};

$(window).resize(function() {
    if (($('body').attr('media-screen') == 'md') || ($('body').attr('media-screen') == 'lg') || ($('body').attr('media-screen') == 'sm')) {
        $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
        $('#btnDropdown').attr('aria-expanded', 'false');
    }
});
