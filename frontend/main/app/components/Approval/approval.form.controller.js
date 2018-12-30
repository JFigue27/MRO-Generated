'use strict';

/**
 * @ngdoc function
 * @name main.controller:ApprovalController
 * @description
 * # ApprovalController
 * Controller of the main
 */
angular.module('main').controller('ApprovalController', function($scope, formController, ApprovalService) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'Approval',
        baseService: ApprovalService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    ctrl.load();
});
