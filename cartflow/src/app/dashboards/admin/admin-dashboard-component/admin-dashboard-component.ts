import { Component } from '@angular/core';
import { Sidebar } from "../../../components/sidebar/sidebar";
import { Header } from "../../../components/header/header";
import { Copyright } from "../../../components/copyright/copyright";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-component',
  imports: [Sidebar, Header, Copyright, RouterOutlet],
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.scss',
})
export class AdminDashboardComponent {

}
