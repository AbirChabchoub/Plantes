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
	styleUrls: [ './comment-form.component.scss' ]
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
		private router: Router // private ActivatedRoute: ActivatedRoute // private router: Router,
	) {}

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.userIsAuthenticated = x));
		// this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
		this.commentForm = this.formBuilder.group({
			message: [ '' ]
		});
	}
	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}

	addComment() {
		this.comment.prId = JSON.parse(localStorage.getItem('prToReserve'));
		this.comment.commentUserId = JSON.parse(localStorage.getItem('connectedUser'));
		console.log('here connected User in add comment', this.comment.commentUserId);
		this.commentService.addComment(this.comment).subscribe(() => {
			console.log('added succesfully');
		});
		// this.router.navigate([ `product-details/${this.id}` ]);
	}
}
