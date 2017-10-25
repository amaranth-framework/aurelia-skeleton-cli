import { ComponentHelperForm } from 'components/helper/form/form';
import { extend } from 'features/utils';

export class ComponentFormLogin extends ComponentHelperForm {
    /**
     * Obtain form input config
     * @return {{}}
     */
    formConfig() {
        return [
            {
                name: 'user',
                label: 'Email or username',
            },
            {
                name: 'pass',
                label: 'Password',
                type: 'password'
            },
            {
                name: 'remember',
                // label: 'Remember me',
                style: 'form-group--inline col-md-12',
                type: 'checkbox',
                values: [
                    { value: 'yes', label: 'Remember me' }
                ]
            }
        ]
    }
}
