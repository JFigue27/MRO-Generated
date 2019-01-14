'use strict';

/**
 * @ngdoc function
 * @name main.service:MRORequestLineService
 * @description
 * # MRORequestLineService
 * Service of the main
 */
angular.module('main').service('MRORequestLineService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'MRORequestLine',

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
