/*
*   app.js
*   author: ronglin
*   create date: 2014.3.6
*/

(function () {

    'use strict';
    // module namespace
    var aegon = angular.module('Aegon', [
        'ngTouch',
        'ngRoute',
        'ngAnimate',
        'Aegon.controllers',
        'Aegon.dataServices'
    ]);

    aegon.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'HomeCtrl' });
        $routeProvider.when('/product/:productId', { templateUrl: 'partials/product.html', controller: 'ProductCtrl' });
        $routeProvider.otherwise({ redirectTo: '/home' });
    }]);

}());
