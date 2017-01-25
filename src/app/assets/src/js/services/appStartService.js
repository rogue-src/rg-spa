var appStartService = (function ($) {

    var initialize = function () {

        headerController.initialize();
        footerController.initialize();
        routeService.initialize();

    };

    return {
        initialize: initialize
    }

})(jQuery);