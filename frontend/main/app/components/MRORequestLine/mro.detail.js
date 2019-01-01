'use strict';

/**
 * @ngdoc directive
 * @name main.directive:MRORequestLine
 * @description
 * # MRORequestLine
 */
angular.module('main').directive('mroDetail', function() {
    return {
        templateUrl: 'components/MRORequestLine/mro.detail.html',
        restrict: 'E',
        scope: {},
        controller: 'MRORequestLineListController'
    };
});
