import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Repositorio } from '../models/repositorio';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService {
  repoJson = '../../assets/json/repo.json';
  repoList: AngularFireList<any>;
  selectRepo: Repositorio = new Repositorio();


  constructor(
    private http: HttpClient,
    private fireSvc: AngularFireDatabase
  ) { }


  getRepo(tipo:string) {
    return this.http.get(this.repoJson);
  } 


  get(){
    //this.repoList = this.fireSvc.list('cau-repositorio');

    //console.log(this.repoList);
    return this.repoList = this.fireSvc.list('repositorios');
    //return this.repoList = this.fireSvc.list('cau-repositorio');
    // this.fireSvc.list('cau-repositorio').snapshotChanges().subscribe((result: any) => {
    //   console.log(result);
    // });
  }

  save(repo: Repositorio) {
    console.log(repo);
    
    this.repoList.push({
      titulo: repo.titulo,
      area: repo.area,
      tipo: repo.tipo,
      palabras: repo.palabras,
      autor: repo.autor,
      fecha: repo.fecha,
      url: repo.url,
      descripcion: repo.descripcion
    });
  }






}
