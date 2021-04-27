import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsService } from 'src/app/services/ads.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: [ './comments.component.scss' ]
})
export class CommentsComponent implements OnInit {
	comments: any;
	ad: any;
	id: any;
	constructor(
		private commentService: CommentsService,
		private adsService: AdsService,
		private activateRouter: ActivatedRoute
	) {}

	ngOnInit() {
		this.id = this.activateRouter.snapshot.paramMap.get('id');
		this.getAllAds();

		this.getCommentById();
	}
	getAllAds() {
		this.adsService.getAdById(this.id).subscribe((data) => {
			this.ad = data.ad;
		});
	}
	getCommentById() {
		this.commentService.getCommentsById(this.id).subscribe((data) => {
			this.comments = data.comments;
		});
	}
}
