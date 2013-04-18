'use strict';

/* Directives */

app.directives = angular.module('myApp.directives', []);


app.directives.directive('chart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        transclude:true,
        replace: true,

        link: function (scope, element, attrs) {
            var chartsDefaults = {
                chart: {
                    renderTo: element[0],
                    type: attrs.type || null,
                    height: attrs.height || null,
                    width: attrs.width || null,
                }
            };

            //Update when charts data changes
            scope.$watch(function() { return attrs.value; }, function(value) {
              if(!attrs.value) return;
                var deepCopy = true;
                var newSettings = {};
                $.extend(deepCopy, newSettings, chartsDefaults, JSON.parse(attrs.value));
                var chart = new Highcharts.Chart(newSettings);
            });
        }
    };
});
