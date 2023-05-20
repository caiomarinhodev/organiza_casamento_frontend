import { Component, Input, OnInit } from "@angular/core";
import { ChecklistService } from "../../service/checklist.service";
import { CrudService } from "../../service/crud.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationModule } from "../../module/notification/notification.module";
import { AppInjector } from "src/app/app.injector";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"],
})
export class ChecklistComponent implements OnInit {
  tasks: any[] = [];

  loading = false;

  @Input() event_id: any;

  protected notificationModule: NotificationModule =
    AppInjector.get(NotificationModule);

  constructor(
    private service: CrudService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.getTasks();
    console.log("[checklist] event", this.event_id);
  }

  markCompleted(task: any) {
    this.loading = true;
    if (task.is_completed) {
      this.service
        .put("tasks/" + task.id + "/", {
          is_completed: false,
          title: task.title,
        })
        .subscribe(
          (result: any) => {
            this.loading = false;
            this.notificationModule.successText(
              "Tarefa desmarcada com sucesso!"
            );
            this.getTasks();
          },
          (error: string) => {
            this.loading = false;
            this.notificationModule.error(error);
          }
        );
      return;
    }
    this.service
      .put("tasks/" + task.id + "/", { is_completed: true, title: task.title })
      .subscribe(
        (result: any) => {
          this.loading = false;
          this.notificationModule.successText("Tarefa concluída com sucesso!");
          this.getTasks();
        },
        (error: string) => {
          this.loading = false;
          this.notificationModule.error(error);
        }
      );
  }

  getTasks(): void {
    this.loading = true;
    this.service.getURL("event/" + this.event_id + "/tasks").subscribe(
      (result: any) => {
        console.log("[checklist] tasks", result);
        this.loading = false;
        this.tasks = result;
      },
      (error: string) => {
        this.loading = false;
        this.notificationModule.error(error);
      }
    );
  }
}
