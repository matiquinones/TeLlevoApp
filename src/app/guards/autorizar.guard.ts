import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutorizarGuard implements CanActivate {

  constructor(private storage:Storage, private router:Router,private authSvc: FirestoreService, )
  {

  }

  async autorizar()
  {
    let usr=await this.storage.get('sesion');
    if (usr!=null)
    {
      return true;
      
    }else{
      this.router.navigate(['/login']);
    }
    return false;
  }


  canActivatee(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.autorizar();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => {
        console.log('User->', user)
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  
    }}
