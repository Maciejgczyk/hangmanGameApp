import { Component } from '@angular/core';
import {LayoutComponent} from './layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [LayoutComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent {}
