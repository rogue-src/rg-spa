var jsonArrayController = (function ($) {

    var initialize = function () {

        BuildHtml();

    };

    function BuildHtml() {

        $.getJSON("data/demo.json", function (data) {
            var html = '<ul class="nav nav-tabs nav-justified">';
            $.each(data.environments, function (varEnvironment, environment) {
                html += '<li class="text-uppercase"><a data-toggle="tab" href="#' + environment.name + '">' + environment.name + '</a></li>';
            });
            html += '</ul>'
            html += '<div class="tab-content">';
            html += '<br/">';
            $.each(data.environments, function (varEnvironment, environment) {
                html += '<div id="' + environment.name + '"class="tab-pane fade in">';
                html += '<div class="row">';
                $.each(environment.scopes, function (varScope, scope) {
                    html += '<div class="col-md-6">';
                    html += '<div class="panel panel-default">';
                    html += '<div class="panel-heading text-uppercase">' + scope.name + '</div>';
                    html += '<div class="panel-body">';
                    $.each(scope.tiers, function (varTier, tier) {
                        html += '<div class="col-md-6">';
                        html += '<div class="panel panel-default">';
                        html += '<div class="panel-heading text-uppercase">tier: ' + tier.name + '</div>';
                        html += '<div class="panel-body">';
                        $.each(tier.servers, function (varServer, server) {
                            html += '<div class="col-md-12">';
                            html += '<div class="panel panel-default">';
                            html += '<div class="panel-heading text-uppercase">server: ' + server.name + '</div>';
                            html += '<div class="panel-body">';
                            html += '<p class="text-uppercase">' + server.status; + '</p>'
                            html += '<p class="text-uppercase">objects: ' + server.objects; + '</p>'
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                        });
                        html += '</div>'; html += '</div>';
                        html += '</div>';
                    });
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                html += '</div>';
                html += '</div>';
            });
            html += '</div>';
            $('#demo-content').append(html);
            $('#demo-content .nav-tabs a:first').tab('show');
        });

    };

    return {
        initialize: initialize
    }

})(jQuery);