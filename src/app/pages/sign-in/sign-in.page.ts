import { Component, OnInit,Input, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { MapPage } from '../map/map.page';
import { Router } from '@angular/router'
import { MapService } from '../../services/map.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from '../../services/auth-guard.service';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';

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


  temp : any;
  temp1 : any;
  temp2 : any;

  tym;

  constructor(public guards: AuthGuardService,private route : Router,private map : MapService,private addr : ActivatedRoute,public popoverController: PopoverController,private modalCtrl:ModalController) { 
    
  }
  try(){
    console.log(this.tym)

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
    this.route.navigateByUrl('tab/request');
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
  }

}
