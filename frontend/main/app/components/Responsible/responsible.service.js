'use strict';

/**
 * @ngdoc function
 * @name main.service:ResponsibleService
 * @description
 * # ResponsibleService
 * Service of the main
 */
angular.module('main').service('ResponsibleService', function(crudFactory, utilsService) {
    var crudInstance = new crudFactory({
        entityName: 'User',

        catalogs: [],

        adapter: function(theEntity) {
            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {},

        dependencies: []
    });

    return crudInstance;
});
