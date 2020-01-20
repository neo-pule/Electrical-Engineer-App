import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  array : any;
  constructor(
    private route :Router,
    private afs : AngularFirestore,
    public afAuth: AngularFireAuth) { 
    
    //   var user = firebase.auth().currentUser;
    // afAuth.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.route.navigateByUrl('tab/sign-in')
    //   } else {
    //     this.route.navigateByUrl('index')
    //   }
    // })
  
    this.afs.collection('services/').snapshotChanges().subscribe((data: any) => {
      this.array = data.map(e => {
        return {
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
console.log(this.array)
  });
}

resetPassword(mail){
  this.afAuth.auth.sendPasswordResetEmail(mail).then((success) => {
    console.log(success);
    alert(success);
    this.route.navigateByUrl('index');
  }).catch((err) => {
    console.log(err);
    alert(err);
  });

  }

signOut(){
  this.afAuth.auth.signOut().then((sucess) => {
  // Sign-out successful.
  console.log(sucess);
  this.route.navigateByUrl('index');
}).catch((error) => {
  // An error happened.
  console.log(error);
});
}

    async signIn(email: string, password: string) {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
        alert(success)
        console.log(success);
      }).catch((err) => {
        console.log(" error while " + err);
        alert(err)
      })
    }
  
  
  }


