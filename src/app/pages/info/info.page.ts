import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { IndexPage } from '../../pages/index/index.page';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
@Input() subject :string
@Input() message :string
@Input() service :string
@Input() key :string

temp;
temp1;
temp2;
private docKey: string = null;
private serviceName: string = null;
private cost: string = null;
private description: string = null;
private coome: string = null;

private usersAndComments = [];
private obj: any;

  constructor(public popoverController: PopoverController,private addr : ActivatedRoute, 
    private route : Router,private modalCtrl:ModalController, private apiSerice: SCCSkillsService) { }

next1(){
  // this.route.navigateByUrl('/index');
  
  this.route.navigate(['index'],{queryParams : {obj: this.obj}} );
}
back(){
  this.route.navigateByUrl('/menu');
}
async presentModal() {
  const modal = await this.modalCtrl.create({
    component: IndexPage
  });
  return await modal.present();
}
async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: IndexPage,
    event: ev,
    translucent: true
  });
  return await popover.present();
}

  ngOnInit() {

    this.addr.queryParams.subscribe(data => {
      // console.log(data);

      // this.temp = data.subject;
      // console.log(this.temp);

      this.obj = data;

      this.docKey = data.key;


      this.apiSerice.getDoc(this.docKey).subscribe(data=>{
        console.log(data)
        this.obj = data;
      });


      console.log(this.docKey)
      this.apiSerice.getDocComments(this.docKey).subscribe(arrayComments=>{

        for(let comment of arrayComments){

          let user = new User();
          user.setId(comment.uid);
          user.setComment(comment.message);

          this.apiSerice.getUserDoc(user.getId()).subscribe(userData=>{
            console.log(userData);

            user.setName(userData.name);

            this.usersAndComments.push(user);
          });
        }
      });


      // this.temp1 = data.message;
      // console.log(this.temp1);

      // this.temp2 = data.service;
      // console.log(this.temp2);
    })
  }

}
