'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatGeoLocationController
 * @description
 * # CatGeoLocationController
 * Controller of the main
 */
angular.module('main').controller('CatGeoLocationFormController', function($scope, formController, CatGeoLocationService, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'CatGeoLocation',
        baseService: CatGeoLocationService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    function refresh(oCatGeoLocation) {
        ctrl.load(oCatGeoLocation);
    }

    $scope.$on('load-modal-Locations', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-Locations', function() {
        $scope.baseEntity.editMode = true;
        return ctrl.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });
});
