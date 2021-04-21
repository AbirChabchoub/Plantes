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
  comment:any
  constructor(private formBuilder:FormBuilder,private commentService:CommentsService) { }

  ngOnInit() {
this.commentForm=this.formBuilder.group({
  fullName:['', [Validators.required]],
 
  message:['']

})


  }


  addComment(comment:any){
    this.commentService.addComment(comment).subscribe(

      (data) => {
        console.log(data.message);
        
        console.log("added succesfully");
        
      });
  }


}
