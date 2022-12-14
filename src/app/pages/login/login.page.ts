import { ToastController, AlertController } from '@ionic/angular';
import { FirestoreService } from './../../servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario={
    username:'',
    password:''
  };

  user={
    uid: '',
    email: '',
    displayName:'' ,
    emailVerified: '',
  };

  constructor(private storage:Storage, private router:Router, private firestore: FirestoreService, public ToastController: ToastController, public AlertController: AlertController) { }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log("Login");
    this.validarusuario();
  }

  async validarusuario()
  {
    let usr= await this.storage.get(this.usuario.username);
    if(usr!=null)
    {
      console.log(usr);
      this.storage.set('sesion',this.usuario.username);
      this.router.navigate(['/home']);
    }
    else{
      console.log("Usuario inexistente o credenciales invalidas");
      this.presentToast('Usuario inexistente o credenciales invalidas', 2000);
      this.usuario = {
        username:'',
        password:'',

    }
  }
  }


    


 async presentToast (mensaje: string, tiempo: number) {
 const toast = await this.ToastController.create({message: mensaje, duration: tiempo})
 toast.present();
};

async onLogin(email, password) {
  try {
    const user = await this.firestore.login(email.value, password.value);
    if (user) {
      const isVerified = this.firestore.isEmailVerified(user);
      console.log('verified->', isVerified);
      this.redirectUser(isVerified);    

    }
  } catch (error) { 
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
    async presentAlert1 () {
      const alert = await this.AlertController.create({
        header: "Cuenta invalida",
        message: 'Las credenciales ingresadas no son correctas',
        buttons: ["OK"],
      })
  await alert.present()
let result = await alert.onDidDismiss();
console.log(result)     };

private redirectUser(isVerified: boolean): void {
  if (isVerified) {
    this.router.navigate(['/home']);
  } else {
    this.router.navigate(['/home']);
  }
}





}
