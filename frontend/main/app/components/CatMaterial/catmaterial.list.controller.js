'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatMaterialListController
 * @description
 * # CatMaterialListController
 * Controller of the main
 */
angular.module('main').controller('CatMaterialListController', function($scope, listController, $timeout, CatMaterialService) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'CatMaterial',
        baseService: CatMaterialService,
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

    $scope.$on('load_CatMaterial', function(scope) {
        refresh();
    });

    function refresh() {
        listCtrl.load();

        $scope.create();
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
