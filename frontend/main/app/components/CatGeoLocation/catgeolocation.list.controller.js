'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatGeoLocationListController
 * @description
 * # CatGeoLocationListController
 * Controller of the main
 */
angular.module('main').controller('CatGeoLocationListController', function($scope, listController, $timeout, CatGeoLocationService) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'CatGeoLocation',
        baseService: CatGeoLocationService,
        afterCreate: function(oInstance, oEvent) {},
        afterLoad: function() {},
        afterSave: function(oEntity) {},
        onOpenItem: function(oEntity, oEvent) {},
        filters: []
    });

    $scope.$on('load_CatGeoLocation', function(scope) {
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
