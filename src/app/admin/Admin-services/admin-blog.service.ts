import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminBlogService {
blogUrl="http://localhost:3001/adminBlog"
  constructor(private httpClient:HttpClient) { }



addBlog(blog: any, image: File) {
  const formData = new FormData();
  formData.append('title', blog.title);
  formData.append('article', blog.article); 
  formData.append('image', image);
  return this.httpClient.post<{ message: string }>(this.blogUrl, formData);
}

getAllArticlesInBlog(){
  return this.httpClient.get<{blog:any}>(this.blogUrl);
}

}
