import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AngularFireStorageModule,  } from '@angular/fire/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as moment from "moment";

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { IndexPageModule } from '../app/pages/index/index.module';
import { MenuPageModule } from '../app/pages/menu/menu.module';
import { MapPageModule } from '../app/pages/map/map.module';
import { TabPage } from '../app/pages/tab/tab.page';

const firebaseConfig = {
  apiKey: "AIzaSyB83CuKn-QSuzzxN6X8l2L5UKqfeb2NjvA",
  authDomain: "eletrical-engineer-cms.firebaseapp.com",
  databaseURL: "https://eletrical-engineer-cms.firebaseio.com",
  projectId: "eletrical-engineer-cms",
  storageBucket: "eletrical-engineer-cms.appspot.com",
  messagingSenderId: "931661674739",
  appId: "1:931661674739:web:65e43541f406b1822c1f86",
  measurementId: "G-99GQV7XQHK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent,TabPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        HttpClientModule,
        AngularFirestoreModule,
        IndexPageModule,
        MenuPageModule,
        MapPageModule,
        FormsModule,
        AngularFireStorageModule,
        
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
