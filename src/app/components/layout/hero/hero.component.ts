import { Component, OnInit } from '@angular/core';
import { SharedUserService } from '../../shared/services/shared-user.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    

  }
  sayHi() {
    console.log('Hi');
  }
}