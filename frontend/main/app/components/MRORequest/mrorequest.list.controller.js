'use strict';

/**
 * @ngdoc function
 * @name main.controller:MRORequestListController
 * @description
 * # MRORequestListController
 * Controller of the main
 */
angular.module('main').controller('MRORequestListController', function($scope, listController, $timeout, MRORequestService) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'MRORequest',
        baseService: MRORequestService,
        afterCreate: function(oInstance, oEvent) {},
        afterLoad: function() {},
        afterSave: function(oEntity) {},
        onOpenItem: function(oEntity, oEvent) {},
        filters: []
    });

    $scope.$on('load_MRORequest', function(scope) {
        refresh();
    });

    function refresh() {
        listCtrl.load();
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
