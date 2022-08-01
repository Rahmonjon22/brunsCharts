import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Complaint } from 'src/app/models/complains';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  completeProductName(complaints: Complaint[]) {
    for (let i = 0; i < complaints.length; i++) {
      const element = complaints[i];

      if (element.product == '1') {
        element.product_name = 'Minden';
      } else if (element.product == '2') {
        element.product_name = 'Lübbecke';
      } else {
        element.product_name = "Bad Oeynhausen";
      }
      element.full_date = moment(element.claim_date * 1000);
    }
  }
}
