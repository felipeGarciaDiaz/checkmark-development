import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(100%)'
      })),
      transition('visible => hidden', [
        animate('0.5s ease-out')
      ]),
      transition('hidden => visible', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('0.5s ease-in')
      ]),
    ])
  ]
})
export class ToastComponent implements OnChanges {
  @Input() message: string = '';
  @Input() type: 'success' | 'fail' | 'warn' | 'complete' = 'success';
  isVisible: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['isVisible'] && this.isVisible) {
      this.showToast();
    }
  }

  showToast() {
    setTimeout(() => {
      this.isVisible = false;
    }, 3500)
  }

  getToastClass() {
    switch (this.type) {
      case 'success':
        return 'toast-success';
      case 'fail':
        return 'toast-fail';
      case 'warn':
        return 'toast-warning';
      case 'complete':
        return 'toast-complete';
      default:
        return '';
    }
  }
}
