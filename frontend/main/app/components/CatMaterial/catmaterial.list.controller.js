'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatMaterialListController
 * @description
 * # CatMaterialListController
 * Controller of the main
 */
angular.module('main').controller('CatMaterialListController', function(
    $scope,
    listController,
    $timeout,
    CatMaterialService,
    $mdDialog,
    $rootScope
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'CatMaterial',
        baseService: CatMaterialService,
        afterCreate: function(oInstance, oEvent) {
            $scope.baseEntity = oInstance;
            $('input, md-checkbox')
                .first()
                .focus();
            $mdDialog
                .show({
                    contentElement: '#modal-Material',
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

            $rootScope.$broadcast('load-modal-Material', oInstance);
            ///start:slot:afterCreate<<<
            ///end:slot:afterCreate<<<
        },
        afterLoad: function() {
            ///start:slot:afterLoad<<<
            ///end:slot:afterLoad<<<
        },
        afterSave: function(oEntity) {
            refresh();
            ///start:slot:afterSave<<<
            ///end:slot:afterSave<<<
        },
        onOpenItem: function(oEntity, oEvent) {
            $mdDialog
                .show({
                    contentElement: '#modal-Material',
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

            $rootScope.$broadcast('load-modal-Material', oEntity.id);
            ///start:slot:onOpenItem<<<
            ///end:slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_CatMaterial', function(scope) {
        refresh();
    });

    ///start:slot:js<<<
    ///end:slot:js<<<

    function refresh() {
        listCtrl.load();

        ///start:slot:refresh<<<
        ///end:slot:refresh<<<
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
