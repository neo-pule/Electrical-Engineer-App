import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';


@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {
mail;
  constructor(private auth : AuthGuardService) { }

  resetPass(mail){
    
    this.auth.resetPassword(mail);
  }
  ngOnInit() {
  }

}
