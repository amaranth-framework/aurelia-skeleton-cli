import { Redirect } from 'aurelia-router';

import { Base } from 'features/base';
import { getCookie, setCookie, removeCookie } from 'features/utils';

/**
 * Aurelia Pipeline, authorize step
 * @link http://foreverframe.net/exploring-aurelia-pipelines/
 * @link http://aurelia.io/hub.html#/doc/article/aurelia/router/latest/router-configuration/8
 */
export class AuthorizeStep extends Base {
    /**
     * @param  {NavigationInstruction} navigationInstruction Navigation Instructions
     * @param  {Function}              next Navigation Promise
     * @return {Promise}
     */
    run(navigationInstruction, next) {
        this.logger.debug('session', [getCookie('session')]);
        if (navigationInstruction.getAllInstructions().some(i => this.routeNeedsAuth(i))) {
            this.logger.debug('routeNeedsAuth()', true);
            this.logger.debug('isLoggedIn', this.isLoggedIn);
            if (!this.isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }
        return next();
    }
    /**
     * Login
     * @param  {String} user Login User
     * @param  {String} pass Login Password
     * @return {Redirect}
     */
    async login(user, pass) {
        setCookie('session', true);
        return this.router.navigateToRoute('dashboard');
    }
    /**
     * Logout
     * @return {Redirect}
     */
    logout() {
        removeCookie('session');
        return this.router.navigateToRoute('login');
    }
    /**
     * Test if route needs authentication.
     * @param  {Object} route Route to test
     * @return {Boolean}
     */
    routeNeedsAuth(route) {
        return route.config.settings === undefined
            || route.config.settings.auth !== false;
    }
    /**
     * Test if user is logged in or not.
     * @return {Boolean}
     */
    get isLoggedIn() {
        return getCookie('session') ? true : false;
    }

}
