import { Injectable, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppInjector } from 'src/app/app.injector';
import { CrudService } from '../service/crud.service';
import { BaseComponent } from './base.component';

/**
 * The 'BaseModelComponent' class provides the common API for all the components
 * that works with models.
 *
 * All components that uses models MUST extend this class.
 *
 * @extends BaseComponent
 */
@Injectable()
export abstract class BaseModelComponent extends BaseComponent implements OnInit {

  /**
   * Service to do the CRUD operations.
   *
   * @type {CrudService}
   */
  protected service: CrudService = AppInjector.get(CrudService);

  /**
   * Constructor.
   */
  constructor() {
    super();
  }


  /**
   * On Init of the component.
   */
  override ngOnInit(): void {
    super.ngOnInit();
  }

  /**
   * Gets the param from the activated route.
   *
   * @param {string} param
   * @returns {string}
   */
  protected getParam(param: string): string {
    return this.getActivatedRoute() ? String(this.getActivatedRoute().snapshot.paramMap.get(param)) : '';
  }

  /**
   * Gets the activated route for data extraction.
   *
   * @returns {ActivatedRoute}
   */
  protected getActivatedRoute(): ActivatedRoute {
    return AppInjector.get(ActivatedRoute);
  }

  /**
   * Gets the base URL of the service (mainly backend url).
   *
   * Ex: To get all items, like 'user', in server, the url is: http://server.com/user
   * This method should return just your base: 'user'.
   *
   * @returns {string}
   */
  abstract getServiceURL(): string;

  /**
   * Gets the base URL of the router (frontend url).
   *
   * Ex: To navigate between 'area' components, like 'area/edit', should return 'area'.
   *
   * @returns {string}
   */
  abstract getRouterURL(): string;

}
