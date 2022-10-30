import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      class="btn_structure_main {{ customClass }}"
      (click)="emitHandler()"
    >
      {{ text }}
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input('text') text: string | undefined;
  @Input('customClass') customClass: string | undefined;
  @Output() btnClick: any = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  emitHandler() {
    this.btnClick.emit();
  }
}
