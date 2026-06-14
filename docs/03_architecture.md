# MVP Implementation Architecture Document

## Property Management CRM Dashboard Assessment

---

# 1. Architecture Overview

The architecture should prioritize:

* Fast implementation
* Clean separation of concerns
* Easy demonstration of engineering practices
* Simple deployment
* Clear scalability path without implementing future complexity

Architecture Style:

```text
React Client
       │
       ▼
React Query
       │
       ▼
Express REST API
       │
       ▼
Service Layer
       │
       ▼
Prisma ORM
       │
       ▼
PostgreSQL
```

No additional infrastructure is required.

---

# 2. Frontend Architecture

## Architectural Pattern

Feature-based architecture.

Reason:

* Easy to scale
* Easy to understand
* Suitable for assessment-sized projects

---

## Frontend Layers

```text
Pages
  │
  ▼
Feature Components
  │
  ▼
React Query Hooks
  │
  ▼
API Client
```

Responsibilities:

### Pages

Route-level composition.

Examples:

* DashboardPage
* PropertiesPage
* ClientsPage
* ViewingsPage

---

### Feature Components

Business-focused UI.

Examples:

* ChaseUpsWidget
* NotificationsPanel
* WorkflowBoard

---

### Shared Components

Reusable UI primitives.

Examples:

* Card
* Badge
* Button
* Table
* Tabs
* Modal

---

### API Layer

Single responsibility:

* HTTP communication

No business logic.

---

# 3. Backend Architecture

### Architectural Style

The backend follows a modular Controller-Service architecture.

```text
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

### Routes Layer

Located in:

```text
src/modules/*/*.routes.ts
```

Responsibilities:

* Define API endpoints
* Attach middleware
* Forward requests to controllers

No business logic is implemented at this layer.

### Controller Layer

Located in:

```text
src/modules/*/*.controller.ts
```

Responsibilities:

* Parse request parameters
* Handle HTTP concerns
* Format responses
* Delegate work to services

Controllers remain intentionally thin.

### Service Layer

Located in:

```text
src/modules/*/*.service.ts
```

Responsibilities:

* Business logic
* Data aggregation
* Workflow processing
* Database interaction through Prisma

### Validation Layer

Located in:

```text
src/validators/
```

Responsibilities:

* Request validation
* Input sanitization
* Schema enforcement using Zod

### Middleware Layer

Located in:

```text
src/middleware/
```

Responsibilities:

* JWT authentication
* Error handling
* Request processing

### Shared Layer

Located in:

```text
src/shared/
src/utils/
```

Responsibilities:

* Common utilities
* JWT helpers
* Shared application functionality

### Authentication Architecture

The application implements JWT-based authentication.

Flow:

```text
Login Request
      ↓
Credential Validation
      ↓
JWT Generation
      ↓
Client Storage
      ↓
Axios Authorization Header
      ↓
Protected Backend Routes
```

Protected routes validate incoming Bearer tokens using middleware before executing business logic.

# 4. Module Boundaries

## Authentication Module

Purpose:

User authentication and route protection.

Endpoints:

```text
POST /auth/login

```
---


## Dashboard Module

Purpose:

Dashboard aggregation.

Owns:

* ChaseUps
* Notifications
* Upcoming activities
* Dashboard statistics

Endpoints:

```text
GET /dashboard
```

---

## Property Module

Purpose:

Property management.

Endpoints:

```text
GET /properties
GET /properties/:id
POST /properties
```

---

## Client Module

Purpose:

Client management.

Endpoints:

```text
GET /clients
GET /clients/:id
POST /clients
```

---

## Viewing Module

Purpose:

Viewing management.

Endpoints:

```text
GET /viewings
POST /viewings
```

---

## Task Module

Purpose:

Workflow command centre.

Endpoints:

```text
GET /tasks
PATCH /tasks/:id
```

---

## Notification Module

Purpose:

Dashboard notifications.

Endpoints:

```text
GET /notifications
PATCH /notifications/:id/read
```

---

## Search Module

Purpose:

Global search.

Endpoints:

```text
GET /search
```

---

# 5. Recommended Folder Structure

## Project Structure

```text
├── docs/       # Project artifacts and design documents
├── backend/    # Express + Prisma backend
└── frontend/   # React application (to be implemented)
```

---

## Backend (Inside /backend)

```text
src/
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── properties/
│   ├── clients/
│   ├── viewings/
│   ├── tasks/
│   ├── notifications/
│   └── search/
├── prisma/
├── middleware/
├── validators/
├── shared/
├── config/
└── server.ts
```

---

## Frontend (Inside /frontend - To Be Implemented)

```text
src/
├── app/
│   ├── router/
│   └── providers/
├── pages/
│   ├── dashboard/
│   ├── properties/
│   ├── clients/
│   └── viewings/
├── features/
│   ├── dashboard/
│   ├── properties/
│   ├── clients/
│   ├── viewings/
│   ├── tasks/
│   └── notifications/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── hooks/
├── services/
├── types/
├── utils/
└── constants/
```

# 6. Database Schema Design

## users

Purpose:

Task ownership.

Fields:

```text
id
name
email
password
role
createdAt
```

---

## properties

Purpose:

Property records.

Fields:

```text
id
title
address
status
createdAt
```

Status examples:

```text
ACTIVE
UNDER_OFFER
SOLD
```

---

## clients

Purpose:

Customer records.

Fields:

```text
id
name
email
phone
createdAt
```

---

## viewings

Purpose:

Viewing appointments.

Fields:

```text
id
propertyId
clientId
dateTime
status
createdAt
```

Status:

```text
BOOKED
CONFIRMED
COMPLETED
```

---

## tasks

Purpose:

Workflow Command Centre.

Fields:

```text
id
title
type
status
priority
dueDate
assignedUserId
createdAt
```

Type:

```text
VIEWING
FEEDBACK
OFFER
APPRAISAL
TODO
PROGRESSION
```

Status:

```text
PENDING
IN_PROGRESS
COMPLETED
```

---

## notifications

Purpose:

Notification panel.

Fields:

```text
id
title
description
type
read
createdAt
```

---

## calendar_events

Purpose:

Upcoming activities.

Fields:

```text
id
title
dateTime
type
status
createdAt
```

---

# 7. API Contracts

---

## Dashboard

### GET /dashboard

Returns:

```json
{
  "chaseUps": [],
  "workflowTasks": [],
  "notifications": [],
  "upcomingEvents": []
}
```

Purpose:

Single dashboard load.

Reduces frontend complexity.

---

## Properties

### GET /properties

Returns list.

### GET /properties/:id

Returns single property.

### POST /properties

Creates property.

---

## Clients

### GET /clients

### GET /clients/:id

### POST /clients

---

## Viewings

### GET /viewings

### POST /viewings

---

## Tasks

### GET /tasks

Optional filters:

```text
?type=
?status=
```

---

### PATCH /tasks/:id

Updates:

```text
status
```

---

## Notifications

### GET /notifications

### PATCH /notifications/:id/read

Marks notification as read.

---

## Search

### GET /search?q=

Returns:

```json
{
  "properties": [],
  "clients": []
}
```

---

# 8. React Query Strategy

## Query Organization

Each module owns its queries.

Example:

```text
features/
 └── properties/
      ├── queries.ts
      ├── hooks.ts
      └── api.ts
```

---

## Query Keys

```text
["dashboard"]

["properties"]

["property", id]

["clients"]

["client", id]

["viewings"]

["tasks"]

["notifications"]
```

---

## Mutation Strategy

After mutations:

Invalidate related queries.

Example:

```text
Create Property
    ↓
Invalidate ["properties"]
```

---

## Dashboard Refresh

Single dashboard query.

```text
["dashboard"]
```

Keeps implementation simple.

---

# 9. Component Hierarchy

## DashboardPage

```text
DashboardPage
│
├── DashboardHeader
│
├── QuickActions
│
├── ChaseUpsSection
│   └── ChaseUpCard
│
├── WorkflowCommandCentre
│   ├── WorkflowTabs
│   └── TaskList
│
├── NotificationsPanel
│
└── UpcomingActivitiesPanel
```

---

## Property Pages

```text
PropertiesPage
│
├── PropertyTable
│
└── PropertyFormModal
```

---

## Client Pages

```text
ClientsPage
│
├── ClientTable
│
└── ClientFormModal
```

---

## Viewing Pages

```text
ViewingsPage
│
├── ViewingTable
│
└── ViewingFormModal
```

---

# 10. Validation Strategy

Keep validation lightweight.

---

## Frontend Validation

Basic form validation:

Property:

```text
Title required
Address required
```

Client:

```text
Name required
Email required
```

Viewing:

```text
Property required
Client required
Date required
```

---

## Backend Validation

Validate:

* Required fields
* Enum values
* Foreign key existence

Examples:

```text
Valid propertyId
Valid clientId
Valid task status
```

---

## Validation Principle

Never trust frontend input.

Backend remains source of truth.

---

# 11. Seed Data Strategy

The dashboard screenshots require meaningful data.

---

## Seed Users

```text
4–5 users
```

Examples:

* Branch Manager
* Agent
* Sales Agent

---

## Seed Properties

```text
10–15 properties
```

Mixed statuses.

---

## Seed Clients

```text
15–20 clients
```

---

## Seed Viewings

```text
10+
```

Mixed statuses.

---

## Seed Tasks

Populate all tabs.

Examples:

```text
Viewing Confirmation

Feedback Required

Offer Received

Market Appraisal

Todo

Sales Progression
```

---

## Seed Notifications

Examples directly from screenshots.

```text
Offer Received

Viewing Confirmed

Maintenance Escalated
```

---

## Seed Calendar Events

Examples:

```text
Viewing

Inspection

Valuation
```

---

# 12. Development Sequence (24-Hour Optimized)

## Phase 1 — Project Setup

Duration:

~1 hour

Tasks:

* Create React app
* Create Express app
* Configure Prisma
* Configure PostgreSQL

---

## Phase 2 — Database

Duration:

~1.5 hours

Tasks:

* Schema design
* Migrations
* Seed scripts

---

## Phase 3 — Backend APIs

Duration:

~3 hours

Tasks:

* Authentication
* Properties
* Clients
* Viewings
* Tasks
* Notifications
* Dashboard

---

## Phase 4 — Frontend Foundation

Duration:

~2 hours

Tasks:

* Layout
* Sidebar
* Header
* Routing

---

## Phase 5 — Dashboard UI

Duration:

~4 hours

Tasks:

* Quick Actions
* Chase-Ups
* Workflow Command Centre
* Notifications
* Upcoming Activities

---

## Phase 6 — CRUD Screens

Duration:

~3 hours

Tasks:

* Properties
* Clients
* Viewings

---

## Phase 7 — Search + Polish

Duration:

~2 hours

Tasks:

* Search
* Empty states
* Loading states
* Error handling

---

## Final Architectural Decision

For this assessment, the strongest solution is **not the most feature-rich solution**. The strongest solution is a well-structured monolithic application with:

* Feature-based React architecture
* Layered Express architecture
* Clean Prisma schema
* Realistic seed data
* Dashboard-focused API design
* Clear separation of concerns

This fully satisfies the dashboard requirements while remaining achievable by a single engineer within 24 hours.
