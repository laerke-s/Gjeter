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
        slider.slidePage(new MapView().render().$el);
    });
    router.start();
    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
    }, false);
    /* ---------------------------------- Local Functions ---------------------------------- */

}());
