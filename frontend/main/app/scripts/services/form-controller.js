'use strict';

/**
 * @ngdoc service
 * @name main.baseControllers
 * @description
 * # baseControllers
 * Service in the main.
 */
angular
    .module('main')
    .factory('formController', function(
        $log,
        $routeParams,
        validatorService,
        appConfig,
        $timeout,
        $rootScope,
        $q,
        $activityIndicator,
        $mdDialog,
        $location
    ) {
        var log = $log;

        return function(oMainConfig) {
            var formCtrl = this;

            //INIT CONFIG/////////////////////////////////////

            var scope = oMainConfig.scope;

            var _baseService = oMainConfig.baseService;
            if (!oMainConfig.entityName || oMainConfig.entityName == '') {
                oMainConfig.entityName = '';
            }

            //After Load Hook
            var _afterLoadCallBack = oMainConfig.afterLoad;
            if (!_afterLoadCallBack || typeof _afterLoadCallBack != 'function') {
                _afterLoadCallBack = function() {};
            }

            //After Create Hook
            var _afterCreateCallBack = oMainConfig.afterCreate;
            if (!_afterCreateCallBack || typeof _afterCreateCallBack != 'function') {
                _afterCreateCallBack = function() {};
            }

            //After Save Hook
            var _afterSaveCallBack = oMainConfig.afterSave;
            if (!_afterSaveCallBack || typeof _afterSaveCallBack != 'function') {
                _afterSaveCallBack = function() {};
            }

            var _beforeCheckIn = oMainConfig.beforeCheckIn;
            if (!_beforeCheckIn || typeof _beforeCheckIn != 'function') {
                _beforeCheckIn = function() {
                    return Promise.resolve();
                };
            }

            //END CONFIG/////////////////////////////////////

            //scope---------------------------------------------
            //let's use normal variables (without underscore) so they can be
            //accessed in view normally
            scope.isLoading = true;
            // scope.isDisabled = true; //should be disable from controller inherited.

            scope.getCurrentUser = function() {
                return $rootScope.getCurrentUser();
            };

            scope.getCheckoutUser = function() {
                if (scope.baseEntity && scope.baseEntity.CheckedoutBy) {
                    return scope.baseEntity.CheckedoutBy;
                }
            };

            scope.remove = function(oEntity) {
                var deferred = $q.defer();
                alertify.confirm(
                    'Are you sure you want to remove a: ' + oMainConfig.entityName + '?',
                    function() {
                        scope.$apply(function() {
                            _baseService.remove(oEntity, scope.baseList).then(
                                function(data) {
                                    deferred.resolve(data);
                                },
                                function() {
                                    deferred.reject();
                                }
                            );
                        });
                    },
                    //cancel
                    function() {
                        deferred.reject();
                    }
                );
                return deferred.promise;
            };
            scope.take = function(objToTake, toUser) {
                _baseService.take(objToTake, toUser).then(function(data) {
                    objToTake.assignedTo = toUser.Value;
                    objToTake.AssignationMade = false;
                });
            };

            scope.create = function() {
                $activityIndicator.startAnimating();
                return _baseService.createEntity().then(function(oInstance) {
                    scope.formMode = 'create';
                    scope.baseEntity = angular.copy(oInstance);
                    scope.baseEntity.editMode = true;
                    scope.isDisabled = false;
                    _afterCreateCallBack(scope.baseEntity);
                    $activityIndicator.stopAnimating();
                });
            };

            scope.createAndCheckOut = function() {
                $activityIndicator.startAnimating();
                return _baseService
                    .createEntity()
                    .then(function(oInstance) {
                        scope.formMode = 'checkedOut';
                        scope.baseEntity = angular.copy(oInstance);
                        _afterCreateCallBack(scope.baseEntity);
                        return scope.baseEntity;
                    })
                    .then(_baseService.save)
                    .then(function(oEntity) {
                        $activityIndicator.stopAnimating();
                        return oEntity;
                    });
            };

            scope.loadRevision = function(selectedRevision) {
                scope.baseEntity.Revisions.forEach(function(revision) {
                    revision.isOpened = false;
                });

                let oRevision = angular.fromJson(selectedRevision.Value);
                oRevision.Revisions = scope.baseEntity.Revisions;
                _baseService.adapt(oRevision);
                scope.baseEntity = oRevision;
                selectedRevision.isOpened = true;
            };

            scope.duplicate = function() {
                $activityIndicator.startAnimating();
                return _baseService.duplicate(scope.baseEntity).then(data => {
                    $activityIndicator.stopAnimating();
                    return data;
                });
            };

            var _saveChildren = function() {
                var arrPromiseConstructors = [];
                angular.forEach(_baseService._childrenResources, function(childCtrl) {
                    var promiseConstructor = function() {
                        return childCtrl.save(childCtrl);
                    };
                    arrPromiseConstructors.push(angular.copy(promiseConstructor));
                });

                return $q.serial(arrPromiseConstructors);
            };

            //Updating items:*******************************
            scope.save = function() {
                var deferred = $q.defer();
                $activityIndicator.startAnimating();

                _saveChildren().then(function() {
                    if (scope.baseEntity.editMode) {
                        _baseService.save(scope.baseEntity).then(
                            function(data) {
                                $activityIndicator.stopAnimating();
                                _afterSaveCallBack();
                                deferred.resolve(data);
                            },
                            function() {
                                deferred.reject();
                            }
                        );
                    } else {
                        deferred.resolve();
                    }
                });

                return deferred.promise;
            };
            scope.on_input_change = function(oItem) {
                oItem.editMode = true;
            };
            scope.undo = function(oItem) {
                var originalItem = _baseService.getById(oItem.id);
                angular.copy(originalItem, oItem);
            };
            scope.checkout = function() {
                _baseService
                    .checkout(scope.baseEntity)
                    .then(function(oResponse) {
                        _refreshForm(oResponse);
                        alertify.success('Checked Out Successfully.');
                    })
                    .catch(function() {
                        formCtrl.load(scope.baseEntity.id);
                    });
            };
            scope.cancelCheckout = function() {
                _baseService.cancelCheckout(scope.baseEntity).then(function(oResponse) {
                    _refreshForm(oResponse);
                    alertify.success('Cancel Check Out Successfully.');
                });
            };
            scope.checkin = function(ev) {
                var confirm = $mdDialog
                    .prompt()
                    .title(oMainConfig.entityName + ' Revision')
                    .textContent('Optional message to reference this Revision.')
                    .placeholder('')
                    .ariaLabel('')
                    .initialValue('')
                    .targetEvent(ev)
                    .multiple(true)
                    .required(false)
                    .ok('OK')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function(result) {
                    scope.baseEntity.editMode = true;
                    scope.baseEntity.RevisionMessage = result;

                    return _beforeCheckIn()
                        .then(function(result) {
                            return _baseService.checkin(scope.baseEntity).then(function(oResponse) {
                                formCtrl.load(oResponse).then(function() {
                                    scope.formMode = null;
                                    scope.isDisabled = true;
                                    alertify.success('Saved Successfully, Revision Created.');
                                });
                            });
                        })
                        .catch(function(result) {
                            console.log('An error occurried when uploading files.');
                        });
                });
            };
            scope.finalize = function() {
                _baseService
                    .finalize(scope.baseEntity)
                    .then(function(oResponse) {
                        _refreshForm(oResponse);
                        alertify.success('Finalized Successfully.');
                    })
                    .catch(function() {
                        formCtrl.load(scope.baseEntity.id);
                    });
            };
            scope.unfinalize = function() {
                _baseService
                    .unfinalize(scope.baseEntity)
                    .then(function(oResponse) {
                        _refreshForm(oResponse);
                        alertify.success('Unfnalized Successfully.');
                    })
                    .catch(function() {
                        formCtrl.load(scope.baseEntity.id);
                    });
            };

            //end scope----------------------------------------

            var _afterLoad = function() {
                var user = scope.getCurrentUser();

                if (
                    scope.baseEntity &&
                    scope.baseEntity.CheckedoutBy &&
                    user &&
                    user.Value &&
                    scope.baseEntity.CheckedoutBy.UserName.toLowerCase() == user.Value.toLowerCase()
                ) {
                    scope.isDisabled = false;
                } else {
                    scope.isDisabled = true;
                }

                _afterLoadCallBack(scope.baseEntity);
                $activityIndicator.stopAnimating();
            };

            formCtrl.load = function(oEntityOrID) {
                $activityIndicator.startAnimating();
                alertify.closeAll();

                return _baseService.loadDependencies().then(function(data) {
                    _fillCatalogs();
                    return _refreshForm(oEntityOrID);
                });
            };

            var _fillCatalogs = function() {
                //for filters:

                for (var catalog in _baseService.catalogs) {
                    if (_baseService.catalogs.hasOwnProperty(catalog)) {
                        var theCatalog = 'the' + capitalizeFirstLetter(catalog);
                        if (theCatalog.slice(-1) != 's') {
                            theCatalog += 's';
                        }
                        scope[theCatalog] = _baseService.catalogs[catalog].getAll();
                    }
                }
            };

            function capitalizeFirstLetter(sWord) {
                var result = sWord.charAt(0).toUpperCase() + sWord.slice(1).toLowerCase();
                return result;
            }

            var _makeQueryParameters = function() {
                var result = '?';

                for (var prop in scope.filterOptions) {
                    if (scope.filterOptions.hasOwnProperty(prop)) {
                        result += prop + '=' + scope.filterOptions[prop] + '&';
                    }
                }

                return result;
            };

            var _refreshForm = function(oEntityOrID) {
                $activityIndicator.startAnimating();
                scope.isLoading = true;

                //Open by ID
                if (!isNaN(oEntityOrID) && oEntityOrID > 0) {
                    scope.openingMode = 'id';
                    return _baseService.loadEntity(oEntityOrID).then(function(data) {
                        var theSelectedEntity = data;
                        if (!theSelectedEntity) {
                            alertify
                                .alert('Non-existent record!')
                                .set('modal', true)
                                .set('closable', false);
                            scope.openingMode = 'error';
                            return;
                        }
                        scope.baseEntity = angular.copy(theSelectedEntity);
                        _afterLoad();
                        scope.isLoading = false;
                    });
                }
                //Create
                else if ((oEntityOrID instanceof Object || typeof oEntityOrID == 'object') && !oEntityOrID.hasOwnProperty('id')) {
                    return scope.create(oEntityOrID);
                }
                //Open by Object
                else if (oEntityOrID instanceof Object || typeof oEntityOrID == 'object') {
                    _baseService.adapt(oEntityOrID);
                    scope.baseEntity = angular.copy(oEntityOrID);
                    _afterLoad();
                    scope.isLoading = false;
                    return $q.resolve();
                }
            };

            _baseService._childrenResources = [];
            formCtrl.addChildrenCtrl = function(childrenCtrl, id) {
                var oFound = _baseService._childrenResources.find(function(c) {
                    return c.id == id;
                });
                if (!oFound) {
                    childrenCtrl.id = id;
                    _baseService._childrenResources.push(childrenCtrl);
                }
            };

            formCtrl.go = function(path) {
                if (path != $location.url()) {
                    $location.url(path);
                    // $window.open('#!' + path, '_blank');
                }
            };

            // // Public baseController API:////////////////////////////////////////////////////////////
            // var oAPI = {
            //     // load: _load,
            //     // addChildrenCtrl: _addChildrenCtrl,
            //     // childrenCtrls: _childrenResources
            //     // unselectAll: _unselectAll
            // };
            // return oAPI;
        };
    });
