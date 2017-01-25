var footerController = (function ($) {

    var initialize = function () {

        // Methods
        // Build the footer view using a config file.
        $('.footer-container').load('/views/layout/footer.html', function () {
            $.getJSON('configs/app.json',
                function (data) {
                    $.each(data, function (i, v) {
                        $('.app-name').text(v.brand.name)
                        $('.app-version').text(v.brand.version)
                        $('.app-environment').text(v.brand.environment)
                        $('.app-company').text(v.brand.company)
                    });
                });

            // Other methods...

        });
    };

    return {
        initialize: initialize
    }

})(jQuery);