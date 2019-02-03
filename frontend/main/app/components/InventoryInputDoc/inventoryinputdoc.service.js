'use strict';

/**
 * @ngdoc function
 * @name main.service:InventoryInputDocService
 * @description
 * # InventoryInputDocService
 * Service of the main
 */
angular.module('main').service('InventoryInputDocService', function(
    crudFactory,
    ///start:slot:dependencies<<<
    utilsService
    ///end:slot:dependencies<<<
) {
    var crudInstance = new crudFactory({
        entityName: 'InventoryInputDoc',

        catalogs: [],

        adapter: function(theEntity) {
            ///start:slot:adapterIn<<<
            theEntity.CreatedAtConverted = utilsService.toJavascriptDate(theEntity.CreatedAt);
            ///end:slot:adapterIn<<<
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
                        current.Quantity = current.Quantity || 0;
                    } else {
                        theEntity.InventoryInputs.splice(i, 1);
                    }
                }
            }
            ///start:slot:adapterOut<<<
            ///end:slot:adapterOut<<<
        },

        dependencies: []
    });

    ///start:slot:service<<<
    ///end:slot:service<<<

    return crudInstance;
});
