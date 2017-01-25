var Route = (function (document, window) {

  // Default configuration items. These properties can be overridden in routService.js.
  var mod = {
    // Routes array.
    routes: [],
    // Default route.
    defaultRoot: '/',
    // Page not found route.
    notFoundRoute: "/404",
    // Url prefix.
    urlPrefix: '#',
    // Container class where the view will be injected.
    viewContainer: '.some-div-class',
    // Inline loading template.
    loadingTemplate: '<p>Some loading message...</p>',


    // Get the template or the inline HTML content.
    getTemplate: function (route) {
      // Fetches the template if needed, compiles it then injects it.
      if (!!route.template) {
        ui.renderRoute(mod.tp(route.template, route.options));
        if (typeof route.callback == "function") route.callback(route.options);
      }
      if (!!route.templateUrl) {
        // Display the loading template.
        ui.renderRoute(mod.loadingTemplate);
        // Fetch the template data.
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            route.template = xhttp.responseText;
            ui.renderRoute(mod.tp(xhttp.responseText, route.options));
            if (typeof route.callback == "function") route.callback(route.options);
          }
          else if (xhttp.status == 404) {
            ui.navigateRoute(mod.notFoundRoute)
          }
        };
        xhttp.open("GET", route.templateUrl, true);
        xhttp.send();
      }
    },

    // Get the prettified hash part of the actual url.
    getFragment: function () {
      if (window.location.hash === "") window.location.hash = mod.urlPrefix + mod.defaultRoot;
      var re = new RegExp(mod.urlPrefix + "(.*)$"),
        match = window.location.href.match(re),
        fragment = match ? match[1] : '';
      return fragment.toString();
    },

    // Populates the view with the options properties passed to it.
    tp: function (html, options) {
      var re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0,
        match;
      var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
          (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
      };
      while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
      }
      add(html.substr(cursor, html.length - cursor));
      code += 'return r.join("");';
      return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    }
  };

  // Public methods.
  var ui = {

    // Set the class where the route content is to be injected.
    setViewContainer: function (viewContainer) {
      mod.viewContainer = viewContainer;
      return ui;
    },

    // Sets the default route url.
    setRoot: function (defaultRoot) {
      mod.defaultRoot = defaultRoot;
      return ui;
    },

    // Sets the page not found route url.
    setNotFoundRoute: function (notFoundRoute) {
      mod.notFoundRoute = notFoundRoute;
      return ui;
    },

    // Sets the default loading template.
    setLoadingTemplate: function (tpl) {
      mod.loadingTemplate = tpl;
      return ui;
    },

    // Add a route in the list of routes.
    addRoute: function (route) {
      if (typeof route == "object") {
        if (!!route.url && (!!route.template || !!route.templateUrl)) mod.routes.push(route);
        else console.log("This route has a problem, it cant be added!", route);
      }
      else console.log("This route has a problem, it cant be added!", route);
      return ui;
    },

    // Gets the route based on the fragment and calls the the method that will get the template.
    checkRoute: function (f) {
      var fragment = f || mod.getFragment(),
        argsVal,
        argsNames,
        params = {};

      for (var x = 0; x < mod.routes.length; x++) {
        var currRoute = mod.routes[x];
        var routeMatcher = new RegExp("^" + currRoute.url.replace(/(:\w+)/g, '([\\w-]+)') + "$");
        argsVal = fragment.match(routeMatcher);
        if (argsVal) {
          argsVal.shift();
          argsNames = currRoute.url.match(/(:\w+)/g);
          if (argsNames) {
            for (var y = 0; y < argsNames.length; y++) {
              params[argsNames[y].slice(1)] = argsVal[y];
            }
          }
          if (!currRoute.options) currRoute.options = {};
          currRoute.options.params = params;
          mod.getTemplate(currRoute);
          return ui;
        }
      }
      ui.navigateRoute(mod.notFoundRoute);
      return ui;
    },

    // Listens for the url changes and calls the checkRoute function when they happen.
    listen: function () {
      // Calls every 50ms the checkRoute method and compares the current fragment with the one that has been stored at last route change.
      var currentFragment = null,
        interval;
      var fn = function () {
        if (currentFragment !== mod.getFragment()) {
          currentFragment = mod.getFragment();
          ui.checkRoute(currentFragment);
        }
      };
      clearInterval(interval);
      interval = setInterval(fn, 50);
      return ui;
    },

    // Renders the template on the view.
    renderRoute: function (data) {
      document.querySelector(mod.viewContainer).innerHTML = data;
      return ui;
    },

    // Force the url to change programatically.
    navigateRoute: function (path) {
      path = path ? path : '';
      window.location.href = window.location.href.replace(/#(.*)$/, mod.urlPrefix + path);
      return ui;
    },

    // Sets the default urlPrefix.
    setHashbang: function (hashbang) {
      mod.urlPrefix = (hashbang === true) ? '#!' : '#';
      return ui;
    }

  };
  return ui;

})(document, window);