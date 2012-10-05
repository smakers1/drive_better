$ ->
  carURL = "http://osisoftvcampus.cloudapp.net/vehicledata/cardata.svc/json/Michael/MichaelTestTrace/IgnitionStatus/RecordedValues"

  currentIgnitionStatus = "Off"

  $.ajax
    url: carURL
    async: false
    type: 'GET'
    dataType: "jsonp"
    data: {start: "'*-15d'", end: "'*'"}
    success: (data, textStatus, jqXHR) ->
      $.each data, (i, obj) ->
        if obj.Value != currentIgnitionStatus
          currentIgnitionStatus = obj.Value
          timestamp = moment new Date Math.floor obj.Timestamp.replace(/[^0-9]/g,'')
          console.log "#{currentIgnitionStatus} at #{timestamp.format()}"
