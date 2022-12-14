import { FirestoreService } from './../../servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  nombre:String='';
  constructor(private storage:Storage,private router:Router, private firestore: FirestoreService) {}

  ngOnInit(){
      this.vernombre();
  }
  async cerrar()
  {
    await this.storage.set('sesion',null);


  }

  async vernombre()
  {
    this.nombre=await this.storage.get('sesion');
  }
  
  getClientes(){
    this.firestore.getCollection()
  }
}
