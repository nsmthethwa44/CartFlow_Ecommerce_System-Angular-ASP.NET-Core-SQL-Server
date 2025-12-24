import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { User } from '../../../models/user';
import { ProductService } from '../../../services/product-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user-service';
import { StatsService } from '../../../services/stats-service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrderDto } from '../../../models/order';
import { OrderService } from '../../../services/order-service';
import { RouterLink } from '@angular/router';
import { curveMonotoneX } from 'd3-shape';


@Component({
  selector: 'app-admin-overview-component',
  imports: [CommonModule, NgxChartsModule, RouterLink],
  templateUrl: './admin-overview-component.html',
  styleUrl: './admin-overview-component.scss',
})
export class AdminOverviewComponent implements OnInit {
products: Product[] =[];
users: User[] =[];
stats: any = {}
orders: OrderDto[] = []
customersChart: any[] = [];
productsChart: any[] = [];
ordersChart: any[] = [];
categoriesChart: any[] = [];
statsOverviewStats: any[] = [];


private baseUrl = environment.apiUrl;

constructor(private productSvc: ProductService, private userSvc: UserService,
   private statsSvc: StatsService, private orderSvc: OrderService){};

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

getProducts(){
  this.productSvc.getProducts().subscribe(res =>{
    this.products = res;
  })
}

getOrders(){
  this.orderSvc.getOrders().subscribe(res =>{
    this.orders =res;
  })
}

getUsers(){
  this.userSvc.getUsers().subscribe(res =>{
    this.users = res;
  })
}

buildSpark(total: number, label: string) {
  return [
    {
      name: label,
      series: [
        { name: '1', value: Math.round(total * 0.6) },
        { name: '2', value: Math.round(total * 0.75) },
        { name: '3', value: Math.round(total * 0.9) },
        { name: '4', value: total }
      ]
    }
  ];
}

getStats() {
  this.statsSvc.getDashboardStats().subscribe(res => {
    this.stats = res;

    // Build tiny spark lines for each stat
      this.customersChart = this.buildSpark(this.stats.totalCustomers || 0, 'Customers');
      this.productsChart = this.buildSpark(this.stats.totalProducts || 0, 'Products');
      this.ordersChart = this.buildSpark(this.stats.totalOrders || 0, 'Orders');
      this.categoriesChart = this.buildSpark(this.stats.totalCategories || 0, 'Categories');
  
    this.statsOverviewStats = [
        { name: 'Customers', value: this.stats.totalCustomers || 0 },
        { name: 'Products', value: this.stats.totalProducts || 0 },
        { name: 'Orders', value: this.stats.totalOrders || 0 },
        { name: 'Categories', value: this.stats.totalCategories || 0 }
      ];
  });
}



ngOnInit(): void {
  this.getProducts();
  this.getUsers();
  this.getStats();
  this.getOrders();
}

deleteProduct(id: number){
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the product.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
             Swal.fire({
                title: 'Deleting Product...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
              });
          this.productSvc.delete(id).subscribe({
            next: () => {
                   Swal.fire({
                        icon: 'success',
                        title: 'Product has been deleted',
                        timer: 1800,
                        showConfirmButton: false
                      });
                this.getProducts();
            },
            error: () => {
               Swal.fire({
                        icon: 'error',
                        title: 'Failed to delete product',
                        timer: 1800,
                        showConfirmButton: false
                      });
            }
          });
        }
      });
}

view: [number, number] = [80, 80]; // tiny chart

sparkView: [number, number] = [100, 40];
curve = curveMonotoneX;

  viewStats: [number, number] = [350, 250];
  colorScheme: any = {
  domain: ['#2563eb', '#f44336', '#1C2A35', '#22c55e', '#FF3CAC']
};

}
