/**
 * Aurelia Skeleton (https://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import {EventAggregator} from 'aurelia-event-aggregator';

/**
 * Trait for handling events within a class.
 */
export class Eventable {
    /**
     * @see EventAggregator::subscribe()
     * @param  {String}   eventName
     * @param  {Function} eventMethod
     */
    subscribeEvent(eventName, eventMethod) {
        if (!this.events) {
            throw Error(`Class is missing 'events' variable. You cannot add 'Eventable' trait.`);
        }
        if (!this.events instanceof EventAggregator) {
            throw Error(`Variable 'events' is not of 'aurelia-event-aggregator/EventAgregator' type. You cannot add 'Eventable' trait.`);
        }
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribe(eventName, eventMethod));
    }
    /**
     * @see EventAggregator::subscribeOnce()
     * @param  {String}   eventName
     * @param  {Function} eventMethod
     */
    subscribeEventOnce(eventName, eventMethod) {
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribeOnce(eventName, eventMethod));
    }
    /**
     * @see EventAggregator::subscribe().dispose()
     */
    disposeEvents() {
        if (this.__events && Array.isArray(this.__events)) {
            this.__events.forEach((event) => event.dispose());
        }
    }
}
