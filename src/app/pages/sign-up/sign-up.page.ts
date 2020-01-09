import { Component, OnInit } from '@angular/core';
import { MapService,Feature } from '../../services/map.service';
import { Plugins, CameraResultType } from '@capacitor/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  constructor(private mapboxService :MapService,private fb: FormBuilder) {

    this.register = fb.group({
      Name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      Surname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30),Validators.required])],
      address: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
       cpassword: ['', Validators.required]

    }, {
      //  validator: MustMatch('password', 'cpassword')
    });
  }

   
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  }
  ngOnInit() {
  }

}
