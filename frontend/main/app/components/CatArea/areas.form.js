'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatArea
 * @description
 * # CatArea
 */
angular.module('main').directive('areasForm', function() {
    return {
        templateUrl: 'components/CatArea/areas.form.html',
        restrict: 'E',
        scope: {},
        controller: 'CatAreaFormController'
    };
});
