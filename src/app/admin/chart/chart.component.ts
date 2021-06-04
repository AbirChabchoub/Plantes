import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { UsersService } from '../../services/users.service';
import { Chart } from '../../admin/model/chart';
import { AdminUsersService } from '../Admin-services/admin-users.service';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from '../Admin-services/add-catogory.service';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    users: any
    currentDate = new Date()
    chartData: Chart[] = [];
    ads:any
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top'
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                }
            }
        }
    };
    public pieChartLabels: Label[] = [];
    public pieChartData: number[] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [];

    constructor(private adsService: AdsService, private categoryService: AddCatogoryService,
         private adminUserService: AdminUsersService) { }

    ngOnInit() {
        this.getChartData();
        this.adminUserService.getAllUsers().subscribe((data) => {
            console.log('here users', data.users.length);
            this.users = data.users.length
        });
        this.adsService.getAllAds().subscribe((data)=>{
            console.log('here ads',data.ads.length);
            this.ads=data.ads.length
            
        })
    }
    getChartData() {
        this.categoryService.getAllCategories().subscribe((data) => {
            this.adsService.getAllAds().subscribe(
                (res) => {
                    console.log('here res chart', res.ads);
                    this.chartData = res.ads;
                    this.pieChartLabels = [];
                    this.pieChartData = [];
                    this.pieChartColors = [];
                    const backgrounds = [];
                    var C = []
                    for (let i = 0; i < data.category.length; i++) {
                        var S = 0;
                        for (let j = 0; j < res.ads.length; j++) {
                            if (res.ads[j].category == data.category[i].categoryName) {
                                S = S + 1
                            }
                        }
                        C[i] = S

                        this.pieChartLabels.push(data.category[i].categoryName);
                        this.pieChartData.push(C[i]);
                        backgrounds.push(`rgba(${255 + i * 10}, ${200 - i * 20}, ${100 + i * 10}, 0.3)`);
                    }
                    console.log('here c', C);




                    console.log('final array', this.pieChartLabels);
                    console.log('final array', this.pieChartData);

                    this.pieChartColors = [
                        {
                            backgroundColor: backgrounds
                        }
                    ];
                },
                (err) => {
                    console.log(err);
                }
            );
        })

    }
}

