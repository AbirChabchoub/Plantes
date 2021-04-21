import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from '../Admin-services/admin-users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users:any;
  constructor(private userService:AdminUsersService) { }

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

}
