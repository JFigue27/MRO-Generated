'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatGeoLocationController
 * @description
 * # CatGeoLocationController
 * Controller of the main
 */
angular.module('main').controller('CatGeoLocationFormController', function(
    $scope,
    formController,
    CatGeoLocationService,
    $timeout,
    $mdDialog
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatGeoLocation',
        baseService: CatGeoLocationService,
        afterCreate: function(oEntity) {
            ///start:slot:afterCreate<<<
            ///end:slot:afterCreate<<<
        },
        afterLoad: function(oEntity) {
            ///start:slot:afterLoad<<<
            ///end:slot:afterLoad<<<
        }
    });

    ///start:slot:js<<<
    ///end:slot:js<<<

    $scope.$on('load-modal-Locations', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-Locations', function() {
        $scope.baseEntity.editMode = true;
        return $scope.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });

    function refresh(oCatGeoLocation) {
        ///start:slot:refresh<<<
        ctrl.load(oCatGeoLocation);
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
