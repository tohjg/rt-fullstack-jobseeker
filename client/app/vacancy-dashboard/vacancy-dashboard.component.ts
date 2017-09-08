import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gpl from 'graphql-tag';

import { Vacancy } from '../models/vacancy';

const vacanciesListQuery = gpl`
  query getVacancies {
    vacancies {
      id,
      position,
      location,
      contactName
    }
  }
`

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.css']
})
export class VacancyDashboardComponent implements OnInit {

  vacancies: Vacancy[] = [];

  constructor(
    private apollo:Apollo
  ) { 

  }

  ngOnInit() {
    console.log('hello world on init')
    this.getVacancyList();
  }

  getVacancyList() {
    this.apollo.watchQuery<any>({
      query: vacanciesListQuery
    }).subscribe(({data}) => {
      this.vacancies = data.vacancies.reduce((acc, vacancy) => {
        acc.push(new Vacancy(vacancy.id, vacancy.position, null, vacancy.location, null, null, vacancy.contactName));
        return acc;
      }, []);
    });
  }

}
