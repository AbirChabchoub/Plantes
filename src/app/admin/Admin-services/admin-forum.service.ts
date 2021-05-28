import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminForumService {
  adminForumUrl="http://localhost:3001/adminBlog"

  constructor(private httpClient:HttpClient) { }

  
}
