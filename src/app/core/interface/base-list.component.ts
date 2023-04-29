import { Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogDeleteComponent } from '../components/dialog-delete/dialog-delete.component';
import { BaseModelComponent } from './base-model.component';

/**
 * The 'BaseListComponent' provides the common API for all list components.
 *
 * Service, operations, searches, navigations are all available.
 *
 * All edit components MUST extend this class.
 *
 * @extends BaseModelComponent
 *
 * @property {DeleteConfirmationComponent}  deleteConfirmation  - component to confirm the remove operation.
 * @property {any}                          items               - items to list.
 * @property {any}                          removeId            - controls the ID to be removed.
 */
@Injectable()
export abstract class BaseListComponent extends BaseModelComponent implements OnInit {

  /**
   * Items to list.
   *
   * @type {Array}
   */
  protected items: any = [];

  protected columns: any = [];

  //@ts-ignore
  protected displayedColumns: string[];

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  //@ts-ignore
  dataSource: any;

  loading = false;

  /**
   * Total pages of items.
   *
   * @type {number}
   */
  protected totalPages = 1;

  /**
   * Current page of pagination.
   *
   * @type {number}
   */
  protected currentPage = 1;

  /**
   * Current column of ordering.
   *
   * @type {String}
   */
  protected currentColumn: String = '';

  /**
   * Current sort of ordering.
   *
   * @type {String}
   */
  protected currentSort: String = '';

  /**
   * Current text of search.
   *
   * @type {String}
   */
  protected currentSearch: String = '';

  /**
   * Current number of paginate.
   *
   * @type {number}
   */
  protected currentPageSize = 10;

  /**
   * Current object of filter.
   *
   * @type {String}
   */
  protected currentFilter: any = {};

  /**
   * Constructor.
   */
  constructor(public dialog: MatDialog) {
    super();
  }

  /**
   * On Init of the component.
   *
   * List all items by default.
   */
  override ngOnInit(): void {
    super.ngOnInit();

    this.listItems();
  }

  /**
   * Gets all items and fills the list.
   */
  listItems(): void {
    this.loading = true;
    this.service.search(this.getServiceURL(), this.getPaginationParams(), this.currentFilter).subscribe((result: { totalPages: number; items: any; columns: any; }) => {
      this.totalPages = result.totalPages;
      this.items = result.items;
      this.columns = result.columns;

      this.postResult();
      this.loading = false;
    },
      (error: any) => {
        // this.errorOnListItems(error);
        this.notification.error(error.error ? error.error.message : error.message);
        this.loading = false;
      });
  }

  /**
     * Executes after the result of list items.
     */
  protected postResult(): void {

  }

  /**
   * Executes when anything error on list items.
   */
  //@ts-ignore
  protected errorOnListItems(error): void {

  }

  /**
   * Goes to the add component.
   */
  add(): void {
    this.goToCreate();
  }

  /**
   * Goes to the edit component.
   *
   * @param {any} id
   */
  //@ts-ignore
  edit(id): void {
    this.goToEdit(id);
  }

  /**
   * Goes to the view component.
   *
   * @param {any} id
   */
  //@ts-ignore
  view(id): void {
    this.goToView(id);
  }

  //@ts-ignore
  delete(id): void {
    // this.openDialog(id);
    this.goToDelete(id);
  }


  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAction(result);
      }
    });
  }
  /**
   * Calls the service to delete the item.
   *
   * Notifies by 'toast' at the end: Success or Error.
   *
   * Finally, refreshes the list of items.
   */
  //@ts-ignore
  deleteAction(id): void {
    this.loading = true;
    this.service.remove(this.getServiceURL(), id).subscribe(
      result => {
        this.postDelete();
        this.notification.deleteSuccess();
        this.loading = false;
      },
      error => {
        this.notification.error(error.error ? error.error.message : error.message);
        this.loading = false;
      },
      () => {
        this.listItems();
      }
    );
  }

  /**
   * Goes to the edit component.
   *
   * @param {any} id
   */
  goToEdit(id = null): void {
    this.navigate([this.getRouterURL(), 'edit', id ? id : '']);
  }

  goToDelete(id = null): void {
    this.navigate([this.getRouterURL(), 'delete', id ? id : '']);
  }

  /**
   * Goes to the create component.
   */
  goToCreate(): void {
    this.navigate([this.getRouterURL(), 'create']);
  }

  /**
   * Goes to the view component.
   *
   * @param {any} id
   */
  //@ts-ignore
  goToView(id): void {
    this.navigate([this.getRouterURL(), id]);
  }

  /**
   * Executes post successful delete.
   */
  protected postDelete(): void {

  }

  /**
   * When the page of pagination changes, executes
   * this method.
   *
   * @param {number} page
   */
  onChangePage(page: number): void {
    this.currentPage = page;

    this.listItems();
  }

  /**
   * When key search field, executes
   * this method.
   */
  onSearch(event: { search: String; filter: any; }): void {
    const newSearch = event.search;
    this.currentFilter = event.filter;
    if (newSearch !== this.currentSearch) {
      this.currentPage = 1;
    }
    this.currentSearch = event.search;
    this.listItems();
  }

  /**
   * When the ordering changes, executes
   * this method.
   *
   * @param {column: String, sort: String} ordering
   */
  onChangeSort(ordering: { column: String, sort: String }): void {
    this.currentColumn = ordering.column;
    this.currentSort = ordering.sort;
    this.listItems();
  }

  /**
   * Set the size of the page.
   *
   * @param {size: number}
   */
  public setPageSize(size: number) {
    this.currentPageSize = size;
    this.listItems();
  }

  /**
   * Gets the parameters for pagination.
   *
   * @returns {Object}
   */
  protected getPaginationParams() {
    return {
      currentPage: this.currentPage,
      pageSize: this.currentPageSize,
      column: this.currentColumn,
      sort: this.currentSort,
      search: this.currentSearch
    };
  }



}

