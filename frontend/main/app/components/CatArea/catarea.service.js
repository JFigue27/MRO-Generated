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
