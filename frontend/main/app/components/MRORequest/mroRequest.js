'use strict';

/**
 * @ngdoc directive
 * @name main.directive:MRORequest
 * @description
 * # MRORequest
 */
angular.module('main').directive('mroRequest', function() {
    return {
        templateUrl: 'components/MRORequest/mroRequest.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'MRORequestFormController'
    };
});
