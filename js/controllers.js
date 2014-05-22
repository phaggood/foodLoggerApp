angular.module('foodlogapp.controllers', [])

    .controller('SplashController', function($scope) {

    })

.controller('DayChartController', function($scope, ChartService) {
        var chartData = ChartService.dayValues();
        $scope.data = chartData.values.toString();
        $scope.title = chartData.title;

})

.controller('MonthChartController', function($scope, ChartService) {
        var chartData = ChartService.monthValues();
        $scope.data = chartData.values.toString();
        $scope.title = chartData.title;
})

.controller('NewEntryController', function($scope, EntryService) {
        $scope.entry = {};
        var daypct = {};
        daypct.salt = 2300;
        daypct.carbs = 150;
        daypct.sugar = 25;
        daypct.calories = 2300;
        $scope.entry.caloriemax = daypct.salt;
        $scope.entry.carbsmax = daypct.carbs;
        $scope.entry.sugarmax = daypct.sugar;
        $scope.entry.caloriemax = daypct.calories;

})

