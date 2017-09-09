import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
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
      id
    }
  }
`

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.scss']
})
export class VacancyDashboardComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;

  vacancies: Vacancy[];
  deleting_item_label: string;
  listQuery: ApolloQueryObservable<any>;

  constructor(
    private apollo:Apollo,
    private modalService:NgbModal
  ) { 

  }

  ngOnInit() {
    // create observable
    this.listQuery = this.apollo.watchQuery<any>({
      query: vacanciesListQuery
    });

    // subscribe to the observable
    this.listQuery.subscribe(({data}) => {
      this.vacancies = data.vacancies.reduce((acc, vacancy) => {
        acc.push(new Vacancy(vacancy.id, vacancy.position, null, vacancy.location, null, null, vacancy.contactName));
        return acc;
      }, []);
    });

    this.getVacancyList();
  }

  getVacancyList() {
    this.listQuery.refetch();
  }

  removeVacancy(item:Vacancy) {
    this.deleting_item_label = item.position;

    this.modalService.open(this.deleteModal).result
      .then((result) => {
        this.confirmRemoveVacancy(item);
      }, (reason) => {
        // ignore whatever reason
      })
  }

  private confirmRemoveVacancy(item:Vacancy) {
    this.apollo.mutate({
      mutation: removalVacancyMutation,
      variables: item
    }).subscribe(
      ({data})=> {
        // successfully deleted
        this.getVacancyList();
      },
      (error) => {
        // removal failed

      }
    )
  }

}
