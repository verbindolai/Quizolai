import { IQuestionFormInput } from '../question-form/question-form.component';
import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ENTER} from "@angular/cdk/keycodes";
import {IQuestion, IQuestionAnswer} from "../../../../../wa-quizolai-shared";
import {MatChipInputEvent} from "@angular/material/chips";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit {

  data : IQuestionFormInput = {
    author: "",
    question: "",
    answers : [],
    category: "",
    difficulty: 0,
    tags: [],
    id: uuidv4()
  };

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;


  constructor(public dialogRef: MatDialogRef<AddQuestionDialogComponent>, @Inject(MAT_DIALOG_DATA) public inputData : any ) {

  }

  ngOnInit(): void {
    //TODO
    if(this.inputData){
      this.data =  JSON.parse(JSON.stringify(this.inputData));
    }

  }
  addAnswer(event: MatChipInputEvent): void {
    const value = (event.value || '');

    if (value && !/^\s*$/.test(value)) {
      this.data.answers.push({answer: value, correct: false});
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeAsnwer(answer:  IQuestionAnswer): void {
    const index = this.data.answers.indexOf(answer);
    if (index >= 0) {
      this.data.answers.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '');

    if (value) {
      this.data.tags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.data.tags.indexOf(tag);

    if (index >= 0) {
      this.data.tags.splice(index, 1);
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  static getQuestionFormInputFromIQuestion(question: IQuestion) : IQuestionFormInput {
    return {
      author: question.author,
      question: question.question,
      answers : question.answers,
      category: question.category,
      difficulty: question.difficulty,
      tags: question.tags,
      id: question._id
    };
  }

}
