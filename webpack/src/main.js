import {I18N} from 'aurelia-i18n';
import {ValidationMessageProvider} from 'aurelia-validation';
import Backend from 'i18next-xhr-backend';
import environment from './environment';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

import * as Bluebird from 'bluebird';
// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia) {
    aurelia.use
        .standardConfiguration();
    //.feature(PLATFORM.moduleName('./resources'));

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }

    aurelia.use
        // .globalResources(['vc/lower', 'vc/upper', 'vc/price'])
        .plugin(PLATFORM.moduleName('aurelia-animator-css'))
        .plugin(PLATFORM.moduleName('aurelia-configuration'))
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-api'), config => {
            /**
             * @link https://aurelia-api.spoonx.org/configuration.html
             */
            config
            .registerEndpoint(
                'rest',
                'https://jsonplaceholder.typicode.com/',
                {
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .setDefaultEndpoint('api');
        })
        .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
            // register backend plugin
            instance.i18next.use(Backend);
        });
    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
}
