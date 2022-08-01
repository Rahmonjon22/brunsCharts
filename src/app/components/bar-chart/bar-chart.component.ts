import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseDataService } from 'src/app/shared/services/base-data.service';
import { Complaint } from 'src/app/models/complains';
import { UtilService } from 'src/app/shared/services/util.service';



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  complaints: Complaint[] = [];
  filtered_complaints: Complaint[] = [];
  rate: string = 'abcd';
  start_date: any;
  end_date: any;
  selectDate: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  constructor(private baseDataService: BaseDataService, private utilService: UtilService) {  }
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  // "line" | "bar" | "horizontalBar" | "radar" | "doughnut" | "polarArea" | "bubble" | "pie" | "scatter"
  public barChartLabels = ['Minden', 'Lübbecke', 'Bad Oeynhausen'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Minden' },
    { data: [], label: 'Lübbecke' },
    { data: [], label: 'Bad Oeynhausen' }
  ];

  ngOnInit(): void {
    this.getData()
  }
  onSubmit(){
    this.onDateChange
  }

  getData() {
    this.start_date = moment().subtract(1, 'days');
    this.end_date = moment();
    this.baseDataService.makeGetCall('complaints').subscribe((complaints) => {
      this.complaints = complaints;

      if (this.complaints.length > 0) {
        this.utilService.completeProductName(this.complaints);
        this.generateChart()
      }

      // console.log(this.complaints);

    })
  }

  // private completeProductName() {
  //   for (let i = 0; i < this.complaints.length; i++) {
  //     const element = this.complaints[i];

  //     if (element.product == '1') {
  //       element.product_name = 'Minden';
  //     } else if (element.product == '2') {
  //       element.product_name = 'Lübbecke';
  //     } else {
  //       element.product_name = "Bad Oeynhausen";
  //     }
  //     element.full_date = moment(element.claim_date * 1000);
  //   }
// ComplaintDto
// ComplaintVo extends ComplaintDto (view model)

  // }

  onDateChange(event: any) {
    this.selectDate = event.target.value;
    this.filterDate(this.selectDate);
  }

  generateChart() {
    const Minden = [];
    let mindenTotal = 0;
    let lubbeckeTotal = 0;
    let badOeynhausenTotal = 0;
    for (let i = 0; i < this.filtered_complaints.length; i++) {
      const element = this.filtered_complaints[i];

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
        label: "select specific date",
        data: result as any
      }
    ]
  }

  private filterDate(dateStartString: any, dateEndString?: any) {
    console.log(this.complaints);

    if(!dateEndString){
      this.filtered_complaints = this.complaints.filter(x => x.full_date.format('YYYY-MM-DD') == dateStartString)
    }else{
      this.filtered_complaints = this.complaints.filter(x => {
        const startDate = new Date(dateStartString);
        const endDate = new Date(dateEndString);
        const complaintDate = new Date(x.full_date);

        if(complaintDate >= startDate && complaintDate <= endDate){
          return true;
        }else {
          return false;
        }
      });
    }
    
  }

  dateRangeChanged(startInput: HTMLInputElement, endInput: HTMLInputElement){
    const start = startInput.value;
    const end = endInput.value;

    this.filterDate(start,end);
    this.generateChart()
  }
  
}
