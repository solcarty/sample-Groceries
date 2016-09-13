import { Routes } from "@angular/router";

import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";

export const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent }
];