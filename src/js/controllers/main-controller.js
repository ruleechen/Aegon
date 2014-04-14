/*
*   main-controller.js
*   author: ronglin
*   create date: 2014.4.11
*/

'use strict';

module.exports = ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
    $scope.slide = '';
    $rootScope.back = function () {
        $scope.slide = 'slide-right';
        $window.history.back();
    };
    $rootScope.go = function (path) {
        $scope.slide = 'slide-left';
        $location.url(path);
    };
}];