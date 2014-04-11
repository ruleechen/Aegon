/*
*   home-controller.js
*   author: ronglin
*   create date: 2014.4.11
*/

'use strict';

module.exports = ['$scope', 'Products', function ($scope, Products) {
    $scope.products = Products.query();
}];