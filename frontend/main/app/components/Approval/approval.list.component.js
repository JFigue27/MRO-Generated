'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Approval
 * @description
 * # Approval
 */
angular.module('main').directive('approvalList', function() {
    return {
        templateUrl: 'components/Approval/approval.list.html',
        restrict: 'E',
        controller: function($scope, listController, $mdDialog, $rootScope, ApprovalService) {
            var listCtrl = new listController({
                scope: $scope,
                entityName: 'Approval',
                baseService: ApprovalService,
                afterCreate: function(oInstance, oEvent) {
                    $mdDialog.show({
                        title: 'Approval',
                        contentElement: '#modal-Approval',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent,
                        onRemoving: function(element, removePromise) {
                            listCtrl.load();
                        }
                    });

                    $rootScope.$broadcast('load-modal-Approval', oInstance);
                },
                afterLoad: function() {},
                onOpenItem: function(oEntity, oEvent) {
                    $mdDialog.show({
                        title: 'Approval',
                        contentElement: '#modal-Approval',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent,
                        onRemoving: function(element, removePromise) {
                            listCtrl.load();
                        }
                    });

                    $rootScope.$broadcast('load-modal-Approval', oEntity);
                },
                filters: []
            });

            $scope.$on('load_Approval', function(scope) {
                listCtrl.load();
            });

            listCtrl.load();
        }
    };
});
