'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Approval
 * @description
 * # Approval
 */
angular.module('main').directive('approvalForm', function() {
    return {
        templateUrl: 'components/Approval/approval.form.html',
        restrict: 'E',
        controller: function($scope, formController, $mdDialog, ApprovalService, $rootScope, userService) {
            var ctrl = this;

            formController.call(this, {
                scope: $scope,
                entityName: 'Approval',
                baseService: ApprovalService,
                afterCreate: function(oEntity) {
                    $scope.theApprovers = [];
                    userService.loadEntities().then(function(oResponse) {
                        $scope.theApprovers = oResponse;
                    });
                },
                afterLoad: function(oEntity) {
                    $scope.theApprovers = [];
                    userService.loadEntities().then(function(oResponse) {
                        $scope.theApprovers = oResponse;
                    });
                }
            });

            $scope.$on('load-modal-Approval', function(scope, oApproval) {
                refresh(oApproval);
            });

            $scope.$on('ok-modal-Approval', function() {
                $scope.baseEntity.editMode = true;
                return ctrl.save().then(function() {
                    $mdDialog.hide('OK');
                    alertify.success('Saved Successfully.');
                });
            });

            function refresh(oApproval) {
                ctrl.load(oApproval);
            }

            $scope.getCurrentUser = function() {
                return $rootScope.getCurrentUser();
            };

            $scope.displayProperty = 'Value';
            $scope.emailProperty = 'Email';

            $scope.queryApprovers = function(query, oCurrentItem) {
                return $scope.theApprovers
                    ? $scope.theApprovers
                          .filter(function(oMember) {
                              if (query) {
                                  var lowercaseQuery = _.lowerCase(query || null);
                                  var lowercaseItem = _.lowerCase(oMember[$scope.displayProperty]);
                                  return lowercaseItem.indexOf(lowercaseQuery) > -1;
                              } else {
                                  return [];
                              }
                          })
                          .filter(function(oMember) {
                              return !$scope.baseEntity.Approvers.find(function(oCurrent) {
                                  return oCurrent[$scope.emailProperty] == oMember[$scope.emailProperty];
                              });
                          })
                    : [];
            };

            // $scope.newPerson = function(chip) {
            //     var oChip = {};
            //     if (chip.hasOwnProperty($scope.emailProperty)) {
            //         oChip[$scope.emailProperty] = chip[$scope.emailProperty];
            //         oChip[$scope.displayProperty] = chip[$scope.displayProperty];
            //     } else {
            //         oChip[$scope.emailProperty] = chip;
            //         oChip[$scope.displayProperty] = chip;
            //     }
            //     return oChip;
            // };

            $scope.newRequest = function() {
                var oApproval = {
                    ApprovalKey: -1, // -1 means: Force Create (don't search for existing)
                    Type: $scope.baseEntity.Type,
                    CQAHeaderKey: $scope.baseEntity.CQAHeaderKey,
                    ForeignKey: $scope.baseEntity.ForeignKey,
                    ForeignType: $scope.baseEntity.ForeignType
                };
                refresh(oApproval);
            };

            $scope.Approve = function(ev) {
                var confirm = $mdDialog
                    .confirm()
                    .title('Approval Confirmation')
                    .textContent('Please confirm Approval.')
                    // .placeholder('')
                    // .ariaLabel('')
                    // .initialValue('')
                    .targetEvent(ev)
                    .multiple(true)
                    // .required(false)
                    .ok('OK')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function(result) {
                    // $scope.baseEntity.ResponseDescription = result;
                    ApprovalService.Approve($scope.baseEntity).then(function(oResponse) {
                        refresh(oResponse);
                        alertify.success('Approved Successfully');
                    });
                });
            };

            $scope.Reject = function(ev) {
                var confirm = $mdDialog
                    .confirm()
                    .title('Reject Confirmation')
                    .textContent('Please confirm Reject.')
                    // .placeholder('')
                    // .ariaLabel('')
                    // .initialValue('')
                    .targetEvent(ev)
                    .multiple(true)
                    // .required(false)
                    .ok('OK')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function(result) {
                    // $scope.baseEntity.ResponseDescription = result;
                    ApprovalService.Reject($scope.baseEntity).then(function(oResponse) {
                        refresh(oResponse);
                        alertify.success('Rejected Successfully');
                    });
                });
            };

            $scope.openedBy = function() {
                if ($scope.baseEntity && $scope.baseEntity.InfoTrack) {
                    var currentUser = $scope.getCurrentUser();

                    var oFound = $scope.baseEntity.Approvers.find(function(oApprover) {
                        return oApprover.UserKey == currentUser.UserKey;
                    });
                    if (oFound) {
                        return 'APPROVER';
                    }

                    if ($scope.baseEntity.InfoTrack.User_CreatedByKey == currentUser.UserKey) {
                        return 'REQUESTER';
                    }
                }

                return 'SOMEONE ELSE';
            };
        }
    };
});
