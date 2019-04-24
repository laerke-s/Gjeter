// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var map;

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
    }, false);
    window.addEventListener('push', checkPage);
    /* ---------------------------------- Local Functions ---------------------------------- */
    function checkPage() {
        if (document.getElementById('map-container')) {
            loadMap('map-container');
        }
    };

    function loadMap(id) {
        map = L.map(id).fitWorld();
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
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
    };

    onLocationFound = function (e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("You have found yourself at<br/>" + e.latlng).openPopup();
        L.circle(e.latlng, radius).addTo(map);
    };

    onLocationError = function (e) {
        alert(e.message);
    };

}());
