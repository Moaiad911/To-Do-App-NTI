import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  text: string;
  done: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Get all tasks for the logged-in user
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Create a new task
  createTask(text: string): Observable<Task> {
    return this.http.post<Task>(
      this.apiUrl,
      { text },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Update task text
  updateTask(taskId: number, text: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${taskId}`,
      { text },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Toggle task done status
  toggleTaskDone(taskId: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${taskId}/done`,
      {},
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Delete a task
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
