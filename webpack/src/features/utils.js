// import { LogManager } from 'aurelia-framework';

export class ChunkMap {
    static USER = 'user';
    static MAP = 'user';
}

/**
 * Extend the `target` object with all the objects behind him (in the list of params).
 * As a note, this will not 'extend' arrays. If you need that, please use $.extend from jQuery.
 * @param  {Boolean}   deep   Whether to do a deep extend or not.
 * @param  {Object}    target Object to extend
 * @param  {...Object} args   Object(s) to extend with
 * @return {Object}           Extended object
 */
export function extend(deep, target, ...args) {
    const NULL = [null, 'null'];

    args.forEach(object => {
        for (let key in object) {
            if (NULL.includes(object[key])) {
                target[key] = null;
                continue;
            }

            if (deep && typeof object[key] === 'object' && !Array.isArray(object[key])) {
                target[key] = extend(deep, target[key] || {}, object[key]);
            } else {
                target[key] = object[key];
            }
        }
    });
    return target;
}

/**
 * Obtain the name of a class
 * @param  {Object} obj           Object to obtain the class name
 * @param  {Boolean} isContructor Wheter object is the constructor already or not
 * @return {String}               String name of the class
 */
export function className(obj, isConstructor = false) {
    let _className = isConstructor ? obj.name : obj.constructor.name;
    if (typeof _className === 'undefined') { // Internet Explorer
        // TODO: NOT HAPPY at all with the idea of using regexp; maybe there is another method ?
        _className = (isConstructor ? obj : obj.constructor).toString().match(/ ([^ ]+)\(/)[1];
    }
    return _className;
}

/**
 * Obtain the name of a class's parent (the name of the class which is extended by the current one)
 * @param  {Object} obj Object to obtain the parent class name
 * @return {String}     String name of the class
 */
export function parentClassName(obj) {
    let parentClass = Object.getPrototypeOf(obj.constructor);
    if (typeof parentClass === 'undefined') {
        throw new Error('Could not determine parent class name for ' + className(obj) + '. Does it extend any class?');
    }
    return className(parentClass, true);
}
