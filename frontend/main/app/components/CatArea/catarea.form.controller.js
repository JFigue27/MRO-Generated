'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatAreaController
 * @description
 * # CatAreaController
 * Controller of the main
 */
angular.module('main').controller('CatAreaFormController', function($scope, formController, CatAreaService, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatArea',
        baseService: CatAreaService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    function refresh(oCatArea) {
        ctrl.load(oCatArea);
    }

    $scope.$on('load-modal-Area', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-Area', function() {
        $scope.baseEntity.editMode = true;
        return ctrl.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });
});
