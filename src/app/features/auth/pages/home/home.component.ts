import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router, private el: ElementRef) {

  }

  login() {
    this.router.navigate(['/login'])
  }
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    const elements = document.querySelectorAll('.animate');
    elements.forEach(el => observer.observe(el));
  }
}
