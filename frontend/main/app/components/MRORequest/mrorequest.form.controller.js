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

    function refresh(oMRORequest) {
        ctrl.load(oMRORequest);
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
