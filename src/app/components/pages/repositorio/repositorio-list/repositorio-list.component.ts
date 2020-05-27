import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { RepositorioService } from 'src/app/services/repositorio.service';
import { ActivatedRoute } from '@angular/router';
import { Repositorio } from 'src/app/models/repositorio';


@Component({
  selector: 'app-repositorio-list',
  templateUrl: './repositorio-list.component.html',
  styleUrls: ['./repositorio-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RepositorioListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';
  columnsToDisplay: string[] = ['id', 'titulo', 'area', 'tipo'];
  //columnsToDisplay2: string[] = ['id', 'TÍTULO', 'ÁREA', 'TIPO'];
  //dataSource:any;
  dataSource = new MatTableDataSource([]);
  expandedElement: any | null;
  objPalabras: any = {};

  tipoArchivo: string;
  video:any = ['mp4', 'wmv'];
  leccion:any = ['txt', 'xls', 'pdf', 'docx', 'pptx'];

  repositorio: Repositorio[];
  //repositorio: Repositorio;

  constructor(
    private repoSvc: RepositorioService,
    private router: ActivatedRoute
  ) { 
    this.router.params.subscribe((params:any) => {
      if(!!params){
        this.tipoArchivo = params.tipo;
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    var data:any;
    if(this.tipoArchivo == 'all'){ this.tipoArchivo = '';}

    /*
    this.repoSvc.getRepo(this.tipoArchivo).subscribe((result: any) => {
      var arrResult = [];
      
      result.forEach((element:any) => {
        this.objPalabras = {};
        
        this.objPalabras = element;
        let palabrasArray = element.palabras.split(',');  
        Object.assign(this.objPalabras, {palabrasArray});
        
        arrResult.push(this.objPalabras);
      });

      data = arrResult;
      
      this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
    })
    */

    //this.saveRepositorio();
    this.getRepositorios();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onValue(){
    this.value = '';
    this.dataSource.filter = '';
  }

  /*
  saveRepositorio(){
    this.repoSvc.selectRepo = new Repositorio();

    this.repositorio = {
      id: 'aaa',
      titulo: 'aaa',
      area: 'aaa',
      tipo: 'aaa',
      palabras: 'aaa',
      autor: 'aaa',
      fecha: 'aaa',
      url: 'aaa',
      descripcion: 'aaa'
    }

    this.repoSvc.save(this.repositorio);
  }
  */

  getRepositorios() {
    //this.repoSvc.get();
      
    this.repoSvc.get()
      .snapshotChanges()
      .subscribe((result: any) => {
        console.log(result);
        if(!!result){
          this.repositorio = [];
          result.forEach((element:any) => {
            let x = element.payload.toJSON();
            x["id"] = element.key;

            this.repositorio.push(x as Repositorio)

            this.dataSource = new MatTableDataSource(this.repositorio);
            
          });
        }


      })
  }

}

