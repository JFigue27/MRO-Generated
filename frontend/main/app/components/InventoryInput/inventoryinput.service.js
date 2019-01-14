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
            ///Start:Slot:adapterIn<<<
            ///End:Slot:adapterIn<<<
            return theEntity;
        },

        adapterOut: function(theEntity, self) {
            ///Start:Slot:adapterOut<<<
            ///End:Slot:adapterOut<<<
        },

        dependencies: []
    });

    ///Start:Slot:service<<<
    ///End:Slot:service<<<

    return crudInstance;
});
