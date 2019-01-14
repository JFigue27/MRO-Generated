'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatMaterialController
 * @description
 * # CatMaterialController
 * Controller of the main
 */
angular.module('main').controller('CatMaterialFormController', function($scope, formController, CatMaterialService, $timeout, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatMaterial',
        baseService: CatMaterialService,
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

    $scope.$on('load-modal-Material', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-Material', function() {
        $scope.baseEntity.editMode = true;
        return ctrl.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });

    function refresh(oCatMaterial) {
        ctrl.load(oCatMaterial);
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
