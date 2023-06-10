import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API_URL = "http://localhost:8080/api/";
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    public httpClient: HttpClient,
  ) { 
   
  }

 
  getFruitList() {
    return this.httpClient.get(API_URL + 'food/getAllFoods'  )
  }

  getFruitDetail(id: any) {
    return this.httpClient.get(API_URL + 'food/getById/' + id)
  }

  searchFruitList(name : string){
    return this.httpClient.get(API_URL + 'food/getByName/' + name)
  }
  
}


