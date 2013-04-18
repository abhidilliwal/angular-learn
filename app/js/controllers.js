'use strict';

/* Controllers */


function FilterCtrl($scope, $resource, SelectedRegions, Countries) {
    // $scope.regions = $resource("resp/regions.json").query();
    $scope.selectedRegions = SelectedRegions;
    Countries.query(function (data){
        $scope.regions = Countries.parse(data);
    });

    $scope.selectionChange = function () {
        var s = [];
        s = $scope.regions.filter(function (region){
            return region && region.selected;
        });
        $scope.selectedRegions.data = s;
    };
}

FilterCtrl.$inject = ["$scope", "$resource", "SRegions", "CountriesRes"];


function GraphCtrl($scope, $resource, SelectedRegions, Graph) {
    $scope.selectedRegions = SelectedRegions;

    $scope.$watch('selectedRegions.data', function (regions){
        var reg = regions.map(function (r) {
            return r.id;
        });
        Graph.query({regions: reg}, function (data) {
            $scope.chartData = {series: [{name: "KPI", data: Graph.parse(data.response).seriesData[1047]}]}
        });
    });
    
}

GraphCtrl.$inject = ["$scope", "$resource", "SRegions",  "GraphRes"];
