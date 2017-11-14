import Chance from 'chance';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
*
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
     * Generate random data for List.
     * @method defaultBuildRandom
     * @return {[type]}           [description]
     */
    defaultBuildRandom() {
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
     * GEnerate random data for Table.
     * @method defaultBuildRandomTable
     * @return {[type]}                [description]
     */
    defaultBuildRandomTable() {
        let chance = new Chance();
        let random = Math.trunc(Math.random() * 1000) % 10 * 3 + 1;
        this.thead = ['#'].concat(Array(random).fill().map((_, i) => chance.string({length: 5})));
        this.tbody = Array(random).fill().map((_, i) => [i].concat(Array(random).fill().map((__, ii) => chance.string({length: 5}))));
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
                model: PLATFORM.moduleName('components/helper/card/card'),
                view: PLATFORM.moduleName('components/listing/card/user.html')
            },
            rows: { // row options
                selectable: true // whether to add select checkboxes in stead of row ids
            },
            view: ComponentHelperListing.VIEW_LIST
        });
    }
    /**
    * @see View::init()
    */
    init() {
        super.init();

        if (this.buildRandom) {
            this.buildRandom();
        } else {
            if (this.settings.view === ComponentHelperListing.VIEW_TABLE) {
                this.defaultBuildRandomTable();
            } else {
                this.defaultBuildRandom();
            }
        }
    }
    /**
    * Mark table in loading state.
    */
    setTableLoading() {
        this.logger.debug('table-id', this.__uuid.toString(), $(`#table-${this.__uuid}`));
        $(`#table-${this.__uuid}`).addClass('table--loading');
    }
    /**
    * Mark table as data has been loaded. This can be triggered when service has done loading the data.
    */
    setTableLoaded() {
        setTimeout(() => {
            this.logger.debug('table-id', this.__uuid.toString(), $(`#table-${this.__uuid}`));
            $(`#table-${this.__uuid}`).removeClass('table--loading');
        }, 500);
    }
    /**
    * [exportToCSV description]
    * @method exportToCSV
    * @return {[type]}    [description]
    */
    exportToCSV() {
        let csv = [this.thead.join(',')];
        this.tbody.forEach((row, i) => csv.push(row.join(',')));
        csv = csv.join('\n');
        this.logger.debug('table-csv-gernerate', csv);
        window.location.href = `data:text/csv;charset=UTF-8,${csv}`;
    }
}
