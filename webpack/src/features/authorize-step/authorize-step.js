import { Redirect } from 'aurelia-router';

import decode from 'jwt-decode';

import { Base } from 'features/base';
import { User } from 'models/user/user';
import { getCookie, setCookie, removeCookie } from 'features/utils';

/**
 * Aurelia Pipeline, authorize step
 * @link http://foreverframe.net/exploring-aurelia-pipelines/
 * @link http://aurelia.io/hub.html#/doc/article/aurelia/router/latest/router-configuration/8
 */
export class AuthorizeStep extends Base {
    /**
     * Defines session settings.
     * @type {String}
     */
    sessionConfig = {
        type: 'local',    // Defines storage type to use. Can be 'local', 'storage' or 'cookie'.
        key: 'secret' //
    };
    /**
     * Return whether the logged in user is an administrator or not.
     * @return {Promise} [description]
     */
    async isAdmin() {
        return new Promise((resolve, reject) => resolve(true));
    }
    /**
     * Getter: Test if user is logged in or not.
     * @return {Boolean}
     */
    get isLoggedIn() {
        return this.session ? true : false;
    }
    /**
     * @param  {NavigationInstruction} navigationInstruction Navigation Instructions
     * @param  {Function}              next Navigation Promise
     * @return {Promise}
     */
    run(navigationInstruction, next) {
        this.logger.debug('session', [this.session]);
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
        this.sessionStore(true);
        return this.router.navigateToRoute('dashboard');
    }
    /**
     * Logout
     * @return {Redirect}
     */
    async logout() {
        this.sessionRemove();
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
     * Getter: Obtain session tokken.
     * @return {any}
     */
    get session() {
        if (this.sessionConfig.type !== 'cookie') {
            try {
                let storage = window[`${this.sessionConfig.type}Storage`];
                return storage.getItem(this.sessionConfig.key);
            } catch(e) {
                this.logger.warn(
                    'session()',
                    `Could not implement session:${this.sessionConfig.type}. Fallback to cookie.`,
                    e
                );
            }
        }
        return getCookie(this.sessionConfig.key);
    }
    /**
     * Store the session value.
     * @param {any} session
     */
    sessionStore(session) {
        if (this.sessionConfig.type !== 'cookie') {
            try {
                let storage = window[`${this.sessionConfig.type}Storage`];
                storage.setItem(this.sessionConfig.key, session);
                return true;
            } catch(e) {
                this.logger.warn(
                    'sessionStore()',
                    `Could not implement session:${this.sessionConfig.type}. Fallback to cookie.`,
                    e
                );
            }
        }
        return setCookie(this.sessionConfig.key, session);
    }
    /**
     * Remove the session.
     */
    sessionRemove() {
        if (this.sessionConfig.type !== 'cookie') {
            try {
                let storage = window[`${this.sessionConfig.type}Storage`];
                storage.removeItem(this.sessionConfig.key);
                return true;
            } catch(e) {
                this.logger.warn(
                    'sessionRemove()',
                    `Could not implement session:${this.sessionConfig.type}. Fallback to cookie.`,
                    e
                );
            }
        }
        return removeCookie(this.sessionConfig.key);
    }
}

export class AuthorizeStepJWT extends AuthorizeStep {
    /**
     * Login
     * @param  {String} user Login User
     * @param  {String} pass Login Password
     * @return {Redirect}
     */
    async login(user, pass) {
        // TODO: Implement your own login here. If you won't want to use JWT, please change the code a bit more :P
        // The following token was generated with https://jwt.io/ for https://jsonplaceholder.typicode.com/users user with ID 1.
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkxlYW5uZSBHcmFoYW0iLCJ1c2VybmFtZSI6IkJyZXQiLCJlbWFpbCI6IlNpbmNlcmVAYXByaWwuYml6In0.BDZZ82QAJOqJEhCMIGXnlEtGlSwcCUHsiHdCvDHM2CU';
        this.sessionStore(token);
        return this.router.navigateToRoute('dashboard');
    }

    get sessionDecoded() {
        if (this.sessionConfig.type !== 'cookie') {
            try {
                let storage = window[`${this.sessionConfig.type}Storage`];
                return decode(storage.getItem(this.sessionConfig.key));
            } catch(e) {
                // this.logger.warn(`Could not implement session:${this.sessionConfig.type}. Fallback to cookie.`, e);
            }
        }
        try {
            return decode(getCookie(this.sessionConfig.key));
        } catch (e) {
            return null;
        }
    }
}
