import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy {
  personList: string[];
  isFetching = false;
  private personListSubs: Subscription;
  constructor(private prsService: PersonsService){
  }
  ngOnInit(){
    //this.personList = this.prsService.persons;
    this.personListSubs =  this.prsService.personsChanged.subscribe(persons =>{
      this.personList = persons;
      this.isFetching = false;
   });
   this.isFetching = true;
   this.prsService.fetchPersons();
  }

  ngOnDestroy(){
    this.personListSubs.unsubscribe();
  }

  onRemovePerson(name: string){
    this.prsService.removePerson(name);
  }
}
