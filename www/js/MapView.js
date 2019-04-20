var MapView = function () {
    var context = {
        title: "Kart visning"
    };

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('click', '#location-btn', this.getLocation);
        this.$el.after()
    };

    this.render = function () {
        this.$el.html(this.template(context));
        return this;
    };

    this.initMap = function () {
        var myMap = L.map('map-container').setView([60.14, 10.25], 11);
        L.tileLayer('https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}', {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }).addTo(myMap);
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
