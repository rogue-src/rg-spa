var headerController = (function ($) {

    var initialize = function () {
        
        // Methods
        // Build the header view using a config file.
        $(".header-container").load('/views/layout/header.html', function () {
            $.getJSON('configs/app.json',
                function (data) {
                    $.each(data, function (i, v) {
                        $('.app-name').text(v.brand.name)
                    });
                });
        });

        // Other methods...

    };

    return {
        initialize: initialize
    }

})(jQuery);