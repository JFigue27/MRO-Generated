'use strict';

/**
 * @ngdoc directive
 * @name main.directive:UserList
 * @description
 * # UserList
 */
angular.module('main').directive('userList', function() {
    return {
        templateUrl: 'components/User/user.list.html',
        restrict: 'E',
        controller: function($scope, listController, userService, $mdDialog, $rootScope, $timeout) {
            var listCtrl = new listController({
                scope: $scope,
                entityName: 'User',
                baseService: userService,
                afterCreate: function(oInstance, oEvent) {
                    $mdDialog.show({
                        title: 'User',
                        contentElement: '#modal-user',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent,
                        onRemoving: function(element, removePromise) {
                            listCtrl.load();
                            angular.element('.SearchInput').focus();
                        }
                    });

                    $rootScope.$broadcast('load-modal-user', oInstance);
                },
                afterLoad: function() {},
                onOpenItem: function(oEntity, oEvent) {
                    $mdDialog.show({
                        title: 'User',
                        contentElement: '#modal-user',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent,
                        onRemoving: function(element, removePromise) {
                            listCtrl.load();
                            angular.element('.SearchInput').focus();
                        }
                    });

                    $rootScope.$broadcast('load-modal-user', oEntity);
                },
                filters: []
            });

            $scope.openFirstItem = function() {
                if ($scope.baseList && $scope.baseList.length > 0) {
                    $scope.openItem($scope.baseList[0]);
                }
            };

            function refresh() {
                listCtrl.load();
            }

            $scope.$on('on_login', function() {
                refresh();
            });

            $timeout(function() {
                refresh();
            }, 200);
        }
    };
});
