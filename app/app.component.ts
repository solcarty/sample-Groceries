import {Component} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";

import {LoginComponent} from "./pages/login/login.component";
import {ListComponent} from "./pages/list/list.component";

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>",
  directives: [NS_ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/Login", name: "Login", component: LoginComponent, useAsDefault: true },
  { path: "/List", name: "List", component: ListComponent }
])
export class AppComponent {}