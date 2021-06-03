import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ForumService } from 'src/app/services/forum.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.scss']
})
export class ForumFormComponent implements OnInit {
  forumForm:FormGroup;
  question:any={};
  id:any;
  constructor(private formBuilder:FormBuilder,
    private forumService:ForumService,
    private usersService:UsersService ,
    private route:Router ) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('connectedUser'));

    this.forumForm = this.formBuilder.group({
			question: ['']
		});
  }




// addQuestion() {
//   this.usersService.getConnectedUser(this.id).subscribe(
//     (data) => {
//       this.question.adId = JSON.parse(localStorage.getItem('prToReserve'));
//       this.question.commentUserId = this.id;
//       this.question.firstName =data.users.firstName;
//       this.question.lastName=data.users.lastName;
//       this.question.image=data.users.image;
//       this.question.date=new Date().getDate().toString() + '-' +(new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
//       this.forumService.addQuestion(this.question).subscribe(
//         ()=>{
//           console.log('question is added successfully');
          
//         }
//       )
       
//     });
//   }


addQuestion() {
    var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (isConnectedUser == null) {
      this.route.navigate(['login']);

    } else {
      this.usersService.getConnectedUser(this.id).subscribe(
        (data) => {
          this.question.adId = JSON.parse(localStorage.getItem('prToReserve'));
          this.question.commentUserId = this.id;
          this.question.firstName =data.users.firstName;
          this.question.lastName=data.users.lastName;
          this.question.image=data.users.image;
          this.question.date=new Date().getDate().toString() + '-' +(new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
          this.forumService.addQuestion(this.question).subscribe(
            ()=>{
              console.log('question is added successfully');
              
            }
          )
           
        });
    }
  }







}
