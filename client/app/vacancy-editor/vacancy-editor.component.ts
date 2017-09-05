import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacancy } from "../models/vacancy";

@Component({
  selector: 'app-vacancy-editor',
  templateUrl: './vacancy-editor.component.html',
  styleUrls: ['./vacancy-editor.component.css']
})
export class VacancyEditorComponent implements OnInit {

  @ViewChild('vacancyFormDir') form: HTMLFormElement;
  submitting = false;
  model = new Vacancy();

  constructor() {
    
  }

  ngOnInit() {
    
  }

  requestVacancy() {
    this.submitting = true;
    // return false;
    console.log('submit')
  }

}
