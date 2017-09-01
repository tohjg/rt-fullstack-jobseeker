import { Component, OnInit } from '@angular/core';
import { Vacancy } from "../models/vacancy";

@Component({
  selector: 'app-vacancy-editor',
  templateUrl: './vacancy-editor.component.html',
  styleUrls: ['./vacancy-editor.component.css']
})
export class VacancyEditorComponent implements OnInit {

  submitting = false;
  model = new Vacancy(
    NaN,
    "",
    "",
    "",
    NaN,
    NaN,
    "",
    "",
    ""
  );

  constructor() {
    console.log('model', this.model)
  }

  ngOnInit() {
    
  }

  requestVacancy() {
    this.submitting = true;
    // return false;
    console.log('submit')
  }

}
