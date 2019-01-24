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
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'CatGeoLocationListController'
    };
});
