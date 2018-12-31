'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatVendorController
 * @description
 * # CatVendorController
 * Controller of the main
 */
angular.module('main').controller('CatVendorFormController', function($scope, formController, CatVendorService, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatVendor',
        baseService: CatVendorService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    function refresh(oCatVendor) {
        ctrl.load(oCatVendor);
    }

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
});
