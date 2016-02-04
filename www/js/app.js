// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic','ionicApp.controllers','ngCordova'])

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

angular.module("ionicApp.services", [])
.factory("root", ["$http", "$q", function (e, o) {
    var t = {};
    t.url = "http://ydjk.ddc.net.cn", t.newsUrl = "http://news.ddc.net.cn/UpFile/sImage/", t.guideUrl = "http://guide.ddc.net.cn/UpFile/sImage/", t.brandUrl = "http://www.ddc.net.cn/admin/brand/brandsrc/", t.productUrl = "http://cpimg.ddc.net.cn/upload/", t.videoUrl = "http://img.ddc.net.cn/Video/", t.loadimg = "img/images/img.gif", t.loadimg2 = "img/images/img2.gif", t.userIcon = "img/images/user.gif", t.blankimg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", t.noUser = "游客", t.appuid = "", t.appcid = "";
    var n = window.localStorage.bduser;
    return n && "null" != n && (n = JSON.parse(n), t.appuid = n.uid, t.appcid = n.cid), {
        getRoot: function () {
            return t
        },
        getTabs: function () {
            var t = o.defer();
            return e.get("data/tabs.json").success(function (e) {
                t.resolve(e)
            }).error(function () {
                t.resolve(!1)
            }), t.promise
        },
        setBuser: function (e) {
            t.appuid = appuid, t.appcid = appcid, window.localStorage.bduser = JSON.stringify(e)
        }
    }
} ]);

angular.module("ionicApp.controllers", ['ionicApp.services'])
.controller("appMain", ["$scope", "$ionicSideMenuDelegate", "$timeout", "$ionicLoading", "$window", "$ionicHistory", "root", "$rootScope", "$state", "$ionicPopup", "$cordovaToast", function (e, o, t, n, i, r, s, a, c, l, d) {
    try
    {
        e.root = s.getRoot(),
        s.getTabs().then(function (o) {
            e.tabs = o
        }),
        t(function () {
            e.showMenu = function (e) {
                a.menuShow = e, o.toggleRight()
            }, e.toClose = function () {
                r.backView() ? (a.isBack = !0, r.goBack()) : (console.log("返回故障---"), c.go("tabs.home"))
            };
            var t = !0;
            e.showError = function () {
                e.$broadcast("scroll.refreshComplete"), e.$broadcast("scroll.infiniteScrollComplete"), window.cordova && t ? (t = !1, d.showShortBottom("加载失败").then(function (e) {
                    setTimeout(function () {
                        t = !0
                    }, 2e3)
                })) : console.error("加载失败,请稍后再试")
            }
        }, 500),
        t(function () {
            e.checkLogin = function () {
                return a.user ? !0 : (console.log("未登录---"), c.go("login", {
                    flag: 1
                }), !1)
            }, e.showAlertComm = function () {
                l.alert({
                    title: "提示信息",
                    template: "评论内容不能为空！"
                })
            }
        }, 2e3)
    }
    catch (u)
    {
        console.log(u)
    }
} ]);



