import {Template} from 'features/views/template';
import { extend } from 'features/utils';

export class TemplateListingAsTable extends Template {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.listing-as-table';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Listing (as table)'
                }
            }
        });
    }
}
