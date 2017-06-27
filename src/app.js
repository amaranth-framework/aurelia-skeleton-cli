export class App {
    constructor() {
        this.message = 'Hello World!';
    }
    /**
     * [configureRouter description]
     * @method configureRouter
     * @param  {[type]}        config [description]
     * @param  {[type]}        router [description]
     */
    configureRouter(config, router) {
        config.title = 'Planteaza pentru Romania';
        if (window.location.hostname !== 'localhost' && window.location.port !== 9000) {
            config.options.pushState = true;
        }
        config.map([
            {
                route: ['', 'dashboard', 'home'],
                name: 'dashboard',
                moduleId: 'templates/home/home',
                nav: true,
                title: 'Dashboard',
                group: 'side-nav'
            }
        ]);

        this.router = router;
    }
}
