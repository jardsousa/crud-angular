import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from '../shared/element-dialog/element-dialog.component';
export interface PeriodicElement {
  
  task: string;
  limite: Date;
  completed: string;
  deleted: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {task: 'Lavar o banheiro',limite: new Date('2023-04-23'), completed: "", deleted: ''},
  {task: 'Fazer compras', limite:new Date('2023-04-26'),completed: "", deleted: ''},
  {task: 'Levar o cachorro para passear',limite:new Date('2023-04-28'), completed: "", deleted: ''},
  
 
];

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['task','limite','completed', 'edit','deleted'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(element: PeriodicElement | null):void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data: element == null ? {
        task:null,
      }: {task:element.task,limite:element.limite
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(t => t.task).includes(result.task)){
          this.dataSource[result.task-1]=result;
          this.table.renderRows();
        }else{
          this.dataSource.push(result);
          this.table.renderRows();

        }
        
    }});

}
    deleteElement(task: string): void{
      this.dataSource = this.dataSource.filter(t => t.task !== task);
}

  editElement(element: PeriodicElement): void{
    this.openDialog(element);

  }
}