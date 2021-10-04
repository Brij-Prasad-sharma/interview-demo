import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result/result.component';
import { LeagueTableComponent } from './league-table/league-table.component';
import {Route, RouterModule} from '@angular/router';
import { ResultLandingComponent } from './result-landing/result-landing.component';
import { ResultFormComponent } from './result-form/result-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared-module/shared.module';
import {FilterByDatePipe} from './pipes/order-by/filter-by-date.pipe';

const routes: Route[] = [
  {
    path: '',
    component: ResultLandingComponent,
    children: [

      {
        path: '',
        component: ResultComponent
      },

      {
        path: 'form',
        component: ResultFormComponent
      },

      {
        path: 'edit/:id',
        component: ResultFormComponent
      },

      {
        path: 'league-table',
        component: LeagueTableComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ResultComponent,
    LeagueTableComponent,
    ResultLandingComponent,
    ResultFormComponent,
    FilterByDatePipe
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ResultSystemModule { }
