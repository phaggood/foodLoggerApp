// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'foodlogapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'foodlogapp.controllers' is found in controllers.js
angular.module('foodlogapp', ['ionic', 'foodlogapp.services', 'foodlogapp.controllers'])

.directive('bars', function ($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="chart"></div>',
        link: function (scope, element, attrs) {
            var data = attrs.data.split(','),
                chart = d3.select('#chart')
                    .append("div").attr("class", "chart")
                    .selectAll('div')
                    .data(data).enter()
                    .append("div")
                    .transition().ease("elastic")
                    .style("width", function(d) { return d + "%"; })
                    .text(function(d) { return d + "%"; });
        }
    };
})

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // splash page
            .state('splash', {
                url: "/splash",
                templateUrl: "templates/splash.html"
            })


            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('tab.day', {
                url: '/day',
                views: {
                    'day-tab': {
                        templateUrl: 'templates/day.html',
                        controller: 'DayChartController'
                    }
                }
            })

            .state('tab.month', {
                url: '/month',
                views: {
                    'month-tab': {
                        templateUrl: 'templates/month.html',
                        controller: 'MonthChartController'
                    }
                }
            })

            .state('tab.new', {
                url: '/new',
                views: {
                    'new-tab': {
                        templateUrl: 'templates/new.html',
                        controller: 'NewEntryController'

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

