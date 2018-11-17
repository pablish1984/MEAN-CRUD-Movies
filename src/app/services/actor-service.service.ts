import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActorModel } from '../models/actor-model';

import { ActorComponent } from '../components/actor/actor.component';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ActorServiceService {

  selectedActor: ActorModel;
  list_actors: ActorModel[];

  readonly api_URI: "http://localhost:3000/api/";

  constructor(private http: HttpClient) {
    this.selectedActor = new ActorModel();
   }

  getActors () {
    return this.http.get('http://localhost:3000/api/actors');
  }

  postActor(newActor: ActorModel) {
    return this.http.post('http://localhost:3000/api/actors', newActor);
  }

  putActor(newActor: ActorModel) {
    return this.http.put('http://localhost:3000/api/actors/'+`${newActor._id}`, newActor);
  }

  deleteActor(oldActor: ActorModel) {
    return this.http.delete('http://localhost:3000/api/actors/'+`${oldActor._id}`);
  }

}
