import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService, Task } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskText: string = '';
  editingTaskId: number | null = null;
  editingTaskText: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load all tasks
  loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.error = 'Failed to load tasks';
        this.loading = false;
      },
    });
  }

  // Create new task
  addTask(): void {
    if (!this.newTaskText.trim()) {
      return;
    }

    this.loading = true;

    this.tasksService.createTask(this.newTaskText.trim()).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
        this.newTaskText = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error adding task:', error);
        this.error = 'Failed to add task';
        this.loading = false;
      },
    });
  }

  // Start editing a task
  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editingTaskText = task.text;
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingTaskId = null;
    this.editingTaskText = '';
  }

  // Update task text
  updateTask(taskId: number): void {
    if (!this.editingTaskText.trim()) {
      return;
    }

    this.loading = true;

    this.tasksService
      .updateTask(taskId, this.editingTaskText.trim())
      .subscribe({
        next: () => {
          const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
          if (taskIndex !== -1) {
            this.tasks[taskIndex].text = this.editingTaskText.trim();
          }
          this.cancelEdit();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.error = 'Failed to update task';
          this.loading = false;
        },
      });
  }

  // Toggle task done status
  toggleTaskDone(task: Task): void {
    this.loading = true;

    this.tasksService.toggleTaskDone(task.id).subscribe({
      next: () => {
        task.done = !task.done;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error toggling task:', error);
        this.error = 'Failed to update task status';
        this.loading = false;
      },
    });
  }

  // Delete task
  deleteTask(taskId: number): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.loading = true;

    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.error = 'Failed to delete task';
        this.loading = false;
      },
    });
  }

  // Get completed tasks count
  get completedTasksCount(): number {
    return this.tasks.filter((task) => task.done).length;
  }

  // Get pending tasks count
  get pendingTasksCount(): number {
    return this.tasks.filter((task) => !task.done).length;
  }

  // Track by function for ngFor performance
  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}
