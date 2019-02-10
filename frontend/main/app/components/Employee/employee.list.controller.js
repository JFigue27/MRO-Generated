'use strict';

/**
 * @ngdoc function
 * @name main.controller:EmployeeListController
 * @description
 * # EmployeeListController
 * Controller of the main
 */
angular.module('main').controller('EmployeeListController', function(
    $scope,
    listController,
    $timeout,
    EmployeeService
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'Employee',
        baseService: EmployeeService,
        ///start:slot:listOptions<<<
        ///end:slot:listOptions<<<
        afterCreate: function(oInstance, oEvent) {
            $scope.baseEntity = oInstance;
            $('input, md-checkbox')
                .first()
                .focus();
            ///start:slot:afterCreate<<<
            ///end:slot:afterCreate<<<
        },
        afterLoad: function() {
            ///start:slot:afterLoad<<<
            ///end:slot:afterLoad<<<
        },
        afterSave: function(oEntity) {
            refresh();
            ///start:slot:afterSave<<<
            ///end:slot:afterSave<<<
        },
        onOpenItem: function(oEntity, oEvent) {
            ///start:slot:onOpenItem<<<
            ///end:slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_Employee', function(scope) {
        refresh();
    });

    ///start:slot:js<<<
    ///end:slot:js<<<

    function refresh() {
        listCtrl.load();

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
