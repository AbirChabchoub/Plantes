// import { Component, OnInit } from '@angular/core';
// import { ChartType, ChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { UsersService } from '../../services/users.service';
// import { Chart } from '../../admin/model/chart';
// import { AdminUsersService } from '../Admin-services/admin-users.service';

// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.scss']
// })
// export class ChartComponent implements OnInit {
//   chartData: Chart[] = [];
//   public pieChartOptions: ChartOptions = {
//     responsive: true,
//     legend: {
//       position: 'top'
//     },
//     plugins: {
//       datalabels: {
//         formatter: (value, ctx) => {
//           const label = ctx.chart.data.labels[ctx.dataIndex];
//           return label;
//         }
//       }
//     }
//   };
//   public pieChartLabels: Label[] = [];
//   public pieChartData: number[] = [];
//   public pieChartType: ChartType = 'pie';
//   public pieChartLegend = true;
//   public pieChartPlugins = [pluginDataLabels];
//   public pieChartColors = [];
//   constructor(private adminService:AdminUsersService) { }

//   ngOnInit() {
//     this.getChartData();
//   }
//   getChartData() {
//     this.adminService.getChart().subscribe(
//       (res: any) => {
//         console.log('here res chart', res);
//         this.chartData = res.user;
//         this.pieChartLabels = [];
//         this.pieChartData = [];
//         this.pieChartColors = [];
//         const backgrounds = [];
//         this.chartData.forEach((ch, idx) => {
//           this.pieChartLabels.push(ch.firstName);
//           this.pieChartData.push(ch.scoreOne);
//           backgrounds.push(`rgba( ${0 + idx * 10} , ${255 - idx
//             * 20} , ${0 + idx * 10} , 0.3)`);
//         });
//         console.log('final array',this.pieChartLabels);
//         console.log('final array',this.pieChartData);
//         this.pieChartColors = [
//           {
//             backgroundColor: backgrounds
//           }
//         ];
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   }
// }

