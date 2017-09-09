import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Vacancy } from "../models/vacancy";
import { Apollo } from "apollo-angular";
import gpl from "graphql-tag";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

const requestVacancyMutation = gpl`
  mutation newTalent($position:String!, 
    $specs:[String]!, 
    $location:String!, 
    $salary_range:[Int]!, 
    $ctc_name:String!, 
    $ctc_phone:String!,
    $ctc_email:String!,
    $id: ID
  ) {
      requestTalentSearch(params: {
        position: $position,
        skills: $specs,
        location: $location,
        salaryRange: $salary_range,
        contactName: $ctc_name,
        contactPhone: $ctc_phone,
        contactEmail: $ctc_email,
        id: $id
      }) {
        id
      }
    }
`

const vacancyQuery = gpl`
query getVacancy($id:ID) {
  vacancy(id: $id) {
    id,
    position,
    skills,
    location,
    salaryRange,
    contactName,
    contactEmail,
    contactPhone
  }
}
`

const ERR_NETWORK = 'We are not able to send your data to our server. Please check your network connection and try again.';
const ERR_DEFAULT = 'Don\'t worry. We will have someone to fix it for you. You may try again later.';
const SUCCESS_NEW = 'We will have a recruitment consultant contact you once we found the right people for your business. In meanwhile, our intelligent system will introduce some of the personel that match your vacancy requirement at the Vacancy dashboard.';
const SUCCESS_EDIT = 'Your changes have being made.';

@Component({
  selector: 'app-vacancy-editor',
  templateUrl: './vacancy-editor.component.html',
  styleUrls: ['./vacancy-editor.component.scss']
})
export class VacancyEditorComponent implements OnInit {

  @ViewChild('vacancyFormDir') form: HTMLFormElement;
  @ViewChild('successModal') successModal;
  @ViewChild('errorModal') errorModal;

  submitting = false;
  model: Vacancy = new Vacancy();
  errorMessage: string = '';
  skills: string[] = [
    'C#', '.Net', 'PHP', 'Python', 'C++', 'Java',
    'Javascript', 'CSS', 'SASS', 'HTML5', 'HTML',
    'Go', 'SQL', 'mySQL', 'MSSQL', 'Lisp', 'Kotlin',
    'Ruby', 'Haskell', 'NodeJS', 'Actionscript', 'Markdown',
    'Lisp', 'Perl', 'COBOL', 'CoffeeScript', 'TypeScript',
    'Pascal', 'Bash', 'BASIC', 'D', 'Emac', 'Objective-C',
    'Swift', 'Erling', 'Euler', 'Processing', 'F', 'F#',
    'Haxe', 'JADE', 'J#', 'J', 'Kaleidoscope', 'Lagoona', 
    'Lava'
  ];
  id: string;
  successMessage: string;
  config: any = {
    behaviour: 'drag',
    connect: true,
    step: 100,
    range: {
      min: 0,
      max: 90000
    },
    tooltips: [true, true],
    keyboard: true,
  };

  constructor(
    private apollo:Apollo,
    private router:Router,
    private modalService:NgbModal,
    private route:ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.id = params['id'];

      if (this.id) {
        // in edit mode
        this.successMessage = SUCCESS_EDIT;
        this.queryVacancy(this.id);
      } else {
        // otherwise, in new mode
        this.successMessage = SUCCESS_NEW;
      }
    })
  }

  queryVacancy(id:string) {
    this.apollo.watchQuery<any>({
      query: vacancyQuery,
      variables: {
        id: id
      }
    }).subscribe(({data}) => {
      this.model = new Vacancy(
        data.vacancy.id,
        data.vacancy.position,
        data.vacancy.skills,
        data.vacancy.location,
        data.vacancy.salaryRange,
        data.vacancy.contactName,
        data.vacancy.contactPhone,
        data.vacancy.contactEmail
      );
    });
  }

  requestVacancy() {
    this.submitting = true;
    console.log('submitting', this.model);
    this.apollo.mutate({
      mutation: requestVacancyMutation,
      variables: this.model,
    }).subscribe(({data}) => {
      // show success modal
      this.openSuccessModal();
    }, (error) => {
      // show error modal
      const errMsg:string = error.message;
      
      if (errMsg.includes('Network error')) {
        // assume data unable to send to server
        this.openErrorModal(ERR_NETWORK);
      } else {
        // assume data failed at the backend
        this.openErrorModal();
        console.log('Mutation error:', error);
      }
    });
  }

  openSuccessModal() {
    this.openModal(this.successModal, {
      // disable keyboard escape key
      keyboard: false,
      // prevent user close the modeal
      backdrop: 'static'
    }, (args) => {
      // after user click ok, redirect to main page
      this.router.navigate(['/']);
    });
  }

  openErrorModal(msg:string = ERR_DEFAULT) {
    this.errorMessage = msg;
    this.openModal(this.errorModal);
  }

  openModal(content:any, options?:NgbModalOptions, close?: Function) {
    this.modalService.open(content, options).result
      .then((result) => {
        close(result);
      }, (reason) => {
        close(reason);
      });
  }

}
