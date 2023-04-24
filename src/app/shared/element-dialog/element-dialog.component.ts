import { Component } from '@angular/core';
import { PeriodicElement } from 'src/app/todolist/todolist.component';
import {Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent {
  element!:PeriodicElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.task !== null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }

}
}
