import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore';

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

  constructor(private dog : AngularFirestore) { 
    // s
  }




  post(item,alert) {

     this.writePost = this.dog.collection<any>('services');
    this.writePost.add(item).then(() =>{

      console.log("successful");
    });


    }

    getInfo(){
      return this.dog.collection('services').valueChanges();
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
