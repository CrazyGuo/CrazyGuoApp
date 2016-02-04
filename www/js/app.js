// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(["$stateProvider",  "$urlRouterProvider", "$ionicConfigProvider", "$sceDelegateProvider", "$compileProvider",function (e, t, n, i, r) {
        n.platform.ios.tabs.style("standard"),
        n.platform.ios.tabs.position("bottom"),
        n.platform.android.tabs.style("standard"),
        n.platform.android.tabs.position("bottom"),
        n.platform.ios.navBar.alignTitle("center"),
        n.platform.android.navBar.alignTitle("center"),
        n.platform.ios.views.transition("ios"),
        n.platform.android.views.transition("android"),
        n.backButton.text(""),
        n.backButton.previousTitleText(!1),
        n.views.maxCache(5),

        r.aHrefSanitizationWhitelist(/^\s*(https?|http|ftp|mailto|chrome-extension|tel|file):/),
        i.resourceUrlWhitelist(["self", "http://*.youku.**", "http://*.tudou.**", "http://*.ddc.**", "http://*.cnev.**"]),

        e.state("tabs", {
                url: "/tab",
                "abstract": !0,
                templateUrl: "templates/tabs.html"
            }).state("tabs.home", {
                url: "/home",
                views: {
                    "home-tab": {
                        templateUrl: "templates/home.html"
                    }
                }
            });

        t.otherwise("tab/home");
}]);
