'use strict';

/**
 * @ngdoc function
 * @name main.service:CatMaterialService
 * @description
 * # CatMaterialService
 * Service of the main
 */
angular.module('main').service('CatMaterialService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'CatMaterial',

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
