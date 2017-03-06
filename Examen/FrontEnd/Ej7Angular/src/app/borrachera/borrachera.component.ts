import { Component, OnInit } from '@angular/core';
import {MasterUrlService} from "../Services/master-url.service";
import {Http, Response} from "@angular/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-borrachera',
  templateUrl: './borrachera.component.html',
  styleUrls: ['./borrachera.component.css']
})
export class BorracheraComponent implements OnInit {

  nuevaBorrachera = {};
  borracheras = [];
  disabledButtons = {
    NuevatiendaFormSubmitButton: false
  }

  constructor(private _http: Http, private _masterURL: MasterUrlService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Borrachera").subscribe(
      (res: Response) => {
        this.borracheras = res.json()
          .map((value)=>{
            value.formularioCerrado = true;
            return value;
          });
      },
      (err) => {
        console.log(err);
      }
    )

  }

  crearTienda(formulario: NgForm) {
    this.disabledButtons.NuevatiendaFormSubmitButton = true;
    console.log(formulario);
    this._http.post(this._masterURL.url + "Borrachera", {
      motivo: formulario.value.motivo,
      latitud: formulario.value.latitud,
      longitud: formulario.value.longitud
    })
      .subscribe(
        (res) => {
          console.log('No hubo un error');
          console.log(res);
          this.borracheras.push(res.json());
          this.nuevaBorrachera = {};
          this.disabledButtons.NuevatiendaFormSubmitButton = false;
        },
        (err) => {
          console.log('Hubo un error', err);
          this.disabledButtons.NuevatiendaFormSubmitButton = false;
        },
        () => {
          console.log('Termino la funcion vamos  a las casas');
        }
      );
  }

  borrarTienda(id:number) {

    this._http.delete(this._masterURL.url + "Borrachera/" + id).subscribe(
      (res) => {
        let borracheraBorrada=res.json();
        this.borracheras = this.borracheras.filter(value=>borracheraBorrada.id!=value.id)
      },
      (err) => {
        console.log(err);
      }
    )

  }

  actualizarTienda(borrachera:any){
    let parametros={
      motivo: borrachera.value.motivo,
      latitud: borrachera.value.latitud,
      longitud: borrachera.value.longitud
    };
    this._http.put(this._masterURL.url+"Borrachera/"+borrachera.id,parametros).subscribe(
      (res:Response)=>{
        borrachera.formularioCerrado = !borrachera.formularioCerrado;
        console.log("Respuesta: ",res.json());
      },
      (err)=>{
        console.log("Error: ",err)
      }
    )
  }

}
