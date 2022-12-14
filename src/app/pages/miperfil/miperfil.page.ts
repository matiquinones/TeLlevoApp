import { Observable } from 'rxjs';
import { User } from './../../interfaces/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  user$: Observable<User> = this.firestore.afAuth.user;

 // username:string;
 // email: string;

  //nombre:String='';
  uid: string=null;
  datos: User=null;

  constructor(private storage:Storage,private router:Router, private firestore: FirestoreService, ) {}

  cerrarSesion(){
    //this.cerrar();
    this.router.navigate(['/login']);

  }

     async ngOnInit(){
      //this.vernombre();
      console.log('estoy en mi perfil');
    this.uid = await this.firestore.getUid();
    console.log('uid -> ', this.uid)
    this.getInfoUser();
  }
  
  
/*
  async cerrar()
  {
    await this.storage.set('sesion',null);
  }

  async vernombre()
  {
    this.nombre=await this.storage.get('sesion');
  }*/
  getEmail()
  {
 const path = 'User';
 const id= this.uid
 this.firestore.getDoc<User>(path, id).subscribe(res => {
  if (res) {
    this.datos = res;
  }
    console.log('datos son ->', res)
})
}
getInfoUser() {
  const path = 'Usuarios';
  const id = this.uid;
  this.firestore.getDoc<User>(path, id).subscribe(res => {
    if (res) {
      this.datos = res;
    }
      console.log('datos son ->', res)
  })
}

  }





