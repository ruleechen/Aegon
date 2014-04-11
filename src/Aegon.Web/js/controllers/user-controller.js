/*
*   user-controller.js
*   author: ronglin
*   create date: 2014.4.11
*/

'use strict';

module.exports = ['$scope', '$rootScope', '$routeParams', 'Products', 'Users', function ($scope, $rootScope, $routeParams, Products, Users) {
    $scope.product = Products.get($routeParams.productId);
    $scope.user = Users.lastOrDefault();
    $scope.submit = function () {
        Users.store(this.user);
        $rootScope.go('/suppliers/' + $routeParams.productId);
    };
}];