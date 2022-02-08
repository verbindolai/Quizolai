import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { IQuestion } from "../../../../../wa-quizolai-shared"
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {

  displayedColumns: string[] = ['author', 'question', 'answers', 'category', 'tags', 'difficulty', 'date', 'actions'];
  dataSource: IQuestion[] = [];
  dataLoading = false;

  constructor(private questionService: QuestionService,  private _snackBar: MatSnackBar) { }

  getStringsFromQuestionAnswerArray = QuestionDisplayComponent.getStringsFromQuestionAnswerArray;

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

  deleteQuestion(question: IQuestion) {
    if (confirm("Are you sure you want to delete this question?")) {
      this.questionService.deleteQuestion(question._id).subscribe({
        next: (deletedQuestion: IQuestion) => {
          this.dataSource = this.dataSource.filter(q => q._id !== deletedQuestion._id);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  editQuestion(question: IQuestion) {
    console.log(question);
  }

  static getStringsFromQuestionAnswerArray(answers : IQuestion['answers']) : string[] {
    return answers.map(answer => answer.answer);
  }

}
