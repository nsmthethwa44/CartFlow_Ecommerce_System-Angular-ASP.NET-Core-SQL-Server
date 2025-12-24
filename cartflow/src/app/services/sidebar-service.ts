import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
   toggleSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("hide");
  }

  closeSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.remove("hide");
  }
}
