import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomePageComponent } from "./pages/home/home.component";
import { ItemCreateComponent } from "./pages/item/item-create/item-create.component";
import { ItemDeleteComponent } from "./pages/item/item-delete/item-delete.component";
import { ItemDetailComponent } from "./pages/item/item-detail/item-detail.component";
import { ItemListComponent } from "./pages/item/item-list/item-list.component";
import { ItemUpdateComponent } from "./pages/item/item-update/item-update.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ChangePassComponent } from "./pages/reset-password/change-pass/change-pass.component";
import { ResetPassComponent } from "./pages/reset-password/reset-pass/reset-pass.component";
import { EventComponent } from "./pages/event/event.component";
import { ListGuestsComponent } from "./pages/guests/list-guests/list-guests.component";
import { AddGuestComponent } from "./pages/guests/add-guests/add.component";
import { DetailGuestComponent } from "./pages/guests/detail-guests/detail.component";
import { UpdateGuestComponent } from "./pages/guests/update-guests/update.component";
import { DeleteGuestComponent } from "./pages/guests/delete-guests/delete.component";
import { UpdateProfileComponent } from "./pages/update-profile/update.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, data: { title: "" } },
  { path: "register", component: RegisterPageComponent, data: { title: "" } },
  {
    path: "reset-password",
    component: ResetPassComponent,
    data: { title: "" },
  },
  {
    path: "change-password",
    component: ChangePassComponent,
    data: { title: "" },
  },
  {
    path: "",
    component: HomePageComponent,
    data: { title: "" },
    children: [
      {
        path: "",
        data: {},
        component: DashboardComponent,
      },
      {
        path: "event/:id",
        data: {},
        component: EventComponent,
      },
      {
        path: "profile/:id",
        data: {},
        component: UpdateProfileComponent,
      },
    ],
  },
  {
    path: "guests",
    component: HomePageComponent,
    data: { title: "" },
    children: [
      {
        path: "edit/:id",
        data: {},
        component: UpdateGuestComponent,
      },
      {
        path: "delete/:id",
        data: {},
        component: DeleteGuestComponent,
      },
      {
        path: "create",
        data: {},
        component: AddGuestComponent,
      },
      {
        path: ":id",
        data: {},
        component: DetailGuestComponent,
      },
      {
        path: "",
        data: {},
        component: ListGuestsComponent,
      },
    ],
  },

  {
    path: "item",
    component: HomePageComponent,
    data: { title: "" },
    children: [
      {
        path: "edit/:id",
        data: {},
        component: ItemUpdateComponent,
      },
      {
        path: "delete/:id",
        data: {},
        component: ItemDeleteComponent,
      },
      {
        path: "create",
        data: {},
        component: ItemCreateComponent,
      },
      {
        path: ":id",
        data: {},
        component: ItemDetailComponent,
      },
      {
        path: "",
        data: {},
        component: ItemListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
