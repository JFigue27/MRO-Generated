'use strict';

/**
 * @ngdoc directive
 * @name main.directive:ResponsibleList
 * @description
 * # ResponsibleList
 */
angular.module('main').directive('responsibleList', function($mdDialog) {
    return {
        templateUrl: 'components/Responsible/responsible.list.html',
        restrict: 'E',
        require: '^responsible',
        link: function(scope, element, attrs, responsibleCtrl) {
            scope.$on('ok-modal-responsible', function() {
                responsibleCtrl.changeUser(scope.currentSelectedId).then(function() {
                    $mdDialog.hide('OK');
                });
            });
        },
        controller: function($scope, userService, listController, $rootScope) {
            var listCtrl = new listController({
                scope: $scope,
                entityName: 'User',
                baseService: userService,
                paginate: false,
                afterCreate: function(oInstance) {},
                afterLoad: function() {},
                onOpenItem: function(oEntity) {},
                filters: []
            });

            var _sFilterRole;
            $scope.$on('load_responsible_list', function(scope, currentOne, sFilterRole) {
                _sFilterRole = sFilterRole;
                $scope.currentSelectedId = currentOne;
                refresh();
            });

            function refresh() {
                if (_sFilterRole) {
                    listCtrl.load('Role=' + _sFilterRole);
                } else {
                    listCtrl.load();
                }
            }

            $scope.selectItem = function(oItem) {
                $scope.currentSelectedId = oItem.id;
            };
        }
    };
});
