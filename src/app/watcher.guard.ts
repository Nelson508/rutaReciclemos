import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class WatcherGuard implements CanActivate, CanDeactivate<unknown>, CanLoad {

  constructor(private router: Router,
              private firebaseSer: FirebaseService)
  {

  }


  redirect(flag: boolean):any
  {
    if(!flag)
    {
      this.router.navigate(['/', 'login'])
    }

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let status = localStorage.getItem("tk");
    let identifier:boolean = false;
    let key;
    if(status)
      {
      status = JSON.parse(status);
      key = status;
      this.firebaseSer.getKey().then( data =>
      {
        key = data['key'];
          
      });

      if(status === key)
        identifier = true;
      }else{
        console.log('nada oiga');
      }

    this.redirect(identifier)

    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  
}
