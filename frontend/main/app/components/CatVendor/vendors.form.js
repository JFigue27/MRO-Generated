'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatVendor
 * @description
 * # CatVendor
 */
angular.module('main').directive('vendorsForm', function() {
    return {
        templateUrl: 'components/CatVendor/vendors.form.html',
        restrict: 'E',
        scope: {},
        controller: 'CatVendorFormController'
    };
});
