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
