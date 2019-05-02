(function () {
    $(window).on('hashchange', function () {
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of our app happens.
        render(window.location.hash);
    });

    // This function decides what type of page to show 
    // depending on the current url hash value.
    function render(hash) {
        // Hide whatever page is currently shown.
        $('.page').hide();

        var map = {
            // The Startpage.
            '': function () {
                renderStartPage();
            },

            // Single Products page.
            '#map': function () {
                renderMapPage();
            },

            // Page with filtered products
            '#obs': function () {
                renderObsPage();
            }

        };

        // Execute the needed function depending on the url keyword (stored in temp).
        if (map[hash]) {
            map[hash]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            renderErrorPage();
        }

    }

    function renderStartPage() {
        var page = $('.start');
        page.show();
    }

    function renderMapPage() {
        var page = $('.map');
        page.show();
    }

    function renderObsPage() {
        var page = $('.obs');
        page.show();
    }

    function renderErrorPage() {
        var page = $('.error');
        page.show();
    }
    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
}());
