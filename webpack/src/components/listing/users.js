import { ComponentHelperTable } from 'components/helper/table/table';
import { User } from 'models/user/user';

export class ComponentTableDemoSimple extends ComponentHelperTable {
    /**
     * @see View:defaultSettings
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {                 // translation keys for different text/html components in the template
            caption: false
        },

        service: 'general.json',   // possible service settings for component
        services: {}               // possible services settings for component
    };
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.listing-users';
    /**
     * @see View::init()
     */
    async init() {
        super.init();
        this.logger.debug('View service: ', this.settings.service);
        this.setTableLoading();
        User.list()
            .then((result) => {
                this.thead = ['#', 'Name', 'Email', 'Address', 'Company', 'Phone'];
                this.tbody = result.map(_ => [
                    '#',
                    _.name,
                    _.email,
                    _.address.street,
                    _.company.name,
                    _.phone,
                ]);
                this.setTableLoaded();
            })
            .catch((error) => this.logger.warn('service failed', error));
    }
}
