/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import Chance from 'chance';
import _ from 'lodash';
import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Listing component, used for listing models.
 */
export class ComponentHelperListing extends Component {
    /**
     * @type {String}
     */
    static VIEW_LIST = 'list';
    /**
     * @type {String}
     */
    static VIEW_TABLE = 'table';
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-listing';
    /**
     * @see View::attached()
     */
    attached() {
        // announce listing has been attached
        this.publishEvent(`listing:${this.settings.name}:attached`, this);
        // mark as loading
        this.publishEvent('loading:show', this.__uuid);
    }
    /**
     * Generate random data for List.
     */
    buildRandom() {
        let chance = new Chance();
        let random = Math.trunc(Math.random() * 1000) % 10 + 1;
        this.list = Array(random).fill().map((_, i) => ({
            id: i + 1,
            name: chance.name(),
            username: chance.first(),
            email: chance.email(),
            address: {
                street: chance.street(),
                suite: chance.postal(),
                city: chance.city(),
                zipcode: chance.zip(),
                geo: {
                    lat: chance.latitude(),
                    lng: chance.longitude()
                }
            },
            phone: chance.phone(),
            website: chance.domain(),
            company: {
                name: chance.company(),
                catchPhrase: chance.sentence(),
                bs: chance.sentence()
            }
        }));
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            actions: [
                { icon: 'fa fa-pencil', title: 'Edit', event: 'listing:edit' },
                { icon: 'fa fa-trash', title: 'Remove', event: 'listing:remove' }
            ],
            card: {
                model: PLATFORM.moduleName('components/helper/card/card')
            },
            name: 'default',
            rows: [
                { head: 'Name', map: 'name' },
                { head: 'Email', map: 'email' },
                { head: 'Phone', map: 'phone' },
                { head: 'Website', map: 'website' },
                { head: 'Company', map: 'company.name' }
            ],
            views: [
                {
                    view: ComponentHelperListing.VIEW_LIST,
                    icon: 'fa-list',
                    label: 'View as List'
                },
                {
                    view: ComponentHelperListing.VIEW_TABLE,
                    icon: 'fa-th-large',
                    label: 'View as Tabel'
                }
            ],
            view: '',
            styles: {
                card: 'col-md-4'
            }
        });
    }
    /**
     * @see View::init()
     */
    init() {
        super.init();

        if (this.buildRandom) {
            this.buildRandom();
        }
        // announce listing init
        // - at this level usually you can start calling the service
        this.publishEvent(`listing:${this.settings.name}:init`, this);
        // subscribe event for list loaded
        this.subscribeEvent(`listing:${this.settings.name}:set-list`, (list) => {
            this.list = list;
            this.publishEvent('loading:hide', this.__uuid);
        });
        // subscribe event for switching view mode
        this.subscribeEvent(`listing:${this.settings.name}:switch-view`, (view) => this.switchView(view));
        // subscribe event for publishing views to the swtich-view sub-component
        // not sure whether to solve it by another event publish. theory says yes, practicality says no
        this.subscribeEvent(`listing:${this.settings.name}:switch-view:init`, view => view.setViews(this.settings.views));
        // this.subscribeEvent(
        //     `listing:${this.settings.name}:switch-view:init`,
        //     () => setTimeout(() => this.publishEvent(`listing:${this.settings.name}:switch-view:set-views`, this.settings.views), 100)
        // );
    }
    /**
     * Map a string model to a data model and obtain a 'key' value.
     * Key model: key.subKey.subSubKey.0.subSubSubKey
     *
     * @param  {Object}      model [description]
     * @param  {String}      map   [description]
     * @return {String}            [description]
     */
    mapModelValue(model, map, arrayMap = null) {
        arrayMap = arrayMap ? arrayMap : map.split('.');
        const key = arrayMap.shift();
        if (arrayMap.length) {
            return this.mapModelValue(model[key], map, arrayMap);
        }
        // determine renderer as the first found by a certain key
        const renderer = _.find(this.__fieldRenderers, { key: map });
        return renderer ? renderer.renderer(model[key], model) : model[key];
    }
    /**
     * Adds (prepends) a field renderer with a certain key; ignores if another key renderer with the same name exists.
     * @param  {{key:String,renderer:Function}}   renderer [description]
     * @return {ComponentHelperListing}                    [description]
     */
    addFieldRenderer(renderer) {
        if (typeof renderer.key !== 'string') {
            throw Error('\'renderer\' must have a String key. i.e. { key: \'email\', renerer: (value) => value.toLowerCase() }');
        }
        if (typeof renderer.renderer !== 'function') {
            throw Error('\'renderer\' must have a Function renderer. i.e. { key: \'email\', renerer: (value) => value.toLowerCase() }');
        }
        this.__fieldRenderers = this.__fieldRenderers || [];
        this.__fieldRenderers.unshift(renderer);
        return this;
    }
    /**
     * Removes all previous renderers with a certain key.
     * @param  {String}                   key [description]
     * @return {ComponentHelperListing}       [description]
     */
    removeFieldRenderers(key) {
        this.__fieldRenderers = this.__fieldRenderers.filter(renderer => renderer.key !== key);
        return this;
    }
    /**
     * Switch between model views
     * @param {String}   view [description]
     */
    switchView(view) {
        this.settings.view = view;
    }
    // /**
    //  *
    //  */
    // exportToCSV() {
    //     let csv = [this.thead.join(',')];
    //     this.tbody.forEach((row, i) => csv.push(row.join(',')));
    //     csv = csv.join('\n');
    //     this.logger.debug('table-csv-gernerate', csv);
    //     window.location.href = `data:text/csv;charset=UTF-8,${csv}`;
    // }
}
