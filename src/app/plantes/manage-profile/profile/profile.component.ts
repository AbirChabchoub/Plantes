import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private usersService:UsersService) { }
id:any;
user:any= {};
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getConnectedUser(this.id).subscribe(
      (data) => {
        this.user = data.users
      }
    )
  }


goToEditProfile(){
  let connectedUserId=JSON.parse(localStorage.getItem('connectedUser'));
  this.router.navigate([`editProfile/${connectedUserId}`]);
}


goToAdForm(){
  this.router.navigate(['adForm']);

}



}
