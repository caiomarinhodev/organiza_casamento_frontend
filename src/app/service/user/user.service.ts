import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/core/interface/base.service';
import { AuthURL } from '../../shared/url/url.domain';

export const STORAGE_KEY = 'user';

/**
 * Service for operations with user.
 */
@Injectable()
export class UserService extends BaseService {

  /**
   * Verify if the user is logged.
   *
   * @returns {boolean}
   */
  isLogged(): boolean {
    return this.getUser() !== null;
  }

  register(username: any, email: any, password: any, type_user: any, first_name: any, last_name: any) {
    return this.post(AuthURL.REGISTER,
      {
        type: type_user,
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password
      });
  }

  /**
   * Login the user and gets the token authorization.
   *
   * @param {String} username
   * @param {String} password
   * @returns {Observable<Object>}
   */
  login(username: any, password: any) {
    return this.post(AuthURL.LOGIN,
      {
        username: username,
        password: password
      }
    ).pipe(
      map(response => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
        return response;
      })
    );


    map((r: any) => {

    });
  }

  getProfile() {
    return this.isLogged() ? this.getUser()['role'] : this.getUser();
  }

  /**
   * Logout the user.
   */
  logout() {
    return this.post(AuthURL.LOGOUT, {}).subscribe(() => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.replace('/');
    }, err => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.replace('/login');
    });
  }

  logoutUser() {
    return this.post(AuthURL.LOGOUT, {});
  }

  resetPassword(email: any) {
    return this.post(AuthURL.RESET_PASSWORD, { email: email });
  }

  changePassword(token: any, password: any) {
    return this.post(AuthURL.CHANGE_PASSWORD + '?token=' + token, { token: token, password: password });
  }
}

