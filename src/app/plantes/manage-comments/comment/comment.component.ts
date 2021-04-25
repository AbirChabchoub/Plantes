import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: [ './comment.component.scss' ]
})
export class CommentComponent implements OnInit {
	userIsAuthenticated = false;
	private authListenerSubs: Subscription;
	@Input() commentsInput: any;
	@Input() isResponseDisabled: any;
	actualDate: any;
	showVar: boolean = true;
	constructor(private authService: UsersService, private router: Router) {}

	ngOnInit() {
		this.userIsAuthenticated = this.authService.isUserAuth();
		this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
			this.userIsAuthenticated = isAuthenticated;
		});
	}
	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
	toggleChild() {
		this.showVar = !this.showVar;
	}
}
