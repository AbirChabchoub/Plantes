import { Component, OnInit } from '@angular/core';
import { ApexEventServiceService } from '../Admin-services/apex-event-service.service';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from '../Admin-services/add-catogory.service';
export class ChartDB {
  public static pie2CAC = {
    chart: {
      height: 320,
      type: 'donut'
    },
    series: [ ],
    colors: ['#4680ff', '#0e9e4a', '#00acc1', '#ffa21d', '#ff5252'],
    legend: {
      show: true,
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true
            },
            value: {
              show: true
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };
}
@Component({
  selector: 'app-apex-chart',
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})
export class ApexChartComponent implements OnInit {
  public chartDB: any;
  public plantes: any;
  C=[]

  constructor(public apexEvent: ApexEventServiceService, private adsService: AdsService, private categoryService: AddCatogoryService) {
    this.chartDB = ChartDB;
  }

  ngOnInit(){}

  

}
