/*
*   data-services.js
*   author: ronglin
*   create date: 2014.3.6
*/

'use strict';

(function () {

    var products = [
        { id: 1, name: 'CarInsurance', title: 'Car insurance', logo: 'resources/images/logo.png' },
        { id: 2, name: 'AirInsurance', title: 'Air insurance', logo: 'resources/images/logo.png' },
        { id: 3, name: 'HealthInsurance', title: 'Health insurance', logo: 'resources/images/logo.png' },
        { id: 4, name: 'TravelInsurance', title: 'Travel insurance', logo: 'resources/images/logo.png' }
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

    angular.module('Aegon.dataServices', [])
    .factory('Products', [function () {
        return {
            query: function () {
                return products;
            },
            get: function (id) {
                return findById(products, parseInt(id, 10));
            }
        }
    }]);

}());