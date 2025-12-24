import { Component } from '@angular/core';
import { Marquee } from "../../components/marquee/marquee";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [Marquee, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
