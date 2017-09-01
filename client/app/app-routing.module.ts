import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';

const appRoutes:Routes = [
    { 
      path: '',
      component: VacancyDashboardComponent
      //loadChildren: './vacancy-dashboard/vacancy-dashboard.module#VacancyDashboardModule' 
    },
    { path: '**', redirectTo: '/', pathMatch:'full'}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}