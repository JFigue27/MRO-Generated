'use strict';

/**
 * @ngdoc overview
 * @name main
 * @description
 * # main
 *
 * Main module of the application.
 */
angular
    .module(
        'main',
        [
            'ngAnimate',
            'ngRoute',
            'ngSanitize',
            'ngActivityIndicator',
            'LocalStorageModule',
            'angularUtils.directives.dirPagination',
            'angularFileUpload',
            'ngMaterial',
            'ngWig',
            angularDragula(angular)
        ],
        function($httpProvider) {
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        }
    )
    .config(function(
        $routeProvider,
        appConfig,
        $httpProvider,
        localStorageServiceProvider,
        $mdAriaProvider,
        $mdThemingProvider,
        $activityIndicatorProvider,
        $qProvider
    ) {
        $mdAriaProvider.disableWarnings();

        $mdThemingProvider
            .theme('default')
            //indigo, blue, light-blue, cyan, teal, green
            //light-green, amber, orange, deep-orange
            //brown, grey, blue-grey
            .primaryPalette('teal')
            //red, pink, purple, deep-purple, lime, yellow
            .accentPalette('grey')
            .warnPalette('red')
            .backgroundPalette('grey');
        // .dark();

        localStorageServiceProvider.setPrefix(appConfig.APP_NAME);

        $qProvider.errorOnUnhandledRejections(true);

        ///start:generated:routes<<<
        $routeProvider
            .when('/', {
                templateUrl: 'routes/Main/main-route.html',
                controller: 'MainController',
                controllerAs: 'route_Main'
            })
            .when('/login', {
                templateUrl: 'routes/Login/login-route.html',
                controller: 'LoginController',
                controllerAs: 'route_Login'
            })
            .when('/about', {
                templateUrl: 'routes/About/about-route.html',
                controller: 'AboutController',
                controllerAs: 'route_About'
            })
            .when('/profile', {
                templateUrl: 'routes/Profile/profile-route.html',
                controller: 'ProfileController',
                controllerAs: 'route_Profile'
            })
            .when('/users', {
                templateUrl: 'routes/Users/users-route.html',
                controller: 'UsersController',
                controllerAs: 'route_Users'
            })
            .when('/materials', {
                templateUrl: 'routes/Materials/materials-route.html',
                controller: 'MaterialsController',
                controllerAs: 'route_Materials'
            })
            .when('/inventory-input-docs', {
                templateUrl: 'routes/InventoryInputDocs/inventory-input-docs-route.html',
                controller: 'InventoryInputDocsController',
                controllerAs: 'route_InventoryInputDocs'
            })
            .when('/inventory', {
                templateUrl: 'routes/Inventory/inventory-route.html',
                controller: 'InventoryController',
                controllerAs: 'route_Inventory'
            })
            .when('/mro-request', {
                templateUrl: 'routes/MroRequest/mro-request-route.html',
                controller: 'MroRequestController',
                controllerAs: 'route_MroRequest'
            })
            .when('/vendors', {
                templateUrl: 'routes/Vendors/vendors-route.html',
                controller: 'VendorsController',
                controllerAs: 'route_Vendors'
            })
            .when('/locations', {
                templateUrl: 'routes/Locations/locations-route.html',
                controller: 'LocationsController',
                controllerAs: 'route_Locations'
            })
            .when('/areas', {
                templateUrl: 'routes/Areas/areas-route.html',
                controller: 'AreasController',
                controllerAs: 'route_Areas'
            })
            .when('/mros', {
                templateUrl: 'routes/Mros/mros-route.html',
                controller: 'MrosController',
                controllerAs: 'route_Mros'
            })
            .when('/employees', {
                templateUrl: 'routes/Employees/employees-route.html',
                controller: 'EmployeesController',
                controllerAs: 'route_Employees'
            })
            .otherwise({ redirectTo: '/' });
        ///end:generated:routes<<<

        $activityIndicatorProvider.setActivityIndicatorStyle('CircledWhite');
        alertify.set('notifier', 'position', 'top-left');
        alertify.set('notifier', 'delay', 2);

        $httpProvider.interceptors.push('authInterceptorService');
    })
    //AuthService
    /*.run(function(authService, $rootScope, $location) {
    
        authService.fillAuthData();
    
        // register listener to watch route changes
        $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
            alertify.closeAll();
            $('.modal').modal('hide');
            $('.modal-backdrop.fade.in').remove();
            $rootScope.activePath = $location.path();
    
            var authentication = authService.authentication;
            if (!authentication || !authentication.isAuth) {
                if (next.templateUrl != 'components/login/login.html') {
                    $location.path('/login');
                }
            } else {
                //Role Validations
                // if (authentication.role == 'Usuario' || authentication.role == '') {
                //     authService.logOut();
                //     setTimeout(function() {
                //         alertify.alert('Only Administrators have access to this application.').set('modal', true);
                //     }, 300);
                // }
            }
    
        });
    
        $rootScope.logOut = function() {
            authService.logOut();
        };
    
        $rootScope.getCurrentUser = function() {
            return authService.authentication;
        };
    
    });*/
    //oidcService
    .run(function($rootScope, $location, oidcService, $route) {
        oidcService.getUser().then(function(response) {
            if (!response) {
                oidcService.login();
                // .then(function() {
                //     $route.reload();
                // });
            }
        });

        // register listener to watch route changes
        $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
            alertify.closeAll();
            $('.modal').modal('hide');
            $('.modal-backdrop.fade.in').remove();
            $rootScope.activePath = $location.path();
        });

        $rootScope.logOut = function() {
            oidcService.logout();
        };

        $rootScope.logIn = function() {
            oidcService.login();
        };

        $rootScope.getCurrentUser = function() {
            return oidcService.authentication;
        };
    });
