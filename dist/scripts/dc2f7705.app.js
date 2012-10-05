(function() {

  $(function() {
    var carURL, currentIgnitionStatus;
    carURL = "http://osisoftvcampus.cloudapp.net/vehicledata/cardata.svc/json/Michael/MichaelTestTrace/IgnitionStatus/RecordedValues";
    currentIgnitionStatus = "Off";
    return $.ajax({
      url: carURL,
      async: false,
      type: 'GET',
      dataType: "jsonp",
      data: {
        start: "'*-15d'",
        end: "'*'"
      },
      success: function(data, textStatus, jqXHR) {
        return $.each(data, function(i, obj) {
          var timestamp;
          if (obj.Value !== currentIgnitionStatus) {
            currentIgnitionStatus = obj.Value;
            timestamp = moment(new Date(Math.floor(obj.Timestamp.replace(/[^0-9]/g, ''))));
            return console.log("" + currentIgnitionStatus + " at " + (timestamp.format()));
          }
        });
      }
    });
  });

}).call(this);
