'use strict';

/**
 * @ngdoc function
 * @name main.service:ApprovalService
 * @description
 * # ApprovalService
 * Service of the main
 */
angular.module('main').service('ApprovalService', function(crudFactory, utilsService) {
    var crudInstance = new crudFactory({
        entityName: 'Approval',

        catalogs: [],

        adapter: function(theEntity) {
            theEntity.ConvertedDateRequested = utilsService.toJavascriptDate(theEntity.DateRequested);
            theEntity.ConvertedDateResponse = utilsService.toJavascriptDate(theEntity.DateResponse);

            // theEntity.SelectedApprovers = [];
            // if (theEntity.Approvers) {
            //     theEntity.SelectedApprovers = JSON.parse(theEntity.Approvers);
            // }
            if (theEntity.Approvers) {
                theEntity.sApprovers = theEntity.Approvers.map(function(current) {
                    return '' + current.Email;
                }).join('; ');
            } else {
                theEntity.Approvers = [];
            }
            if (theEntity.sApprovers == '' || theEntity.sApprovers == '[]') {
                theEntity.sApprovers = '(Empty)';
            }

            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {
            theEntity.DateRequested = utilsService.toServerDate(theEntity.ConvertedDateRequested);
            theEntity.DateResponse = utilsService.toServerDate(theEntity.ConvertedDateResponse);

            // theEntity.Approvers = JSON.stringify(theEntity.SelectApprovers);
        },

        dependencies: []
    });

    crudInstance.Approve = function(oApproval) {
        return crudInstance.customPost('Approve/' + oApproval.id, oApproval);
    };

    crudInstance.Reject = function(oApproval) {
        return crudInstance.customPost('Reject/' + oApproval.id, oApproval);
    };

    return crudInstance;
});
