/*
*   controllers.js
*   author: ronglin
*   create date: 2014.3.6
*/

(function () {

    'use strict';
    // module namespace
    var ctrls = angular.module('Aegon.controllers', []);

    //#region main
    ctrls.controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function () {
            $scope.slide = 'slide-right';
            $window.history.back();
        };
        $rootScope.go = function (path) {
            $scope.slide = 'slide-left';
            $location.url(path);
        };
    }]);
    //#endregion

    //#region home
    ctrls.controller('HomeCtrl', ['$scope', 'Products', function ($scope, Products) {
        $scope.products = Products.query();
    }]);
    //#endregion

    //#region product
    ctrls.controller('UserCtrl', ['$scope', '$rootScope', '$routeParams', 'Products', 'Users', function ($scope, $rootScope, $routeParams, Products, Users) {
        $scope.product = Products.get($routeParams.productId);
        $scope.user = Users.lastOrDefault();
        $scope.submit = function () {
            Users.store(this.user);
            $rootScope.go('/suppliers/' + $routeParams.productId);
        };
    }]);
    //#endregion

    //#region suppliers
    ctrls.controller('SuppliersCtrl', ['$scope', '$rootScope', '$routeParams', 'Products', 'Suppliers', function ($scope, $rootScope, $routeParams, Products, Suppliers) {
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
    }]);
    //#endregion

    //#region compare
    ctrls.controller('CompareCtrl', ['$scope', '$rootScope', '$routeParams', 'Products', 'Suppliers', function ($scope, $rootScope, $routeParams, Products, Suppliers) {
        var ids = $routeParams.supplierIds.split('-');
        $scope.suppliers = Suppliers.get(ids);
        $scope.productName = Products.get($routeParams.productId).name;
        $scope.clauses = Suppliers.clauses($scope.suppliers, $scope.productName);
        $scope.supports = Suppliers.supports($scope.suppliers, $scope.clauses, $scope.productName);
    }]);
    //#endregion

}());
