import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: UsersService,private router:Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.isUserAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }


  goToProfile(){
    let connectedUserId=JSON.parse(localStorage.getItem('connectedUser'));
    this.router.navigate([`profile/${connectedUserId}`]);
  }

}
