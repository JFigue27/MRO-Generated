'use strict';

/**
 * @ngdoc function
 * @name main.service:CatGeoLocationService
 * @description
 * # CatGeoLocationService
 * Service of the main
 */
angular.module('main').service('CatGeoLocationService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'CatGeoLocation',

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
