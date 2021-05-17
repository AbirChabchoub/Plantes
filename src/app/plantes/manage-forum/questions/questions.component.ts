import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
questions:any;

  constructor(private forumService:ForumService,
   ) { }

  ngOnInit() {
   

this.getAllQuestions();
  }

getAllQuestions(){
  this.forumService.getAllQuestions().subscribe(
    (data)=>{
      this.questions=data.questions
    }
  )
}




}
