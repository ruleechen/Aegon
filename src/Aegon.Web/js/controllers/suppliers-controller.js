/*
*   suppliers-controller.js
*   author: ronglin
*   create date: 2014.4.11
*/

'use strict';

module.exports = ['$scope', '$rootScope', '$routeParams', 'Products', 'Suppliers', function ($scope, $rootScope, $routeParams, Products, Suppliers) {
    var productName = Products.get($routeParams.productId).name;
    $scope.suppliers = Suppliers.query(productName);
    $scope.redirect = function () {
        $rootScope.go(this.supplier.link);
    };
    var enabledCheck = false;
    var getSelected = function (suppliers) {
        var ids = [];
        for (var i = 0; i < suppliers.length; i++) {
            if (suppliers[i].check) {
                ids.push(suppliers[i].id);
            }
        }
        return ids;
    };
    $scope.change = function () {
        if (!enabledCheck) {
            return;
        }
        var ids = getSelected(this.suppliers);
        if (ids.length === 0) {
            $scope.errors = true;
        } else {
            $scope.errors = false;
        }
    };
    $scope.submit = function () {
        enabledCheck = true;
        var ids = getSelected(this.suppliers);
        if (ids.length === 0) {
            $scope.errors = true;
        } else {
            $rootScope.go('/compare/' + $routeParams.productId + '/' + ids.join('-'));
        }
    };
}];