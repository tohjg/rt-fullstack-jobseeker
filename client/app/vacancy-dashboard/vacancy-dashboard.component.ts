import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gpl from 'graphql-tag';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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

const removalVacancyMutation = gpl`
  mutation removeVacancy($id:ID) {
    removeTalentSearch(id: $id){
      ok
    }
  }
`

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.css']
})
export class VacancyDashboardComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;

  vacancies: Vacancy[] = [];
  deleting_item_label: string;

  constructor(
    private apollo:Apollo,
    private modalService:NgbModal
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

  removeVacancy(item:Vacancy) {
    this.deleting_item_label = item.position;

    this.modalService.open(this.deleteModal).result
      .then((result) => {
        console.log('result-=', result);
        this.confirmRemoveVacancy(item);
      }, (reason) => {
        // ignore whatever reason
      })
  }

  private confirmRemoveVacancy(item:Vacancy) {
    //TODO: call mutation
  }

}
