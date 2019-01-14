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
            ///Start:Slot:afterCreate<<<
            ///End:Slot:afterCreate<<<
        },
        afterLoad: function() {
            listCtrl.setRotationFocus();
            ///Start:Slot:afterLoad<<<
            ///End:Slot:afterLoad<<<
        },
        afterSave: function(oEntity) {
            refresh();
            ///Start:Slot:afterSave<<<
            ///End:Slot:afterSave<<<
        },
        onOpenItem: function(oEntity, oEvent) {
            ///Start:Slot:onOpenItem<<<
            ///End:Slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_MRORequestLine', function(scope) {
        refresh();
    });

    ///Start:Slot:js<<<
    ///End:Slot:js<<<

    function refresh() {
        listCtrl.load();

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
