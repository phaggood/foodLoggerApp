angular.module('foodlogapp.controllers', [])

    .controller('SplashController',["$scope","$state","DreamFactory","$timeout", function($scope, $state,DreamFactory,$timeout) {
        var tCount = 0;
        $scope.initFail = false;

        // Dreamfactory gets 5secs to return ready
        var init = function() {
            while (tCount < 4) {
                $timeout(function () {
                    if (DreamFactory.isReady()) {
                        // Make sure you see the splash screen for at least 2 secs
                        if (tCount > 2) {
                            $state.go('login');
                        }
                    }
                }, 1000);
                //console.log("not ready");
                tCount++;
            }
            $scope.initFail = true;
        };

        init();

    }])

    .controller('LogoutCtrl', function($scope, AuthService, $state ) {

        $scope.logout = function(){
            AuthService.logout();
            $state.go('login');
        };

        $scope.cancelLogout = function() {
            $state.go('tab.daychart',{chartType:"DAY"});;
        }


    })

    .controller('AuthCtrl', function($scope, AuthService, $state, $http ){

        // model for login credentials
        $scope.creds = {
            email: '',
            password: ''
        };

        $scope.login = function(){
            AuthService.login($scope.creds).then(
                function(result) {
                    $http.defaults.headers.common['X-DreamFactory-Session-Token'] = result.session_id;
                    AuthService.initActiveUser(result);
                    $state.go('tab.daychart',{chartType:"DAY"});
                },
                function(reject) {
                    AuthService.clearActiveUser();
                    $http.defaults.headers.common['X-DreamFactory-Session-Token'] = ""
                }
            )
        };

        $scope.logout = function(){
            $scope.activeUser = AuthService.logout();
            AuthService.clearActiveUser();
            $rootScope.$broadcast('user:logout');
        }
    })

    .controller('ChartController', function($scope, AuthService, EntryService,ChartService,$stateParams) {

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
            series: ['Salt', 'Sugar', 'Carbs', 'Calories'],
            data:[]
        };
        $scope.currentUser = AuthService.getActiveUser().name;

        // init curent month and day numbers from params
        var chartType = $stateParams.chartType ? $stateParams.chartType : "DAY";
        var num = 0;

        switch (chartType) {
            case 'DAY' :
                num = $stateParams.num ? $stateParams.num : new Date().getDate();
                break;
            case 'MONTH' :
                num = $stateParams.num ? $stateParams.num : new Date().getMonth;
                break;
            default:
                num = $stateParams.num ? $stateParams.num : new Date().getDate();
                break;
        }

        var initData = function() {
            EntryService.getData(chartType,num).then(
                function(result) {
                    console.log(result);
                    $scope.data.data = ChartService.toChartData(chartType, result.record).data;
                },
                function(reject) {
                    //AuthService.clearActiveUser();
                    //$http.defaults.headers.common['X-DreamFactory-Session-Token'] = ""
                }
            );
        }; //fluser@spieleware.com

        initData();
    })

    .controller('NewEntryController', ["$scope","AuthService","EntryService","$state", function($scope,AuthService,EntryService,$state) { // $state,EntryService, DreamFactory) {

        $scope.entry = {};
        var daypct = {};
        // these should be in prefs
        daypct.salt = 2300;  //mg
        daypct.carbs = 150;  //g
        daypct.sugar = 36; // g
        daypct.calories = 2500; // units
        // set daily limits
        $scope.entry.saltmax = daypct.salt;
        $scope.entry.carbsmax = daypct.carbs;
        $scope.entry.sugarmax = daypct.sugar;
        $scope.entry.caloriemax = daypct.calories;

        $scope.saveEntry = function() {
            $scope.entry.session_id = AuthService.getActiveUser().sessionId;
            EntryService.saveEntry($scope.entry).then(
                // Success function
                function(result) {
                    console.log("created id " +result.id );
                    $state.go('tab.daychart',{chartType:'DAY'});
                },

                // Error function
                function(reject) {
                    console.log("failed saving entry");
                }
            )
        }
    }]);

