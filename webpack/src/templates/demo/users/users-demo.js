/**
 * Amaranth :: Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { extend } from 'features/utils';
import { Template } from 'features/views/template';
import { User } from 'models/user/user';

export class TemplateUsers extends Template {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.users';
    /**
     * @see View::constructor()
     */
    constructor(...args) {
        super(...args);

        this.subscribeEvent('listing:users:init', (listing) => this.loadUsers(listing));

        this.subscribeEvent('model:user:attached', async(user) => {
            if (!user || !user.parent || user.parent !== this) {
                return;
            }
            this.user = user;
            if (this.params.action && this.params.action === 'edit') {
                await this.user.load(this.params.id);
            }
        });

        this.subscribeEvent('model:user:validated', async(user) => {
            user.save()
                .then(result => {
                    this.messages.info('User has been saved.', 1);
                    $('#modal-user-form').modal('hide');
                })
                .catch(error => alert(error.toString()));
        });
    }
    /**
     * @param  {ComponentHelperListing}              listing [description]
     */
    applyListingRenderers(listing) {
        listing
            .addFieldRenderer({
                key: 'image',
                renderer: (value, model) => `<img src="${value}" alt="${model.name}" />`
            })
            .addFieldRenderer({
                key: 'email',
                renderer: (value, model) => `<a href="mailto:${value}" title="${value}">${value}</a>`
            });
    }
    /**
     * @see View::attached()
     */
    attached() {
        // display form in case edit or add actions are called
        if (this.params.action && this.params.action.match(/^(add|edit)$/)) {
            $('#modal-user-form')
                .modal('show')
                .on('hidden.bs.modal', () => this.router.navigateToRoute('users'));
        }
    }
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                componentsAdditional: [
                    {
                        type: 'listing-swtich',
                        module: PLATFORM.moduleName('components/helper/listing/switch-view/switch-view'),
                        settings: {
                            name: 'users'
                        }
                    }
                ],
                content: {
                    title: 'Users'
                }
            },
            listing: {
                card: {
                    view: PLATFORM.moduleName('components/helper/card/card-user.html')
                },
                name: 'users',
                rows: [
                    { head: '', map: 'image' },
                    { head: 'Name', map: 'name' },
                    { head: 'Email', map: 'email' },
                    { head: 'Phone', map: 'phone' },
                    { head: 'Website', map: 'website' },
                    { head: 'Company', map: 'company.name' }
                ],
                style: 'listing--3 listing--users'
            }
        });
    }
    /**
     * @param  {Component}  listing
     */
    async loadUsers(listing) {
        this.applyListingRenderers(listing);
        this.publishEvent('listing:users:set-list', (await User.list()).map(user => {
            const rand = Math.random();
            user.image = 'http://lorempixel.com/128/128/people/?hash=' + rand;
            user.smallImage = 'http://lorempixel.com/20/20/people/?hash=' + rand;
            return user;
        }));
    }
    // /**
    //  * @see View::detached()
    //  */
    // detached() {
    //     super.detached();
    //     $('#modal-user-form').modal('hide');
    // }
}
