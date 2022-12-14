import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'

//importar en el service al Storagl de angular

@Injectable({
  providedIn: 'root'
})
export class CrudService {

constructor(private storage: Storage){
  this.init();


}
//Crear el storage

async init(){

  await this.storage.create();
}

async agregarConKey(key: string, valor: string){

  await this.storage.set(key, valor);
}


async agregar(valor:any){

  let id = await this.storage.length() + 1;
  await this.storage.set(id.toString(),valor);

}

async rescatar(key:string){
return await this.storage.get(key);
}


listar(){
  let listado = []
  this.storage.forEach((v,k) => {listado.push(v); })
  return listado;
}



eliminar(key:string){
this.storage.remove(key);
}



}







  /*constructor(private storage: Storage) { 
    //crear al storage para usarlo
    this.init();
  }
  //crear el storage
  async init()
  {
    await this.storage.create();
  }

  //ingresar datos al storage
  async agregarConKey(key: string, valor: string)
  {
    await this.storage.set(key, valor);

  }
  //ingresar datoss al storage key autoincrementable autoincrementable opcional forma
  async agregar(valor:any)
  {
    let id = await this.storage.length() + 1 ;
    await this.storage.set(id.toString(), valor);
  }
  async rescatar(key:string)
  {
    return await this.storage.get(key);
  }
  listar()
  {
    let listado = []
    this.storage.forEach((v,k) => {listado.push(v);})

  }
  eliminar (key:string)
  {// ojo como se agrega cada elemento via autoincrementable o por otro codigo
    this.storage.remove(key);
  }
}*/





