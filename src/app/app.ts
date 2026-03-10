import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  router = inject(Router)


  ngOnInit() {
    //Runs when the website loads
      if (localStorage.getItem('user') == null) {
        //this.router.navigate(['account']);
      }
    }
}
