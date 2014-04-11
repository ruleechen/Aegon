/*
*   dataServices.js
*   author: ronglin
*   create date: 2014.3.6
*/

'use strict';

var name = module.exports.name = 'Aegon.dataServices';

var services = angular.module(name, []);

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
    {
        id: 1, company: 'Company A', price: '€84', coverage: '€1004', link: '/redirected', products: [
            { name: 'CarInsurance', clauses: { A: true, G: true, Z: true } },
            { name: 'HealthInsurance', clauses: { B: true, U: true } }
        ]
    },
    {
        id: 2, company: 'Company B', price: '€85', coverage: '€1005', link: '/redirected', products: [
            { name: 'CarInsurance', clauses: { Y: true, R: true, M: true } },
            { name: 'AirInsurance', clauses: { Y: true, O: true, P: true } }
        ]
    },
    {
        id: 3, company: 'Company C', price: '€86', coverage: '€1006', link: '/redirected', products: [
            { name: 'CarInsurance', clauses: { A: true, G: true, S: true } },
            { name: 'TravelInsurance', clauses: { C: true, E: true } }
        ]
    },
    {
        id: 4, company: 'Company D', price: '€87', coverage: '€1007', link: '/redirected', products: [
            { name: 'CarInsurance', clauses: { B: true, Q: true, M: true } },
            { name: 'AirInsurance', clauses: { C: true, N: true, V: true } },
            { name: 'HealthInsurance', clauses: { D: true, L: true } },
            { name: 'TravelInsurance', clauses: { Z: true, K: true } }
        ]
    },
    {
        id: 5, company: 'Company E', price: '€88', coverage: '€1008', link: '/redirected', products: [
            { name: 'AirInsurance', clauses: { B: true, X: true } },
            { name: 'TravelInsurance', clauses: { C: true, F: true, G: true } },
            { name: 'HealthInsurance', clauses: { Z: true, H: true } }
        ]
    }
];

services.factory('Suppliers', [function () {
    return {
        query: function (productName) {
            var ret = suppliers;
            if (angular.isString(productName)) {
                ret = [];
                angular.forEach(suppliers, function (s) {
                    angular.forEach(s.products, function (p) {
                        if (p.name === productName) {
                            ret.push(s);
                            return false;
                        }
                    });
                });
            }
            angular.forEach(ret, function (it) {
                delete it.check;
            });
            return ret;
        },
        get: function (id) {
            if (angular.isArray(id)) {
                var ret = [];
                angular.forEach(id, function (i) {
                    var s = findBy(suppliers, 'id', parseInt(i, 10));
                    if (s) { ret.push(s); }
                });
                return ret;
            } else {
                return findBy(suppliers, 'id', parseInt(id, 10));
            }
        },
        clauses: function (ss, productName) {
            var obj = {};
            angular.forEach(ss, function (s) {
                angular.forEach(s.products, function (p) {
                    if (p.name === productName) {
                        angular.forEach(p.clauses, function (v, k) {
                            obj[k] = true;
                        });
                    }
                });
            });
            var ret = [];
            angular.forEach(obj, function (v, k) {
                ret.push(k);
            });
            return ret;
        },
        supports: function (ss, clauseTypes, productName) {
            var ret = {};
            angular.forEach(ss, function (s) {
                ret[s.id] = {};
                angular.forEach(s.products, function (p) {
                    if (p.name === productName) {
                        angular.forEach(clauseTypes, function (c) {
                            ret[s.id][c] = p.clauses[c];
                        });
                    }
                });
            });
            return ret;
        }
    };
}]);

//#endregion