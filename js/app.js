// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'foodlogapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'foodlogapp.controllers' is found in controllers.js
angular.module('foodlogapp', ['ionic','angularCharts', 'ngDreamFactory', 'foodlogapp.services', 'foodlogapp.controllers'])

.constant('DSP_URL', 'http://ec2-23-22-183-175.compute-1.amazonaws.com/')
.constant('DSP_API_KEY', 'foodlogger')
.constant('TABLE_NAME', 'foodlogentries')

    .directive('barChart', ['d3Service', function(d3Service) {
        return {
            restrict: 'EA'
            // directive code
        }
    }])



    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            // splash page
            .state('splash', {
                url: "/splash",
                templateUrl: "templates/splash.html",
                controller: 'SplashController'
            })

            // authenticate user to app

            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'AuthCtrl'
            })

            .state('logout', {
                url: "/logout",
                templateUrl: "templates/logout.html",
                controller: 'LogoutCtrl'
            })
            // tab pages

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('tab.daychart', {
                url: '/chart/:chartType/:num',
                views: {
                    'chart-tab': {
                        templateUrl: 'templates/day.html',
                        controller: "ChartController"
                    }
                }
            })

            .state('tab.monthchart', {
                url: '/chart/:chartType/:num',
                views: {
                    'chart-tab': {
                        templateUrl: 'templates/month.html',
                        controller: "ChartController"
                    }
                }
            })

            .state('tab.new', {
                url: '/new',
                views: {
                    'new-tab': {
                        templateUrl: 'templates/new.html',
                        controller : "NewEntryController"
                    }
                }
            })

            .state('tab.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/about.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/splash');

    });

