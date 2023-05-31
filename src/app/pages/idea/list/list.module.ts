import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

import { NgxLoadingModule } from "ngx-loading";

import { RouterModule } from "@angular/router";
import { ToolbarModule } from "src/app/core/components/toolbar/toolbar.module";
import { UserService } from "src/app/service/user/user.service";
import { AngularMaterialModule } from "src/app/shared/interface/angular-material.module";
import { ListIdeasComponent } from "./list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ListIdeasComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    NgxLoadingModule.forRoot({
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#0082f0",
      secondaryColour: "#0082f0",
      tertiaryColour: "#0082f0",
    }),
    RouterModule,
    ToolbarModule,
    AngularMaterialModule,
  ],
  providers: [UserService],
})
export class ListIdeasModule {}
