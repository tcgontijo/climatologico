var latitude, longitude;

function insertGoogleScript() {
    var google_api = document.createElement('script'),
        api_key = 'AIzaSyDoWjpsX3rJ-exdgZ-2v7nMDQW0HOVPA-A';
    google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';
    document.body.appendChild(google_api);
}


function initGoogleAPI() {
    var autocomplete = new google.maps.places.SearchBox(document.querySelector("#local"));
    autocomplete.addListener('places_changed', function() {
        var place = autocomplete.getPlaces()[0];
        latitude = place.geometry.location.lat();
        console.log("A= " + latitude);
        longitude = place.geometry.location.lng();
        console.log("A= " + longitude);
    })
}
insertGoogleScript();

$("#btn").click(function(e) {
    e.preventDefault();

    $.get(`https://api.darksky.net/forecast/8eeafa93fa171bb970bfac9b03caa3a3/${latitude},${longitude}?exclude=minutely,hourly,daily,flags,alerts`, function(data) {
        console.log(data);

        $("#icon").removeClass();

        switch (data.currently.icon) {
            case "clear-day":
                $("#icon").addClass("wi wi-day-sunny")
                break;
            case "clear-night":
                $("#icon").addClass("wi wi-night-clear")
                break;
            case "cloudy":
                $("#icon").addClass("wi wi-cloudy")
                break;
            case "fog":
                $("#icon").addClass("wi wi-fog")
                break;
            case "partly-cloudy-day":
                $("#icon").addClass("wi wi-day-cloudy")
                break;
            case "partly-cloudy-night":
                $("#icon").addClass("wi wi-night-alt-cloudy")
                break;
            case "rain":
                $("#icon").addClass("wi wi-rain")
                break;
            case "sleet":
                $("#icon").addClass("wi wi-sleet")
                break;
            case "snow":
                $("#icon").addClass("wi wi-snow")
                break;
            case "wind":
                $("#icon").addClass("wi wi-windy")
                break;
            default:
                break;
        }


        $("#loc").html($('#local').val());
        $("#lat").html(data.latitude);
        $("#long").html(data.longitude);
        $("#dt_hora").html(data.currently.time);
        $("#resumo").html(data.currently.summary);
        $("#int_precipt").html(data.currently.precipIntensity);
        $("#prob_precipt").html(data.currently.precipProbability);
        $("#temp").html(data.currently.temperature);
        $("#senc_term").html(data.currently.apparentTemperature);
        $("#pt_orv").html(data.currently.dewPoint);
        $("#umid").html(data.currently.humidity);
        $("#press").html(data.currently.pressure);
        $("#vel_vent").html(data.currently.windSpeed);
        $("#raj_vent").html(data.currently.windGust);
        $("#dir_vent").html(data.currently.windBearing);
        $("#cobert_nuv").html(data.currently.cloudCover);
        $("#uv").html(data.currently.uvIndex);
        $("#visib").html(data.currently.visibility);
        $("#oz").html(data.currently.ozone);
        $("#desloc").html(data.offset);


    });

})