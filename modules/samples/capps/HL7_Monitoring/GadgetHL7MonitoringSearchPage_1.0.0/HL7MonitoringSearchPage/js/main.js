var href = parent.window.location.href,
    hrefLastSegment = href.substr(href.lastIndexOf('/') + 1),
    resolveURI = parent.ues.global.dashboard.id == hrefLastSegment ? '../' : '../../',
    parentWindow = window.parent.document,
    gadgetWrapper = $('#' + gadgets.rpc.RPC_ID, parentWindow).closest('.grid-stack-item');

var timeFrom;
var timeTo;
var timeUnit = null;
var qs = gadgetUtil.getQueryString();
var SHARED_PARAM = "?shared=true&";
var query = "";
var type = "";
var selectedData="";
var oTable;
var DEFAULT_MAX_ROWS=1000;
var maxRows;

window.onload=function(){
  gadgetUtil.updateURLParam("timeFrom", new Date(moment().subtract(29, 'days')).getTime());
  gadgetUtil.updateURLParam("timeTo", new Date(moment()).getTime());
}
$(function() {
    type=TYPE_SEARCH_CODE;
    $("#tables").hide();
    $("#specific").hide();
    timeFrom = gadgetUtil.timeFrom();
    timeTo = gadgetUtil.timeTo();
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
           searchPlaceholder: ""
       },
       "Paginate": true,
       "Processing": true,
       "ServerSide": true,
       "scrollY":"300px",
       "sErrMode": 'throw',
       "ajax": {
           "url": CONTEXT,
           "data": function(d) {
               d.maxRows=maxRows;
               d.type = type;
               d.timeFrom = timeFrom;
               d.timeTo = timeTo;
               d.query = query;
           },
           "dataSrc" : 'message.0.data'
         },
           "columns": [
            { "className":'details-group', title :"Activity ID",data: "correlation_activity_id" },
            { "className":'details-group', title :"Host", data: "meta_host" },
            { "className":'details-group', title :"Message Direction", data: "message_direction" },
            {"className":'details-group',  title: "Date and Time",data: "timestamp",
             "render": function (data) {
                      return new Date(data);;
              }
            },
            {
                  "className":      'details-control',
                  "orderable":      false,
                  "data":           null,
                  "defaultContent": ''
            },
            { title: "Content",data: "content"}
          ],
          "columnDefs": [
           {
               "targets": [ 5 ],
               "visible": false,
               "searchable": false
           }
         ]

   });
    $('#tblMessages_filter input').unbind();
    $('#tblMessages_filter input').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            oTable.search(this.value).draw();
        }
    });
    $('#tblMessages tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = oTable.row( tr );
        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

    function format ( d ) {
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td><span>'+d.content+'</span></td></tr>'+
    '</table>';
    }

    $('#tblMessages').on('click', 'tbody tr td.details-group', function() {
        type=TYPE_SPECIFIC_SEARCH_CODE;
        var correlation_activity_id = oTable.row(this).data()["correlation_activity_id"];
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
          gadgetUtil.fetchData(CONTEXT, {
              type:type,
              query:query,
              correlation_activity_id: correlation_activity_id,
              timeFrom: timeFrom,
              timeTo: timeTo,
          }, onData, onError);
        $('#tables').toggle();
        $("#specific").toggle();
    });

    $( "#toggle" ).click(function() {
        $("#specific").toggle();
        $("#tables").toggle();
    });
    $( "#searchtog" ).click(function() {
        $("#specific").hide();
        $('#tables').toggle();
        $('#main').toggle();
    });
    var dateLabel = $('#reportrange'),
        gaDataLabel = $('#timeRangeSearchGroup'),
        datePickerBtn = $('#btnCustomRange');
    var timeFrom = moment().subtract(29, 'days');
    var timeTo = moment();
    var message = {};
    var count=0;
    $("#date-select [role=date-update][data-value=LastMonth]").addClass("active");
    function cb(start, end) {
      dateLabel.empty();
      gaDataLabel.empty();
        dateLabel.append('<h3>Start Time - End Time</h3>'+start.format('MMMM D, YYYY hh:mm A') + ' - ' + end.format('MMMM D, YYYY hh:mm A'));
        gaDataLabel.append('<h3>Start Time - End Time</h3>'+start.format('MMMM D, YYYY hh:mm A') + ' - ' + end.format('MMMM D, YYYY hh:mm A'));
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
    cb(moment(timeFrom), moment(timeTo),dateLabel,gaDataLabel,datePickerBtn);
    $(datePickerBtn).on('apply.daterangepicker', function(ev, picker) {
        cb(picker.startDate, picker.endDate,dateLabel,gaDataLabel,datePickerBtn);
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
          dateTimeRangeChanged($(this).data('value'));
    });
    function dateTimeRangeChanged(value){
      dateLabel.empty();
      gaDataLabel.empty();
      switch (value) {
          case 'LastHour':
              dateLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(1, 'hours').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
              gaDataLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(1, 'hours').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));

              message = {
                  timeFrom: new Date(moment().subtract(1, 'hour')).getTime(),
                  timeTo: new Date(moment()).getTime(),
                  timeUnit: "Hour"
              };
              gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
              gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
              break;
          case 'LastDay':
              dateLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(1, 'day').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
              gaDataLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(1, 'day').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));

              message = {
                  timeFrom: new Date(moment().subtract(1, 'day')).getTime(),
                  timeTo: new Date(moment()).getTime(),
                  timeUnit: "Day"
              };
              gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
              gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
              break;
          case 'LastMonth':
              dateLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(29, 'days').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
              gaDataLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(29, 'days').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));

              message = {
                  timeFrom: new Date(moment().subtract(1, 'month')).getTime(),
                  timeTo: new Date(moment()).getTime(),
                  timeUnit: "Month"

              };
              gadgetUtil.updateURLParam("timeFrom", message.timeFrom.toString());
              gadgetUtil.updateURLParam("timeTo", message.timeTo.toString());
              break;
          case 'LastYear':
              dateLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(1, 'year').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));
              gaDataLabel.append('<h3>Start Time - End Time</h3>'+moment().subtract(1, 'year').format('MMMM D, YYYY hh:mm A') + ' - ' + moment().format('MMMM D, YYYY hh:mm A'));

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
    }

    $('.date-shortcuts').on('show.bs.dropdown', function(e) {
        wso2.gadgets.controls.resizeGadget({
            height: "180px"
        });
    });
    $('.date-shortcuts').on('hide.bs.dropdown', function(e) {
        wso2.gadgets.controls.restoreGadget();
    });
  var message = {};
    $('#btnAutoGen').click(function() {
        createRowOfContents();
    });
    $('#clearall').click(function() {
        deleteAllRowOfContents();
    });


    $('#Search').click(function() {
      $("#tables").toggle();
      $("#main").toggle();
        selectedData="";
        queryParameters=[];
        for (var i = 0; i < COUNTER; i++) {
            var operValue= $('#type-oper_0'+i+'').val();
            var attrValue=$('#type-attr_0'+i+'').val();
            var equaValue=$('#type-equa_0'+i+'').val();
            var value=$('#inValue_0'+i+'').val();
            var tempResult=LuceneFy(operValue,attrValue,equaValue,value);
            if(tempResult != "Error"){
              queryParameters.push(tempResult);
            }else{

            }
        };
      for (var i = 0; i < COUNTER; i++) {
            if (typeof queryParameters[i] === undefined || !queryParameters[i]){
            }else{
                if (i == 0) {
                    query = queryParameters[i] + " ";
                } else {
                    query += queryParameters[i] + " ";
                }
            }
        }
        $("#query").empty();
        if(query === null){
        }else if(query === ""){
        }
        else{
          $("#query").append("Query of Search : "+query);
        }

        var urlValues = gadgetUtil.getURLParams();
        try {
            timeFrom = urlValues["timeFrom"][0];
            timeTo = urlValues["timeTo"][0];
        } catch (e) {
            timeFrom = new Date(moment().subtract(29, 'days')).getTime();
            timeTo = new Date(moment()).getTime();
        }
        maxRows=value=$('#length').val();
        type = TYPE_SEARCH_CODE;
        if(typeof maxRows === "undefined" ){
          maxRows=DEFAULT_MAX_ROWS;
        }else if(maxRows === null ){
            maxRows=DEFAULT_MAX_ROWS;
        }else if(maxRows === "" ){
          maxRows=DEFAULT_MAX_ROWS;
        }
        oTable.clear().draw();
        oTable.ajax.reload().draw();
    });

});

function onData(data){
  selectedData = data.message;
  $('#activityId').empty();
  $('#activityId').append( "Activity ID : " +selectedData[0]['correlation_activity_id']);
  $('#groupedData').empty();
  $("#groupedData").append("<h4>Host | Server | Message Direction | Service<h4>")
  for(var i=0;i<selectedData.length;i++){
    makeAccordionData(i);
  }
  $('.accordion-toggle').accordion();




}

function makeAccordionData(i){
  $('#groupedData').append('<div id="aGroup_0'+i+'" class="accordion-group">'
                +'  <div id="aHead_0'+i+'" class="accordion-heading">'
                    + ' <a id="acco_0'+i+'"class="accordion-toggle collapsed" data-toggle="collapse" href="#collapseOne_0'+i+'"><h5><b>'
                    + selectedData[i]['meta_host']
                + " | "+ selectedData[i]['meta_server_name']
                + " | "+ selectedData[i]['message_direction']
                + " | "+ selectedData[i]['service_name'] + '</b></h5> </a>'
                  +'</div>'
                  + '<div id="collapseOne_0'+i+'" class="accordion-body collapse">'
                      + '<div id="aInner_0'+i+'"class="accordion-inner">'
                        + '  <table id="tbl_0'+i+'" class="table table-bordered"><thead><tr><th>Name</th><th>Value</th></tr></thead>'
                        + '  </table>'
                    + '  </div>'
                  + '</div>'
            + '  </div>');
    for(var key in selectedData[i]){
     $('#tbl_0'+i+'').append('<tr>'
        +'<th>'+key+'</th>'
        + '<td>'+selectedData[i][key]+'</td>'
        +'</tr>');
      }
      $('#acco_0'+i+'').click(function() {
        if($('#acco_0'+i+'').hasClass('collapsed')){
          $('#acco_0'+i+'').removeClass('collapsed');
         $('#collapseOne_0'+i+'').removeClass('collapse');
        }else{
          $('#acco_0'+i+'').addClass('collapsed')
          $('#collapseOne_0'+i+'').addClass('collapse');
        }
      });

}
function onError(){
}

$(window).resize(function() {
    if(($('body').attr('media-screen') == 'md') || ($('body').attr('media-screen') == 'lg') || ($('body').attr('media-screen') == 'sm')){
        $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
        $('#btnDropdown').attr('aria-expanded', 'false');
    }
});
