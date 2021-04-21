import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
comments:any
  constructor(private commentService:CommentsService) { }

  ngOnInit() {
    
      this.commentService.getAllComments().subscribe(
        (data)=>{
          console.log('here comments', data.comments);
          
          this.comments=data.comments;
        });
    
  }


}
