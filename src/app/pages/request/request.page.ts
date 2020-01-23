import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SCCSkillsService } from 'src/app/services/scc-skills.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
data = {
  heading : "text",
  para1 : "Lorem ipsum",
  para2 : "adipiscing"
};
arr;
id
  constructor(public afAuth :AngularFireAuth, private route : Router,private skill : SCCSkillsService) { 
    // this.skill.viewRequest().subscribe((da) => {
    //   this.arr = da;
    //   console.log(this.arr)
    // });
  }

  run(){

    this.skill.UserDoc().subscribe((data) => {

      console.log(data+"  --- ")
      for( let cat of data){
        // console.log(cat.id)
        this.id = cat.id;
        console.log(this.id)
      }
    });

    console.log(this.id)
    // return this.id;
    // this.skill.getID()
    // console.log(this.skill.viewRequest().subscribe((da) => {
    //   this.arr = da;
    // }))
  }
  ionViewWillEnter() {
  
     
   
  }
  runs() {
    this.route.navigateByUrl('index');
  }
  ngOnInit() {

    console.log("one")
    this.skill.UserDoc().subscribe(userDocInfo=>{

      this.skill.viewRequest(userDocInfo[0].id).subscribe(res=>{
        console.log(res)
        this.arr = res;
      })
      console.log(userDocInfo)
    })

    console.log("two")

   
  }

}
