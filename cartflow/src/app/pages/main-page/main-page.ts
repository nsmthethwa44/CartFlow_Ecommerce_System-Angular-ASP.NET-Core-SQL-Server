import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeader } from "../../components/main-header/main-header";
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, MainHeader, Footer],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

}
