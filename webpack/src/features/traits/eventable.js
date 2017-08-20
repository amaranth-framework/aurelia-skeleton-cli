/**
 * Aurelia Skeleton (https://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      https://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   https://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

/**
 * Trait for handling events within a class.
 */
export class Eventable {
    /**
     * @see EventAggregator::subscribeOnce
     * @param  {String}   eventName
     * @param  {Function} eventMethod
     */
    eventsAdd(eventName, eventMethod) {
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribe(eventName, eventMethod));
    }
    /**
     * @see EventAggregator::subscribeOnce()
     * @param  {String}   eventName
     * @param  {Function} eventMethod
     */
    eventsAddOnce(eventName, eventMethod) {
        this.__events = this.__events || [];
        this.__events.push(this.events.subscribeOnce(eventName, eventMethod));
    }
    /**
     * @see EventAggregator::subscribe().dispose()
     */
    eventsDispose() {
        if (this.__events && Array.isArray(this.__events)) {
            this.__events.forEach((event) => event.dispose());
        }
    }
}
