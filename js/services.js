angular.module('foodlogapp.services', [])

.factory('EntryService', function() {
        return {
            saveEntry : function(entry) {
                return "Today";

            },
            getntry : function(id) {
                return "This Month";

            }
        }
    })

.factory('ChartService', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var entries = [
            { id: 1, title: 'nuts',           salt:350, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-05-21' },
            { id: 3, title: 'oatmeal',        salt:50, carbs:15, sugar:6, calories:450,units:50, entryDate:'2014-02-21'  },
            { id: 3, title: 'split pea soup', salt:250, carbs:15, sugar:6, calories:150,units:50, entryDate:'2014-05-23'  },
            { id: 4, title: 'dried fruit',    salt:65, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-03-21'  },
            { id: 5, title: 'slimjim',        salt:300, carbs:15, sugar:6, calories:350,units:50, entryDate:'2014-05-22'  },
            { id: 6, title: 'donut',        salt:200, carbs:15, sugar:6, calories:50,units:50, entryDate:'2014-05-22'  },
            { id: 7, title: 'pizza',        salt:90, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-05-23'  },
            { id: 8, title: 'steamed broc',        salt:500, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-05-22'  },
            { id: 9, title: 'glazed carrots',        salt:500, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-05-21'  },
            { id: 10, title: 'choc bar',        salt:70, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-05-22'  },
            { id: 11, title: 'slimjim',        salt:50, carbs:15, sugar:9, calories:450,units:50, entryDate:'2014-06-24'  },
            { id: 12, title: 'slimjim',        salt:50, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-05-22'  },
            { id: 13, title: 'slimjim',        salt:56, carbs:15, sugar:12, calories:150,units:50, entryDate:'2014-06-22'  },
            { id: 14, title: 'slimjim',        salt:200, carbs:15, sugar:6, calories:250,units:50, entryDate:'2014-05-24'  },
            { id: 15, title: 'slimjim',        salt:100, carbs:15, sugar:6, calories:650,units:50, entryDate:'2014-05-24'  }

        ];

        // this will come from prefrences,
        var daypct = {};
        daypct.salt = 2300;
        daypct.carbs = 150;
        daypct.sugar = 25;
        daypct.calories = 2300;

        var dailyPct = function(val, target) {
            return ((val/target) * 100).toFixed(2);

        };

        var monthlyPct = function(val,target){
            return ((val/(target*30))*100).toFixed(2);
        }

        // loop through entries for all matching comparision function
        var dayData = function(cmpFn) {
            var entry = {};
            var chartData = {};

            var today = new Date();
            var dayNum = today.getDay();
            var monthNum = today.getMonth();
            var dayData = {
                salt:0, carbs:0, sugar:0,calories:0,units:0
            };
            for (var i=0; i < entries.length; i++){
                entry = entries[i];
                //console.log("entry count " + i);
                var eDate = new Date(entry.entryDate);
                    if ( dayNum == eDate.getDay()) {
                        dayData.salt += entry.salt;
                        dayData.carbs += entry.carbs;
                        dayData.sugar += entry.sugar;
                        dayData.calories += entry.calories;
                    }
            }
            chartData.title = "Daily Totals";
            chartData.keys = ['Salt','Carbs','Sugar','Calories'];
            chartData.values = [];
            chartData.values.push(dailyPct(dayData.salt,daypct.salt));
            chartData.values.push(dailyPct(dayData.carbs,daypct.carbs));
            chartData.values.push(dailyPct(dayData.sugar,daypct.sugar));
            chartData.values.push(dailyPct(dayData.calories,daypct.calories));

            return chartData;
        };




        // loop through entries for all matching comparision function
        var monthData = function() {
            var entry = {};
            var chartData = {};

            var today = new Date();
            var monthNum = today.getMonth();
            var monthData = {
                salt:0, carbs:0, sugar:0,calories:0,units:0
            };
            for (var i=0; i < entries.length; i++){
                entry = entries[i];
                //console.log("entry count " + i);
                var eDate = new Date(entry.entryDate);
                if ( monthNum == eDate.getMonth()) {
                    monthData.salt += entry.salt;
                    monthData.carbs += entry.carbs;
                    monthData.sugar += entry.sugar;
                    monthData.calories += entry.calories;
                }
            }
            chartData.title = "Monthly Totals";
            chartData.keys = ['Salt','Carbs','Sugar','Calories'];
            chartData.values = [];
            chartData.values.push(monthlyPct(monthData.salt,daypct.salt));
            chartData.values.push(monthlyPct(monthData.carbs,daypct.carbs));
            chartData.values.push(monthlyPct(monthData.sugar,daypct.sugar));
            chartData.values.push(monthlyPct(monthData.calories,daypct.calories));
            console.log("pct " + chartData.values.toString());
            return chartData;
        };

        return {
            dayTitle : function() {
                return "Today";

            },
            monthTitle : function() {
                return "This Month";

            },
            dayValues: function() {
                return dayData();

            },
            monthValues: function() {
                return monthData();
            }
        }
    })
;
