import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartsComponent } from './components/doughnut-charts/doughnut-charts.component';
import { ScssCardsComponent } from './components/scss-cards/scss-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    StatsCardsComponent,
    BarChartComponent,
    DoughnutChartsComponent,
    ScssCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
