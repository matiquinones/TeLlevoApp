import { Viaje } from './../../interfaces/usuario';
import { FirestoreService } from './../../servicios/firestore.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { CrudService } from './../../servicios/crud.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-manejar2',
  templateUrl: './manejar2.page.html',
  styleUrls: ['./manejar2.page.scss'],
})
export class Manejar2Page implements OnInit {
  nombre= "";
  fono= "";
  rut= "";
  partida= "";
  destino="";
  valor="";
  hora="";
  listado= [];
  capacidad=0;

  newViaje: Viaje = {
    rut:'',
    nombre:'',
    fono: '',
    partida: '',
    destino: '',
    valor: '',
    hora: '',
    id: '',
  }
   loading: any;


  constructor(private crud: CrudService, public ToastController:ToastController, public firebase:FirestoreService, public database: FirestoreService,
    public loadingController: LoadingController) { }

  ngOnInit() { 
  }

 /* async agregar(txtRut:HTMLInputElement, txtNombre:HTMLInputElement, txtFono:HTMLInputElement, txtPartida:HTMLInputElement,
    txtDestino:HTMLInputElement, txtValor:HTMLInputElement, txtHora:HTMLInputElement){

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
      "hora": txtHora.value
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


 }*/

 async listar(){
  this.nombre= "";
  this.fono= "";
  this.rut= "";
  this.partida="";
  this.destino="";  
  this.valor="";
  this.hora="";
  this.listado = this.crud.listar();
 }

 async save(){
    this.presentLoading();
    console.log('esto vamos a guardar: ', this.newViaje);
    const data = this.newViaje;
    data.id = this.firebase.creatId();
    const enlace = 'Viajes';
    await this.database.createViaje<Viaje>(data, enlace, data.id);
    this.presentToast('Viaje publicado con exito!', 2000)
    this.loading.dismiss();
    this.newViaje = {
      rut:'',
      nombre:'',
      fono: '',
      partida: '',
      destino: '',
      valor: '',
      hora: '',
      id: '',
    }
    
 }

 async presentToast (mensaje: string, tiempo: number) {
 const toast = await this.ToastController.create({message: mensaje, duration: tiempo})
toast.present();
};


async presentLoading(){
this.loading= await this.loadingController.create({
  message:'Publicando viaje...',
});
await this.loading.present();
}
 
}
