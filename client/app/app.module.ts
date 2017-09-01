import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';
import { VacancyEditorComponent } from "./vacancy-editor/vacancy-editor.component";

@NgModule({
  declarations: [
    AppComponent,
    VacancyDashboardComponent,
    VacancyEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
