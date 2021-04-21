import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  userUrl = 'http://localhost:3001/adminUsers'
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    //Action:get , address:api/useres
    return this.httpClient.get<{ users: any }>(this.userUrl);
  }
  addUser(user: any) {
    //Action : Post , address:api/useres
    return this.httpClient.post<{ message: string }>(this.userUrl, user);
  }

  deleteUser(id: any) {
    //Action: delete , address:api/useres
    //3malneh fi back tick 5ater mech yeta9ra keyenou string
    return this.httpClient.delete<{ message: string }>(`${this.userUrl}/${id}`);
    
  }

  getUserById(id: any) {
    return this.httpClient.get<{ user: any }>(`${this.userUrl}/${id}`);
  }
  //récupérer tous le user
  updateUser(user: any) {
    return this.httpClient.put<{ message: string }>(`${this.userUrl}/${user.id}`, user);
  }

}
