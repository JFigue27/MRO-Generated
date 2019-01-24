'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatAreaController
 * @description
 * # CatAreaController
 * Controller of the main
 */
angular.module('main').controller('CatAreaFormController', function(
    $scope,
    formController,
    CatAreaService,
    $timeout,
    $mdDialog
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatArea',
        baseService: CatAreaService,
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

    $scope.$on('load-modal-Area', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-Area', function() {
        $scope.baseEntity.editMode = true;
        return $scope.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });

    function refresh(oCatArea) {
        ///start:slot:refresh<<<
        ctrl.load(oCatArea);
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
