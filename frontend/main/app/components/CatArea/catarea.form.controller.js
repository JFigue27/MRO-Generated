'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatAreaController
 * @description
 * # CatAreaController
 * Controller of the main
 */
angular.module('main').controller('CatAreaFormController', function($scope, formController, CatAreaService, $timeout, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatArea',
        baseService: CatAreaService,
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

    function refresh(oCatArea) {
        ctrl.load(oCatArea);
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
