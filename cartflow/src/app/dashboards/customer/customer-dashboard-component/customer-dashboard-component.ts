import { Component } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import { Header } from "../../../components/header/header";
import { RouterOutlet } from '@angular/router';
import { Copyright } from "../../../components/copyright/copyright";

@Component({
  selector: 'app-customer-dashboard-component',
  imports: [Sidebar, Header, RouterOutlet, Copyright],
  templateUrl: './customer-dashboard-component.html',
  styleUrl: './customer-dashboard-component.scss',
})
export class CustomerDashboardComponent {

}
