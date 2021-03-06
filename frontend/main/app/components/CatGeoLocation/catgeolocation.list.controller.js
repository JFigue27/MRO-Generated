'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatGeoLocationListController
 * @description
 * # CatGeoLocationListController
 * Controller of the main
 */
angular.module('main').controller('CatGeoLocationListController', function(
    $scope,
    listController,
    $timeout,
    CatGeoLocationService,
    $mdDialog,
    $rootScope
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'CatGeoLocation',
        baseService: CatGeoLocationService,
        ///start:slot:listOptions<<<
        ///end:slot:listOptions<<<
        afterCreate: function(oInstance, oEvent) {
            $scope.baseEntity = oInstance;
            $('input, md-checkbox')
                .first()
                .focus();
            $mdDialog
                .show({
                    contentElement: '#modal-Locations',
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

            $rootScope.$broadcast('load-modal-Locations', oInstance);
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
                    contentElement: '#modal-Locations',
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

            $rootScope.$broadcast('load-modal-Locations', oEntity.id);
            ///start:slot:onOpenItem<<<
            ///end:slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_CatGeoLocation', function(scope) {
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
