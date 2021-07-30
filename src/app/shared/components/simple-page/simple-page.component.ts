import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.css']
})
export class SimplePageComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() number?: string;
  @Input() icon?: string;
  @Input() buttonText: string = '';
  @Input() centerText?: boolean = false;
  @Input() buttonDisabled?: boolean = false;
  @Input() route?: string | undefined;
  @Output() buttonEvent = new EventEmitter();

  constructor(private router: Router) { }

  buttonClicked() {
    if (this.route) {
      this.router.navigateByUrl(this.route);
    } else {
      this.buttonEvent.emit();
    }
  }
}
