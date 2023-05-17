import { Injectable } from "@angular/core";

import { HttpParams } from "@angular/common/http";
import { BaseService } from "../interface/base.service";

/**
 * The 'SearchService' class provides the common API and operations to
 * retrieve, find, filter and list items.
 *
 * @extends BaseService
 */
@Injectable()
export class SearchService extends BaseService {
  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * Gets all items.
   *
   * @param {string} url
   * @returns {Observable<Object>}
   */
  getAll(url: any) {
    return this.search(url);
  }

  /**
   * Searches the items where the filters matches.
   *
   * @param {string} url
   * @returns {Observable<Object>}
   */
  search(url: string, pagination = {}, filters = []): any {
    const params = new HttpParams().set(
      "filter",
      JSON.stringify(Object.assign(pagination, { filters: filters }))
    );

    return this.get(url + "/", params);
  }

  /**
   * Gets one item by its ID.
   *
   * @param {string} url
   * @param {any} id
   * @returns {Observable<Object>}
   */
  getOne(url: string, id: string) {
    return this.get(url + "/" + id + "/", new HttpParams());
  }

  getURL(url: string) {
    return this.get(url + "/", new HttpParams());
  }

  getCustom(url: string, params: HttpParams) {
    return this.get(url + "/", params);
  }
}
