import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //@ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }


}
