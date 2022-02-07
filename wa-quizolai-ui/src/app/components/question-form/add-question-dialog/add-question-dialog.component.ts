import { IQuestionFormInput } from './../question-form.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    tags: [],
  };

  constructor(public dialogRef: MatDialogRef<AddQuestionDialogComponent>, @Inject(MAT_DIALOG_DATA) public inputData : any ) { }

  ngOnInit(): void {
    this.data;
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
