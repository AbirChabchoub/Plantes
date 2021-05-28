import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable , of} from 'rxjs';
import { Admin } from '../../../../backend/models/admin';
import { Router } from '@angular/router';
import { Chart } from '../../admin/model/chart' ; 
import{catchError,tap,map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  adminUrl = 'http://localhost:3001/admin';
  private currentUserSubject: BehaviorSubject<Admin>;
  public currentUser: Observable<Admin>;
  
  private handleError < T >( operation = 'operation' , result ?: T ) {
    return ( error : any ): Observable < T > => {
    console . error ( error );
    return of ( result as T );
    };
    } 

  constructor(private httpClient: HttpClient,
    private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('connectedAdmin')));
		this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): Admin {
		return this.currentUserSubject.value;
	}

  signupAdmin(admin:any){
    // localStorage.setItem('connectedAdmin', JSON.stringify(admin.id));
    return this.httpClient.post<{message:String}>(`${this.adminUrl}/signup`,admin);
  
  }


login(admin: any) {
  return this.httpClient.post<{ admin: any }>(`${this.adminUrl}/login`, admin).subscribe((res) => {
    console.log(res);
    localStorage.setItem('connectedAdmin', JSON.stringify(res.admin.id));
    localStorage.setItem('adminFullName', JSON.stringify(res.admin.fullName));
    // localStorage.setItem('adminImage', JSON.stringify(res.admin.image));

    let connectedUserId = JSON.parse(localStorage.getItem('connectedAdmin'));
    this.router.navigate([ `dashboard` ]); 
    this.currentUserSubject.next(admin);
    return admin;
  });
}

logout() {
  localStorage.removeItem('connectedAdmin');
  localStorage.removeItem('adminFullName');
  this.currentUserSubject.next(null);
  this.router.navigate([ 'loginAdmin' ]);
}
  getAllUsers() {
    //Action:get , address:api/users
    return this.httpClient.get<{ users: any }>(this.adminUrl);
  }
  addUser(user: any) {
    //Action : Post , address:api/users
    return this.httpClient.post<{ message: string }>(this.adminUrl, user);
  }

  deleteUser(id: any) {
    //Action: delete , address:api/users
    //3malneh fi back tick 5ater mech yeta9ra keyenou string
    return this.httpClient.delete<{ message: string }>(`${this.adminUrl}/${id}`); 
  }

  getAdminById(id: any) {
    return this.httpClient.get<{ admin: any }>(`${this.adminUrl}/${id}`);
  }
  //update user
  updateUser(user: any) {
    return this.httpClient.put<{ message: string }>(`${this.adminUrl}/user/${user._id}`, user);
  }


  getChart (): Observable < Chart > {
    const url = ` ${this . adminUrl } ` ;
    return this . httpClient
    . get < Chart >( url )
    . pipe ( tap (( _ ) => console . log ( `fetched chart data` )),
   catchError ( this . handleError < Chart >( `getChart data` )));
    }
   
   getUserByIdFromAdmin(id:any){
    return this.httpClient.get<{ user: any }>(`${this.adminUrl}/user/${id}`);
   }


   updateProfil(admin: any , image:File) {
		const formdata = new FormData();
		formdata.append('fullName', admin.fullName);
		formdata.append('adminEmail', admin.adminEmail);
		formdata.append('adminPassword', admin.adminPassword);
		formdata.append('adminConfirmPassword', admin.adminConfirmPassword);		
		formdata.append('image', image);

		return this.httpClient.put<{ message: string }>(`${this.adminUrl}/${admin._id}`,formdata);
	}


}
