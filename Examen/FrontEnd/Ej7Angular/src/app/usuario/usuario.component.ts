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
  nuevoUsuario={};
  usuarios=[];
  borracheras=[];

  disabledButtons = {
    NuevatiendaFormSubmitButton: false
  }


  constructor(private _activatedRoute: ActivatedRoute, private _http:Http, private _masterURL:MasterUrlService) {

  }

  ngOnInit() {
    this._activatedRoute
      .params
      .subscribe(parametros=>{
        this._parametros = parametros;

        this._http.get(this._masterURL.url + "Usuario").subscribe(
        // this._http.get(this._masterURL.url+'Usuario?idBorrachera='+this._parametros.idBorrachera).subscribe(
          (res:Response)=>{
            this.usuarios = res.json().map((value)=>{
              value.formularioCerrado = true;
              return value;
            });;
          },
          (err)=>{
            console.log(err);
          }
        )

        this._http.get(this._masterURL.url + "Borrachera").subscribe(
          (res: Response) => {
            this.borracheras = res.json()
              .map((value)=>{
                value.idformularioCerrado = true;
                return value;
              });
          },
          (err) => {
            console.log(err);
          }
        )


      })
  }

  crearUsuario(formulario: NgForm){
    let usuario = {
      nombre:formulario.value.nombre,
      ciudadResidencia:formulario.value.ciudadResidencia,
      fechaNacimiento:formulario.value.fechaNacimiento,
      idBorrachera:formulario.value.idBorrachera
    }
    this._http.post(this._masterURL.url+'Usuario', this.nuevoUsuario).subscribe(
      (res:Response)=>{
        this.usuarios.push(res.json());
        this.nuevoUsuario={};
        this.disabledButtons.NuevatiendaFormSubmitButton = false;
      },
      (err)=>{
        console.log(err)
        this.disabledButtons.NuevatiendaFormSubmitButton = false;
      }
    )
  }

  borrarUsuario(id:number) {

    this._http.delete(this._masterURL.url + "Usuario/" + id).subscribe(
      (res) => {
        let usuarioBorrado=res.json();
        this.usuarios = this.usuarios.filter(value=>usuarioBorrado.id!=value.id)
      },
      (err) => {
        console.log(err);
      }
    )
  }

  actualizarUsuario(usuario:any){
    let parametros={
      nombre: usuario.nombre,
      ciudadResidencia: usuario.ciudadResidencia,
      fechaNacimiento: usuario.fechaNacimiento
    };
    this._http.put(this._masterURL.url+"Usuario/"+usuario.id,parametros).subscribe(
      (res:Response)=>{
        usuario.formularioCerrado = !usuario.formularioCerrado;
        console.log("Respuesta: ",res.json());
      },
      (err)=>{
        console.log("Error: ",err)
      }
    )
  }


}
