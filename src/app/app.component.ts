import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { resolve, reject } from 'q';
import { getMaxListeners } from 'cluster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  genders = ['male', 'female'];
  @ViewChild('f') signupForm:FormGroup;
  forbiddenUsername=['anna','mana'];
  
  ngOnInit(){
  this.signupForm=new FormGroup({
    'userData':new FormGroup({
      'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
      'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails),
    }),
    'gender':new FormControl('female'),
    'hobbies':new FormArray([])
  });

  this.signupForm.patchValue({
    'userData':{'username':'alka','email':'alka@gmail.com'},
    'gender':'female',
  });
  this.signupForm.setControl('hobbies', new FormArray([
    new FormControl('music'),
    new FormControl('sports')
  ]));
  // this.signupForm.valueChanges
  //   .subscribe((value)=>{
  //     console.log(value);
  //   });
  this.signupForm.statusChanges
    .subscribe((status)=>{
      console.log(status);
    });
  }
  onAddHobby(){
    const control=new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control:FormControl):{[s:string]:Boolean}{
    if(this.forbiddenUsername.indexOf(control.value)!==-1){
      console.log(this.forbiddenUsername.indexOf(control.value)!==-1);
      return {'nameIsForbidden':true};
    }
    return null;
  }

  forbiddenEmails(control:FormControl):Promise<any> | Observable<any>{
    const promise=new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='malikalka2090@gmail.com'){
          resolve({'emailIsForbidden':true});
        }
        else{
          resolve(null);
        }
      },1500)
    });
    return promise;
  }
  onSubmit(){
    console.log(this.signupForm);
  }
}
