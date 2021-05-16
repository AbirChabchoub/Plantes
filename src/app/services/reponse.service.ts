import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
responseUrl='http://localhost:3001/response'
  constructor(private httpClient:HttpClient) { }

  addResponse(response: any) {
		return this.httpClient.post<{ message: string }>(this.responseUrl, response);
	}

getResponseByCommentId(id:any){
  return this.httpClient.get<{response:any}>(`${this.responseUrl}/${id}`)
}
getAllResponses(){
  return this.httpClient.get<{responses:any}>(this.responseUrl);
}

}
