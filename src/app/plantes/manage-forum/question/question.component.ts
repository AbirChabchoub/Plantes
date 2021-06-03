import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() questionsInput: any;
  id: any;
  user: any
  constructor(private usersService: UsersService,
   ) { }

  ngOnInit() {
    this.id= JSON.parse(localStorage.getItem('connectedUser'))
    this.usersService.getConnectedUser(this.id).subscribe(
      (data) => {
        this.user = data.users;
      });
  }


 


}
