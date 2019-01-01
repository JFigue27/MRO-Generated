'use strict';

/**
 * @ngdoc function
 * @name main.controller:MRORequestLineListController
 * @description
 * # MRORequestLineListController
 * Controller of the main
 */
angular.module('main').controller('MRORequestLineListController', function($scope, listController, $timeout, MRORequestLineService) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'MRORequestLine',
        baseService: MRORequestLineService,
        afterCreate: function(oInstance, oEvent) {
            $scope.baseEntity = oInstance;
            $('input, md-checkbox')
                .first()
                .focus();
        },
        afterLoad: function() {
            listCtrl.setRotationFocus();
        },
        afterSave: function(oEntity) {
            refresh();
        },
        onOpenItem: function(oEntity, oEvent) {},
        filters: []
    });

    $scope.$on('load_MRORequestLine', function(scope) {
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
