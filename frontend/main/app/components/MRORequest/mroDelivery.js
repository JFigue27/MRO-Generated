'use strict';

/**
 * @ngdoc directive
 * @name main.directive:MRORequest
 * @description
 * # MRORequest
 */
angular.module('main').directive('mroDelivery', function() {
    return {
        templateUrl: 'components/MRORequest/mroDelivery.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'MRORequestFormController'
    };
});
