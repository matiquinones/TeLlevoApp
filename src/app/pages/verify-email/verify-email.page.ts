import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { User } from './../../interfaces/usuario';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from './../../servicios/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {
  user$: Observable<User> = this.authSvc.afAuth.user;
  constructor(private authSvc: FirestoreService, public AlertController: AlertController) {}

  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
      let alerta = await this.AlertController.create({

        header: "Datos ingresados incorrectamente",
        buttons: [{
          text: "Aceptar",
  
        }
      ]
    });
    await alerta.present();
  
  }
      
    }
  

  ngOnDestroy(): void {
    this.authSvc.logout();
  }
}