var MapView = function () {

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('click', '#location-btn', this.getLocation);
    };

    this.render = function () {
        this.$el.html(this.template());
        return this;
    };

    this.initMap = function () {
        var map = L.map('map-container').fitWorld();
        L.tileLayer('https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}', {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }).addTo(map);
        L.control.scale({
            imperial: false
        }).addTo(map);
        map.locate({
            setView: true,
            maxZoom: 16,
            maximumAge: 3600000,
            enableHighAccuracy: true,
        });
    };


    this.getLocation = function (event) {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        };
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        function onSuccess(position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');
        };

        function onError(error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        };
    };

    this.initialize();

}
