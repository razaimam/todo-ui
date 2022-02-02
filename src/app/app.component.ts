import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-ui';
  public taskList : any;
  public taskDesc : string = "";
  public newTaskDesc : string = "";
  public selectedTaskId : number = 0;
  public newDate : string = new Date().toLocaleString();
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/v1/todo/tasks").subscribe(data => this.taskList = data);
  }

  public getTasks(){
    this.http.get("http://localhost:8080/api/v1/todo/tasks").subscribe(data => this.taskList = data);
  }

  public addTask(){
    let task = {
      desc : this.taskDesc
    }
    this.http.post("http://localhost:8080/api/v1/todo/addTask", task ).subscribe(data => {
      alert("Task save successfully")
      this.getTasks();
    });
  }

  public deleteTask(taskId :any){
    this.http.delete("http://localhost:8080/api/v1/todo/deleteTask/"+ taskId ).subscribe(data =>{
       alert("Task is deleted")
       this.getTasks();
      });
  }


  public updateTask(taskId : any, newTaskDesc : string){
    let task = {
      id : taskId,
      desc : newTaskDesc
    }
    this.http.put("http://localhost:8080/api/v1/todo/updateTask/", task ).subscribe(data =>{
       alert("Task is updated")
       this.getTasks();
      });
  }

  public setUpdateValue(taskId : any, taskDesc : string){
    this.selectedTaskId = taskId;
    this.newTaskDesc = taskDesc;
    this.newDate = new Date().toLocaleString();
  }
}


