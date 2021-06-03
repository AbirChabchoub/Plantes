import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from 'src/app/services/users.service';
import { User } from '../../../../../backend/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit  ,OnDestroy{
	userIsAuthenticated: User;
	public authListenerSubs: Subscription;
	@Input() commentsInput: any;
	@Input() responseInput: any;
	@Input() isResponseDisabled: any;
	showMePartially: boolean = false;
	response: any = {};
	responseForm: FormGroup;
	id: any;
	idComment: any
	constructor(private authService: UsersService,
		private router: Router,
		private formBuilder: FormBuilder,
		private responseService: ReponseService) { }

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.userIsAuthenticated = x));
		this.responseForm = this.formBuilder.group({
			response: ['']
		});
		this.id = JSON.parse(localStorage.getItem('connectedUser'));

	}
	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
	toggleChild() {
		this.showMePartially = !this.showMePartially;
	}

	// addResponseBycommentId(id: any) {

	// 	this.authService.getConnectedUser(this.id).subscribe(
	// 		(data) => {
	// 			this.response.commentId = id;
	// 			this.response.responseUserId = this.id;
	// 			this.response.firstName = data.users.firstName;
	// 			this.response.lastName = data.users.lastName;
	// 			this.response.date = new Date().getDate().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
	// 			this.responseService.addResponse(this.response).subscribe(
	// 				() => {
	// 					console.log('response is added succesfully', this.response);

	// 				}
	// 			)
	// 		});
	// }



}
