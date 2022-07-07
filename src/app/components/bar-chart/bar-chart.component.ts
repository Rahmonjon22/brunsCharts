import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() {
    // this.chart = this.chart;



  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true; public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40,25], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90,20], label: 'Series B' },
    { data: [28, 48, 40, 19, 86, 27, 90,22], label: 'Series C' }
  ];

  ngOnInit(): void {

  }
}
