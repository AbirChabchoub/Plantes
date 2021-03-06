import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
	PERFECT_SCROLLBAR_CONFIG,
	PerfectScrollbarConfigInterface,
	PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

@NgModule({
	imports: [ CommonModule, PerfectScrollbarModule, ClickOutsideModule ],
	exports: [ CommonModule, PerfectScrollbarModule, ClickOutsideModule ],
	declarations: [],
	providers: [
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	]
})
export class SharedModule {}
