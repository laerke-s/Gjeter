(function () {
    //--- Page routing variables 
    var pageHistory = [];
    const pageMap = {
        // The Startpage.
        '': function () {
            renderAnyPage('.start');
        },
        // Map with markers for your journey and observations
        '#map': function () {
            counters = [0, 0, 0, 0];
            renderAnyPage('.map');
        },
        // Page with observation options
        '#obs': function () {
            renderAnyPage('.obs');
        },
        '#herd': function () {
            updateCounts();
            $('.herd_outside').show();
            $('.herd_inside').hide();
            renderAnyPage('.herd');
        },
        '#herd_200': function () {
            updateCounts();
            $('.herd_outside').hide();
            $('.herd_inside').show();
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
        '#register_earmark_lamb': function () {
            renderRegisterPage('earmark');
        },
        '#other': function () {
            renderAnyPage('.other');
        }
    };
    // This is very ugly, and should have been a map,
    // but I found no elegant way of saying ++ on a map value.
    // counters[0]=sheep, counters[1]=lamb, counters[2]=total, counters[3]=earmark_lambs
    var counters = [0, 0, 0, 0];
    var currentlyCounting = -1;

    //--- Map variables
    var map;
    var walk;
    var poly;
    var watchID;

    $(window).on('hashchange', function () {
        var hash = window.location.hash;
        if (hash === '#map' && pageHistory[pageHistory.length - 1] === '') {
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
        $('.register .back_btn').attr('href', pageHistory[pageHistory.length - 2]);
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
            case 'earmark':
                currentlyCounting = 3;
                title.text('Antall lam øremerket');
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
        $('.earmark_lamb_count').text(counters[3].toString());
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
        //Remove any instances that have been
        if (map != undefined) {
            map.remove();
        }
        if (watchID != undefined) {
            navigator.geolocation.clearWatch(watchID);
        }
        walk = [];
        //Initiate map
        map = L.map('map-container').fitWorld();
        // Fetching map from Kartverket
        L.tileLayer('https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}', {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }).addTo(map);
        // Adding scale at the bottom of the map
        L.control.scale({
            imperial: false
        }).addTo(map);

        function onLocationFound(e) {
            var latl = L.latLng(e.coords.latitude, e.coords.longitude);
            console.log('Location was found at: ' + latl);
            var radius = e.coords.accuracy / 2;
            L.circle(latl, radius).addTo(map);
            map.setView(latl, 17);
            map.invalidateSize();
            walk.push(latl);
            poly = new L.polyline(walk, {
                color: 'red'
            }).addTo(map);
            //After finding location for the first time watch location
            initWatch();
        }

        // Use GPS and the Geolocation API to locate device
        // Using this instead of the map.locate function from Leaflet because it did not work on android.
        navigator.geolocation.getCurrentPosition(
            onLocationFound,
            onLocationError, {
                timeout: 1000 * 60,
                enableHighAccuracy: true,
                maximumAge: 1000 * 60 * 60
            }
        );
    }

    function onLocationError(e) {
        console.log('Location was not found.');
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    function updateWalk(e) {
        poly.remove();
        walk.push([e.coords.latitude, e.coords.longitude]);
        console.log('Location was found at: ' + e.coords.latitude + ' ' + e.coords.longitude);
        poly = new L.polyline(walk, {
            color: 'red'
        });
        poly.addTo(map);
    }

    function initWatch() {
        watchID = navigator.geolocation.watchPosition(
            updateWalk,
            onLocationError, {
                timeout: 1000 * 60,
                enableHighAccuracy: true,
                maximumAge: 1000 * 60 * 60
            }
        );
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
