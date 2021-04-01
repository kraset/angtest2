import { Component, OnInit } from '@angular/core';
import { Pet, PetStoreApiService } from '../services/petstore-api.service';

@Component({
  selector: 'app-pet-store',
  templateUrl: './pet-store.component.html',
  styleUrls: ['./pet-store.component.scss']
})
export class PetStoreComponent implements OnInit {

  pet?: Pet = undefined;

  constructor(private petStoreApiService: PetStoreApiService) { }

  ngOnInit(): void {
    this.petStoreApiService.getPetById(1).subscribe( (pet) => {
      this.pet = pet;
      console.log(pet);
    });
  }
}
