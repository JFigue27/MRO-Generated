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
