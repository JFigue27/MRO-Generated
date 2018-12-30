'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatGeoLocation
 * @description
 * # CatGeoLocation
 */
angular.module('main').directive('locations', function() {
    return {
        templateUrl: 'components/CatGeoLocation/locations.html',
        restrict: 'E',
        scope: {},
        controller: 'CatGeoLocationListController'
    };
});
