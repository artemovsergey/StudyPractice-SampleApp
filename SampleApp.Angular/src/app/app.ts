import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, Header, LoadingSpinner, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SampleApp.Angular');
}
