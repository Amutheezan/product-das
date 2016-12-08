var page = gadgetUtil.getCurrentPage();
var qs = gadgetUtil.getQueryString();
var oTable;
var SHARED_PARAM = "?shared=true&";
var prefs = new gadgets.Prefs();
var role=prefs.getString(PARAM_GADGET_ROLE);

$(function() {
if(role== ROLE_DISEASE){
  var type = TYPE_NOTIFY_DISEASE
}else if(role== ROLE_WAIT_TIME){
  var type = TYPE_NOTIFY_WAIT_TIME;
}
$.fn.dataTable.ext.errMode = 'none';
if(type == TYPE_NOTIFY_DISEASE){
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
          { title: "Country",data: "Country"},
          { title: "Province",data: "Province"},
          { title:"City",data:"City"},
          { title:"Disease",data:"Disease"},
          { title: "Date and Time",data: "timestamp",
           "render": function (data) {
                    return new Date(data);
            }
          }
        ]

 });
}else if (type==TYPE_NOTIFY_WAIT_TIME){
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
          { title: "WaitTime",data: "waitingTime"},
          { title: "Date and Time",data: "timestamp",
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
