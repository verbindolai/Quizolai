import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "Quizolai"

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
