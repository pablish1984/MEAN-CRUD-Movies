import { Component, OnInit } from '@angular/core';

import { ActorServiceService } from '../../services/actor-service.service';
import { NgForm } from '@angular/forms';
import { ActorModel } from '../../models/actor-model';

// es una variable necesaria para usar Toast. Con toast puedo enviar mensajes de accion a mi navegador usando materialize
declare var M: any;

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
  providers: [ActorServiceService]
})
export class ActorComponent implements OnInit {

  constructor(public actorService: ActorServiceService) { }

  ngOnInit() {
    this.getActors();
  }

  resetForm(form?: NgForm){
    if (form) {
      form.reset();
      this.actorService.selectedActor = new ActorModel();
    }
  }

  getActors() {
    return this.actorService.getActors()
    .subscribe(resp => {
      this.actorService.list_actors = resp as ActorModel[];
    })
  }

  addActor(form: NgForm) {
    
    if (form.value._id) {
      this.actorService.putActor(form.value)
      .subscribe(resp=> {
        console.log(resp);
      })
    } else {
      this.actorService.postActor(form.value)
    .subscribe(resp=> {
      console.log(resp);
      this.resetForm(form);
      M.toast({html: "Usuario creado correctamente"});

      this.getActors();
    })
    }    
  }

  editActor(actor: ActorModel){
    this.actorService.selectedActor = actor;
     //this.actorService.putActor(actor);
  }
}
