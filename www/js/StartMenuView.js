var StartMenuView = function () {
    var context = {
        title: "Start tur"
    };

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.render();
    };

    this.render = function () {
        this.$el.html(this.template(context));
        return this;
    };

    this.initialize();

}
