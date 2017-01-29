var routeService = (function ($) {

  // Build the header and inject it into the div class.
  var initialize = function () {
    Route
      // set the default route path.
      .setRoot("/")
      // Set the class where the route content will be injected into.
      .setViewContainer('.view-container')
      // Set the page not dound route.
      .setNotFoundRoute("/404")
      // Enable hasbang prefix (!#).
      .setHashbang(false)
      // set the loading template
      .setLoadingTemplate()

      // Build the routes.
      //add a route
      // .addRoute({
      //   url: "/",
      //   template: '<div class="container-fluid">' +
      //   '<div class="body-content">' +
      //   '<div class="row">' +
      //   '<div class="col-md-12">' +
      //   '<div class="jumbotron well">' +
      //   '<h2>Home</h2>' +
      //   '<p>This view content is loaded from a templated view!</p>' +
      //   '</div>' +
      //   '<div class="well">' +
      //   '<div class="app-url-container"></div>' +
      //   '</div></div></div></div></div>',
      //   options: {
      //     url: "/",
      //   },
      //   callback: function (options) {
      //     displayhashRoute();
      //   }
      // })

      .addRoute({
        url: "/",
        templateUrl: 'views/global/home.html',
        options: {
          url: "/"
        },
        callback: function (options) {
          document.title = ('Home');
          homeController.initialize();
          displayhashRoute();
        }
      })

      .addRoute({
        url: "/404",
        templateUrl: 'views/error/http404.html',
        options: {
          url: "/404"
        },
        callback: function (options) {
          document.title = ('Error');
          http404Controller.initialize();
          displayhashRoute();
        }
      })

      .addRoute({
        url: "/about",
        templateUrl: 'views/global/about.html',
        options: {
          url: "/about"
        },
        callback: function (options) {
          document.title = ('About');
          aboutController.initialize();
          displayhashRoute();
        }
      })

      .addRoute({
        url: "/contact",
        templateUrl: 'views/global/contact.html',
        options: {
          url: "/contact"
        },
        callback: function (options) {
          document.title = ('Contact');
          contactController.initialize();
          displayhashRoute();
        }
      })

      .addRoute({
        url: "/users",
        template: '<div class="container-fluid">' +
        '<div class="body-content">' +
        '<div class="row">' +
        '<div class="col-md-12">' +
        '<div class="jumbotron well">' +
        '<h2>Users</h2>' +
        '<p>This view content is loaded from a templated view!</p>' +
        '</div>' +
        '<div class="well">' +
        '<div class="app-url-container"></div>' +
        '</div></div></div></div></div>',
        options: {
          url: "/users"
        },
        callback: function (options) {
          document.title = ('Users');
          displayhashRoute();
        }
      })

      .addRoute({
        url: "/user/:id",
        template: '<div class="container-fluid">' +
        '<div class="body-content">' +
        '<div class="row">' +
        '<div class="col-md-12">' +
        '<div class="jumbotron well">' +
        '<h2>User</h2>' +
        '<p>This view content is loaded from a templated view with arguments!</p>' +
        '</div>' +
        '<div class="well">' +
        '<div class="app-url-container"></div>' +
        '</div></div></div></div></div>',
        options: {
          url: "/user/:id"
        },
        callback: function (options) {
          document.title = ('User');
          displayhashRoute();
        }
      })

      .addRoute({
        url: "/json-array",
        templateUrl: 'views/demo/json-array.html',
        options: {
          url: "/json-array"
        },
        callback: function (options) {
          document.title = ('JSON Array');
          jsonArrayController.initialize();
          displayhashRoute();
        }
      })
      
      // Listen for the hash changes.
      .listen();

    // Display the hash url inside the adressbar of the fake browser.
    function displayhashRoute() {
      var url = window.location.hash;
      document.querySelector('.app-url-container').innerHTML = url;
    }

  };
  return {
    initialize: initialize
  }

})(jQuery);