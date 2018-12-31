'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatAreaListController
 * @description
 * # CatAreaListController
 * Controller of the main
 */
angular
    .module('main')
    .controller('CatAreaListController', function($scope, listController, $timeout, CatAreaService, $mdDialog, $rootScope) {
        var listCtrl = new listController({
            scope: $scope,
            entityName: 'CatArea',
            baseService: CatAreaService,
            afterCreate: function(oInstance, oEvent) {
                $mdDialog
                    .show({
                        contentElement: '#modal-Area',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(() => {
                        refresh();
                    });

                $rootScope.$broadcast('load-modal-Area', oInstance);
            },
            afterLoad: function() {
                listCtrl.setRotationFocus();
            },
            afterSave: function(oEntity) {
                refresh();
            },
            onOpenItem: function(oEntity, oEvent) {
                $mdDialog
                    .show({
                        contentElement: '#modal-Area',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(answer => {
                        if (answer == 'OK') {
                            refresh();
                        }
                    });

                $rootScope.$broadcast('load-modal-Area', oEntity);
            },
            filters: []
        });

        $scope.$on('load_CatArea', function(scope) {
            refresh();
        });

        function refresh() {
            listCtrl.load();
        }

        $scope.$on('on_login', function() {
            refresh();
        });

        $timeout(function() {
            refresh();
            $('input, md-checkbox')
                .first()
                .focus();
        }, 200);
    });
