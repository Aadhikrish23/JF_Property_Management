# Property Management CRM Dashboard

Technical Assessment Submission

Tech Stack:
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express
- Prisma
- PostgreSQL

Project documentation is available under /docs.

## Project Structure

/docs      -> Project artifacts and design documents

/backend   -> Express + Prisma backend

/frontend  -> React + TailwindCSS
# JF Property Management CRM
A professional, single-tenant Customer Relationship Management (CRM) dashboard designed for estate agencies and property management professionals to manage properties, clients, viewings, tasks, and notifications. 
---
## Overview
The **JF Property Management CRM** is an internal web application built for property agents and managers to streamline daily operations. It acts as an operational command center, aggregating key workflows—such as collecting viewing feedback, tracking offer progressions, scheduling market appraisals, and managing task lists—into an intuitive, responsive, and real-time dashboard interface.
---
## Features
### Frontend
* **Dashboard**: Key insights including Quick Actions, Chase-Ups, a Workflow Command Centre (tabbed task view), Notifications, and Upcoming Activities.
* **Properties Management**: Complete list and detailed view of properties under management with status tracking (`ACTIVE`, `UNDER_OFFER`, `SOLD`). Includes property creation via modal forms.
* **Clients Management**: Manage client records (Buyers, Sellers, Landlords, Tenants) with contact details, status, and linked viewings.
* **Viewings Management**: Track viewing appointments linked to properties and clients with status tracking (`BOOKED`, `CONFIRMED`, `COMPLETED`).
* **Tasks Management**: Manage checklist items with categorization (`VIEWING`, `FEEDBACK`, `OFFER`, `APPRAISAL`, `TODO`, `PROGRESSION`), priority levels (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), and status updates (`PENDING`, `IN_PROGRESS`, `COMPLETED`).
* **Notifications**: Informational dashboard notifications (e.g., "New Offer Received", "Diary Collision Detected") with mark-as-read functionality.
* **Analytics**: Operational KPI dashboard displaying total Properties, Clients, Viewings, and Tasks using live backend data. Designed as a lightweight management overview aligned with the MVP scope.
* **Global Search**: Search properties (by title) and clients (by name/email) in real time from the header search bar.
* **Settings**: Configure application preferences, toggle user themes, and access logout actions.
* **Dark/Light Theme**: Immediate and persistent styling switch synced with the browser's local storage.
* **Responsive Design**: Custom adaptive layout tailored for mobile, tablet, and desktop devices.
### Backend
* **REST APIs**: Modular, stateless API endpoints organized by business resource.
* **PostgreSQL**: Relational database storing user, client, property, task, viewing, notification, and event records.
* **Prisma ORM**: Type-safe database queries, schemas, migrations, and seeding scripts.
* **Authentication**: Token-based security using custom JSON Web Tokens (JWT) sent via `Authorization: Bearer <token>` headers.
* **Protected Routes**: Middleware (`requireAuth`) validating incoming tokens to guard sensitive data access.
* **Validation**: Robust request payload schemas powered by Zod.
* **Pagination**: Standard limit-offset query parameters (`?page=1&limit=20`) supporting large property and client records.
* **Filtering**: Flexible querying options on properties (by status) and tasks (by type/status).
* **Search**: Case-insensitive substring matching database search.
---
## Tech Stack
### Frontend
* **React** (v19)
* **TypeScript**
* **React Router** (v7)
* **React Query** (v5)
* **Axios**
* **Tailwind CSS v4** (utilizing Vite plugin integration)
* **Vite**
### Backend
* **Node.js**
* **Express**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
---
## Architecture Overview
The system uses a decoupled client-server architecture:
```text
React Client (Vite + TS)
       │
       ▼ (Axios HTTP Requests)
Express REST API (Node + TS)
       │
       ▼ (Prisma Client queries)
   PostgreSQL
```
### Frontend Structure
The frontend is organized around **feature-based directories** under `src/features/`, ensuring high modularity and maintainability.
* **Pages Layer** (`src/pages/`): Contains page-level layout setups, serving as the entry points for client routes.
* **Features Layer** (`src/features/`): Each subdirectory represents a domain workspace (e.g., `properties`, `tasks`) and groups its specific UI components, data structures, and state.
* **Shared Components** (`src/components/`): Separated into layout wrappers (`Header`, `Sidebar`, `AppLayout`) and primitive UI components (`Modal`, `Table`, `Pagination`).
* **Services Layer** (`src/services/`): API clients built with Axios configured with auth interceptors to inject JWT headers and handle 401 token expiration.
### Backend Structure

The backend follows a modular Controller-Service architecture.

* **Routes Layer**: Defines API endpoints and attaches middleware.
* **Controller Layer**: Handles request parsing and response formatting.
* **Service Layer**: Contains business logic and Prisma operations.
* **Validation Layer**: Zod-based request validation.
* **Middleware Layer**: Authentication and error handling.
* **Shared Layer**: Common utilities and helper functions.

## Folder Structure
```text
.
├── backend/                  # Express + Prisma Backend Service
│   ├── prisma/               # Schema Definition, Migrations, and Seed File
│   │   ├── migrations/       # Database Schema Migration Files
│   │   └── seed.ts           # Development Database Seeding Script
│   └── src/                  # Backend Application Source
│       ├── config/           # App Configuration (Environment and Database)
│       ├── middleware/       # Auth validation, Error handling, and logs
│       ├── modules/          # Layered Feature Modules
│       │   ├── auth/         # Login, JWT issuing
│       │   ├── clients/      # Client listing, fetching, and creation
│       │   ├── dashboard/    # Aggregated dashboard data loading
│       │   ├── notifications/# Notifications query and read mark status
│       │   ├── properties/   # Property management endpoints
│       │   ├── search/       # Global multi-model search endpoint
│       │   ├── tasks/        # Task checklist queries and status edits
│       │   └── viewings/     # Viewing schedule endpoints
│       ├── shared/           # Common utilities and response templates
│       ├── validators/       # Zod schemas for incoming requests
│       ├── app.ts            # Express setup and middleware registration
│       └── server.ts         # Application entry-point and port binder
│
├── docs/                     # Design documents and business specifications
│
└── frontend/                 # React SPA Client
    ├── public/               # Static assets
    └── src/                  # Frontend Application Source
        ├── app/              # Router declaration and providers wrapper
        ├── assets/           # UI media
        ├── components/       # Core Layouts and Generic UI Primitives
        │   ├── layout/       # AppLayout, Header, Sidebar
        │   └── ui/           # Modal, Table, Pagination
        ├── constants/        # Application constant values
        ├── features/         # Modular feature folders (UI, Hooks, components)
        │   ├── analytics/    # Visual data panels
        │   ├── auth/         # Login components, context, and state
        │   ├── clients/      # Client listing and creation
        │   ├── dashboard/    # Widgets for chase-ups, actions, board
        │   ├── notifications/# Read status indicators and alerts list
        │   ├── properties/   # Property details and grid lists
        │   ├── search/       # Real-time search presentation
        │   ├── settings/     # Preferences and account settings
        │   ├── tasks/        # Task table status updating
        │   └── viewings/     # Viewing logs and booking modals
        ├── hooks/            # Generic utility React hooks
        ├── pages/            # Page layouts representing SPA endpoints
        ├── services/         # Axios clients and interceptors
        ├── types/            # TypeScript models and namespace interfaces
        ├── utils/            # Helper functions
        ├── App.css           # Local overrides
        ├── index.css         # Tailwind directives and custom theme colors
        └── main.tsx          # Client bootstrapper
```
---
## Installation
### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Set up environment variables (see [Environment Variables](#environment-variables)).
4. Run Prisma migrations to set up your PostgreSQL database structure:
   ```bash
   npm run prisma:migrate:dev
   ```
5. Seed the database with sample profiles, viewings, and tasks:
   ```bash
   npm run db:seed
   ```
### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Set up frontend configurations (if different from the default port).
---
## Environment Variables
### Backend Configuration (`backend/.env`)
Ensure a `.env` file is present in the `backend/` directory matching the following variables:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/jf_property_crm?schema=public"
JWT_SECRET="YOUR_JWT_SECRET_HEX_OR_STRING"
```
### Frontend Configuration (`frontend/.env`)
Configure local parameters via custom variables if your development ports differ:
```env
VITE_API_URL="http://localhost:5000/api/v1"
```
---
## Running the Application
### Backend Commands
Start the development server with hot-reloading active:
```bash
# Inside /backend
npm run dev
```
Build and run for production:
```bash
npm run build
npm start
```
### Frontend Commands
Start the Vite development web server:
```bash
# Inside /frontend
npm run dev
```
Build the optimized production build:
```bash
npm run build
```
---
## Authentication

The application includes JWT-based authentication.

### Authentication Flow

1. User logs in with email and password.
2. Backend validates credentials.
3. Backend generates a signed JWT.
4. Token is stored in localStorage.
5. Axios automatically attaches the Authorization header.
6. Protected routes validate JWTs.
7. Invalid or expired tokens trigger automatic logout and redirection.

### Demo Credentials

**Email:** admin@crm.local

**Password:** demo123

---
## Security Notes

### Implemented

* JWT Authentication
* Protected API Routes
* Axios Authorization Interceptor
* Zod Request Validation
* Prisma ORM
* Environment Variable Configuration
* Automatic Logout on 401 Responses

### Out of Scope

* RBAC
* MFA
* Refresh Tokens
* OAuth
* Password Reset Workflows

These items were intentionally excluded to remain within assessment scope.

## API Overview
All API request bodies are validated on the server using Zod schemas. Successful requests return a `{ success: true, data: ... }` response.
| Resource | Method | Endpoint | Description | Protected |
|----------|---------|----------|-------------|-----------|
| Auth | POST | `/api/v1/auth/login` | Authenticate credentials and receive JWT | No |
| Dashboard | GET | `/api/v1/dashboard` | Fetch dashboard data and metrics | Yes |
| Properties | GET | `/api/v1/properties` | List properties | Yes |
| Properties | GET | `/api/v1/properties/:id` | Get property details | Yes |
| Properties | POST | `/api/v1/properties` | Create property | Yes |
| Clients | GET | `/api/v1/clients` | List clients | Yes |
| Clients | GET | `/api/v1/clients/:id` | Get client details | Yes |
| Clients | POST | `/api/v1/clients` | Create client | Yes |
| Viewings | GET | `/api/v1/viewings` | List viewings | Yes |
| Viewings | POST | `/api/v1/viewings` | Create viewing | Yes |
| Tasks | GET | `/api/v1/tasks` | List tasks | Yes |
| Tasks | PATCH | `/api/v1/tasks/:id` | Update task status | Yes |
| Notifications | GET | `/api/v1/notifications` | List notifications | Yes |
| Notifications | PATCH | `/api/v1/notifications/:id/read` | Mark notification as read | Yes |
| Search | GET | `/api/v1/search?q=` | Global search | Yes |
## Responsive Design
The CRM layout is fully responsive, catering to multiple viewing viewports:
* **Mobile Portability (< 768px)**:
  * Persistent sidebars are hidden. Users navigate via a slide-out hamburger menu drawer triggered from the top header.
  * Multi-column grid rows collapse to 1 or 2-column stacked lists.
  * Standard tabular grids automatically shift to data-card blocks, maintaining readable font sizes, active button touch-targets, and responsive wrapping.
  * Search headers and control filter bars stack vertically.
* **Tablet Layout (768px - 1023px)**:
  * Navigations shrink into a compact icon-only sidebar to maximize the main container content width.
  * Dashboard panels (Quick Actions, Chase-Ups) scale down and grid cards align dynamically.
* **Desktop & Larger Screens (>= 1024px)**:
  * Persistent navigation panel is displayed on the left.
  * Dashboard utilizes full 3-column structures: central columns for core stats and workflows, and side panels for upcoming schedules and notification feeds.
---
## Assumptions
A detailed report covering technical trade-offs, scope definitions, design context, and mock implementations is documented in [assumptions.md](docs/06_assumptions.md).
---
## Future Improvements
* **Cryptographic Passwords (bcrypt/argon2)**: Upgrade from the lightweight SHA-256 hex string hashing to robust salted hashes.
* **Token Refresh Lifecycles**: Split auth tokens into short-lived access tokens and secure, HTTP-only refresh tokens.
* **Role-Based Access Control (RBAC)**: Enforce route restrictions and API protections according to client role levels (e.g. restrict property registration or viewing creation to Managers/Agents).
* **Document and File Uploads**: Integrate cloud media storage (e.g. AWS S3) to host property listing photos and signed agreement contracts.
* **Audit Trail Logger**: Capture state changes and track data mutations in a centralized event logger for compliance audits.
* **Advanced Analytics**: Add graphs, projection trends, and interactive metrics reporting dashboards.
---
## Screenshots
### Main Dashboard (Light Theme)
![Dashboard Light Mode](docs/screenshots/dashboard_light.png)
### Main Dashboard (Dark Theme)
![Dashboard Dark Mode](docs/screenshots/dashboard_dark.png)

## Live Demo

Frontend Application:

https://jf-property-management.vercel.app/

---

## Documentation

Project documentation is available in the `/docs` directory.

| Document | Description |
|-----------|-------------|
| 00_project_summary.md | Project overview and goals |
| 01_business_analysis.md | Business requirements analysis |
| 02_scope_control.md | Scope definition and exclusions |
| 03_architecture.md | System architecture |
| 04_database_design.md | Database design |
| 05_api_design.md | REST API specification |
| 06_assumptions.md | Technical assumptions |
| 07_security_review.md | Security review |
| 08_known_limitations.md | Known limitations |
| 09_walkthrough.md | Application walkthrough with screenshots |

## Walkthrough

A complete application walkthrough is available in:


[walkthrough.md](docs/09_walkthrough.md)


---
## Author
**Aadhinarayanan**
