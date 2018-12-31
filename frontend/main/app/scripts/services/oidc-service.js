'use strict';

/**
 * @ngdoc service
 * @name Accounts.oidcService
 * @description
 * # oidcService
 * Factory in the Accounts.
 */
angular
    .module('main')
    .factory('authInterceptorService', function($q, oidcService) {
        var authInterceptorServiceFactory = {};

        var _request = function(config) {
            config.headers = config.headers || {};

            var authData = oidcService.authentication;
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.access_token;
            }

            return config;
        };

        var _responseError = function(rejection) {
            if (rejection.status === 401) {
                oidcService.login();
            }
            return $q.reject(rejection);
        };

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    })
    .factory('oidcService', function($rootScope) {
        var settings = {
            // authority: 'http://localhost:61521',
            popup_redirect_uri: 'http://localhost:5000/auth_redirect.html',
            post_logout_redirect_uri: 'http://localhost:5000',
            silent_redirect_uri: 'http://localhost:5000/silent-renew.html',

            authority: 'https://apps.capsonic.com/IdentityServer',
            // popup_redirect_uri: 'https://apps.capsonic.com/CQA/main/auth_redirect.html',
            // post_logout_redirect_uri: 'https://apps.capsonic.com/CQA/main',
            // silent_redirect_uri: 'https://apps.capsonic.com/CQA/main/silent-renew.html',

            client_id: 'cqa',

            response_type: 'id_token token',
            scope: 'openid profile email api roles',
            filterProtocolClaims: true,

            accessTokenExpiringNotificationTime: 60,

            automaticSilentRenew: true,

            popupWindowFeatures: 'location=no,toolbar=no,width=500,height=600,left=100,top=100'
        };

        var manager = new Oidc.UserManager(settings);
        var oidcClient = new Oidc.OidcClient(settings);

        var appFirstTimeLoaded = true;
        manager.events.addUserLoaded(function(authResponse) {
            _fillAuthentication(authResponse);

            if (appFirstTimeLoaded) {
                appFirstTimeLoaded = false;
                $rootScope.$broadcast('on_login');
            } else {
                $rootScope.$apply();
            }
        });

        manager.events.addUserUnloaded(function() {
            appFirstTimeLoaded = true;

            _removeAuthentication();

            $rootScope.$apply();

            console.log('User signed out.');
        });

        manager.events.addSilentRenewError(function(error) {
            console.error('error while renewing the access token', error);
        });

        manager.events.addUserSignedOut(function() {
            appFirstTimeLoaded = true;

            _removeAuthentication();

            $rootScope.$apply();

            console.log('User signed out.');
        });

        var loginCalled = false;
        var _login = function() {
            if (loginCalled == false) {
                loginCalled = true;
                return manager
                    .signinPopup()
                    .then(function() {
                        setTimeout(function() {
                            loginCalled = false;
                        }, 2500);
                    })
                    .catch(function(error) {
                        loginCalled = false;
                        console.error('error while logging in through the popup', error);
                        _logout();
                    });
            }
        };

        var _logout = function() {
            return manager
                .signoutPopup()
                .then(function() {
                    _removeAuthentication();
                    $rootScope.$apply();
                })
                .catch(function(error) {
                    console.error('error while signing out user', error);
                });
        };

        var _removeAuthentication = function() {
            authServiceAPI.authentication = null;
        };

        var _fillAuthentication = function(authResponse) {
            if (authResponse && !authResponse.expired) {
                authServiceAPI.authentication = authResponse;
                authServiceAPI.authentication.Value = authResponse.profile.preferred_username;
                authServiceAPI.authentication.id = authResponse.profile.sub;
                authServiceAPI.authentication.UserKey = authResponse.profile.sub;
                authServiceAPI.authentication.Email = authResponse.profile.email;
            } else {
                _removeAuthentication();
            }
            return authServiceAPI.authentication;
        };

        var authServiceAPI = {};

        authServiceAPI.login = _login;
        authServiceAPI.logout = _logout;
        authServiceAPI.authentication = null;

        authServiceAPI.getUser = function() {
            return manager.getUser().then(_fillAuthentication);
        };

        return authServiceAPI;
    });
