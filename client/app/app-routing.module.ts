import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';
import { VacancyEditorComponent } from "./vacancy-editor/vacancy-editor.component";

const appRoutes:Routes = [
    { 
        path: '',
        component: VacancyDashboardComponent
        //loadChildren: './vacancy-dashboard/vacancy-dashboard.module#VacancyDashboardModule' 
    },
    {
        path: 'vacancy',
        component: VacancyEditorComponent
    },
    {
        path: 'vacancy/:id',
        component: VacancyEditorComponent
    },
    { path: '**', redirectTo: '/', pathMatch:'full'}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}