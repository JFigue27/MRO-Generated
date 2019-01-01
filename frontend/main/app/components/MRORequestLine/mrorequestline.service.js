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
            return theEntity;
        },

        adapterIn: function(theEntity) {},

        adapterOut: function(theEntity, self) {},

        dependencies: []
    });

    return crudInstance;
});
