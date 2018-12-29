import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm:FormGroup;
  forbiddenUsername=['anna','mana'];
  ngOnInit(){
  this.signupForm=new FormGroup({
    'userData':new FormGroup({
      'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
    }),
    'gender':new FormControl('female'),
    'hobbies':new FormArray([])
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
}
