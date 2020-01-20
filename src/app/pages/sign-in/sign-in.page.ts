import { Component, OnInit,Input, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { MapPage } from '../map/map.page';
import { Router } from '@angular/router'
import { MapService } from '../../services/map.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from '../../services/auth-guard.service';
import { SCCSkillsService } from '../../services/scc-skills.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Subject } from 'rxjs';





@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  
  @Input() body : string
  @Input() subject : string
  @Input() service : string

  public loginForm: FormGroup;

  temp : any;
  temp1 : any;
  temp2 : any;
  location ;
  day;

  name;
  descrp;
request = {
  day : "",
  stamp : Date.now(),
  location: "",
  time : 0

}
stamp = Date();

  tym;

  constructor(private skill :SCCSkillsService,private fb: FormBuilder,public guards: AuthGuardService,private route : Router,private map : MapService,private addr : ActivatedRoute,public popoverController: PopoverController,private modalCtrl:ModalController) { 
   
    this.loginForm = fb.group({
      day: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      location: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
    });

  }
  try(){
    console.log(this.tym)
    console.log(this.request)

  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MapPage
    });
    return await modal.present();
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MapPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  
  take(){
    // this.route.navigateByUrl('tab/request');
    console.log(this.request.time  )
    this.skill.addRequest(this.request);


  }

  ngOnInit() {
    this.addr.queryParams.subscribe(data => {
      console.log(data);

      this.temp = data.subject;
      console.log(this.temp);

      this.temp1 = data.message;
      console.log(this.temp1);

      this.temp2 = data.service;
      console.log(this.temp2);
    })

    let name = localStorage.getItem("name");
    let description = localStorage.getItem("description")

    this.name = name;
    this.descrp = description;
    console.log(name+" -------- "+description)
  }

}
