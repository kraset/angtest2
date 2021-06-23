import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface PhoneNumber {
  areaCode: string;
  number: string;
}

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss'],
})
export class FormExampleComponent implements OnInit {
  personFormGroup: FormGroup;
  personFormGroupNested: FormGroup;
  personFormGroupWithArray: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createSimpleFormGroup();
    this.createNestedFormGroup();
    this.createFormGroupWithArray();
  }

  ngOnInit(): void {}

  createPhoneNumberFormGroup(): FormGroup {
    return this.formBuilder.group({
      areaCode: '',
      number: '',
    } as PhoneNumber);
  }

  createSimpleFormGroup(): void {
    this.personFormGroup = this.formBuilder.group({
      name: '',
      age: 0,
      phone: '',
    });
    this.personFormGroup.valueChanges.subscribe((value) => console.log(value));
  }

  // Nested formgroup
  createNestedFormGroup(): void {
    this.personFormGroupNested = this.formBuilder.group({
      name: '',
      age: 0,
      homePhone: this.createPhoneNumberFormGroup(),
      workPhone: this.createPhoneNumberFormGroup(),
    });
    // Note: cannot add workphone using a const phoneWithArea definition,
    // because the form definition is also the actual data container,
    // and they will then refer to the same object to hold the data!
    // Therefore, call a method to create a new formgroup for each.
  }

  createFormGroupWithArray(): void {
    this.personFormGroupWithArray = this.formBuilder.group({
      name: '',
      age: 0,
      phones: this.formBuilder.array([]),
    });
  }

  getPhones(): FormArray {
    return this.personFormGroupWithArray.get('phones') as FormArray;
  }

  onClickAddPhoneNumber(): void {
    this.getPhones().push(
      this.createPhoneNumberFormGroup()
    );
  }


}
