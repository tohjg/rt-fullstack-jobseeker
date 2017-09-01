import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.css']
})
export class VacancyDashboardComponent implements OnInit {

  constructor() { 
    console.log('hello world!!!')
  }

  ngOnInit() {
    console.log('hello world on init')
  }

}
