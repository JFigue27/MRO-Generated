'use strict';

/**
 * @ngdoc function
 * @name main.service:CatVendorService
 * @description
 * # CatVendorService
 * Service of the main
 */
angular.module('main').service('CatVendorService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'CatVendor',

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
