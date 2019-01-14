'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatGeoLocationController
 * @description
 * # CatGeoLocationController
 * Controller of the main
 */
angular
    .module('main')
    .controller('CatGeoLocationFormController', function($scope, formController, CatGeoLocationService, $timeout, $mdDialog) {
        var ctrl = this;

        formController.call(this, {
            scope: $scope,
            entityName: 'CatGeoLocation',
            baseService: CatGeoLocationService,
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

        function refresh(oCatGeoLocation) {
            ctrl.load(oCatGeoLocation);
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
