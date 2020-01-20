import { Component, OnInit } from '@angular/core';
import { MapService,Feature } from '../../services/map.service';
import { Router } from '@angular/router';
import { Plugins, CameraResultType } from '@capacitor/core';
import { AngularFireStorage,AngularFireUploadTask  } from '@angular/fire/storage';
import { SCCSkillsService } from '../../services/scc-skills.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as  firebase from 'firebase';
import { finalize } from 'rxjs/operators';
const { Camera } = Plugins;


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  register: FormGroup;
  addresses = [];
  coordinates = [];
  list;
  uploadPercent;
  urlImage;
  path1;
  urlPath;
  selectedAddress;
  lat;
  lng;

  // role : "", field
  user = {
    name : "",
    surname : "",
    email : "",
    address : "",
    number : "",
    coords : []
   
  }
  constructor(private service : SCCSkillsService,private storage: AngularFireStorage,private mapboxService :MapService,private fb: FormBuilder,private route : Router) {

    this.register = fb.group({
      Name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      Surname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30),Validators.required])],
      address: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
       cpassword: ['', Validators.required],
       number: [0, Validators.compose([Validators.maxLength(10), Validators.required])]
    }, {
      //  validator: MustMatch('password', 'cpassword')
    });
  }

  run(){
    console.log(this.user)
    this.service.addUser(this.user);
    

  }
//   onUpload(event) {
//     console.log(event.target.files[0]);
//    const id = Math.random().toString(36).substring(2);
//    const file = event.target.files[0];
//    const filePath = `uploads/profile_${id}`;
   
//    this.urlPath = filePath; //file.name)
//    const ref = this.storage.ref(filePath);
//    const task = this.storage.upload(filePath, file);  //private cam: Camera     creates a task that will start the upload immediately, no need to subscribe.
  
//    console.log("uploading .." + file.name);
//    console.log(filePath)
   
//    task.then((upload : firebase.storage.UploadTaskSnapshot) => {
//      console.log("upload complete !")   
//      firebase.database().ref(filePath).set(upload.downloadURL)
//      console.log(upload.downloadURL)
//    })
//    console.log(filePath)
//    // Progress monitoring
//    this.uploadPercent = task.percentageChanges();
//    // task.snapshotChanges().pipe(finalize(() => {
//    //   this.urlImage = ref.getDownloadURL()}));
//    //   console.log("hhhh"+this.urlImage);
//    // console.log(file.name);
//    // console.log(this.imgRef )
//    console.log("upload complete !")
//    task.snapshotChanges().pipe(finalize(() =>this.urlImage = ref.getDownloadURL().subscribe(url => {
//        console.log(url)
//        this.path1 =url;
//        console.log(this.path1)
//      })));
//     //  finalize(() => this.urlImage = ref.getDownloadURL().subscribe(url => {
//     //    console.log(url)
//     //    this.path1 =url;
//     //    console.log(this.path1)
//     //  })
     
        
// //   )
// //  .subscribe()
// //  console.log("hhhh"+this.urlImage);

//  }
  // sign up users in firebase [ collection ]

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map(feat => feat.geometry)
          this.addresses = features.map(feat => feat.place_name)
          this.list = features;
          console.log(this.list)
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address, i) {
    this.selectedAddress = address;
    //  selectedcoodinates=

    console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
    console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
    this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
    this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
    this.user.coords = [this.lng,this.lat];
    console.log("index =" + i)
    console.log(this.selectedAddress)
    this.user.address = this.selectedAddress;
    //add to FireBase
    // this.dog.collection('coordinate').add({
    //   lat: this.temp.coordinates[1],
    //   lng: this.temp.coordinates[0],
    //   address: address,
    // }).then(function (ref) {
    //   console.log("document was written with ID : " + ref);
    //   alert("physical address : " + address + " , saved successful..")
    // }).catch(function (ee) {
    //   console.log(ee)
    //   console.log("error while processing ..")
    // });
    this.addresses = [];
  } 

  back(){
    this.route.navigateByUrl('/index');
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    })


  }
  ngOnInit() {
  }

}
