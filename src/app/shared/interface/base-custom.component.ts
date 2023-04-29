import { OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BaseComponent } from 'src/app/core/interface/base.component';

/**
 * The 'BaseComponent' class provides the common API for all the components
 * in the system.
 *
 * Operations like notification, navigation and other are already implemented.
 *
 * All components MUST extend this class.
 */
export abstract class BaseCustomComponent extends BaseComponent implements OnInit {

  navigationExtras: NavigationExtras = {};

  constructor() {
    super();
  }

  getNavigationExtras(): NavigationExtras {
    return this.navigationExtras;
  }


}
