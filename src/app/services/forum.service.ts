import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private httpClient:HttpClient) { }
  forumUrl = 'http://localhost:3001/forum';

  addQuestion(question:any){
    return this.httpClient.post<{message:String}>(this.forumUrl,question);
  }

getAllQuestions(){
  return this.httpClient.get<{questions:any}>(this.forumUrl);
}

getQuestionsByUserId(id:any){
  return this.httpClient.get<{question:any}>(`${this.forumUrl}/${id}`);
}

deleteQuestion(id:any){
  return this.httpClient.delete<{message:string}>(`${this.forumUrl}/${id}`);
}

}
