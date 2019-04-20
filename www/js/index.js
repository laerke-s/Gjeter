// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    StartMenuView.prototype.template = Handlebars.compile($("#home-tpl").html());
    MapView.prototype.template = Handlebars.compile($("#map-tpl").html());
    var slider = new PageSlider($('body'));
    router.addRoute('', function () {
        slider.slidePage(new StartMenuView().render().$el);
    });
    router.addRoute('map', function () {
        var mapPage = new MapView();
        slider.slidePage(mapPage.render().$el);
        /*Must do it like this to ensure that mapcontainer has been made*/
        mapPage.initMap();
    });
    router.start();
    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
    }, false);
    /* ---------------------------------- Local Functions ---------------------------------- */

}());
