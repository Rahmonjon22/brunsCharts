import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.scss']
})
export class StatsCardsComponent implements OnInit {

  constructor() { }
  @Input() BgColor: string='';
  @Input() Topic: string='';
  @Input() Icon: string='';
  @Input() Count: string='';
  bgColor: string = '';
  topic: string = '';
  icon: string = '';
  count: number = 0;
  ngOnInit(): void {
  }
  ngOnChanges() {
    this.bgColor = this.BgColor;
    this.topic = this.Topic;
    this.icon = this.Icon;
  }
}
