'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatVendorController
 * @description
 * # CatVendorController
 * Controller of the main
 */
angular.module('main').controller('CatVendorFormController', function(
    $scope,
    formController,
    CatVendorService,
    $timeout,
    $mdDialog
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatVendor',
        baseService: CatVendorService,
        afterCreate: function(oEntity) {
            ///start:slot:afterCreate<<<
            ///end:slot:afterCreate<<<
        },
        afterLoad: function(oEntity) {
            ///start:slot:afterLoad<<<
            $scope.isDisabled = false;
            ///end:slot:afterLoad<<<
        }
    });

    ///start:slot:js<<<
    ///end:slot:js<<<

    $scope.$on('load-modal-Vendors', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-Vendors', function() {
        $scope.baseEntity.editMode = true;
        return $scope.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });

    function refresh(oCatVendor) {
        ///start:slot:refresh<<<
        ctrl.load(oCatVendor);
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
