'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatVendor
 * @description
 * # CatVendor
 */
angular.module('main').directive('vendors', function() {
    return {
        templateUrl: 'components/CatVendor/vendors.html',
        restrict: 'E',
        scope: {},
        controller: 'CatVendorListController'
    };
});
