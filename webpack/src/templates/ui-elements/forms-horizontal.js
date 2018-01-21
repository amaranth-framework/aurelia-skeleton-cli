import {validateTrigger, ValidationController, ValidationRules} from 'aurelia-validation';

import messg from 'messg';
import 'messg/index.css';

import { TemplateForms } from './forms';
import { extend } from 'features/utils';

export class TemplateFormsHorizontal extends TemplateForms {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.forms-horizontal';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Forms'
                }
            },
            form: {
                name: 'basic-form',
                style: 'form-horizontal'
            }
        });
    }
}
