'use strict';

/**
 * @ngdoc directive
 * @name main.directive:modal
 * @description
 * # modal
 */
angular
    .module('main')
    .directive('modal', function() {
        return {
            template: `<div style="display: none;">
                        <div class="md-dialog-container" id="{{modalId}}">
                            <md-dialog aria-label="Dialog" layout="column" style="position:absolute;"
                            ng-style="{'max-width': maxWidth, 'max-height': theHeight, height: '100%', width: '100%',
                                top: top ? top : 'initial', left: left ? left : 'initial', bottom: bottom ? bottom : 'initial', right: right ? right : 'initial', }">
                                <md-toolbar ng-if="title">
                                  <div class="md-toolbar-tools">
                                    <h2>{{title}}</h2>
                                    <span flex></span>
                                    <md-button class="md-icon-button md-accent md-hue-2" ng-click="close_modal()">
                                        <md-icon>close</md-icon>
                                    </md-button>
                                  </div>
                                </md-toolbar>
                                <div ng-transclude="header"></div>
                                <md-dialog-content flex>
                                    <div class="md-dialog-content" flex>
                                        <div ng-transclude="body" flex></div>
                                    </div>
                                </md-dialog-content>
                                <md-dialog-actions layout="row" layout-align="end end" style="border-top: 1px solid rgba(0,0,0,0.12);">
                                    <md-button ng-if="deleteLabel" class="md-warn" ng-click="delete_click()">Delete</md-button>
                                    <span flex></span>
                                    <md-button ng-click="close_modal()">Close</md-button>
                                    <md-button ng-click="ok_click()" ng-if="okLabel" layout="row" layout-align="center center">
                                        <span>{{okLabel}}</span><md-progress-circular style="margin-left: 3px;" ng-if="okLoading" md-diameter="20px">
                                    </md-button>
                                </md-dialog-actions>
                            </md-dialog>
                        </div>
                    </div>`,
            restrict: 'E',
            transclude: {
                header: '?modalHeader',
                body: 'modalBody'
            },
            replace: false,
            scope: {
                modalId: '@',
                okLabel: '@',
                deleteLabel: '@',
                maxWidth: '=',
                maxHeight: '@',
                title: '@',
                fullScreen: '=',
                okLoading: '=',
                top: '@',
                left: '@',
                right: '@',
                bottom: '@'
            },
            controller: 'ModalCtrl'
        };
    })
    .controller('ModalCtrl', [
        '$scope',
        '$mdDialog',
        '$rootScope',
        function($scope, $mdDialog, $rootScope) {
            $scope.baseEntity = {};

            $scope.ok_click = function() {
                $rootScope.$broadcast('ok-' + $scope.modalId);
            };

            $scope.delete_click = function() {
                $rootScope.$broadcast('delete-' + $scope.modalId);
            };

            $scope.close_modal = function() {
                $mdDialog.hide('CLOSE');
                $rootScope.$broadcast('unload-' + $scope.modalId);
            };

            $scope.theHeight = $scope.maxHeight || '80%';
            if ($scope.fullScreen) {
                $scope.theHeight = '100%';
            }
        }
    ]);
