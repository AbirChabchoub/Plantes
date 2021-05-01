import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../../../../backend/models/user';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: [ './comment.component.scss' ]
})
export class CommentComponent implements OnInit {
	userIsAuthenticated: User;
	private authListenerSubs: Subscription;
	@Input() commentsInput: any;
	@Input() isResponseDisabled: any;
	actualDate: any;
	showVar: boolean = true;
	constructor(private authService: UsersService, private router: Router) {}

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.userIsAuthenticated = x));
	}
	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
	toggleChild() {
		this.showVar = !this.showVar;
	}
}
