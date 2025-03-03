import { Routes } from '@angular/router';
import { NgGdComponentComponent } from "./ng-gd-component/ng-gd-component.component";
import { CandleChartComponent } from "./candle-chart/candle-chart.component";
export const routes: Routes = [{ path: 'ng-gd', component: NgGdComponentComponent }, { path: 'candle-chart', component: CandleChartComponent }];
