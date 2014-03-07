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

    var findById = function (source, id) {
        var item = null, l = source.length, i;
        for (i = 0; i < l; i = i + 1) {
            if (source[i].id === id) {
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
                return findById(products, parseInt(id, 10));
            }
        };
    }]);

    //#endregion

    //#region Users

    var users = [];

    services.factory('Users', [function () {
        return {
            lastOrDefault: function () {
                return users.length > 0 ? users[users.length - 1] : { name: '', age: '', address: '', years: '', email: '' };
            },
            store: function (user) {
                users.push(user);
            }
        };
    }]);

    //#endregion

}());
