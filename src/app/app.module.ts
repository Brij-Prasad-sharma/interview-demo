import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { MainService } from './services/main.service';
import { FindByKeyValuePipe } from './pipes/find-by-key-value/find-by-key-value.pipe';
import {Route, RouterModule} from '@angular/router';

const routes: Route[] = [
  {
    path: 'result',
    loadChildren: () => import('./components/result-system-module/result-system.module').then(m => m.ResultSystemModule)
  }
];

@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        DetailPanelComponent,
        FindByKeyValuePipe,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
    providers: [MainService],
    bootstrap: [AppComponent]
})
export class AppModule { }
