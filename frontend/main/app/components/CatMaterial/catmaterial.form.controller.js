'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatMaterialController
 * @description
 * # CatMaterialController
 * Controller of the main
 */
angular.module('main').controller('CatMaterialFormController', function($scope, formController, CatMaterialService, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatMaterial',
        baseService: CatMaterialService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    function refresh(oCatMaterial) {
        ctrl.load(oCatMaterial);
    }

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
});
