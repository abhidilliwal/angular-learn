'use strict';

// Declare app level module which depends on filters, and services
app.myApp = angular.module('myApp', ['ngResource', 'myApp.filters', 'myApp.services', 'myApp.directives']);


app.myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html'});
    $routeProvider.when('/dashboard2', {templateUrl: 'partials/dashboard2.html'});
    $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);


app.myApp.factory("SRegions", function () {
    return {data: []};
});





