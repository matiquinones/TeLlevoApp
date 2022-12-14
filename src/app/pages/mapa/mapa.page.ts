import { Viaje } from './../../interfaces/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
import { AlertController, ToastController } from '@ionic/angular';
import { CrudService } from './../../servicios/crud.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  


  viajes:Viaje [] = [];
  pasajeros: number = 0;
  
  constructor(private crud: CrudService, private toast:ToastController, public alertController: AlertController,
    public FirestoreService: FirestoreService) { }

  ngOnInit() { 
    this.getViajes();
  }


  async agregarViaje(){
    this.pasajeros++;
    if(this.pasajeros > 4)
    {this.presentAlert(); }
    
    let alerta = await this.alertController.create({

      header: "Viaje reservado ✔️",
      buttons: [{
        text: "Aceptar",

      }
    ]
      
    });
    await alerta.present();
    console.log("viaje agregauw");

  }
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    subHeader: 'Important message',
    message: 'This is an alert!',
    buttons: ['OK'],
  });
}
  getViajes(){
    const enlace = 'Viajes'
    this.FirestoreService.getCollectionChanges<Viaje>(enlace).subscribe( res => {
      this.viajes = res;

    });
  } 
  


/*
  async agregar(txtRut:HTMLInputElement, txtNombre:HTMLInputElement, txtFono:HTMLInputElement, txtPartida:HTMLInputElement,
    txtDestino:HTMLInputElement, txtValor:HTMLInputElement, txtHora:HTMLInputElement,txtPasajeros:HTMLInputElement){

    if(txtRut.value.trim().length==0){
      const toast = await this.toast.create({
        message: 'La patente no fue especificada',
        duration: 2000,
        color: "danger",
        position:"middle"
     });
      toast.present();
      
    }

    else if(txtNombre.value.trim().length==0){
        const toast = await this.toast.create({
          message: 'El conductor no fue especificado',
          duration: 2000,
          color: "danger",
          position:"middle"
       });
        toast.present();
    }

    else if(txtFono.value.trim().length==0){
      const toast = await this.toast.create({
        message: 'El fono no fue especificado',
        duration: 2000,
        color: "danger",
        position:"middle"
     });
      toast.present();
    }
    else{

    



    const datos = [{
      "rut": txtRut.value,
      "nombre": txtNombre.value,
      "fono": txtFono.value,
      "partida": txtPartida.value,
      "destino": txtDestino.value,
      "valor": txtValor.value,
      "hora": txtHora.value,
      "pasajeros":txtPasajeros.value,
  }];

  await this.crud.agregar(datos);
  const toast = await this.toast.create({
    message: 'Los datos fueron guardados',
    duration: 2000,
    color: "success",
    position:"middle"
 });
  toast.present(); 
  txtRut.value = "";
  txtNombre.value = "";
  txtFono.value = "";
  txtPartida.value="";
  txtDestino.value="";
  txtValor.value="";
  txtHora.value="";
  txtPasajeros.value="";

}
  
  this.nombre = "";

  }

  async buscar(txtRut:HTMLInputElement){
   const valor = await this.crud.rescatar(txtRut.value); 

   if (valor != null){
    this.rut= valor[0].rut;
    this.nombre = valor[0].nombre;
    this.fono = valor[0].fono;
    this.partida = valor[0].partida;


    txtRut.value="";
    this.listado = [];
   }
   
   else{
      this.nombre ="";
      this.fono ="";
      this.partida="";
    const toast = await this.toast.create({
      message: 'El Rut no fue encontrado',
      duration: 2000,
      color: "danger",
      position:"middle"
   });
    toast.present();
   }
  }

  async eliminar(){    
    
    let rutEliminar = this.rut;
    if (rutEliminar.trim().length == 0)
    {
  const toast = await this.toast.create({
    message: 'El Rut no fue especificado',
    duration: 2000,
    color: "danger",
    position:"middle"
 });
  toast.present();
}
else{
  const valor = await this.crud.rescatar(rutEliminar); 
if (valor == null)
    {

  const toast = await this.toast.create({
    message: 'El Rut ' + rutEliminar + ' no fue encontrado',
    duration: 2000,
    color: "danger",
    position:"middle"
 });
  toast.present();
}
else{
  await this.crud.eliminar(rutEliminar)
  const toast = await this.toast.create({
    message: 'El Rut' + rutEliminar + ' fue eliminado',
    duration: 2000,
    color: "danger",
    position:"middle"
 });
  toast.present();
 }
}


  
this.nombre ="";
this.fono ="";


 }

 async listar(){
  this.nombre= "";
  this.fono= "";
  this.rut= "";
  this.partida="";
  this.destino="";  
  this.valor="";
  this.hora="";
  this.pasajeros=0;
  this.listado = this.crud.listar();
 }*/




}
