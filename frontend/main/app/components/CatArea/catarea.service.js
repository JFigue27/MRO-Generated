'use strict';

/**
 * @ngdoc function
 * @name main.service:CatAreaService
 * @description
 * # CatAreaService
 * Service of the main
 */
angular.module('main').service('CatAreaService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'CatArea',

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
