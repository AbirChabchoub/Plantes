import { Component, OnInit } from '@angular/core';
import { AdminBlogService } from 'src/app/admin/Admin-services/admin-blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs:any;
  constructor(private blogService:AdminBlogService) { }

  ngOnInit() {
    this.blogService.getAllArticlesInBlog().subscribe(
      (data)=>{
     this.blogs=data.blog
      });
  }

}
