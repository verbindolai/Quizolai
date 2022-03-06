import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IQuestion} from "@quizolai-shared/interface/question.interface";
import {QuestionService} from "../../service/question.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit {

  dataSource: IQuestion[] = [];
  dataLoading = false;

  constructor( @Inject(MAT_DIALOG_DATA) public inputData : any, private readonly questionService : QuestionService, private readonly _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.dataLoading = true;

    this.questionService.getQuestionsFromUser(this.inputData.sub).subscribe({
      next: (questions: IQuestion[]) => {
        this.dataSource = questions;
      },
      error: (err) => {
        this.dataLoading = false;
        this._snackBar.open("Error loading questions", "Close", {
          duration: 2000,
        });
      },
      complete: () => {
        this.dataLoading = false;
      }
    });


  }

}
