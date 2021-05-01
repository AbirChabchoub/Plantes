import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from '../Admin-services/admin-users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users:any;
term:any
  constructor(private userService:AdminUsersService,
  private router:Router  ) { }

  ngOnInit() {
this.getAllusers();
  

  }

deleteUser(id:any){
  this.userService.deleteUser(id).subscribe(
    (data)=>{
      console.log('user deleted successfully',data.message)
      this.getAllusers();
      
    });
}

getAllusers(){
  this.userService.getAllUsers().subscribe(
    (data)=>{
      console.log('here data',data);
      
      this.users=data.users
    });
}
updateUser(id:any){
this.userService.updateUser(id).subscribe(
  ()=>{
    console.log('user updated');
    
  }
)
}


goToEditProfile(){
  this.router.navigate(['editUser']);
}


}
