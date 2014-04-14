/*
*   compare-controller.js
*   author: ronglin
*   create date: 2014.4.11
*/

'use strict';

module.exports = ['$scope', '$rootScope', '$routeParams', 'Products', 'Suppliers', function ($scope, $rootScope, $routeParams, Products, Suppliers) {
    var ids = $routeParams.supplierIds.split('-');
    $scope.suppliers = Suppliers.get(ids);
    $scope.productName = Products.get($routeParams.productId).name;
    $scope.clauses = Suppliers.clauses($scope.suppliers, $scope.productName);
    $scope.supports = Suppliers.supports($scope.suppliers, $scope.clauses, $scope.productName);
}];