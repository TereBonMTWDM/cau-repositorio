import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService {
  repoJson = '../../assets/json/repo.json';

  constructor(
    private http: HttpClient
  ) { }


  getRepo(tipo:string) {
    return this.http.get(this.repoJson);
  }
}
