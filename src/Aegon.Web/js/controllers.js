/*
*   controllers.js
*   author: ronglin
*   create date: 2014.3.6
*/

'use strict';

var name = module.exports.name = 'Aegon.controllers';

var ctrls = angular.module(name, [])
.controller('MainCtrl', require('./controllers/main-controller'))
.controller('HomeCtrl', require('./controllers/home-controller'))
.controller('UserCtrl', require('./controllers/user-controller'))
.controller('SuppliersCtrl', require('./controllers/suppliers-controller'))
.controller('CompareCtrl', require('./controllers/compare-controller'));