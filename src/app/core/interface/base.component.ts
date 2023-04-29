import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppInjector } from 'src/app/app.injector';
import { NotificationModule } from '../module/notification/notification.module';


declare var jQuery: any;

/**
 * The 'BaseComponent' class provides the common API for all the components
 * in the system.
 *
 * Operations like notification, navigation and other are already implemented.
 *
 * All components MUST extend this class.
 */
@Injectable()
export abstract class BaseComponent implements OnInit {

  /**
   * Provides the navigation and url manipulation capabilities.
   *
   * @type {Router}
   */
  protected router: Router = AppInjector.get(Router);

  /**
   * Module for user notification.
   *
   * @type {NotificationModule}
   */
  protected notificationModule: NotificationModule = AppInjector.get(NotificationModule);

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * On Init of the component.
   */
  ngOnInit(): void {
  }

  /**
   * Navigates to the path provided.
   *
   * @param {any[]} urls
   */
  protected navigate(urls: any[]): void {
    this.router.navigate(urls);
  }

  /**
   * Gets the notification module.
   *
   * @returns {NotificationModule}
   */
  get notification() {
    return this.notificationModule;
  }

}
