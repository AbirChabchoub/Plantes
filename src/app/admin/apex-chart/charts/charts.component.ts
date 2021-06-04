import { Component, OnInit, Input } from '@angular/core';
import { ApexEventServiceService } from '../../Admin-services/apex-event-service.service';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() chartID: string;
	@Input() chartConfig: any;
	@Input() xAxis: any;
	@Input() newData: any;
  public chart: any;
	constructor(private apexEvent: ApexEventServiceService) {}

	ngOnInit() {
		setTimeout(() => {
			this.chart = new ApexCharts(document.querySelector('#' + this.chartID), this.chartConfig);
			this.chart.render();
		});

		this.apexEvent.changeTimeRange.subscribe(() => {
			if (this.xAxis) {
				this.chart.updateOptions({
					xaxis: this.xAxis
				});
			}
		});

		this.apexEvent.changeSeriesData.subscribe(() => {
			if (this.newData) {
				this.chart.updateSeries([
					{
						data: this.newData
					}
				]);
			}
		});
	}

}
