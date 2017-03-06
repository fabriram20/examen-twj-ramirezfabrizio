import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../Services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  private _parametros:any;
  usuarios=[];
  nuevoUsuario={};

  constructor(private _activatedRoute: ActivatedRoute, private _http:Http, private _masterURL:MasterUrlService) { }

  ngOnInit() {
    this._activatedRoute
      .params
      .subscribe(parametros=>{
        this._parametros = parametros;
        this._http.get(this._masterURL.url+'Usuario?idBorrachera='+this._parametros.idBorrachera).subscribe(
          (res:Response)=>{
            this.usuarios = res.json();
          },
          (err)=>{
            console.log(err);
          }

        )
      })
  }

  crearProducto(formulario: NgForm){
    let usuario = {
      nombre:formulario.value.nombre,
      ciudadResidencia:formulario.value.ciudadResidencia,
      fechaNacimiento:formulario.value.fechaNacimiento,
      idBorrachera:this._parametros.idBorrachera
    }
    this._http.post(this._masterURL.url+'Usuario', usuario).subscribe(
      (res:Response)=>{
        this.usuarios.push(res.json());
        this.nuevoUsuario={};
      },
      (err)=>{
        console.log(err)
      }
    )
  }

}
