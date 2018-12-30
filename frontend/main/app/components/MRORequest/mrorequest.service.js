'use strict';

/**
 * @ngdoc function
 * @name main.service:MRORequestService
 * @description
 * # MRORequestService
 * Service of the main
 */
angular.module('main').service('MRORequestService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'MRORequest',

        catalogs: [],

        adapter: function(theEntity) {
            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {
            if (theEntity.MRORequestLines) {
                for (var i = theEntity.MRORequestLines.length - 1; i >= 0; i--) {
                    var current = theEntity.MRORequestLines[i];
                    //At least one property has value:
                    if (
                        !(current.EF_State == 3 && current.id == 0) &&
                        Object.getOwnPropertyNames(current).find(prop => current[prop] || current[prop] == 0)
                    ) {
                        //Adapt child entity if needed here:
                    } else {
                        theEntity.MRORequestLines.splice(i, 1);
                    }
                }
            }
        },

        dependencies: []
    });

    return crudInstance;
});
