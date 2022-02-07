import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { IQuestion, IQuestionAnswer, IInputQuestion } from './../../../../../wa-quizolai-shared/interface/question.interface.d';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export interface IQuestionFormInput {
  author: string;
  question: string;
  answers : IQuestionAnswer[];
  category: string;
  tags: string[];
}


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  displayedColumns: string[] = ['author', 'question', 'answers', 'category', 'tags', 'actions' ];
  addedQuestions : IInputQuestion[] = [];
  questionFormInput : IQuestionFormInput | undefined;


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {

        const question : IInputQuestion = {
            author: result.author,
            question: result.question,
            answers: result.answers,
            category: result.category,
            difficulty: 1,
            tags: result.tags,
        }

        const newData = [ ...this.addedQuestions ];
        newData.push(question);
        this.addedQuestions = newData;


      }
    });


  }



  ngOnInit(): void {
  }

  saveQuestions() {
    console.log('saveQuestions');
  }
}
