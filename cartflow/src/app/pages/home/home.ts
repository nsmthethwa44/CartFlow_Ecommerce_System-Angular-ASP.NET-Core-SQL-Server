import { Component } from '@angular/core';
import { Hero } from "../../sections/hero/hero";
import { Categories } from '../../sections/categories/categories';
import { BestDeals } from '../../sections/best-deals/best-deals';
import { Cta } from '../../sections/cta/cta';
import { Popular } from '../../sections/popular/popular';
import { News } from '../../sections/news/news';

@Component({
  selector: 'app-home',
  imports: [Hero, Categories, BestDeals, Cta, Popular, News],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
