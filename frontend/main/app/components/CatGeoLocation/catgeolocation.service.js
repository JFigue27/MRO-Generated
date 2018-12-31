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
            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {},

        dependencies: []
    });

    return crudInstance;
});
