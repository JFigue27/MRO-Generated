'use strict';

/**
 * @ngdoc function
 * @name main.controller:MRORequestController
 * @description
 * # MRORequestController
 * Controller of the main
 */
angular.module('main').controller('MRORequestFormController', function(
    $scope,
    formController,
    MRORequestService,
    $timeout,
    $mdDialog,
    EmployeeService,
    ///start:slot:dependencies<<<
    $rootScope
    ///end:slot:dependencies<<<
) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'MRORequest',
        baseService: MRORequestService,
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
    $scope.EmployeeService = EmployeeService;
    $scope.openMRODelivery = function(oEvent) {
        $mdDialog
            .show({
                contentElement: '#modal-MRODelivery',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                multiple: true,
                fullscreen: true,
                targetEvent: oEvent
            })
            .then(answer => {
                console.log(answer);

                if (answer == 'OK') {
                    // refresh();
                }
            });

        $rootScope.$broadcast('load-modal-MRODelivery', $scope.baseEntity);
    };
    $scope.$on('ok-modal-MRODelivery', function(scope, oEntity) {
        alertify.success('OK')
    });
    ///end:slot:js<<<

    $scope.$on('load-modal-MRO', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-MRO', function() {
        $scope.baseEntity.editMode = true;
        return $scope.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
            ctrl.load(null);
        });
    });

    function refresh(oMRORequest) {
        ///start:slot:refresh<<<
        ctrl.load(oMRORequest);
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
