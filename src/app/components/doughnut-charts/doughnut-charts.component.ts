import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { BaseDataService } from 'src/app/base-data.service';
import { Complaint } from 'src/app/models/complains';

@Component({
  selector: 'app-doughnut-charts',
  templateUrl: './doughnut-charts.component.html',
  styleUrls: ['./doughnut-charts.component.scss']
})
export class DoughnutChartsComponent implements OnInit {
complaints:Complaint[]=[];
rate:string='abcd';
// private baseDataService:BaseDataService for constructor
  constructor() { }
  public doughnutChartOptions = {
    legend: {display : false},responsive: true,
    maintainAspectRatio: false
  };
  doughnutChartLabels: Label[] = ['Minden', 'Lübbecke', 'Bad Oeynhausen'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
  ngOnInit(): void {
    //this.getData()
  }

// getData(){
//   this.baseDataService.makeGetCall('complaints').subscribe((complaints)=>{
//   this.complaints=complaints;
//   })
// }
// this is to call api postman 
  
}
