import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router, private autService:AuthService) { }

  login(){
    //ir al backend
    //usuario
    this.autService.login().subscribe(resp =>{
      console.log(resp);
      if(resp.id){
	this.router.navigate(['./heroes'])
      }
    })
  }



}
