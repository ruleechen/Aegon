/*
*   data-services.js
*   author: ronglin
*   create date: 2014.3.6
*/

(function () {

    'use strict';
    // module namespace
    var services = angular.module('Aegon.dataServices', []);

    //#region Products

    var products = [
        { id: 1, name: 'CarInsurance', title: 'Car insurance', logo: 'images/demo.png' },
        { id: 2, name: 'AirInsurance', title: 'Air insurance', logo: 'images/demo.png' },
        { id: 3, name: 'HealthInsurance', title: 'Health insurance', logo: 'images/demo.png' },
        { id: 4, name: 'TravelInsurance', title: 'Travel insurance', logo: 'images/demo.png' }
    ];

    var findBy = function (source, fieldName, fieldValue) {
        var item = null, l = source.length, i;
        for (i = 0; i < l; i = i + 1) {
            if (source[i][fieldName] === fieldValue) {
                item = source[i];
                break;
            }
        }
        return item;
    };

    services.factory('Products', [function () {
        return {
            query: function () {
                return products;
            },
            get: function (id) {
                return findBy(products, 'id', parseInt(id, 10));
            }
        };
    }]);

    //#endregion

    //#region Users

    var users = [
        { id: 1, name: 'John', age: '20', address: 'Xiamen', years: '10', email: 'john@test.com' }
    ];

    services.factory('Users', [function () {
        return {
            lastOrDefault: function () {
                return users[users.length - 1];
            },
            store: function (user) {
                var updated = false;
                if (user.id) {
                    var item = findBy(users, 'id', user.id);
                    if (item) {
                        angular.extend(item, user);
                        updated = true;
                    }
                }
                if (!updated) {
                    user.id = this.lastOrDefault().id + 1;
                    users.push(user);
                }
            },
            get: function (id) {
                return findBy(users, 'id', parseInt(id, 10));
            }
        };
    }]);

    //#endregion

    //#region Suppliers

    var suppliers = [
        { id: 1, company: 'Company A', price: '€84', products: 'CarInsurance', link: '/redirected' },
        { id: 2, company: 'Company B', price: '€85', products: 'CarInsurance,AirInsurance', link: '/redirected' },
        { id: 3, company: 'Company C', price: '€86', products: 'CarInsurance,AirInsurance,TravelInsurance', link: '/redirected' },
        { id: 4, company: 'Company D', price: '€87', products: 'CarInsurance,AirInsurance,TravelInsurance,TravelInsurance', link: '/redirected' },
        { id: 5, company: 'Company E', price: '€88', products: 'AirInsurance,TravelInsurance,TravelInsurance', link: '/redirected' }
    ];

    services.factory('Suppliers', [function () {
        return {
            query: function (productId) {
                if (productId) {
                    var product = findBy(products, 'id', parseInt(productId, 10));
                    var ret = [];
                    for (var i = 0; i < suppliers.length; i++) {
                        if (suppliers[i].products.indexOf(product.name) > -1) {
                            ret.push(suppliers[i]);
                        }
                    }
                    return ret;
                } else {
                    return suppliers;
                }
            },
            get: function (id) {
                return findBy(suppliers, 'id', parseInt(id, 10));
            }
        };
    }]);

    //#endregion

}());
