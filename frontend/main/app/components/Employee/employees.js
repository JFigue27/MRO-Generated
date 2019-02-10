'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Employee
 * @description
 * # Employee
 */
angular.module('main').directive('employees', function() {
    return {
        templateUrl: 'components/Employee/employees.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'EmployeeListController'
    };
});
