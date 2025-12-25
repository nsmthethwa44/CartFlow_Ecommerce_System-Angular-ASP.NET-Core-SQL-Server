CartFlow – Full-Stack E-Commerce System - (Angular, ASP.NET Core Web API, SQL Server)

CartFlow is a full-stack, role-based e-commerce platform designed to model real online shopping behavior, including product management, cart persistence, checkout flows, and order processing.
The system is intentionally built to reflect production-level e-commerce logic, not a simplified demo store.

Project Overview:
- CartFlow models the complete shopping lifecycle from product discovery to order placement, while supporting both guest and authenticated users.
- The project focuses on clean API layering, cart persistence strategies, admin operational control, and frontend–backend state synchronization.

User Roles & Flows:
- Admin:
	- Manages products and categories
	- Reviews customer orders
	- Monitors platform analytics and KPIs
	- Oversees store activity via dashboards

- Customer:
	- Browses products
	- Adds items to cart as guest or logged-in user
	- Completes checkout and places orders
	- Tracks order history

Features:
- Shopping & Cart:
	- Add to cart (guest & authenticated)
	- Cart persistence via localStorage and database
	- Automatic cart merge after login
	- Persistent cart counter in header
	- Quantity updates and item removal

- Orders:
	- Order creation from cart
	- Order item snapshot at purchase time
	- Customer order history
	- Admin order review with customer details

- Admin Dashboard:
	- KPI stat cards with sparklines
	- Bar and pie charts using ngx-charts
	- Centralized dashboard stats endpoint

- Media Handling:
	- Product and category image uploads
	- Server-stored images with URL mapping

Tech Stack:
- Frontend:
	- Angular 20
	- SCSS (modular structure)
	- ngx-charts
	- RxJS

- Backend:
	- ASP.NET Core Web API
	- Entity Framework Core

- Database:
	- SQL Server
	- Architecture & Tooling
	- RESTful APIs
	- JWT-ready authentication (pluggable)
	- GitHub Actions (CI/CD ready)
	- SOLID principles and clean layering

- Architecture & Design:
	- CartFlow follows a strict layered architecture with clear separation of responsibilities:
	- Controllers handle HTTP concerns only
	- Services encapsulate business logic
	- Repositories manage data access
	- DTOs define API contracts
	- Explicit mapping is used (no AutoMapper) for clarity and control

This structure keeps the system maintainable, testable, and easy to extend.

Project Structure:
- /backend   → ASP.NET Core Web API
- /frontend  → Angular application
- /db        → Database scripts / migrations

Setup & Running:
- Backend:
	- dotnet restore
	- dotnet run

- Frontend:
	- npm install --legacy-peer-deps
	- ng serve

Production Build:
- ng build --configuration production

Links:
- Live Demo: https://cartflowsystem.netlify.app/
- GitHub Repository: This Repository
