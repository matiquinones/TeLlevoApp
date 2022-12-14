import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario:Usuario={
    username:'',
    password:'',
    
  };
  loading: any;


  constructor(private storage:Storage,private router:Router, public firebase: FirestoreService, afAuth: AuthService, public loadingController: LoadingController, public AlertController: AlertController ) { }


  ngOnInit() {}

  async onRegister(email, password) {
    try {

    
      const user = await this.firebase.register(email.value, password.value);
      if (user) {
        const isVerified = this.firebase.isEmailVerified(user);
        this.redirectUser(isVerified);
      }}
     catch (error) {
      console.log('Error', error);
     }}
  

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }

  async presentLoading(){
    this.loading= await this.loadingController.create({
      message:'Registrando usuario',
    });
    await this.loading.present();
    }
}