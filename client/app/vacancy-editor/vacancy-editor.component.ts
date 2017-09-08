import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Vacancy } from "../models/vacancy";
import { Apollo } from "apollo-angular";
import gpl from "graphql-tag";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

const requestVacancyMutation = gpl`
  mutation newTalent($position:String!, 
    $specs:[String]!, 
    $location:String!, 
    $salary_min:Int!, 
    $salary_max:Int!, 
    $ctc_name:String!, 
    $ctc_phone:String!,
    $ctc_email:String!
  ) {
      requestTalentSearch(params: {
        position: $position,
        skills: $specs,
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

const ERR_NETWORK = 'We are not able to send your data to our server. Please check your network connection and try again.';
const ERR_DEFAULT = 'Don\'t worry. We will have someone to fix it for you. You may try again later.';

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
  model = new Vacancy();
  errorMessage = '';
  skills = [
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

  constructor(
    private apollo:Apollo,
    private router:Router,
    private modalService:NgbModal
  ) {
    
  }

  ngOnInit() {

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
