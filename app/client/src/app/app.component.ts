import { Component } from '@angular/core';
import { tfsAnimations } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: tfsAnimations
})
export class AppComponent {
  title = 'app';
}
