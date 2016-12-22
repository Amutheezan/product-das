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
  gadgetUtil.updateURLParam("timeFrom", ""+ new Date(moment().subtract(29, 'days')).getTime());
  gadgetUtil.updateURLParam("timeTo", ""+ new Date(moment()).getTime());
  gadgetUtil.updateURLParam("maxRows","1000");
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
                      return new Date(data);
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
        $("#query").empty();
        var urlValues = gadgetUtil.getURLParams();
        timeFrom = urlValues["timeFrom"];
        timeTo = urlValues["timeTo"];
        if(isNull(timeFrom) == false && isNull(timeTo) == false){
          query = "timestamp : [" + timeFrom +" TO " + timeTo + "]"
        }
        $("#query").html(query);
    });
  var message = {};
    $('#btnAutoGen').click(function() {
        createRowOfContents();
    });
    $('#clearall').click(function() {
        deleteAllRowOfContents();
    });

    $('#updatedSearch').click(function() {
        query=$('#query').val();
        var urlValues = gadgetUtil.getURLParams();
        try {
            maxRows = urlValues["maxRows"][0];
        } catch (e) {
            maxRows = 1000;
        }
        type = TYPE_SEARCH_CODE;
        oTable.clear().draw();
        oTable.ajax.reload().draw();
    });

    $('#Search').click(function() {
      $("#tables").toggle();
      $("#main").toggle();
      $("#query").empty();
        query="";
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
        var urlValues = gadgetUtil.getURLParams();
        timeFrom = urlValues["timeFrom"][0];
        timeTo = urlValues["timeTo"][0];
        maxRows = urlValues["maxRows"][0];
        if(isNull(maxRows) == true){
          maxRows=DEFAULT_MAX_ROWS;
        }
        if(isNull(query) == false){
          if(isNull(timeFrom) == false && isNull(timeTo) == false){
            query = "timestamp : [" + timeFrom +" TO " + timeTo + "]" + query;
            $("#query").html(query);
          }
        }else{
            timeFrom=new Date(moment().subtract(29, 'days')).getTime()
            timeTo=new Date(moment()).getTime()
            query = "timestamp : [" + timeFrom +" TO " + timeTo + "]";
            $("#query").html(query);
        }
        type = TYPE_SEARCH_CODE;
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
$(window).resize(function() {
    if(($('body').attr('media-screen') == 'md') || ($('body').attr('media-screen') == 'lg') || ($('body').attr('media-screen') == 'sm')){
        $(gadgetWrapper).removeClass('btn-dropdown-menu-open');
        $('#btnDropdown').attr('aria-expanded', 'false');
    }
});
