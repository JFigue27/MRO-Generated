'use strict';

/**
 * @ngdoc function
 * @name main.service:InventoryService
 * @description
 * # InventoryService
 * Service of the main
 */
angular.module('main').service('InventoryService', function(
    crudFactory
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var crudInstance = new crudFactory({
        entityName: 'Inventory',

        catalogs: [],

        adapter: function(theEntity) {
            ///start:slot:adapterIn<<<
            ///end:slot:adapterIn<<<
            return theEntity;
        },

        adapterOut: function(theEntity, self) {
            ///start:slot:adapterOut<<<
            ///end:slot:adapterOut<<<
        },

        dependencies: []
    });

    ///start:slot:service<<<
    ///end:slot:service<<<

    return crudInstance;
});
