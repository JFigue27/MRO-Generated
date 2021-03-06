'use strict';

/**
 * @ngdoc function
 * @name main.controller:LoginController
 * @description
 * # LoginController
 * Controller of the main
 */
angular.module('main').controller('LoginController', function($scope, $location, authService, appConfig) {
    $scope.appName = appConfig.APP_NAME;

    alertify.closeAll();

    $scope.loginData = {
        userName: '',
        password: ''
    };

    $scope.ErrorMessage = null;

    $scope.login = function() {
        $scope.ErrorMessage = null;
        authService.login($scope.loginData).then(
            function(response) {
                $location.path('/');
            },
            function(err) {
                if (err == 'invalid_grant') {
                    err = 'Invalid username or password.';
                }
                $scope.ErrorMessage = err;
            }
        );
    };
});
