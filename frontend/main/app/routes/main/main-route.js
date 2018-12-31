'use strict';

/**
 * @ngdoc function
 * @name main.controller:MainController
 * @description
 * # MainController
 * Controller of the main
 */
angular.module('main').controller('MainController', function($scope, $mdSidenav, $timeout, $rootScope) {
    $scope.toggleMainSideNav = buildToggler('main-sidenav');
    $scope.toggleTasksSideNav = buildToggler('tasks-sidenav');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $timeout(function() {
        $('#mainSection').css('visibility', 'visible');
    });

    $rootScope.processDiagramIsOpen = false;
    $scope.toggleProcessDiagram = function() {
        $rootScope.processDiagramIsOpen = !$rootScope.processDiagramIsOpen;
    };

    $rootScope.IsMiniSideNavLockedUpen = false;
    $scope.toggleIsMiniSideNavLockedUpen = function() {
        $rootScope.IsMiniSideNavLockedUpen = !$rootScope.IsMiniSideNavLockedUpen;
    };

    var objSideNav = $mdSidenav('tasks-sidenav', true);

    if (objSideNav.then) {
        objSideNav.then(function(instance) {
            instance.onClose(function() {
                $rootScope.IsMiniSideNavLockedUpen = !instance.isOpen();
            });
        });
    }
});
