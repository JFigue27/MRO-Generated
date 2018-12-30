'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatVendorListController
 * @description
 * # CatVendorListController
 * Controller of the main
 */
angular.module('main').controller('CatVendorListController', function($scope, listController, $timeout, CatVendorService) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'CatVendor',
        baseService: CatVendorService,
        afterCreate: function(oInstance, oEvent) {},
        afterLoad: function() {},
        afterSave: function(oEntity) {},
        onOpenItem: function(oEntity, oEvent) {},
        filters: []
    });

    $scope.$on('load_CatVendor', function(scope) {
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
