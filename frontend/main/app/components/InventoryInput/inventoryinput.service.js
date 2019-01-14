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
