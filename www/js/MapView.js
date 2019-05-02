var MapView = function () {

    var map;

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
    };

    this.render = function () {
        this.$el.html(this.template());
        return this;
    };

    this.initMap = function () {
        map = L.map('map-container').fitWorld();
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
        map.doubleClickZoom.disable();

        function mapDBClick(e) {
            L.circleMarker(e.latlng, {
                    color: 'red'
                }).addTo(map)
                .bindPopup("Din obervasjon er på:<br/>" + e.latlng.toString());
            window.location.hash = 'obs';
        };

        function onLocationFound(e) {
            var radius = e.accuracy / 2;
            L.marker(e.latlng).addTo(map)
                .bindPopup("Du er her:<br/>" + e.latlng).openPopup();
            L.circle(e.latlng, radius).addTo(map);
        };

        function onLocationError(e) {
            alert(e.message);
        };

        map.on('dblclick', mapDBClick);
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
    };

    this.initialize();

}
