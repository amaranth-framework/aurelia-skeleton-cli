import { ComponentHelperListing } from 'components/helper/listing/listing';
import { extend } from 'features/utils';
import { User } from 'models/user/user';

export class ComponentTableDemoSimple extends ComponentHelperListing {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.table-demo-simple';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            content: {
                caption: false
            }
        })
    }
    /**
     * @see View::init()
     */
    async init() {
        super.init();
        this.logger.debug('View service: ', this.settings.service);
        this.setTableLoading();
        this.getEndpoint().find('users')
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
