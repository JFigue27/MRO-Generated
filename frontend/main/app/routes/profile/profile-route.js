'use strict';

/**
 * @ngdoc function
 * @name main.controller:profileController
 * @description
 * # profileController
 * Controller of the main
 */
angular.module('main').controller('ProfileController', function($scope, formController, userService, $rootScope, $timeout) {
    var ctrl = new formController({
        scope: $scope,
        entityName: 'User',
        baseService: userService
    });

    $scope.sendTestEmail = function(oUser) {
        userService.sendTestEmail(oUser).then(function() {
            alertify.success('Email sent successfully.');
        });
    };

    $scope.save = function(oUser) {
        userService.save(oUser).then(function() {
            alertify.success('Saved Successfully.');
        });
    };

    function refresh() {
        userService.getSingleWhere('UserName', $rootScope.getCurrentUser().Value).then(oUser => {
            ctrl.load(oUser);
        });
    }

    $scope.$on('on_login', function() {
        refresh();
    });

    $timeout(function() {
        refresh();
    }, 200);
});
