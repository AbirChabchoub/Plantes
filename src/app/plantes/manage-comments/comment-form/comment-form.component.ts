import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  commentForm:FormGroup;
  comment:any={}
  constructor(private formBuilder:FormBuilder,private commentService:CommentsService) { }

  ngOnInit() {
this.commentForm=this.formBuilder.group({
  message:['']

})


  }


  addComment(){
    this.comment.commentUserId = JSON.parse(localStorage.getItem('connectedUser'));
    console.log('here connected User in add comment' , this.comment.commentUserId);
    this.commentService.addComment(this.comment).subscribe(

      () => {
        console.log("added succesfully");
        
      });
  }


}
