import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NouisliderModule } from 'ng2-nouislider';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';
import { VacancyEditorComponent } from "./vacancy-editor/vacancy-editor.component";
import { ValueLargerThanDirective } from './directives/value-larger-than.directive';
import { ValueSmallerThanDirective } from './directives/value-smaller-than.directive';

// initialise connection to graphql server
const graphqlClient = new ApolloClient();

export function provideClient(): ApolloClient {
  return graphqlClient;
}

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
    AppRoutingModule,
    ApolloModule.forRoot(provideClient),
    NgbModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
    NouisliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
