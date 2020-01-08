import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 subject : string;
 message : string;
 service : string;

  constructor(private route : Router,private modalCtrl:ModalController) { }

  next(){
    this.route.navigateByUrl('/info');
    // this.route.navigate(['info'], {queryParams : {subject : this.subject,service : this.service, message : this.message}});
  }
  ngOnInit() {
  }

  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
