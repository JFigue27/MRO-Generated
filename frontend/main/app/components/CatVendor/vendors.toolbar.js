'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatVendor
 * @description
 * # CatVendor
 */
angular.module('main').directive('vendorsToolbar', function() {
    return {
        templateUrl: 'components/CatVendor/vendors.toolbar.html',
        restrict: 'E',
        controller: function($scope) {}
    };
});
