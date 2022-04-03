import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {firstValueFrom} from "rxjs";
import {QuestionService} from "../../service/question.service";
import {MatDialog} from "@angular/material/dialog";
import {UserQuestionsComponent} from "../user-questions/user-questions.component";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public auth : AuthService, private readonly questionsService : QuestionService, public dialog: MatDialog) { }
  userImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";


  ngOnInit(): void {


  }

  getUserQuestions(sub: string | undefined) {
    this.dialog.open(UserQuestionsComponent, {
      data: {
        sub: sub
      }
    });
    //   if(!sub) {
    //     return;
    //   }
    //   this.questionsService.getQuestionsFromUser(sub).subscribe(
    //     (data) => {
    //       console.log(data);
    //     }
    //   );
    // }
  }
}
