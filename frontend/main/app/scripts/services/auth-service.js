'use strict';

/**
 * @ngdoc service
 * @name main.authService
 * @description
 * # authService
 * Factory in the main.
 */
angular
    .module('main')
    .factory('authInterceptorService', function($q, $location, localStorageService) {
        var authInterceptorServiceFactory = {};

        var _request = function(config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        };

        var _responseError = function(rejection) {
            if (rejection.status === 401) {
                localStorageService.remove('authorizationData');
                $location.path('/login');
            }
            return $q.reject(rejection);
        };

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    })
    .factory('authService', function($http, $q, localStorageService, appConfig, userService, $rootScope, $location) {
        var serviceBase = appConfig.API_URL;
        var authServiceAPI = {};

        var _saveRegistration = function(registration) {
            _logOut();

            return $http.post(serviceBase + 'account/register', '=' + JSON.stringify(registration)).then(function(response) {
                return response;
            });
        };

        var _login = function(loginData) {
            var data = 'grant_type=password&username=' + loginData.userName + '&password=' + loginData.password;

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'token', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(
                    function(response) {
                        var backendResponse = response.data;

                        var token = backendResponse.access_token;
                        var userName = loginData.userName;

                        localStorageService.set('authorizationData', {
                            token: token,
                            userName: userName
                        });

                        deferred.resolve(_fillAuthData());
                    },
                    function(err, status) {
                        _logOut();
                        if (!err) {
                            err = 'Error. Servidor no disponible.';
                        } else {
                            if (err && err.data && err.data.error) {
                                err = err.data.error;
                            }
                        }
                        deferred.reject(err);
                    }
                );

            return deferred.promise;
        };

        var _logOut = function() {
            localStorageService.remove('authorizationData');

            authServiceAPI.authentication = null;

            $location.path('/login');
        };

        var _fillAuthData = function() {
            authServiceAPI.authentication = localStorageService.get('authorizationData');
            if (authServiceAPI.authentication) {
                authServiceAPI.authentication.isAuth = true;
                authServiceAPI.authentication.Value = authServiceAPI.authentication.userName;
                authServiceAPI.authentication.role = authServiceAPI.authentication.Role;
            }

            return authServiceAPI.authentication;
        };

        authServiceAPI.saveRegistration = _saveRegistration;
        authServiceAPI.login = _login;
        authServiceAPI.logOut = _logOut;
        authServiceAPI.fillAuthData = _fillAuthData;
        authServiceAPI.authentication = null;

        return authServiceAPI;
    });
