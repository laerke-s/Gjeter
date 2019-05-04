(function () {
    var pageHistory = [];
    const pageMap = {
        // The Startpage.
        '': function () {
            renderAnyPage('.start');
        },
        // Map with markers for your journey and observations
        '#map': function () {
            sheep = 0;
            lamb = 0;
            total = 0;
            renderAnyPage('.map');
        },
        // Page with observation options
        '#obs': function () {
            renderAnyPage('.obs');
        },
        '#sheep': function () {
            updateCounts();
            renderAnyPage('.sheep');
        },
        '#register': function () {
            updateCounts();
            renderAnyPage('.register');
        },
        '#other': function () {
            renderAnyPage('.other');
        }
    };
    var map;
    var sheep = 0;
    var lamb = 0;
    var total = 0;

    $(window).on('hashchange', function () {
        var hash = window.location.hash;
        if (hash === '#map' && pageHistory[pageHistory.length - 1] === '') {
            if (map != undefined) {
                map.remove();
            }
            initMap();
        } else if (hash === pageHistory[pageHistory.length - 2]) {
            pageHistory.pop();
        } else {
            pageHistory.push(hash);
        }
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of our app happens.
        render(hash);
    });

    // This function decides what type of page to show 
    // depending on the current url hash value.
    function render(hash) {
        // Hide whatever page is currently shown.
        $('.page').hide();
        // Execute the needed function depending on the url keyword (stored in temp).
        if (pageMap[hash]) {
            pageMap[hash]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            renderAnyPage('.error');
        }

    }

    function renderAnyPage(selector) {
        $(selector).show();
    }

    function updateCounts() {
        $('.sheep_count').text(sheep.toString());
        $('.lamb_count').text(lamb.toString());
        $('.total_count').text(total.toString());
    }

    function addCount() {
        sheep++;
        updateCounts();
    }

    function initMap() {
        map = L.map('map-container').fitWorld();
        // Fetching map from Kartverket
        L.tileLayer('https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}', {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }).addTo(map);
        // Adding scale at the bottom of the map
        L.control.scale({
            imperial: false
        }).addTo(map);
        // Use GPS and the Geolocation API to locate device
        map.locate({
            setView: true,
            maxZoom: 16,
            maximumAge: 3600000,
            enableHighAccuracy: true,
            //watch: true
        });
        map.doubleClickZoom.disable();

        function mapDBClick(e) {
            L.circleMarker(e.latlng, {
                    color: 'red'
                }).addTo(map)
                .on('click', function (e) {
                    window.location.hash = 'obs';
                })
                .bindPopup("Din obervasjon er på:<br/>" + e.latlng.toString());
        }

        function onLocationFound(e) {
            var radius = e.accuracy / 2;
            L.marker(e.latlng).addTo(map).bindPopup("Du er her:<br/>" + e.latlng);
            L.circle(e.latlng, radius).addTo(map);
        }

        function onLocationError(e) {
            alert(e.message);
        }

        map.on('bdclick', mapDBClick);
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
    }

    // If on mobile
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
    }, false);
    // Manually trigger a hashchange to start the app.
    $('#register_div').on('click', addCount);
    $(window).trigger('hashchange');
}());
