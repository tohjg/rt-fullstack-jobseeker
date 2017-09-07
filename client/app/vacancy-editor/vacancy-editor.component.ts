import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Vacancy } from "../models/vacancy";
import { Apollo } from "apollo-angular";
import gpl from "graphql-tag";

const requestVacancyMutation = gpl`
  mutation newTalent($position:String!, 
    $specs:String!, 
    $location:String!, 
    $salary_min:Int!, 
    $salary_max:Int!, 
    $ctc_name:String!, 
    $ctc_phone:String!,
    $ctc_email:String!
  ) {
      requestTalentSearch(params: {
        position: $position,
        spec: $specs,
        location: $location,
        minSalary: $salary_min,
        maxSalary: $salary_max,
        contactName: $ctc_name,
        contactPhone: $ctc_phone,
        contactEmail: $ctc_email
      }) {
        id
      }
    }
`

@Component({
  selector: 'app-vacancy-editor',
  templateUrl: './vacancy-editor.component.html',
  styleUrls: ['./vacancy-editor.component.css']
})
export class VacancyEditorComponent implements OnInit {

  @ViewChild('vacancyFormDir') form: HTMLFormElement;
  submitting = false;
  model = new Vacancy();

  constructor(
    private apollo:Apollo,
    private router:Router
  ) {
    
  }

  ngOnInit() {
    
  }

  requestVacancy() {
    this.submitting = true;
    // return false;
    console.log('submitting', this.model)

    this.apollo.mutate({
      mutation: requestVacancyMutation,
      variables: this.model,
    }).subscribe(({data}) => {
      // route to main page
      console.log('-- talent requested', data);
    }, (error) => {
      console.log('-- submittion error', error);
    });
  }

}
