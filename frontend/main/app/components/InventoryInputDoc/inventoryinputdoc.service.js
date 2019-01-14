'use strict';

/**
 * @ngdoc function
 * @name main.service:InventoryInputDocService
 * @description
 * # InventoryInputDocService
 * Service of the main
 */
angular.module('main').service('InventoryInputDocService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'InventoryInputDoc',

        catalogs: [],

        adapter: function(theEntity) {
            ///Start:Slot:adapterIn<<<
            ///End:Slot:adapterIn<<<
            return theEntity;
        },

        adapterOut: function(theEntity, self) {
            if (theEntity.InventoryInputs) {
                for (var i = theEntity.InventoryInputs.length - 1; i >= 0; i--) {
                    var current = theEntity.InventoryInputs[i];
                    //At least one property has value:
                    if (
                        !(current.EF_State == 3 && current.id == 0) &&
                        Object.getOwnPropertyNames(current).find(prop => current[prop] || current[prop] == 0)
                    ) {
                        //Adapt child entity if needed here:
                    } else {
                        theEntity.InventoryInputs.splice(i, 1);
                    }
                }
            }
            ///Start:Slot:adapterOut<<<
            ///End:Slot:adapterOut<<<
        },

        dependencies: []
    });

    ///Start:Slot:service<<<
    ///End:Slot:service<<<

    return crudInstance;
});
