/*
*   controllers.js
*   author: ronglin
*   create date: 2014.3.6
*/

'use strict';

angular.module('Aegon.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function () {
            $scope.slide = 'slide-right';
            $window.history.back();
        };
        $rootScope.go = function (path) {
            $scope.slide = 'slide-left';
            $location.url(path);
        };
    }])
    .controller('HomeCtrl', ['$scope', 'Products', function ($scope, Products) {
        $scope.products = Products.query();
    }])
    .controller('ProductCtrl', ['$scope', '$routeParams', 'Products', 'Users', function ($scope, $routeParams, Products, Users) {
        $scope.product = Products.get($routeParams.productId);
        $scope.user = Users.lastOrDefault();
        $scope.submit = function () {
            Users.store(this.user);
        };
    }]);

