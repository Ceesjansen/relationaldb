/**
 * Created by Hoijtink on 14/04/16.
 */

"use strict";

let argsList = require('args-list');

/**
 *
 * @returns {{}}
 */
module.exports = function() {

    let dependencies = {};
    let factories = {};
    let container = {};

    /**
     *
     * @param name
     * @param factory
     */
    container.factory = function(name, factory) {
        factories[name] = factory;
    };

    /**
     *
     * @param name
     * @param dep
     */
    container.register = function(name, dep) {
        dependencies[name] = dep;
    };

    /**
     *
     * @param name
     * @returns {*}
     */
    container.get = function(name) {
        if (!dependencies[name]) {
            let factory = factories[name];
            dependencies[name] = factory && container.inject(factory);
            if (!dependencies[name]) {
                throw new Error('Cannot find module: ' + name)
            }
        }
        return dependencies[name];
    };

    /**
     *
     * @param factory
     * @returns {*}
     */
    container.inject = function(factory) {
        let args = argsList(factory)
            .map(function(dependecy) {
                return container.get(dependecy)
            });
        return factory.apply(null, args);
    };

    return container;
};