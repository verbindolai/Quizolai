import {Component, OnInit, ViewChild} from '@angular/core';
import {IQuestion} from "@quizolai-shared/interface/question.interface";
import {QuestionService} from "../../service/question.service";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  dataSource: IQuestion[] = [];
  dataLoading = false;

  constructor(private readonly questionService : QuestionService, private readonly _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.dataLoading = true;

    this.questionService.getQuestions().subscribe({
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
