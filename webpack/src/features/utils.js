/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { LogManager } from 'aurelia-framework';

const _logger = LogManager.getLogger('features/utils');

/**
 *
 */
export const EventsList = {
    AUTH_USER_REQUESTED: 'auth:user:requested',
    AUTH_USER_OFFERED: 'auth:user:offered'
};

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

/**********************************************************************************************
 * Class Name
 **********************************************************************************************/

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

/**********************************************************************************************
 * Cookie
 **********************************************************************************************/

/**
 * @param {String} name
 * @return {any}
 */
export function getCookie(name) {
    let s = document.cookie;
    let i;

    if (s) {
        for (i = 0, s = s.split('; '); i < s.length; i++) {
            s[i] = s[i].split('=', 2);
            if (unescape(s[i][0]) === name) {
                return unescape(s[i][1]);
            }
        }
    }

    return null;
}

/**
 * @param {String} name
 * @param {any} value
 * @param {String} p
 * @return {Boolean}
 */
export function setCookie(name, value, p) {
    let s;
    let k;

    s = escape(name) + '=' + escape(value);

    if (p) {
        for (k in p) {
            if (k === 'expires') {
                p[k] = isNaN(p[k]) ? p[k] : relativeDate(p[k]);
            }

            if (p[k]) {
                s += '; ' + (k !== 'secure' ? k + '=' + p[k] : k);
            }
        }
    }

    document.cookie = s;

    return getCookie(name) === value;
}

/**
 * Return relative date based on current time
 *
 * @param {Number} t Number of milliseconds to offset by
 * @returns
 */
function relativeDate(t) {
    const now = new Date();
    return new Date(now.getTime() + t);
}

/**
 * Remove cookie
 *
 * @export
 * @param {String} name Name of the cookie to remove
 * @returns A setCookie call
 */
export function removeCookie(name) {
    return !setCookie(name, '', { expires: -1 });
}

/**********************************************************************************************
 * Decorators
 **********************************************************************************************/
/**
 * Mark method/variable as deprectated within the condole.
 * @method deprecate
 * @param  {[type]}  target     [description]
 * @param  {[type]}  key        [description]
 * @param  {[type]}  descriptor [description]
 * @return {[type]}             [description]
 */
export function deprecate(target, key, descriptor) {
    _logger.warn(`Usage of ${className(target)}.${key} is deprecated. Please see documentation.`);
}

/**********************************************************************************************
 * Waiting for Stuff
 **********************************************************************************************/

/**
 * Wait for elements to be ready in DOM
 *
 * @export
 * @param {String} selector
 * @param {number} [count=1]
 * @param {number} [wait=5]
 * @returns Promise
 */
export function waitForElements(selector, count = 1, wait = 5) {
    return new Promise((resolve, reject) => {
        let time = 0;
        wait *= 1000;

        const waitInterval = setInterval(() => {
            if (time >= wait) {
                clearInterval(waitInterval);
                reject(new Error(`Wait has timed out for ${selector} :: ${count}`));
            }

            let selected = $(selector);
            if (selected.length === count) {
                clearInterval(waitInterval);
                resolve(selected);
            }

            time += 100;
        }, 100);
    }).catch(e => { _logger.warn(e); });
}

/**
 *
 * @param {any} val
 * @returns {Boolean}
 */
function testUndefined(val) {
    return val !== undefined;
}

/**
 * Wait for elements to be ready in DOM
 *
 * @export
 * @param {String} selector
 * @param {number} [count=1]
 * @param {number} [wait=5]
 * @returns Promise
 */
export function waitForVariable(variable, tester = testUndefined, wait = 5, descriptor = 'variable') {
    return new Promise((resolve, reject) => {
        let time = 0;
        wait *= 1000;

        const waitInterval = setInterval(() => {
            if (time >= wait) {
                clearInterval(waitInterval);
                reject(new Error(`Wait has timed out for ${descriptor} :: ${tester}`));
            }

            if (tester(variable)) {
                clearInterval(waitInterval);
                resolve(variable);
            }

            time += 100;
        }, 100);
    }).catch(e => { _logger.warn(e); });
}
