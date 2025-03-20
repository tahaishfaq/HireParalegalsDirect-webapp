import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-paralegals-by-practice',
  templateUrl: './paralegals-by-practice.component.html',
  styleUrls: ['./paralegals-by-practice.component.scss']
})
export class ParalegalsByPracticeComponent implements OnInit {
  name = "Angular " + VERSION.major;
  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
