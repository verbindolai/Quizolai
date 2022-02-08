import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { IQuestionAnswer, IInputQuestion } from '../../../../../wa-quizolai-shared';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {QuestionDisplayComponent} from "../question-display/question-display.component";
import {QuestionService} from "../../service/question.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface IQuestionFormInput {
  author: string;
  question: string;
  answers : IQuestionAnswer[];
  category: string;
  difficulty: number;
  tags: string[];
  id: string;
}


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  displayedColumns: string[] = ['author', 'question', 'answers', 'category', 'tags', 'difficulty' , 'actions' ];
  addedQuestions : IQuestionFormInput[] = [];
  questionFormInput : IQuestionFormInput | undefined;

  loadingSave = false;

  getStringsFromQuestionAnswerArray = QuestionDisplayComponent.getStringsFromQuestionAnswerArray;


  constructor(public dialog: MatDialog, private questionService : QuestionService, private _snackBar: MatSnackBar) {}

  openDialog(data? : any): void {
    const dialogRef = this.dialog.open(AddQuestionDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        const question : IQuestionFormInput = {
            author: result.author,
            question: result.question,
            answers: result.answers,
            category: result.category,
            difficulty: result.difficulty,
            tags: result.tags,
            id: result.id
        }

        const index = this.addedQuestions.findIndex(q => q.id === question.id);
        if( index === -1) {
          const newData = [ ...this.addedQuestions ];
          newData.push(question);
          this.addedQuestions = newData;
        } else {
          const newData = [ ...this.addedQuestions ];
          newData[index] = question;
          this.addedQuestions = newData;
        }
      }
    });

  }

  ngOnInit(): void {
  }

  editQuestion(question : IQuestionFormInput) {
    this.openDialog(question);
  }
  deleteQuestion(question : IQuestionFormInput) {
    const newData = [ ...this.addedQuestions ];
    const index = newData.findIndex(q => q.id === question.id);
    newData.splice(index, 1);
    this.addedQuestions = newData;
  }

  saveQuestions() {

    if(this.addedQuestions.length === 0) {
      this._snackBar.open("No questions to save", "close", {
        duration: 2000,
      });
      return;
    }

    this.loadingSave = true;
    this.questionService.addQuestions(this.addedQuestions).subscribe({
      next: () => {
        this.addedQuestions = [];
        this._snackBar.open('Questions saved', 'Close', {
          duration: 2000,
        });
      },
      error: (err) => {
        this.loadingSave = false;
        this._snackBar.open('Error saving questions', 'Close', {
          duration: 2000,
        });
      },
      complete: () => {
        this.loadingSave = false;
      }

    });

  }
}
