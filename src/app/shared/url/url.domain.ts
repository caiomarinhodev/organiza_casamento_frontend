'use strict';



export const API_VERSION = 'v1';

/**
 * Default URL of the back-end server.
 *
 * @type {string}
 */
export const SERVER_URL = 'http://localhost:8000/api/';
// export const SERVER_URL = 'https://jsonplaceholder.typicode.com/';

/**
 * URLs for Login.
 */
export namespace AuthURL {
  export const BASE = 'auth/';
  export const LOGIN = BASE + 'login/';
  export const LOGOUT = BASE + 'logout/';
  export const REGISTER = BASE + 'register/';
  export const RESET_PASSWORD = BASE + 'reset-password/';
  export const CHANGE_PASSWORD = BASE + 'reset-password/confirm/';
}


