import { Component, OnInit } from "@angular/core";
import { ChecklistService } from "../../service/checklist.service";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"],
})
export class ChecklistComponent implements OnInit {
  activities: any[] = [];

  constructor(private checklistService: ChecklistService) {}

  ngOnInit() {
    this.activities = this.checklistService.activities;
  }

  markCompleted(activity: any) {
    activity.completed = true;
  }
}
