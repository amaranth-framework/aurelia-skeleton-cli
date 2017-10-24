import { ComponentHelperListing } from 'components/helper/listing/listing';
import { User } from 'models/user/user';

import 'bootstrap';

export class ComponentTableDemoSimple extends ComponentHelperListing {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.listing-users';
    /**
     * [constructor description]
     * @method constructor
     * @param  {[type]}    args [description]
     * @return {[type]}         [description]
     */
    constructor(...args) {
        super(...args);

        this.subscribeEvent('listing:edit', (options) => {
            this.router.navigateToRoute('users-edit', { action: 'edit', id: options.model.id });
        });
        this.subscribeEvent('listing:remove', async (options) => {
            User.remove(options.model.id)
                .then(result => {
                    this.messages.info('User has been removed.', 0);
                    $(`tr#table-${options.listing.__uuid}-row-${options.model.id}`)
                        .animate({ height: 0 }, function() { $(this).remove(); });
                })
                .catch(error => alert(error.toString()))
        });
    }
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
                this.tbody = result.map(_ => {
                    let row = [
                        '#',
                        _.name,
                        _.email,
                        _.address.street,
                        _.company.name,
                        _.phone,
                    ];
                    row.model = _;
                    return row;
                });
                this.setTableLoaded();
            })
            .catch((error) => this.logger.warn('service failed', error));
    }

}
