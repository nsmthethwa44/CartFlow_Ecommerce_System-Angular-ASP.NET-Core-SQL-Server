import { Component, Input } from '@angular/core';
import { SidebarLinks } from '../../constants/sidebar-links';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Auth } from '../../auth/services/auth';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar{
@Input() role: 'admin' | 'customer' = 'customer';

constructor(private authSvc: Auth, private sidebarSvc: SidebarService){}

 get links() {
    return SidebarLinks[this.role] || [];
  }

  logOut(){
    return this.authSvc.logout();
  }

closeSidebar(){
    this.sidebarSvc.closeSidebar();
  }

}
