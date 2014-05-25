angular.module('foodlogapp.controllers', [])

.controller('SplashController',["$scope","$state", function($scope, $state) {
        // catch ready message
        /*$scope.init = function () {
            if (DreamFactory.isReady()) {

                $scope.$broadcast('api:ready');
            }
        };

        $scope.$on('api:ready', function() {
            $state.go('login');  // should add cordova ready message too, and maybe later
                                 //  a check for already logged in
        });
        */

        $scope.$on('api:ready', function() {
            $state.go('login');  // should add cordova ready message too, and maybe later
            //  a check for already logged in
        });


}])

.controller('AuthCtrl', function($scope, AuthService, $state, $http ){

        // model for login credentials
        $scope.creds = {
            email: '',
            password: ''
        };

        $scope.login = function(){
            AuthService.login($scope.creds).then(
                function(result) {
                    AuthService.setActiveUser(result.display_name);
                    $http.defaults.headers.common['X-DreamFactory-Session-Token'] = result.ticket;
                    $state.go('tab.day');
                },
                function(reject) {
                    AuthService.unsetActiveUser();
                    $http.defaults.headers.common['X-DreamFactory-Session-Token'] = ""
                }
            )
        };

        $scope.logout = function(){
            $scope.activeUser = AuthService.logout();
            $rootScope.$broadcast('user:logout');
        }
})

    .controller('DayChartController', function($scope, EntryService,$stateParams) {
        var chartData = [];
        //$scope.chartdata = "";
        var dNum = $stateParams.dayNum ? $stateParams.dayNum : new Date().getDay();

        $scope.config = {
            title: 'Percent of RDA',
            tooltips: true,
            labels: true,
            mouseover: function () {
            },
            mouseout: function () {
            },
            click: function () {
            },
            legend: {
                display: true,
                //could be 'left, right'
                position: 'right'
            }
        };

        $scope.data = {
            //series: ['Salt', 'Sugar', 'Carbs', 'Calories'],
            data: [
                {
                    x: "Salt",
                    y: [40],
                    tooltip: "this is tooltip"
                },
                {
                    x: "Sugar",
                    y: [68]
                },
                {
                    x: "Carbs",
                    y: [98]
                },
                {
                    x: "Calories",
                    y: [87]
                }
            ]
        };


/*        //call custom service built using DreamFactory that returns a promise
        EntryService.getRecords('foodlogentries').then(
            // Success function
            function(daypct) {
                console.log(daypct);
                chartData.push(daypct.salt);
                chartData.push(daypct.carbs);
                chartData.push(daypct.sugar);
                chartData.push( daypct.calories);
                $scope.chartdata = chartData.toString();
            },

            // Error function
            function(reject) {
                $scope.chartdata = "";
                // Handle error
            });*/
    })

.controller('NewEntryController', function($scope) { // $state,EntryService, DreamFactory) {

        $scope.entry = {};
        var daypct = {};
        // these should be in prefs
        daypct.salt = 2300;
        daypct.carbs = 150;
        daypct.sugar = 25;
        daypct.calories = 2300;
        // set daily limits
        $scope.entry.saltmax = daypct.salt;
        $scope.entry.carbsmax = daypct.carbs;
        $scope.entry.sugarmax = daypct.sugar;
        $scope.entry.caloriemax = daypct.calories;

        $scope.saveEntry = function() {
            EntryService.saveEntry($scope.entry).then(
                // Success function
                function(result) {

                    console.log("created id " +data.id );
                },

                // Error function
                function(reject) {

                    console.log("failed saving entry");
                }
            )
        }
})




