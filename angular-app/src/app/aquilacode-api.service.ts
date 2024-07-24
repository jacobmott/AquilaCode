import { Injectable } from "@angular/core";
//import { ApiModule } from "aquilacode-api";
//import { BASE_PATH } from "aquilacode-api";
//import { NgModule } from "@angular/core";
//import { HttpClientModule } from "@angular/common/http";
//import { APIS } from 'aquilacode-api';
//import { ApiModule } from "aquilacode-api";
//import { DefaultService } from "aquilacode-api";
//import { Observable } from "rxjs";
//import { provideHttpClient } from "@angular/common/http";
//import { ApiModule } from "aquilacode-api";

@Injectable({
  providedIn: "root",
})
//@NgModule({
//  imports: [
//    ApiModule,
//    // make sure to import the HttpClientModule in the AppModule only,
//    // see https://github.com/angular/angular/issues/20575
//    //    HttpClientModule,
//  ],
//  providers: [
//    { provide: BASE_PATH, useValue: "http://localhost:3000/aquila/ship" },
//  ],
//})

//@NgModule({
//  providers: [provideHttpClient()],
//  imports: [ApiModule],
//})
export class AquilacodeApiService {
  //constructor(private aquilacode: DefaultService) {}
  constructor() {}
  //getShips(): Observable<any> {
  //  return this.aquilacode.findAll();
  //}
}
