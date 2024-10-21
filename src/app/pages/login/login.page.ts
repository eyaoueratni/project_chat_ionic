import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form! :FormGroup
  isLogin= signal<boolean>(false);
  erroMessage=signal<string | null >(null);
  private auth=inject(AuthService);
  private router=inject(Router);
 
  constructor() { 
    
  }

  ngOnInit() {
    this.form=new FormGroup(
      {
        email:new FormControl(null,
          {validators:[Validators.required,Validators.email]}),
          password:new FormControl(null,
            {validators:[Validators.required,Validators.minLength(8)]}),
      }
    )
  }
onSubmit(){
  if (this.form.invalid){
    this.form.markAllAsTouched();
    return;
  }
  console.log(this.form.value);
  this.login(this.form.value);
}
async login(formValue:{
  name:string,
  email:string,
  password:string}){
    try{
      this.setIsLogin(true);
      await this.auth.login(formValue.email,formValue.password);
      //navigate to tabs screen 
      this.setIsLogin(false);
      this.router.navigateByUrl('/tabs/chats',{replaceUrl:true});
      
      this.form.reset();
    }catch(e:any){
       this.setIsLogin(false);
       let msg: string='could not sign you up ,please try again.';
       if (e.code=='auth/user-not-found'){
       msg='email already in use';
    }else if(e.code=='auth/wrong-password') {
      msg='please enter a correct password';

    }
    console.log(e.code)
   this.setErroMessage(msg)
}
}
setIsLogin(value:boolean){
  this.isLogin.set(false);
}
setErroMessage(value: string | null){
  this.erroMessage.set(value);
}
}
