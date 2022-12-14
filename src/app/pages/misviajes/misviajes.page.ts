import { Viaje } from './../../interfaces/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misviajes',
  templateUrl: './misviajes.page.html',
  styleUrls: ['./misviajes.page.scss'],
})
export class MisviajesPage implements OnInit {
  
  viajes:Viaje [] = [];

  constructor(public FirestoreService: FirestoreService) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes(){
    const enlace = 'Viajes'
    this.FirestoreService.getCollectionChanges<Viaje>(enlace).subscribe( res => {
      this.viajes = res;

    });
  }

}



