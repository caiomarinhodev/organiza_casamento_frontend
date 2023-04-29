import { Injectable, OnInit } from '@angular/core';

import { BaseModelComponent } from './base-model.component';

/**
 * The 'BaseItemComponent' class provides the common API for all the components
 * that works with items.
 *
 * All components that uses models MUST extend this class.
 *
 * @extends BaseComponent
 */
@Injectable()
export abstract class BaseItemComponent extends BaseModelComponent implements OnInit {

  /**
   * Item which is being edited or view.
   *
   * @type {any}
   */
  protected item: any = new Object();

  loading = false;

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

    this.getItem();
  }

  /**
   * Gets the item for edition if is an edit mode.
   *
   * If insert mode, by pass this.
   */
  protected getItem(): void {
    this.loading = true;
    const id = this.getParam(this.getItemIdKey());
    if (id && (id !== 'null')) {
      this.service.getOne(this.getServiceURL(), id).subscribe(result => {
        this.item = result;
        this.postGetItem();
        this.loading = false;
      }, error => {
        this.notification.error(error);
        this.loading = false;
      });
    }
  }

  /**
   * Navigates back to the list component.
   */
  protected backToList(): void {
    this.navigate([this.getRouterURL()]);
  }

  protected goToEdit(id: number): void {
    this.navigate([this.getRouterURL(), 'edit', id]);
  }

  /**
   * Executes post the execution of Get Item.
   */
  protected postGetItem(): void {

  }

  /**
   * Gets the Key of Item ID.
   *
   * @returns {string}
   */
  protected getItemIdKey(): string {
    return 'id';
  }
}
