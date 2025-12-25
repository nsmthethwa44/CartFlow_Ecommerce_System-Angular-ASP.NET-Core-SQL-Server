import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboards/admin/admin-dashboard-component/admin-dashboard-component';
import { AdminOverviewComponent } from './dashboards/admin/admin-overview-component/admin-overview-component';
import { CustomerDashboardComponent } from './dashboards/customer/customer-dashboard-component/customer-dashboard-component';
import { CustomerOverviewComponent } from './dashboards/customer/customer-overview-component/customer-overview-component';
import { Home } from './pages/home/home';
import { MainPage } from './pages/main-page/main-page';
import { AuthGuard } from './auth/guards/auth-guard';
import { AdminProductsComponent } from './dashboards/admin/admin-products-component/admin-products-component';
import { AdminCategoriesComponent } from './dashboards/admin/admin-categories-component/admin-categories-component';
import { AdminUsersComponent } from './dashboards/admin/admin-users-component/admin-users-component';
import { About } from './pages/about/about';
import { Products } from './pages/products/products';
import { Blog } from './pages/blog/blog';
import { Contact } from './pages/contact/contact';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { AdminOrdersComponent } from './dashboards/admin/admin-orders-component/admin-orders-component';
import { Wishlist } from './pages/wishlist/wishlist';

export const routes: Routes = [
    {path: "admin", component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' }, children:[
        {path: "", component: AdminOverviewComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
        {path: "products", component: AdminProductsComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
        {path: "categories", component: AdminCategoriesComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
        {path: "users", component: AdminUsersComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
        {path: "orders", component: AdminOrdersComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},
        {path: "settings", component: AdminOverviewComponent, canActivate: [AuthGuard], data: { role: 'Admin' },},

    ]},

     {path: "customer", component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { role: 'Customer' }, children:[
        {path: "", component: CustomerOverviewComponent, canActivate: [AuthGuard], data: { role: 'Customer' },},
    ]},

    {path: "", component: MainPage, children:[
        {path: "", component: Home},
        {path: "about", component: About},
        {path: "products", component: Products},
        {path: "blog", component: Blog},
        {path: "contact", component: Contact},
        {path: "cart", component: Cart},
        {path: "wishlist", component: Wishlist},
        {path: "checkout", component: Checkout},
    ]},
    {path:"**", redirectTo: "",}
];
