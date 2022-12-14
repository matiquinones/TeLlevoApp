import { AlertController } from '@ionic/angular';
import { User } from './../interfaces/usuario';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  public user$: Observable<User>;

  

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public AlertController: AlertController) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

  }

/*  createDoc(data: any, path: string, id: string) {
    
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
}*/

createDocument<tipo>(data: tipo, enlace: string) {
  const itemsCollection: AngularFirestoreCollection<tipo> =
  this.firestore.collection<tipo>(enlace);
  return itemsCollection.add(data);
}

createViaje<tipo>(data: tipo, enlace: string, id: string) {
  const ref = this.firestore.collection<tipo>(enlace);
  return ref.doc(id).set(data);
}


  creatDoc(){
    this.firestore.collection('Clientes')
  }

 creatId(){
    return this.firestore.createId();
  }


  getCollection(){
    
    console.log('estoy por leer una coleccion');
    this.firestore.collection('Clientes').valueChanges().subscribe( (res) => {
      console.log('res ->', res);
  });
}

getCollectionChanges<tipo>(enlace:string) {
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.valueChanges();
};

getDoc<tipo>(path: string, id:string ) {
  return this.firestore.collection(path).doc<tipo>(id).valueChanges()
}



async resetPassword(email: string): Promise<void> {
try {
  return this.afAuth.sendPasswordResetEmail(email);
} catch (error) {
  console.log('Error->', error);
}
}



async register(email: string, password: string): Promise<User> {
try {
  const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
  await this.sendVerifcationEmail();
  return user;
} catch (error) {
  console.log('Error->', error);
  let alerta = await this.AlertController.create({

    header: "No pudimos procesar los datos ingresados, intente nuevamente",
    buttons: [{
      text: "Ok",

    }
  ]
});
await alerta.present();




  
}
}

async login(email: string, password: string): Promise<User> {
try {
  const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
  this.updateUserData(user);
  return user;
} catch (error) {
  console.log('Error->', error);
  let alerta = await this.AlertController.create({

    header: "Las credenciales ingresadas no son correctas",
    buttons: [{
      text: "Ok",

    }
  ]
});
await alerta.present();


}
}

async sendVerifcationEmail(): Promise<void> {
try {
  return (await this.afAuth.currentUser).sendEmailVerification();
} catch (error) {
  console.log('Error->', error);

}
}

isEmailVerified(user: User): boolean {
return user.emailVerified === true ? true : false;
}

async logout(): Promise<void> {
try {
  await this.afAuth.signOut();
} catch (error) {
  console.log('Error->', error);
}
}

private updateUserData(user: User) {
const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

const data: User = {
  uid: user.uid,
  email: user.email,
  emailVerified: user.emailVerified,
  displayName: user.displayName,
};



return userRef.set(data, { merge: true });


}

async getUid() {
  const user = await this.afAuth.currentUser;
  return user.uid;
  }

}
