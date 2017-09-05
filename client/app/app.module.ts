import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';
import { VacancyEditorComponent } from "./vacancy-editor/vacancy-editor.component";
import { ValueLargerThanDirective } from './directives/value-larger-than.directive';
import { ValueSmallerThanDirective } from './directives/value-smaller-than.directive';

@NgModule({
  declarations: [
    AppComponent,
    VacancyDashboardComponent,
    VacancyEditorComponent,
    ValueLargerThanDirective,
    ValueSmallerThanDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
