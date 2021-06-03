import { Component, OnInit, Input } from '@angular/core';
import { AdminBlogService } from 'src/app/admin/Admin-services/admin-blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

@Input() blogInput:any;
  constructor() { }

  ngOnInit() {
   
  }

}
