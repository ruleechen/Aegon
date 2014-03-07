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
        $routeProvider.when('/user/:productId', { templateUrl: 'partials/user.html', controller: 'UserCtrl' });
        $routeProvider.when('/suppliers/:productId', { templateUrl: 'partials/suppliers.html', controller: 'SuppliersCtrl' });
        $routeProvider.when('/compare/:productId/:supplierIds', { templateUrl: 'partials/compare.html', controller: 'CompareCtrl' });
        $routeProvider.when('/content', { templateUrl: 'partials/content.html' });
        $routeProvider.when('/redirected', { templateUrl: 'partials/redirected.html' });
        $routeProvider.otherwise({ redirectTo: '/home' });
    }]);

}());