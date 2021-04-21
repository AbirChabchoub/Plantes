import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NextConfig } from 'src/services/app-config';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent implements OnInit {
	public windowWidth: number;
	public nextConfig: any;
	@Output() onNavMobCollapse = new EventEmitter();
	constructor() {
		this.nextConfig = NextConfig.config;
		this.windowWidth = window.innerWidth;
	}

	ngOnInit() {}
	navMobCollapse() {
		if (this.windowWidth < 992) {
			this.onNavMobCollapse.emit();
		}
	}
}
