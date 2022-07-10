import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import * as moment from 'moment';
import { Label, MultiDataSet } from 'ng2-charts';
import { BaseDataService } from 'src/app/base-data.service';
import { Complaint } from 'src/app/models/complains';

@Component({
  selector: 'app-doughnut-charts',
  templateUrl: './doughnut-charts.component.html',
  styleUrls: ['./doughnut-charts.component.scss']
})
export class DoughnutChartsComponent implements OnInit {
  complaints: Complaint[] = [];
  filtered_complaints: Complaint[] = [];
  rate: string = 'abcd';
  start_date: any;
  end_date: any;
  // private baseDataService:BaseDataService for constructor
  constructor(private baseDataService: BaseDataService) { }
  public doughnutChartOptions = {
    legend: { display: false }, responsive: true,
    maintainAspectRatio: false
  };
  doughnutChartLabels: Label[] = ['Minden', 'Lübbecke', 'Bad Oeynhausen'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
  ngOnInit(): void {
    // this.getData()
  }

  getData() {
    this.start_date = moment().subtract(7, 'days');
    this.end_date = moment();


    this.baseDataService.makeGetCall('complaints').subscribe((complaints) => {
      this.complaints = complaints;


      if (this.complaints.length > 0) {
        for (let i = 0; i < this.complaints.length; i++) {
          const element = this.complaints[i];
          if (element.product == '1') {
            element.product_name = 'Minden'
          } else if (element.product == '2') {
            element.product_name = 'Lübbecke'
          } else {
            element.product_name = "Bad Oeynhausen";
          }
        element.full_date=moment(element.claim_date * 1000)

        }
      }
      this.filtered_complaints = this.complaints.filter(x => moment(x.claim_date * 1000).isSameOrAfter(this.start_date) && moment(x.claim_date * 1000).isSameOrBefore(this.end_date));

      console.log(this.complaints.length);
      console.log(this.complaints);


      console.log(this.filtered_complaints.length);
      
    })
  }
}
