'use strict';

/**
 * @ngdoc function
 * @name main.service:TaskService
 * @description
 * # TaskService
 * Service of the main
 */
angular.module('main').service('TaskService', function(crudFactory, $location, $route) {
    var crudInstance = new crudFactory({
        entityName: 'Task',

        catalogs: [],

        adapter: function(theEntity) {
            switch (theEntity.Priority) {
                case 0:
                    theEntity.sPriority = 'LOW';
                    theEntity.sPriorityColor = '#008cba';
                    break;
                case 1:
                    theEntity.sPriority = 'MEDIUM';
                    theEntity.sPriorityColor = 'black';
                    break;
                case 2:
                    theEntity.sPriority = 'HIGH';
                    theEntity.sPriorityColor = '#b22222';
                    break;
                case 3:
                    theEntity.sPriority = 'URGENT';
                    theEntity.sPriorityColor = '#b22222';
                    break;
                default:
            }
            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {},

        dependencies: []
    });

    crudInstance.getStatusCatalog = function() {
        return [
            { id: 0, Value: 'PENDING' },
            // { id: 1, Value: 'IN PROGRESS' },
            { id: 2, Value: 'COMPLETED' }
            // { id: 3, Value: 'CANCELLED' },
            // { id: 4, Value: 'ON HOLD' }
        ];
    };

    crudInstance.getPriorityCatalog = function() {
        return [{ id: 0, Value: 'LOW' }, { id: 1, Value: 'MEDIUM' }, { id: 2, Value: 'HIGH' }, { id: 3, Value: 'URGENT' }];
    };

    crudInstance.getCategoryCatalog = function() {
        return [
            { Value: 'Approval' },
            // { Value: 'Customer2D' },
            // { Value: 'Email' },
            { Value: 'Generic' },
            // { Value: 'InitialResponse' },
            // { Value: 'IssueCategorized' },
            { Value: 'Track' }
        ];
    };

    crudInstance.sortDataInit = [
        {
            Value: 'Status',
            Sequence: 1,
            AscDesc: 'ASC'
        },
        {
            Value: 'Created By',
            Sequence: 2,
            AscDesc: 'ASC'
        },
        {
            Value: 'Assigned To',
            Sequence: 3,
            AscDesc: 'ASC'
        },
        {
            Value: 'Priority',
            Sequence: 4,
            AscDesc: 'ASC'
        },
        {
            Value: 'Category',
            Sequence: 5,
            AscDesc: 'ASC'
        },
        {
            Value: 'Title',
            Sequence: 6,
            AscDesc: 'ASC'
        },
        {
            Value: 'Description',
            Sequence: 7,
            AscDesc: 'ASC'
        },
        {
            Value: 'Completed By',
            Sequence: 8,
            AscDesc: 'ASC'
        },
        {
            Value: 'Date Created At',
            Sequence: 9,
            AscDesc: 'ASC'
        },
        {
            Value: 'Date Due Date',
            Sequence: 10,
            AscDesc: 'ASC'
        },
        {
            Value: 'Date Closed',
            Sequence: 11,
            AscDesc: 'ASC'
        }
    ];

    //Start: Go To Task
    crudInstance.goToTask = function(oItem) {
        crudInstance.goingToTask = true;
        var sURL;
        if (oItem) {
            switch (oItem.Category) {
                case 'Activity':
                case 'Approval':
                case 'Generic':
                    crudInstance.goto = oItem.ForeignType;
                    crudInstance.gotokey = oItem.ForeignKey;
                    sURL = '/cqa?id=' + oItem.ForeignURLKey;
                    if (sURL != $location.url()) {
                        $location.url(sURL);
                    } else {
                        $route.reload();
                    }
                    break;
                case 'Track':
                    crudInstance.goto = 'Track';
                    crudInstance.gotokey = oItem.ForeignKey;
                    sURL = '/cqa?id=' + oItem.ForeignURLKey;
                    if (sURL != $location.url()) {
                        $location.url(sURL);
                    } else {
                        $route.reload();
                    }
                    break;
                default:
                    break;
            }
        }
    };
    crudInstance.clearGoingToTask = function() {
        crudInstance.goingToTask = false;
        crudInstance.goto = null;
        crudInstance.gotokey = null;
    };
    crudInstance.clearGoingToTask();
    //End: Go To Task

    return crudInstance;
});
