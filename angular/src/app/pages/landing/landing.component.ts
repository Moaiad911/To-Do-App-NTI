import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  activeFaq: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.animateStats();
  }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const targetValue = parseInt(target.getAttribute('data-target') || '0');
          this.animateNumber(target, 0, targetValue,2000);
        }
      });
    });

    stats.forEach(stat => observer.observe(stat));
  }

  animateNumber(element: HTMLElement, start: number, end: number, duration: number) {
    const startTime = performance.now();
    
    const updateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };
    
    requestAnimationFrame(updateNumber);
  }
} 