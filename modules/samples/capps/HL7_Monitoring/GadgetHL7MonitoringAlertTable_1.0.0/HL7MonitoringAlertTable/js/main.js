var page = gadgetUtil.getCurrentPage();
var qs = gadgetUtil.getQueryString();
var oTable;
var SHARED_PARAM = "?shared=true&";
var prefs = new gadgets.Prefs();
var role=prefs.getString(PARAM_GADGET_ROLE);

$(function() {
if(role== ROLE_WAIT_TIME){
  var type = TYPE_NOTIFY_WAIT_TIME;
}
$.fn.dataTable.ext.errMode = 'none';
if (type==TYPE_NOTIFY_WAIT_TIME){
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
     "scrollY":"140px",
     "sErrMode": 'throw',
     "ajax": {
         "url": CONTEXT,
         "data": function(d) {
            d.type=type;
         },
         "dataSrc" : 'message.0.data'
       },
         "columns": [
          { title: "WaitTime",data: "waitingTime",
          "render": function (data) {
            var sec_num = parseInt(data, 10)/1000;
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+' hrs '+minutes+' min '+seconds + ' sec ';
        }

          },
          { title: "Date and Time",data: "registeredTime",
           "render": function (data) {
                    return new Date(data);
            }
          }
        ]

 });
}
    $('#tblMessages').on('error.dt', function ( e, settings, techNote, message ) {
        console.error( message );
    }).DataTable();

    $('#tblMessages_filter input').unbind();
    $('#tblMessages_filter input').bind('keyup', function(e) {
    if(e.keyCode == 13) {
        oTable.search( this.value).draw();
    }
    });



});
