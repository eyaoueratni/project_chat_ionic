import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form! :FormGroup
  isSignUp= signal<boolean>(false);
  erroMessage=signal<string | null >(null);
  private router=inject(Router);
  private auth=inject(AuthService);
  constructor() { 
    
  }

  ngOnInit() {
    this.form=new FormGroup(
      {
        email:new FormControl(null,
          {validators:[Validators.required,Validators.email]}),
          name:new FormControl(null,
            {validators:[Validators.required]}),
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
  this.signup(this.form.value);
}
async signup(formValue:{
  name:string,
  email:string,
  password:string}){
    try{
      this.setIsSignup(true);
      const { id }= await this.auth.register(formValue);
      //navigate to tabs screen 
      this.router.navigateByUrl('/tabs/chats',{replaceUrl:true});
      this.setIsSignup(false);
      this.form.reset();
    }catch(e:any){
       this.setIsSignup(false);
       let msg: string='could not sign you up ,please try again.';
       if (e.code=='auth/email-already-in-use'){
       msg='email already in use';
    }
    console.log(e.code)
   this.setErroMessage(msg)
}
}
setIsSignup(value:boolean){
  this.isSignUp.set(false);
}
setErroMessage(value: string | null){
  this.erroMessage.set(value);
}
}

