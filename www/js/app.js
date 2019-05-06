(function () {
    var pageHistory = [];
    const pageMap = {
        // The Startpage.
        '': function () {
            renderAnyPage('.start');
        },
        // Map with markers for your journey and observations
        '#map': function () {
            counters = [0, 0, 0];
            renderAnyPage('.map');
        },
        // Page with observation options
        '#obs': function () {
            renderAnyPage('.obs');
        },
        '#herd': function () {
            updateCounts();
            renderAnyPage('.herd');
        },
        '#register_sheep': function () {
            renderRegisterPage('sheep');
        },
        '#register_lamb': function () {
            renderRegisterPage('lamb');
        },
        '#register_total': function () {
            renderRegisterPage('total');
        },
        '#other': function () {
            renderAnyPage('.other');
        }
    };
    var map;
    // This is very ugly, and should have been a map,
    // but I found no elegant way of saying ++ on a map value.
    // counters[0]=sheep, counters[1]=lamb, counters[2]=total
    var counters = [0, 0, 0];
    var currentlyCounting = -1;

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

    function renderRegisterPage(regID) {
        var title = $('.register .title');
        var colorLst = $('#color_list');
        switch (regID) {
            case 'sheep':
                currentlyCounting = 0;
                title.text('Sau');
                colorLst.show();
                break;
            case 'lamb':
                currentlyCounting = 1;
                title.text('Lam');
                colorLst.show();
                break;
            case 'total':
                currentlyCounting = 2;
                title.text('Totalt antall');
                colorLst.hide();
                break;
            default:
        }
        updateCountBtn();
        renderAnyPage('.register');
    }

    function updateCounts() {
        $('.sheep_count').text(counters[0].toString());
        $('.lamb_count').text(counters[1].toString());
        $('.total_count').text(counters[2].toString());
    }

    function updateCountBtn() {
        $('#count_btn').text(counters[currentlyCounting].toString());
    }

    function addCount() {
        counters[currentlyCounting]++;
        updateCountBtn();
    }

    function minusCount() {
        if (counters[currentlyCounting] > 0) {
            counters[currentlyCounting]--;
            updateCountBtn();
        }
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
    $('#register_div').on('touchend', addCount);
    $('#plus').on('click', addCount);
    $('#minus').on('click', minusCount);
    $(window).trigger('hashchange');
}());
