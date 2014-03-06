/*
*   app.js
*   author: ronglin
*   create date: 2014.3.6
*/

'use strict';

angular.module('Aegon', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'Aegon.controllers',
    'Aegon.dataServices'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'HomeCtrl' });
    $routeProvider.when('/product/:productId', { templateUrl: 'partials/product.html', controller: 'ProductCtrl' });
    $routeProvider.otherwise({ redirectTo: '/home' });
}]);