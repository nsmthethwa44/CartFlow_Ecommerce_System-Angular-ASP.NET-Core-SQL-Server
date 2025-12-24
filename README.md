# CartFlow_Ecommerce_System-Angular-ASP.NET-Core-SQL-Server

CartFlow is a role-based e-commerce platform designed to model a real online shopping system with admin management, customer shopping flow, cart persistence, and order processing.
The system is intentionally built to reflect real-world e-commerce behavior, not a simplified demo store.

Project Goals:
- Model a complete shopping lifecycle: browse → cart → checkout → order
- Support guest and authenticated cart flows
- Maintain clean separation of concerns (Controller → Service → Repository)
- Provide admin analytics and operational control
- Serve as a production-ready full-stack reference project

Core Roles:
Admin
- Manage products and categories
- Monitor orders and customers
- View platform analytics and KPIs

Customer
- Browse products
- Add to cart (guest or logged-in)
- Checkout and place orders
- Track order history

User Flows:
- Customer Flow (Guest & Authenticated)
- Browse products → /products
- View product details
- Add products to cart
- Guest → cart stored in localStorage
- Logged-in → cart stored in database
- View cart → /cart
- Checkout → /checkout
- Place order
- View order confirmation & history
- Guest cart automatically syncs to DB after login.

Admin Flow:
- Login → /admin
- Dashboard overview:
  - Total customers
  - Total products
  - Total orders
  - Total categories
- Manage categories (CRUD + images)
- Manage products (CRUD + stock + images)
- Review orders:
  - Order items
  - Customer details
  - Order status
  - Monitor sales and activity via charts

Key Features:
- Shopping & Cart:
  - Add to cart (guest & logged-in)
  - Persistent cart counter in header
  - Quantity updates
  - Remove items
  - Cart merge after login
- Orders:
  - Order creation from cart
  - Order item snapshot at purchase time
  - Admin order review
  - Customer order history
- Admin Dashboard:
  - KPI stat cards with sparklines
  - Bar & pie charts (ngx-charts)
  - Centralized stats endpoint
- Media Handling:
  - Product & category image uploads
  - Server-stored images with URL mapping

Architecture Overview:
- Backend (ASP.NET Core Web API)
- Layered, SOLID-driven structure:
- Controllers
- Services
- Repositories
- DTOs
- Entities
- Controllers handle HTTP only
- Services handle business logic
- Repositories handle data access
- DTOs isolate API contracts
- No AutoMapper (explicit mapping for clarity)

Frontend (Angular):
- Feature-based module structure
- Shared services (cart, stats, products)
- RxJS for state synchronization
- SCSS modular styling
- Responsive admin & customer UI

Tech Stack:
- Frontend
- Angular 20
- SCSS (modular structure)
- ngx-charts
- RxJS

Backend:
- ASP.NET Core Web API
- Entity Framework Core

Database:
- SQL Server
- Tooling
- RESTful APIs
- JWT-ready auth (pluggable)
- GitHub Actions (CI/CD ready)

API Highlights:
- /api/products
- /api/categories
- /api/cart
- /api/orders
- /api/stats/dashboard

Setup & Running:
- Backend
- dotnet restore
- dotnet run

Frontend:
- npm install --legacy-peer-deps
- ng serve

Production Build:
- ng build --configuration production

What This Project Demonstrates:
- Real e-commerce logic (not CRUD-only)
- Cart persistence strategies (localStorage + DB)
- Clean API layering and contracts
- Admin analytics & dashboards
- Frontend–backend synchronization via RxJS
- Production-oriented structure

License:
- MIT
