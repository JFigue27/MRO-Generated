'use strict';

/**
 * @ngdoc function
 * @name main.controller:ApprovalListController
 * @description
 * # ApprovalListController
 * Controller of the main
 */
angular.module('main').controller('ApprovalListController', function($scope, listController, ApprovalService) {
    var ctrl = new listController({
        scope: $scope,
        entityName: 'Approval',
        baseService: ApprovalService,
        afterCreate: function(oInstance) {},
        afterLoad: function() {},
        onOpenItem: function(oItem) {},
        filters: {}
    });

    ctrl.load();
});
