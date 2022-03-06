import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "Quizolai"
  faCirclePlus = faCirclePlus;
  @Output() openSideBarEvent = new EventEmitter<boolean>();


  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  openSideBar() {
    this.openSideBarEvent.emit(true);
  }

}
