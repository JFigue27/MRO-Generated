'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatVendorController
 * @description
 * # CatVendorController
 * Controller of the main
 */
angular.module('main').controller('CatVendorFormController', function($scope, formController, CatVendorService, $timeout, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatVendor',
        baseService: CatVendorService,
        afterCreate: function(oEntity) {
            ///Start:Slot:afterCreate<<<
            ///End:Slot:afterCreate<<<
        },
        afterLoad: function(oEntity) {
            ///Start:Slot:afterLoad<<<
            ///End:Slot:afterLoad<<<
        }
    });

    ///Start:Slot:js<<<
    ///End:Slot:js<<<

    $scope.$on('load-modal-Vendors', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-Vendors', function() {
        $scope.baseEntity.editMode = true;
        return ctrl.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });

    function refresh(oCatVendor) {
        ctrl.load(oCatVendor);
        ///Start:Slot:refresh<<<
        ///End:Slot:refresh<<<
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
