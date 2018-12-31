'use strict';

/**
 * @ngdoc service
 * @name main.userService
 * @description
 * # userService
 * Service in the main.
 */

angular
    .module('main')
    .service('utilsService', function($filter) {
        var service = {};

        service.toJavascriptDate = function(sISO_8601_Date) {
            return sISO_8601_Date ? moment(sISO_8601_Date, moment.ISO_8601).toDate() : null;
        };

        service.toServerDate = function(oDate) {
            var momentDate = moment(oDate);
            if (momentDate.isValid()) {
                momentDate.local();
                return momentDate.format();
            }
            return null;
        };

        service.toImageBase64 = function(imageString) {
            var result = '';

            if (imageString && imageString.length > 0) {
                result = 'data:image/bmp;base64,' + imageString;
            }
            return result;
        };

        return service;
    })
    .service('userService', function(crudFactory) {
        var crudInstance = new crudFactory({
            //Entity Name = WebService/API to call:
            entityName: 'User',

            catalogs: [],

            adapter: function(theEntity) {
                theEntity.Recipient = theEntity.Value;

                return theEntity;
            },

            adapterIn: function(theEntity) {},

            adapterOut: function(theEntity, self) {
                theEntity.Identicon = '';
                theEntity.Identicon64 = '';
            },

            dependencies: []
        });

        crudInstance.getByUserName = function(sUserName) {
            var _arrAllRecords = crudInstance.getAll();
            for (var i = 0; i < _arrAllRecords.length; i++) {
                if (_arrAllRecords[i].UserName.toLowerCase() == sUserName.toLowerCase()) {
                    return _arrAllRecords[i];
                }
            }
            return {
                id: -1,
                Value: ''
            };
        };

        crudInstance.getUsersInRoles = function(arrRoles) {
            var _arrAllRecords = crudInstance.getAll();
            var result = [];
            for (var i = 0; i < _arrAllRecords.length; i++) {
                if (arrRoles.indexOf(_arrAllRecords[i].Role) > -1) {
                    result.push(_arrAllRecords[i]);
                }
            }
            result.push(_arrAllRecords[0]);
            return result;
        };

        crudInstance.sendTestEmail = function(oUser) {
            return crudInstance.customPost('SendTestEmail', oUser);
        };

        crudInstance.getRecipients = function() {
            return crudInstance
                .getAll()
                .filter(function(oUser) {
                    return oUser.Email && oUser.sys_active;
                })
                .map(function(oUser) {
                    return {
                        id: oUser.id,
                        UserKey: oUser.UserKey,
                        Value: oUser.Value,
                        Email: oUser.Email,
                        UserName: oUser.UserName,
                        Role: oUser.Role,
                        Recipient: oUser.Value
                    };
                });
        };

        return crudInstance;
    })
    .service('trackService', function(crudFactory) {
        var crudInstance = new crudFactory({
            //Entity Name = WebService/API to call:
            entityName: 'Track',

            catalogs: [],

            adapter: function(theEntity) {
                return theEntity;
            },

            adapterIn: function(theEntity) {},

            adapterOut: function(theEntity, self) {},

            dependencies: []
        });

        crudInstance.assignResponsible = function(iTrackKey, iUserKey) {
            return crudInstance.customPost('AssignResponsible/' + iTrackKey + '/' + iUserKey);
        };

        return crudInstance;
    });
