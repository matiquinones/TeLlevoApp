import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private authSvc: FirestoreService, private router: Router, public AlertController: AlertController) { }

  ngOnInit() {
  }

  
async onResetPassword(email) {
  try {
    await this.authSvc.resetPassword(email.value);
    this.router.navigate(['/login']);
  } catch (error) {
    console.log('Error->', error);
    let alerta = await this.AlertController.create({

      header: "No reconocemos los datos ingresados, intente nuevamente",
      buttons: [{
        text: "Aceptar",

      }
    ]
      
    });
    await alerta.present();

  }
  }
}



