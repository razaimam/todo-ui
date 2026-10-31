import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-ui';
  public taskList: any;
  public taskDesc = '';
  public newTaskDesc = '';
  public selectedTaskId = 0;
  public newDate = new Date().toLocaleString();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTasks();
  }

  private sanitizeTaskDesc(value: string): string {
    return (value ?? '').trim().replace(/[<>]/g, '');
  }

  public getTasks(): void {
    this.http.get(`${environment.apiBaseUrl}/todo/tasks`).subscribe((data) => this.taskList = data);
  }

  public addTask(): void {
    const desc = this.sanitizeTaskDesc(this.taskDesc);

    if (!desc) {
      alert('Task description is required');
      return;
    }

    const task = { desc };
    this.http.post(`${environment.apiBaseUrl}/todo/addTask`, task).subscribe(() => {
      alert('Task save successfully');
      this.taskDesc = '';
      this.getTasks();
    });
  }

  public deleteTask(taskId: any): void {
    this.http.delete(`${environment.apiBaseUrl}/todo/deleteTask/${taskId}`).subscribe(() => {
      alert('Task is deleted');
      this.getTasks();
    });
  }

  public updateTask(taskId: any, newTaskDesc: string): void {
    const desc = this.sanitizeTaskDesc(newTaskDesc);

    if (!desc) {
      alert('Task description is required');
      return;
    }

    const task = {
      id: taskId,
      desc
    };

    this.http.put(`${environment.apiBaseUrl}/todo/updateTask/`, task).subscribe(() => {
      alert('Task is updated');
      this.getTasks();
    });
  }

  public setUpdateValue(taskId: any, taskDesc: string): void {
    this.selectedTaskId = taskId;
    this.newTaskDesc = this.sanitizeTaskDesc(taskDesc);
    this.newDate = new Date().toLocaleString();
  }
}
