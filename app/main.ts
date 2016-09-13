import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { setStatusBarColors } from "./utils/status-bar-util";

import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";

setStatusBarColors();

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformNativeScriptDynamic().bootstrapModule(AppModule);
