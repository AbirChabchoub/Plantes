import { Injectable, Output ,EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApexEventServiceService {

  @Output() changeTimeRange: EventEmitter<boolean> = new EventEmitter();
	@Output() changeSeriesData: EventEmitter<boolean> = new EventEmitter();

	constructor() {}

	eventChangeTimeRange() {
		this.changeTimeRange.emit();
	}

	eventChangeSeriesData() {
		this.changeSeriesData.emit();
	}
}
