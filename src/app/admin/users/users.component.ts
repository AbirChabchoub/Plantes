import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminUsersService } from '../Admin-services/admin-users.service';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Toaster, ToastType } from 'ngx-toast-notifications';
export interface User {
  firstName: String,
    lastName: String,
    email: String,
    tel: String,
    address:String,
    pwd:String,
    confirmPwd:String,
    role:String,
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = [ 'id', 'name', 'progress', 'color' ];
	dataSource;
	user;

	users: User[];

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort: MatSort;

	private types: Array<ToastType> = ['success'];
  private text = ' √ Utilisateur est supprimé';
  constructor(private userService: AdminUsersService,
    private router: Router,
    private adminService: AdminUsersService,
    private toaster: Toaster) { }

  ngOnInit() {
    // this.getAllusers();
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.users;
			this.dataSource = new MatTableDataSource(data.users);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		});


  }
  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log('user deleted successfully', data.message)
        this.getAllusers();

      });
      this.showToast();
  }

  getAllusers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log('here data', data);

        this.users = data.users
      });
  }
  updateUser(id: any) {
    this.userService.updateUser(id).subscribe(
      () => {
        console.log('user updated');

      }
    )
  }


  goToEditProfile(id: any) {
    // localStorage.setItem('userToEdit', JSON.stringify(id));
    this.router.navigate([`editUser/${id}`]);
  }
  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }
  showToast() {
    const type = this.randomType;
    this.toaster.open({
     
      caption: this.text,
      type: type,
    });
  }

}
