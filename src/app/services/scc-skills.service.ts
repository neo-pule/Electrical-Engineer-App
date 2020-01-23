import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SCCSkillsService {

  UserArray = [];
  Email;

  item : any =  {
    khokho : [],
    electrical : "",
    engineering : ""
  }

    private itemDoc: AngularFirestoreDocument<Item>; // < *class_name* >
writePost;
id;
userDocRef;
private booking=[];
private data=[{
  category:'pizza',
  expended: true,
  products: [
    {id:0,name:'salami',price:'1'},
    {id:1,name:'salami',price:'2'},
    {id:2,name:'salami',price:'3'},
  

  ]

},

];

  constructor(public afAuth: AngularFireAuth,private dog : AngularFirestore,private route : Router) { 

    
    
  }


  getProducts(){
    return this.data
  }
  
  getBooking(){
    return this.booking;
  }
  
  addProduct(products){
    this.booking.push(products);
  }

  post(item,alert) {

     this.writePost = this.dog.collection<any>('services');
    this.writePost.add(item).then(() =>{

      console.log("successful");
    });


    }
    addUser(item){
      this.writePost = this.dog.collection<any>('user');
      this.writePost.add(item).then(() =>{
  
        console.log("user added successful ..");
        console.log(item.email);
        console.log(item.pass);
        this.afAuth.auth.createUserWithEmailAndPassword(item.email, item.pass).then(error => {
          // Handle Errors here.
          //var errorCode = error.code;  
        console.log(error + " added user succesful");
        alert(item.email + " succesful registered" );
          this.route.navigateByUrl('/index');
        
    
      }).catch((eee) => {
        console.log(eee + " Unsuccesful")
        alert(eee);
      });
      });

    }
    getID(){
      this.UserDoc().subscribe((data) => {

        console.log(data+"  --- ")
        for( let cat of data){
          // console.log(cat.id)
          this.id = cat.id;
          console.log(this.id)
        }
      });
      return this.id;

      // return this.dog.collection('user/', response => response.where("email","==", firebase.auth().currentUser.email))
      // .snapshotChanges().pipe(
      //   map(actions => actions.map(a => {
      //     const data = a.payload.doc.data() as any;
      //     const id = a.payload.doc.id;
      //     return { id, ...data };
      //   }))
      // );

    }
    viewRequest(id: string){
      
       return  this.dog.collection('user').doc(id).collection('request').valueChanges();
     
    }
    UserDoc(){
    // return  this.dog.collection('user').doc("6ZNu2FTxIpJfD2ghS7Tn").collection('request').snapshotChanges();
    // console.log(this.userDocRef);
    return this.dog.collection('user/', response => response.where("email","==", firebase.auth().currentUser.email))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
     
      // console.log(firebase.auth().currentUser.uid)
      // return this.dog.collection("user/").doc("6hjRntnlqgb3UuZLk4HWyEtHAJK2").valueChanges();
    }

    addRequest(item){

      this.UserDoc().subscribe((data) => {
        for( let cat of data){
          console.log(cat.id)
          this.id = cat.id;
          
        }
        console.log(this.id)
        this.writePost = this.dog.collection('user/').doc(this.id).collection('request');
        console.log(this.writePost)
        this.writePost.add(item).then(() =>{
          console.log(item);
          console.log("request added successful ..");
          console.log(item.stamp);
          console.log(item.description);
          this.route.navigateByUrl('tab/request');

      });
    
    });
    
      // this.writePost = this.dog.collection('user/').doc("6ZNu2FTxIpJfD2ghS7Tn").collection('request');
      // console.log(this.writePost)
      // this.writePost.add(item).then(() =>{
      //   console.log(item);
      //   console.log("request added successful ..");
      //   console.log(item.stamp);
      //   console.log(item.description);
       
      // });

      // this.writePost = this.dog.collection<any>('user').doc(firebase.auth().currentUser.uid).collection('request');
      // this.writePost.add(item).then(() =>{
      //   console.log(item);
      //   console.log("request added successful ..");
      //   console.log(item.stamp);
      //   console.log(item.description);
       
      // });
      // this.collRef.add(item).then((err) =>{
      //   console.log(err);
      //   console.log("sucessful")
      // });
  }
    
    getInfo(){
      return this.dog.collection('services/').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
    update(item){

    // this.itemDoc = this.dog.doc<Item>('Grocery/' + item.key);
    // this.itemDoc.update(item);
    console.log("updated");
  }

  getDoc(key: string){
    return this.dog.doc("services/"+key).valueChanges()
  }

  getUserDoc(uid:string){
    return this.dog.doc("user/"+uid).valueChanges()
  }
  getDocComments(docId:string){
    return this.dog.doc("services/"+docId).collection("comments").valueChanges()
  }
  delete(key){

  // return this.dog.doc<Item>('services/' + key).delete();

  }

  setEmail(email) {
    this.Email = email;
  }

  getUser() {
    return firebase.firestore().collection("user/").get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id);

        if(this.Email == doc.data().email){
          this.UserArray.push(doc.data())
        }else{
        }
      })

      return this.UserArray;
    })
  }
}
