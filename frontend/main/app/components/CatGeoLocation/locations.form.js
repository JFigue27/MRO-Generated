'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatGeoLocation
 * @description
 * # CatGeoLocation
 */
angular.module('main').directive('locationsForm', function() {
    return {
        templateUrl: 'components/CatGeoLocation/locations.form.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'CatGeoLocationFormController'
    };
});
