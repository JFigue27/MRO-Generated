'use strict';

/**
 * @ngdoc function
 * @name main.controller:MRORequestController
 * @description
 * # MRORequestController
 * Controller of the main
 */
angular.module('main').controller('MRORequestFormController', function($scope, formController, MRORequestService, $mdDialog) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'MRORequest',
        baseService: MRORequestService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    function refresh(oMRORequest) {
        ctrl.load(oMRORequest);
    }

    $scope.$on('load-modal-MRO', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-MRO', function() {
        $scope.baseEntity.editMode = true;
        return ctrl.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });
});
