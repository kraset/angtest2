import { Component, OnInit } from '@angular/core';
import {
  Pet,
  PetStoreApiService,
} from '../../data/services/petstore-api.service';

const MAX_PETS = 10;
@Component({
  selector: 'app-pet-store',
  templateUrl: './pet-store.component.html',
  styleUrls: ['./pet-store.component.scss'],
})
export class PetStoreComponent implements OnInit {
  pets: Pet[] = [];
  loaded = 0;
  petName: 'undefined';
  petId?: number = undefined;

  constructor(private petStoreApiService: PetStoreApiService) {}

  ngOnInit(): void {
    for (let i = 0; i < MAX_PETS; i++) {
      this.petStoreApiService.getPetById(i + 1).subscribe(
        (petFromResponse: Pet) => {
          this.pets.push(petFromResponse);
          console.log(petFromResponse);
          this.loaded++;
        },
        (error) => {
          console.log('Could not find pet with id: ', i + 1);
          this.loaded++;
        }
      );
    }
  }

  isLoading(): boolean {
    return this.loaded < MAX_PETS;
  }

  onClickUpdatePet(): void {
    if (this.petName && this.petId) {
      const pet = this.pets.find((p) => p.id === this.petId);
      if (pet) {
        const newPet = new Pet({
          id: pet.id,
          name: this.petName,
          photoUrls: pet.photoUrls,
        });
        this.petStoreApiService.updatePet(newPet).subscribe(
          () => {
            pet.name = this.petName;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
