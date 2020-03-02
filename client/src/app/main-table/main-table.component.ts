import { Component, OnInit } from '@angular/core';

interface Todo{
  id: number,
  date: string,
  description: string,
  assigned_to: string
}

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})


export class MainTableComponent implements OnInit {
  todos: Todo[] = [
    { id: 1, date: new Date().toLocaleDateString(), description: 'Wash dishes', assigned_to: 'Levon'}, 
    { id: 2, date: new Date().toLocaleDateString(), description: 'By eggs', assigned_to: 'Angela'}, 
    { id: 3, date: new Date().toLocaleDateString(), description: 'Feed dog', assigned_to: 'John'}
  ]

  ngOnInit(): void {
    
  }

}
