
import { Injectable, inject } from "@angular/core"; import { CanActivate } from
"@angular/router"; import { AuthService } from "@auth0/auth0-angular"; import {
environment } from "../../../environments/environment"; import { Router } from
"@angular/router"; import { concatMap, iif, Observable, of, take } from "rxjs";
import { switchMap, map } from "rxjs/operators"; import {
ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, } from "@angular/router";
@Injectable({ providedIn: "root", }) export class AuthGuard implements
CanActivate { isAuthenticated = false; activate: Observable<boolean
  >; constructor( private auth: AuthService, private router: Router, ) { //
  this.auth.isAuthenticated$.pipe( // map((isAuthenticatedd) => { //
  console.log("HERE1 " + isAuthenticatedd); // this.isAuthenticated =
  isAuthenticatedd; // // if (isAuthenticatedd) { // // return true; // // }
  else { // // this.router.navigate(["home"]); // // return false; // // } //
  }), // ); this.auth.isAuthenticated$.subscribe({ next: (isAuthenticated) => {
  this.isAuthenticated = isAuthenticated; this.activate = of(isAuthenticated);
  if (!isAuthenticated) { this.router.navigate(["home"]); } if (isAuthenticated)
  { this.router.navigate([""]); } }, error: (msg) => { console.log("error23" +
  msg); }, }); } canActivate( next: ActivatedRouteSnapshot, state:
  RouterStateSnapshot, ): Observable<boolean>
    { // this.auth.isAuthenticated$.subscribe((value) => { //
    console.log("here111111111 " + value); // if (value) { //
    this.router.navigate([""]); // return of(true); // } else { //
    this.router.navigate(["home"]); // return of(false); // } // }); return
    this.activate; // return
    this.auth.isAuthenticated$.pipe(take(1)).toPromise(); // return new
    Promise((resolve) => { // this.auth.isAuthenticated$ // .pipe( // take(1),
    //useful if you need the data once and don't want to manually cancel the
    subscription again // ) // .subscribe((data: any) => { // console.log(data);
    // if (!data) { // this.router.navigate(["home"]); // } else if (data) { //
    this.router.navigate([""]); // } // resolve(data); // }); // }); // return
    this.auth.isAuthenticated$.pipe( // map((authenticated: boolean) => { //
    console.log(authenticated); // if (authenticated) { // return authenticated;
    // } // return authenticated; // }), // ); // return
    this.auth.isAuthenticated$.pipe( // take(1), //useful if you need the data
    once and don't want to manually cancel the subscription again // ); //
    return this.auth.isAuthenticated$.; // return
    this.auth.isAuthenticated$.pipe( // map(), // ); // const result$ =
    this.auth.isAuthenticated$.pipe( // switchMap((value) => { // // Perform an
    action based on the value from source$ // // For example, make an HTTP
    request // console.log("here111111111 " + value); // return of(value); //
    }), // ); } }
  </boolean></boolean
>

import { Injectable, inject } from "@angular/core"; import { CanActivate } from
"@angular/router"; import { AuthService } from "@auth0/auth0-angular"; import {
environment } from "../../../environments/environment"; import { Router } from
"@angular/router"; @Injectable({ providedIn: "root", }) export class AuthGuard
implements CanActivate { isAuthenticated = false; private auth =
inject(AuthService); constructor(private router: Router) {
this.auth.isAuthenticated$.subscribe({ next: (isAuthenticated) => {
console.log("gere1 " + isAuthenticated); this.isAuthenticated = isAuthenticated;
if (isAuthenticated) { this.router.navigate([""]); } }, error: (msg) => {
console.log("error23" + msg); }, });
this.auth.handleRedirectCallback().subscribe({ next: (result) => {
console.log("gere2"); }, error: (msg) => { console.log("error22" + msg); }, });
} canActivate(): boolean { if (this.isAuthenticated) { return true; } else { //
not logged in so redirect to login page with the return url
this.router.navigate(["home"]); return false; // this.auth.loginWithPopup({ //
authorizationParams: { // redirect_uri: environment.url, // }, // }); // return
false; } } } import { Injectable, inject } from "@angular/core"; import {
CanActivate } from "@angular/router"; import { AuthService } from
"@auth0/auth0-angular"; import { environment } from
"../../../environments/environment"; @Injectable({ providedIn: "root", }) export
class AuthGuard implements CanActivate { isAuthenticated = false; constructor()
{ this.auth.isAuthenticated$.subscribe({ next: (isAuthenticated) => {
this.isAuthenticated = isAuthenticated; }, error: (msg) => {
console.log("error"); }, }); } private auth = inject(AuthService);
canActivate(): boolean { if (this.isAuthenticated) { return true; } else {
this.auth.loginWithPopup({ authorizationParams: { redirect_uri: environment.url,
}, }); return false; } } } import { Injectable, inject } from "@angular/core";
import { CanActivate, RedirectCommand } from "@angular/router"; import {
AuthService } from "@auth0/auth0-angular"; import { environment } from
"../../../environments/environment"; import { Router } from "@angular/router";
import { Observable, of } from "rxjs"; import { switchMap } from
"rxjs/operators"; import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,
} from "@angular/router"; @Injectable({ providedIn: "root", }) export class
AuthGuard implements CanActivate { isAuthenticated = false; constructor( private
auth: AuthService, private router: Router, ) {
this.auth.isAuthenticated$.subscribe({ next: (isAuthenticated) => {
console.log("gere1 " + isAuthenticated); this.isAuthenticated = isAuthenticated;
if (isAuthenticated) { this.router.navigate([""]); } }, error: (msg) => {
console.log("error23" + msg); }, });
this.auth.handleRedirectCallback().subscribe({ next: (result) => {
console.log("gere2"); }, error: (msg) => { console.log("error22" + msg); }, });
} canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot, ):
boolean { if (this.isAuthenticated) { return true; } else { // not logged in so
redirect to login page with the return url this.router.navigate(["home"]);
return false; // this.auth.loginWithPopup({ // authorizationParams: { //
redirect_uri: environment.url, // }, // }); // return false; } } } import {
Injectable, inject } from "@angular/core"; import { CanActivate } from
"@angular/router"; import { AuthService } from "@auth0/auth0-angular"; import {
environment } from "../../../environments/environment"; import { Router } from
"@angular/router"; import { concatMap, iif, Observable, of, take } from "rxjs";
import { switchMap, map } from "rxjs/operators"; import {
ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, } from "@angular/router";
import { AuthenticationService } from "../data-access/authentication.service";
@Injectable({ providedIn: "root", }) export class AuthGuard implements
CanActivate { isAuthenticated = false; activate: Observable<boolean
  >; constructor( private auth: AuthService, private router: Router, private
  topNavLightSliderService: TopNavLightSliderService, ) { //
  this.auth.isAuthenticated$.pipe( // map((isAuthenticatedd) => { //
  console.log("HERE1 " + isAuthenticatedd); // this.isAuthenticated =
  isAuthenticatedd; // // if (isAuthenticatedd) { // // return true; // // }
  else { // // this.router.navigate(["home"]); // // return false; // // } //
  }), // ); } canActivate( next: ActivatedRouteSnapshot, state:
  RouterStateSnapshot, ): Observable<boolean>
    { // this.auth.isAuthenticated$.subscribe((value) => { //
    console.log("here111111111 " + value); // if (value) { //
    this.router.navigate([""]); // return of(true); // } else { //
    this.router.navigate(["home"]); // return of(false); // } // }); return
    this.activate; // return
    this.auth.isAuthenticated$.pipe(take(1)).toPromise(); // return new
    Promise((resolve) => { // this.auth.isAuthenticated$ // .pipe( // take(1),
    //useful if you need the data once and don't want to manually cancel the
    subscription again // ) // .subscribe((data: any) => { // console.log(data);
    // if (!data) { // this.router.navigate(["home"]); // } else if (data) { //
    this.router.navigate([""]); // } // resolve(data); // }); // }); // return
    this.auth.isAuthenticated$.pipe( // map((authenticated: boolean) => { //
    console.log(authenticated); // if (authenticated) { // return authenticated;
    // } // return authenticated; // }), // ); // return
    this.auth.isAuthenticated$.pipe( // take(1), //useful if you need the data
    once and don't want to manually cancel the subscription again // ); //
    return this.auth.isAuthenticated$.; // return
    this.auth.isAuthenticated$.pipe( // map(), // ); // const result$ =
    this.auth.isAuthenticated$.pipe( // switchMap((value) => { // // Perform an
    action based on the value from source$ // // For example, make an HTTP
    request // console.log("here111111111 " + value); // return of(value); //
    }), // ); } }
  </boolean></boolean
>
