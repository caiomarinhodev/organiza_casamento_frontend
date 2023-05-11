import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { BaseListComponent } from "src/app/core/interface/base-list.component";

@Component({
  selector: "app-list-artifacts",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListArtifactsComponent
  extends BaseListComponent
  implements OnInit
{
  //@ts-ignore
  displayedColumns: string[];

  source: Element[] = [];

  //@ts-ignore
  dataSource = new MatTableDataSource<Element>(this.source);

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private translate: TranslateService,
    private viewRef: ViewContainerRef,
    public override dialog: MatDialog
  ) {
    super(dialog);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getColumns() {
    return ["id", "public_id", "name", "link_url", "actions"];
  }

  override listItems(): void {
    this.loading = true;
    this.currentFilter.noivo_id = this.service.getUser().data_user.id;
    this.service
      .search(
        this.getServiceURL(),
        this.getPaginationParams(),
        this.currentFilter
      )
      .subscribe((result: any) => {
        console.log(result);
        this.dataSource.data = result;
        this.displayedColumns = this.getColumns();
        this.columns = this.getColumns();
        this.items = result;
        this.totalPages = result.length / this.currentPageSize;
        this.postResult();
        this.loading = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getServiceURL(): string {
    return "artifacts";
  }
  getRouterURL(): string {
    return "artifacts";
  }
}

export interface Element {
  id: number;
  name: string;
  public_id: string;
  description: string;
  link_url: string;
  created_at: string;
  owner: number;
  event: number;
}
