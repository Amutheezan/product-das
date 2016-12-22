var TOPIC = "subscriber";
var PUBLISHER_TOPIC = "chart-zoomed";
var qs = gadgetUtil.getQueryString();
var page = gadgetUtil.getCurrentPageName();
var pageVal=0;
var prefs = new gadgets.Prefs();
var chart = gadgetUtil.getChart(prefs.getString(PARAM_GADGET_ROLE));
var rangeStart;
var rangeEnd;
$(function() {
    var msgType = gadgetUtil.msgType();
    var timeFrom = gadgetUtil.timeFrom();
    var timeTo = gadgetUtil.timeTo();

    if(page ==TYPE_LANDING ){
      pageVal ="1";
    } else if (page == ""){
      pageVal ="1";
    }
    else if(page == TYPE_SUMMARY){
      pageVal ="1";
    }else if(page == TYPE_SEARCH){
      pageVal="2";
    } else if(page ==TYPE_NOTIFY){
      pageVal="3";
    }
    console.log(pageVal);
    if(chart.name=="all"){
      var suf="ALL";
      gadgetUtil.fetchData(CONTEXT, {
          type:pageVal,
          suf:suf,
          msgType: msgType,
          timeFrom: timeFrom,
          timeTo: timeTo,
      }, onData, onError);
    }else{
      gadgetUtil.fetchData(CONTEXT, {
          type:pageVal,
          msgType: msgType,
          timeFrom: timeFrom,
          timeTo: timeTo,
      }, onData, onError);
    }

});

gadgets.HubSettings.onConnect = function() {
    gadgets.Hub.subscribe(TOPIC, function(topic, data, subscriberData) {
        onDataChanged(data);
    });
};

function onDataChanged(data) {
  if(chart.name=="all"){
    var suf="ALL";
    gadgetUtil.fetchData(CONTEXT, {
        type:pageVal,
        suf:suf,
        msgType: data.msgType,
        timeFrom: data.timeFrom,
        timeTo: data.timeTo,
        timeUnit:data.timeUnit
    }, onData, onError);
  }else{
    gadgetUtil.fetchData(CONTEXT, {
        type:pageVal,
        msgType: data.msgType,
        timeFrom: data.timeFrom,
        timeTo: data.timeTo,
        timeUnit:data.timeUnit
    }, onData, onError);
  }
};


function onData(response) {
      try {
        var data = response.message;
        if (data.length == 0) {
            $('#canvas').html(gadgetUtil.getEmptyRecordsText());
            return;
        }
        data.sort(function(a, b) {
            return a.timestamp - b.timestamp;
        });
        chart.schema[0].data = chart.processData(data);
        chart.chartConfig.width = $('body').width();
        chart.chartConfig.height = $('body').height();

        var vg = new vizg(chart.schema, chart.chartConfig);
        $("#canvas").empty();
        vg.draw("#canvas",[{type:"range", callback:onRangeSelected}]);
    } catch (e) {
        $('#canvas').html(gadgetUtil.getErrorText(e));
    }
};

function onError(msg) {
    $("#canvas").html(gadgetUtil.getErrorText(msg));
};


document.body.onmouseup = function() {

    if((rangeStart) && (rangeEnd) && (rangeStart.toString() !== rangeEnd.toString())){
        var message = {
            timeFrom: new Date(rangeStart).getTime(),
            timeTo: new Date(rangeEnd).getTime(),
            msgType: gadgetUtil.msgType(),
            timeUnit: "Custom"
        };
        gadgets.Hub.publish(PUBLISHER_TOPIC, message);
    }
}

var onRangeSelected = function(start, end) {
    rangeStart = start;
    rangeEnd = end;
};

$(window).resize(function() {
    if(($('body').attr('media-screen') == 'md') || ($('body').attr('media-screen') == 'lg') || ($('body').attr('media-screen') == 'sm')){
// TODO: Improve resizing the charts
    }
});
