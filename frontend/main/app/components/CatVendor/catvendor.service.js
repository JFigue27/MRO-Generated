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
            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {},

        dependencies: []
    });

    return crudInstance;
});
