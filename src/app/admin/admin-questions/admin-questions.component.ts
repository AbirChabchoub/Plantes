import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss']
})
export class AdminQuestionsComponent implements OnInit {
questions:any;
  constructor(private forumService:ForumService) { }

  ngOnInit() {
    this.getAllQuestions();
  }

getAllQuestions(){
  this.forumService.getAllQuestions().subscribe(
    (data)=>{
      this.questions=data.questions
      console.log(this.questions);
      
    });
}

deleteQuestionByAdmin(id:any){
  this.forumService.deleteQuestion(id).subscribe(
    ()=>{
      console.log('question deleted successfully by admin');
      this.getAllQuestions()
    });
}



}
