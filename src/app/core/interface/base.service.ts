import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppInjector } from 'src/app/app.injector';
import { SERVER_URL } from 'src/app/shared/url/url.domain';
import { AppTranslateService } from '../service/translate.service';

/**
 * The 'BaseService' class provides the common API for all services.
 *
 * The HTTP request operation are already implemented.
 *
 * All services MUST extend this class.
 */
export abstract class BaseService {

  /**
   * Client for the HTTP operations.
   *
   * @type {HttpClient}
   */
  protected http: HttpClient = AppInjector.get(HttpClient);
  protected translateService: AppTranslateService = AppInjector.get(AppTranslateService);

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * HTTP Method GET.
   *
   * @param {string} url
   * @param {Object} params
   * @returns {Observable<Object>}
   */
  get(url: string, params: HttpParams) {
    return this.http.get(SERVER_URL + url, { headers: this.getHeaders(), params: params });
  }

  /**
   * HTTP Method POST.
   *
   * @param {string} url
   * @param {Object} body
   * @returns {Observable<Object>}
   */
  post(url: string, body = {}) {
    return this.http.post(SERVER_URL + url, body, { headers: this.getHeaders() });
  }

  /**
   * HTTP Method PUT.
   *
   * @param {string} url
   * @param {Object} body
   * @returns {Observable<Object>}
   */
  put(url: string, body = {}) {
    return this.http.put(SERVER_URL + url, body, { headers: this.getHeaders() });
  }

  /**
   * HTTP Method PATCH.
   *
   * @param {string} url
   * @param {Object} body
   * @returns {Observable<Object>}
   */
  patch(url: string, body = {}) {
    return this.http.patch(SERVER_URL + url, body, { headers: this.getHeaders() });
  }

  /**
   * HTTP Method DELETE.
   *
   * @param {string} url
   * @returns {Observable<Object>}
   */
  delete(url: string) {
    return this.http.delete(SERVER_URL + url, { headers: this.getHeaders() });
  }

  /**
   * Gets the default headers to request the server.
   *
   * @returns {HttpHeaders}
   */
  protected getHeaders() {
    let httpHeaders: HttpHeaders;
    const userOnStorage = this.getUser();
    if (userOnStorage) {
      httpHeaders = new HttpHeaders().set('Accept-Language', this.translateService.getLang()).set('Authorization', 'Token ' + userOnStorage['token']);
    } else {
      httpHeaders = new HttpHeaders().set('Accept-Language', this.translateService.getLang());
    }

    return httpHeaders;
  }


  getUser() {
    const userOnStorage = localStorage.getItem('user');
    if (userOnStorage) {
      return JSON.parse(userOnStorage);
    }
    return null;
  }
}
