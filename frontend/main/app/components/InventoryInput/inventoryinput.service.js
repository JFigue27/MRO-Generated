'use strict';

/**
 * @ngdoc function
 * @name main.service:InventoryInputService
 * @description
 * # InventoryInputService
 * Service of the main
 */
angular.module('main').service('InventoryInputService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'InventoryInput',

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
