import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import * as moment from 'moment';
import { Label, MultiDataSet } from 'ng2-charts';
import { BaseDataService } from 'src/app/shared/services/base-data.service';
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
  selectDate: any;

  constructor(private baseDataService: BaseDataService) {  }
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels = ['Minden', 'Lübbecke', 'Bad Oeynhausen'];
  public barChartType: ChartType = 'pie';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Minden' },
    { data: [], label: 'Lübbecke' },
    { data: [], label: 'Bad Oeynhausen' }
  ];

  ngOnInit(): void {
    this.getData()
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
          element.full_date = moment(element.claim_date * 1000)
        }
        this.generateChart()
      }

      // console.log(this.complaints);

    })
  }

  onDateChange(event: any) {
    this.selectDate = event.target.value;
    this.filterDate(this.selectDate);
  }
  generateChart() {
    const Minden = [];
    let mindenTotal = 0;
    let lubbeckeTotal = 0;
    let badOeynhausenTotal = 0;
    for (let i = 0; i < this.complaints.length; i++) {
      const element = this.complaints[i];

      if (element.product == '1') {
        mindenTotal += parseInt(element.reason);
      } else if (element.product == '2') {
        lubbeckeTotal += parseInt(element.reason);
      } else {
        badOeynhausenTotal += parseInt(element.reason);
      }
    }
    const result: number[] = [mindenTotal, lubbeckeTotal, badOeynhausenTotal];

    this.barChartData = [
      {
        label: "Overall complaints",
        data: result as any
      }
    ]
  }
  filterDate(date: any) {
    console.log(this.complaints);

    this.complaints = this.complaints.filter(x => x.full_date.format('YYYY-MM-DD') == date)
    this.generateChart()

  }
}
