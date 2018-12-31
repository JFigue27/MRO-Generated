'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatGeoLocation
 * @description
 * # CatGeoLocation
 */
angular.module('main').directive('locationsToolbar', function() {
    return {
        templateUrl: 'components/CatGeoLocation/locations.toolbar.html',
        restrict: 'E',
        controller: function($scope) {}
    };
});
