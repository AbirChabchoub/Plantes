import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../../../../backend/models/user';

@Component({
	selector: 'app-comment-form',
	templateUrl: './comment-form.component.html',
	styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
	userIsAuthenticated: User;
	private authListenerSubs: Subscription;
	commentForm: FormGroup;
	comment: any = {};
	id: any;

	constructor(
		private formBuilder: FormBuilder,
		private commentService: CommentsService,
		private authService: UsersService,
		private route: Router // private ActivatedRoute: ActivatedRoute // private router: Router,
	) { }

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.userIsAuthenticated = x));
		this.commentForm = this.formBuilder.group({
			message: ['']
		});
		this.id = JSON.parse(localStorage.getItem('connectedUser'));
	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}

	// addComment() {
	// 	this.authService.getConnectedUser(this.id).subscribe(
	// 		(data) => {
	// 			this.comment.adId = JSON.parse(localStorage.getItem('prToReserve'));
	// 			this.comment.commentUserId = this.id;
	// 			this.comment.firstName =data.users.firstName;
	// 			this.comment.lastName=data.users.lastName;
	// 			this.comment.image=data.users.image;
	// 			this.comment.date=new Date().getDate().toString() + '-' +(new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
	// 			this.commentService.addComment(this.comment).subscribe(() => {
	// 				console.log('added succesfully');
	// 			});
	// 		});


	// }

	addComment() {
		var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
		if (isConnectedUser == null) {
		  this.route.navigate(['login']);
	
		} else {
			this.authService.getConnectedUser(this.id).subscribe(
				(data) => {
					this.comment.adId = JSON.parse(localStorage.getItem('prToReserve'));
					this.comment.commentUserId = this.id;
					this.comment.firstName =data.users.firstName;
					this.comment.lastName=data.users.lastName;
					this.comment.image=data.users.image;
					this.comment.date=new Date().getDate().toString() + '-' +(new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
					this.commentService.addComment(this.comment).subscribe(() => {
						console.log('added succesfully');
					});
				});
		}
	  }
	




}
