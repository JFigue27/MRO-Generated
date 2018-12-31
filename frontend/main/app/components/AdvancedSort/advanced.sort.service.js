'use strict';

/**
 * @ngdoc function
 * @name main.service:AdvancedSortService
 * @description
 * # AdvancedSortService
 * Service of the main
 */
angular.module('main').service('AdvancedSortService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'AdvancedSort',

        catalogs: [],

        adapter: function(theEntity) {
            //Filtering:
            theEntity.filterData = {};
            theEntity.Filtering.forEach(function(oCurrent) {
                theEntity.filterData[oCurrent.Key] = JSON.parse(oCurrent.Value);
            });

            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {},

        dependencies: []
    });

    return crudInstance;
});
