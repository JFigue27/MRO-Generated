'use strict';

/**
 * @ngdoc function
 * @name main.controller:InventoryInputDocListController
 * @description
 * # InventoryInputDocListController
 * Controller of the main
 */
angular.module('main').controller('InventoryInputDocListController', function(
    $scope,
    listController,
    $timeout,
    InventoryInputDocService,
    $mdDialog,
    $rootScope
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'InventoryInputDoc',
        baseService: InventoryInputDocService,
        ///start:slot:listOptions<<<
        ///end:slot:listOptions<<<
        afterCreate: function(oInstance, oEvent) {
            $scope.baseEntity = oInstance;
            $('input, md-checkbox')
                .first()
                .focus();
            var confirm = $mdDialog
                .confirm()
                .title('Confirm Creation.')
                .textContent('Please confirm to create a new entry.')
                .targetEvent(oEvent)
                .multiple(true)
                .ok('OK')
                .cancel('Cancel')
                .clickOutsideToClose(false)
                .escapeToClose(false);

            $mdDialog.show(confirm).then(function() {
                $scope.saveItem(oInstance).then(oEntity => {
                    $scope.openItem(oEntity);
                });
            });
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
                    contentElement: '#modal-InventoryInput',
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

            $rootScope.$broadcast('load-modal-InventoryInput', oEntity.id);
            ///start:slot:onOpenItem<<<
            ///end:slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_InventoryInputDoc', function(scope) {
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
