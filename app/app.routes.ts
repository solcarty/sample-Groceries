import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {LoginComponent} from "./pages/login/login.component";
import {ListComponent} from "./pages/list/list.component";

export const routes: RouterConfig = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];