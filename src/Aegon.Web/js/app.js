/*
*   app.js
*   author: ronglin
*   create date: 2014.3.6
*/

'use strict';

var controllers = require('./controllers');
var dataServices = require('./dataServices');

var aegon = angular.module('Aegon', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    controllers.name,
    dataServices.name
]);

aegon.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', { templateUrl: 'views/home.html', controller: 'HomeCtrl' });
    $routeProvider.when('/user/:productId', { templateUrl: 'views/user.html', controller: 'UserCtrl' });
    $routeProvider.when('/suppliers/:productId', { templateUrl: 'views/suppliers.html', controller: 'SuppliersCtrl' });
    $routeProvider.when('/compare/:productId/:supplierIds', { templateUrl: 'views/compare.html', controller: 'CompareCtrl' });
    $routeProvider.when('/content', { templateUrl: 'views/content.html' });
    $routeProvider.when('/redirected', { templateUrl: 'views/redirected.html' });
    $routeProvider.otherwise({ redirectTo: '/home' });
}]);
