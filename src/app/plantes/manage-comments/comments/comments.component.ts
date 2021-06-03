import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsService } from 'src/app/services/ads.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: [ './comments.component.scss' ]
})
export class CommentsComponent implements OnInit {
	comments: any;
	ad: any;
	id: any;
	responses:any
	constructor(
		private commentService: CommentsService,
		private adsService: AdsService,
		private activateRouter: ActivatedRoute,
		private responseService:ReponseService
	) {}

	ngOnInit() {
		this.id = this.activateRouter.snapshot.paramMap.get('id');
		this.getAllAds();

		this.getAllComment();
	
	}
	getAllAds() {
		this.adsService.getAdById(this.id).subscribe((data) => {
			this.ad = data.ad;
		});
	}
	getAllComment() {
		this.commentService.getComments(this.id).subscribe(
			(data) => {
			console.log('here comments', data.comments);

			this.comments = data.comments;
		});
	}

	getAllResponses(){
this.responseService.getAllResponses().subscribe(
	(data)=>{
		this.responses=data.responses;
	});
	}
}
