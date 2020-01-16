import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class SCCSkillsService {

  

  item : any =  {
    khokho : [],
    electrical : "",
    engineering : ""
  }

    private itemDoc: AngularFirestoreDocument<Item>; // < *class_name* >
writePost;
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

  constructor(public afAuth: AngularFireAuth,private dog : AngularFirestore) { 
    // s
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
       
    
      }).catch((eee) => {
        console.log(eee + " Unsuccesful")
      });
      });

    }
    getInfo(){
      return this.dog.collection('services/').valueChanges();
    }
    update(item){

    // this.itemDoc = this.dog.doc<Item>('Grocery/' + item.key);
    // this.itemDoc.update(item);
    console.log("updated");
  }

  delete(key){

//   return this.dog.doc<Item>('services/' + key).delete();

  }
}
