'use strict';

/**
 * @ngdoc function
 * @name main.service:UserService
 * @description
 * # UserService
 * Service of the main
 */
angular.module('main').service('UserService', function(crudFactory) {
    var crudInstance = new crudFactory({
        entityName: 'User',

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
