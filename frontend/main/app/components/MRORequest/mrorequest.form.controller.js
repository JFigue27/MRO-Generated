'use strict';

/**
 * @ngdoc function
 * @name main.controller:MRORequestController
 * @description
 * # MRORequestController
 * Controller of the main
 */
angular.module('main').controller('MRORequestFormController', function($scope, formController, MRORequestService, $timeout) {
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
            ///end:slot:afterLoad<<<
        }
    });

    ///start:slot:js<<<
    ///end:slot:js<<<

    function refresh(oMRORequest) {
        ctrl.load(oMRORequest);
        ///start:slot:refresh<<<
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
