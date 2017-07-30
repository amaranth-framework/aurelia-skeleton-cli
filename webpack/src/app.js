import { inject } from 'aurelia-framework';

// Uncomment import to use authorization step
import { AuthorizeStep as AuthorizeStep } from 'features/authorize-step/authorize-step';
import { Base } from 'features/base';

/**
 * Application
 */
// Uncomment @inject() to use authorization step
@inject(AuthorizeStep)
export class App extends Base {
    // Uncomment constructor to use authorization step
    /**
     * Constructor
     * @see Base::constructor() for the rest of the arguments
     * @param {AuthorizeStep}        authStep Authorization step
     */
    constructor(authStep, ...args) {
        super(...args);
        this.authStep = authStep;
    }
    /**
     * Configure Application router
     * @method configureRouter
     * @param  {RouterConfiguration}  config
     * @param  {AppRouter}            router
     */
    configureRouter(config, router) {
        config.title = 'Amaranth Framework';
        if (window.location.hostname !== 'localhost' && window.location.port !== 9000) {
            config.options.pushState = true;
        }
        // uncomment this if you're using authroization
        config.addAuthorizeStep(this.authStep);
        // map unknown routes to a certain template
        config.mapUnknownRoutes(PLATFORM.moduleName('templates/status/404'));
        // map routes
        this.mapRoutes(config);
        // comment the line above and uncomment the one below, to load your router config from a REST service
        // this.mapRoutesFromREST(config);
        this.router = router;
    }
    /**
     * Map routes from within the application class
     * @param  {RouterConfiguration}  config
     */
    mapRoutes(config) {
        config.map([
            {
                route: ['', 'home'],
                redirect: 'dashboard'
            },
            {
                route: 'dashboard',
                name: 'dashboard',
                moduleId: PLATFORM.moduleName('templates/home/home'),
                nav: true,
                title: 'Dashboard',
                group: 'left-general'
            },
            {
                route: 'forms',
                name: 'forms',
                moduleId: PLATFORM.moduleName('templates/forms/forms'),
                nav: true,
                title: 'Forms',
                group: 'left-forms'//,
                // routes: [ 'test1-child' ]
            },
            {
                route: 'tables',
                name: 'tables',
                moduleId: PLATFORM.moduleName('templates/tables/tables'),
                nav: true,
                title: 'Tables',
                group: 'left-forms'
            },
            {
                route: 'login',
                name: 'login',
                moduleId: PLATFORM.moduleName('templates/login/login'),
                title: 'Login',
                settings: { auth: false }
            },
            {
                route: '404',
                name: '404',
                moduleId: PLATFORM.moduleName('templates/status/404'),
                title: 'Page does not exist.'
            }
        ]);
    }
    /**
     * Map the router with the help of a REST service
     * @param  {RouterConfiguration}  config
     */
    mapRoutesFromREST(config) {
        this.configApi.find(`${this.config.get('locale')}/routes.json`).then(response => {
            response.forEach(route => {
                route.settings = route.settings || {};
                route.moduleId = PLATFORM.moduleName(route.moduleId, route.name);
                this.router.addRoute(route);
            });

            this.router.refreshNavigation();

            const REQUEST = this.requestedRoute(this.router.routes);

            this.router.navigateToRoute(REQUEST.route, REQUEST.params, { replace: true });
            this.site.ready = true;
        });
    }
    /**
     * Extract initially requested route information
     * @param {Array} routes List of available routes
     * @returns {Object} Matching route to be loaded
     */
    requestedRoute(routes) {
        const path = (window.location.pathname.replace(/^\//, '').replace(/\/$/, '').length) ?
            window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/') : null;
        let matchedRoute = path ? '404' : 'home';
        let matchedParams = {};
        let isFound = false;

        if (path) {
            routes.forEach(r => {
                const components = r.route.split('/');
                let isMatch = true;
                let params = {};

                if (!isFound) {
                    for (let index in components) {
                        if (components.length !== path.length) {
                            isMatch = false;
                            break;
                        }

                        if (components[index].match(/^\:/) && path[index]) {
                            params[components[index].replace(/^\:/, '')] = path[index];
                            continue;
                        }

                        if (components[index] !== path[index]) {
                            isMatch = false;
                            break;
                        }
                    }

                    if (isMatch) {
                        isFound = true;
                        matchedRoute = r.name;
                        matchedParams = params;
                    }
                }
            });

            if (window.location.search.length) {
                window.location.search.slice(1).split('&').map(param => {
                    const paramPair = param.split('=');
                    matchedParams[paramPair[0]] = paramPair[1];
                });
            }
        }

        return { route: matchedRoute, params: matchedParams };
    }
}
