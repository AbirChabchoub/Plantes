import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient:HttpClient) { }
  commentsUrl="http://localhost:3001/comments";
 
  
    addComment(comment: any) {
      
      return this.httpClient.post<{ message: string }>(this.commentsUrl, comment);
    }
  
    getAllComments(){
      return this.httpClient.get<{comments:any}>(this.commentsUrl);
    }
  


    
}
