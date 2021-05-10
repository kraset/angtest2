import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-verify-input',
  templateUrl: './verify-input.component.html',
  styleUrls: ['./verify-input.component.scss']
})
export class VerifyInputComponent implements OnInit {

  // Swedish car reg numbers: "abc 123" or "ABC 123"
  unamePattern = '([a-z]|[A-Z]){3}\\s\\d{3}';
  username = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
