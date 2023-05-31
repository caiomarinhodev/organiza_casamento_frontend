import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { BaseListComponent } from "src/app/core/interface/base-list.component";

@Component({
  selector: "app-list-ideas",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListIdeasComponent extends BaseListComponent implements OnInit {
  event_id: number | undefined;

  showNewIdeaForm: boolean = false;
  newIdea: Idea = { title: "", description: "" };

  override ngOnInit() {
    this.event_id = this.service.getUser().event;
    console.log("event_id: " + this.event_id);
    this.listItems();
    console.log("[ListIdeasComponent] ngOnInit()", this.items);
  }

  override listItems(): void {
    this.loading = true;
    this.service.search(this.getServiceURL(), this.getPaginationParams(), this.currentFilter).subscribe((result: { totalPages: number; items: any; columns: any; }) => {
      this.items = result;

      this.postResult();
      this.loading = false;
    },
      (error: any) => {
        this.notification.error(error.error ? error.error.message : error.message);
        this.loading = false;
      });
  }

  addIdea(): void {
    this.showNewIdeaForm = true;
  }

  saveNewIdea(): void {
    if (this.newIdea.title && this.newIdea.description) {
      this.newIdea.event = this.event_id;
      this.service.insert("ideas", this.newIdea).subscribe(
        (result) => {
          this.notification.insertSuccess();
          this.newIdea = { title: "", description: "" };
          this.showNewIdeaForm = false;
          this.listItems();
        },
        (error) => {
          if (error.status !== 0) {
            this.notification.error(
              error.error ? error.error.message : error.message
            );
          }
        }
      );
    }
  }

  cancelNewIdea(): void {
    this.showNewIdeaForm = false;
    this.newIdea = { title: "", description: "" };
  }

  removeIdea(idea: any): void {
    if (confirm("Tem certeza de que deseja remover esta ideia?")) {
      this.service.remove("ideas", idea.id).subscribe(
        (result) => {
          this.notification.deleteSuccess();
          this.listItems();
        },
        (error) => {
          this.notification.error(
            error.error ? error.error.message : error.message
          );
        }
      );
    }
  }

  getServiceURL(): string {
    return "events/" + this.event_id + "/ideas";
  }

  getRouterURL(): string {
    return "ideas";
  }
}

export interface Idea {
  id?: number;
  title: string;
  description: string;
  event?: number;
}
