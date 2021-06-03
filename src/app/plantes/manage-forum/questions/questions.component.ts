import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: any;

  constructor(private forumService: ForumService,
 private route:Router ) { }

  ngOnInit() {


    this.getAllQuestions();
  }

  getAllQuestions() {
    this.forumService.getAllQuestions().subscribe(
      (data) => {
        this.questions = data.questions
      });
  }


  verifConnectedUser() {
    var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (isConnectedUser=="null") {
      this.route.navigate(['signup']);

    } else {
      this.route.navigate(['ads']);
    }
  }

}
