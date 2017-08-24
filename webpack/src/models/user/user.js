import { Model, properties } from 'features/views/model';

export class User extends Model {
    @properties([
        '_id',
        'email',
        'name',
        {name:'password',query:false},
        {name:'type',default:'employee',type:'enum'},
        'username',
        {name:'venue',query:'name, _id'},
        {name:'expire',default:''},
        'updatedAt'
    ])
    /**
     * @see ModelView:defaultSettings
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {},               // translation keys for different text/html components in the template

        service: {},               // possible service settings for component
        services: {                // possible services settings for component
            list: 'users'
        }
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'models.user';
    /**
     * @property {type:String}
     */
    name = 'John Doe';
    /**
     * @property {type:String}
     */
    email = 'john@doe.com';
    /**
     * @property {type:String}
     */
    image = 'https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-1/p160x160/18740252_1314787368636643_6264909807224683_n.jpg?oh=159ffc5fe2c448015e79974826077374&oe=59C7445D';
}
