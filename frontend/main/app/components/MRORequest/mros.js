'use strict';

/**
 * @ngdoc directive
 * @name main.directive:MRORequest
 * @description
 * # MRORequest
 */
angular.module('main').directive('mros', function() {
    return {
        templateUrl: 'components/MRORequest/mros.html',
        restrict: 'E',
        scope: {},
        controller: 'MRORequestListController'
    };
});
