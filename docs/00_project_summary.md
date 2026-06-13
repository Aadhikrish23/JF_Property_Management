````markdown
# docs/00_project_summary.md

# Property Management CRM Dashboard MVP
## Project Summary & AI Agent Onboarding Guide

---

# 1. Project Overview

This project is a dashboard-driven Property Management CRM built from provided assessment screenshots.

The objective is to implement a realistic MVP that demonstrates:

- React + TypeScript frontend development
- Node.js + Express backend development
- PostgreSQL database design
- Prisma ORM usage
- Clean architecture principles
- API integration
- Dashboard-driven workflows

The implementation is intentionally constrained to a 24-hour assessment scope.

---

# 2. Business Objective

Provide estate agency staff with a centralized dashboard for managing:

- Properties
- Clients
- Property Viewings
- Workflow Tasks
- Notifications
- Upcoming Activities

The dashboard acts as an operational command center for daily branch activities.

---

# 3. Approved MVP Scope

## Included

### Dashboard

- Quick Actions
- Chase-Ups
- Workflow Command Centre
- Notifications
- Upcoming Activities

### Property Management

- Create Property
- View Properties

### Client Management

- Create Client
- View Clients

### Viewing Management

- Create Viewing
- View Viewings

### Workflow Management

- View Tasks
- Update Task Status

### Search

- Search Properties
- Search Clients

---

# 4. Technology Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- React Query

## Backend

- Node.js
- Express

## Database

- PostgreSQL
- Prisma ORM

---

# 5. Core Entities

## User

Represents internal CRM users.

## Property

Represents properties managed by the agency.

## Client

Represents customer records.

## Viewing

Represents scheduled property viewings.

## Task

Represents workflow items displayed in the command centre.

## Notification

Represents dashboard alerts.

## Calendar Event

Represents upcoming activities.

---

# 6. Core Modules

## Dashboard Module

Aggregates dashboard data.

## Property Module

Property management.

## Client Module

Client management.

## Viewing Module

Viewing scheduling.

## Task Module

Workflow command centre.

## Notification Module

Notification feed.

## Search Module

Global search.

## Calendar Module

Upcoming activities.

---

# 7. API Overview

## Dashboard

```text
GET /dashboard
````

## Properties

```text
GET /properties
GET /properties/:id
POST /properties
```

## Clients

```text
GET /clients
GET /clients/:id
POST /clients
```

## Viewings

```text
GET /viewings
POST /viewings
```

## Tasks

```text
GET /tasks
PATCH /tasks/:id
```

## Notifications

```text
GET /notifications
PATCH /notifications/:id/read
```

## Calendar Events

```text
GET /calendar-events
```

## Search

```text
GET /search
```

---

# 8. Database Overview

## Tables

```text
users
properties
clients
viewings
tasks
notifications
calendar_events
```

## Primary Relationships

```text
User
 └─ Tasks

Property
 └─ Viewings

Client
 └─ Viewings
```

The database is intentionally normalized and limited to MVP requirements.

---

# 9. Frontend Architecture Summary

## Architectural Style

Feature-based architecture.

## Key Layers

```text
Pages
 ↓
Feature Components
 ↓
React Query
 ↓
API Services
```

## Major Screens

* Dashboard
* Properties
* Clients
* Viewings

## Shared UI

* Tables
* Cards
* Tabs
* Forms
* Modals

---

# 10. Backend Architecture Summary

## Architectural Style

Layered Architecture.

```text
Routes
 ↓
Controllers
 ↓
Services
 ↓
Prisma
 ↓
PostgreSQL
```

## Design Principles

* Separation of concerns
* Thin controllers
* Service-based business logic
* Centralized validation
* RESTful APIs

---

# 11. Out of Scope Features

The following must NOT be implemented:

* Microservices
* Event-driven architecture
* Message queues
* AI engines
* WebSockets
* Multi-tenant architecture
* Vendor portals
* Tenant portals
* Mobile applications
* Email integration
* SMS integration
* Document management
* Calendar synchronization
* Advanced reporting
* Workflow automation engines
* Complex authentication systems

---

# 12. Development Constraints

## Assessment Constraints

* Single engineer
* 24-hour delivery target

## Technical Constraints

* Remain within approved MVP scope
* Avoid speculative features
* Prioritize dashboard functionality
* Prefer simple solutions over extensibility

## Data Strategy

* Use seeded data
* Mock complex workflows
* Mock AI-generated content
* Mock operational notifications

---

# 13. Success Criteria

The solution is successful if it:

* Recreates the supplied dashboard experience
* Demonstrates clean React architecture
* Demonstrates clean Node architecture
* Uses Prisma effectively
* Uses PostgreSQL effectively
* Supports CRUD operations for MVP entities
* Implements documented APIs
* Displays realistic seeded CRM data
* Remains maintainable and scalable

---

# 14. Recommended Development Sequence

## Phase 1

Project setup

* React
* Express
* Prisma
* PostgreSQL

## Phase 2

Database

* Schema
* Migrations
* Seed data

## Phase 3

Backend APIs

* Dashboard
* Properties
* Clients
* Viewings
* Tasks
* Notifications
* Search

## Phase 4

Frontend foundation

* Layout
* Routing
* Shared components

## Phase 5

Dashboard implementation

* Workflow Command Centre
* Notifications
* Upcoming Activities
* Chase-Ups

## Phase 6

CRUD screens

* Properties
* Clients
* Viewings

## Phase 7

Search and final polish

* Search
* Error handling
* Loading states
* Validation

---

## Single Source of Truth

All implementation decisions must align with:

1. Business Analysis
2. Scope Control
3. Architecture Design
4. Database Design
5. API Design
6. Assumptions & Technical Considerations

If a feature is not explicitly included in the approved MVP scope, it should be considered out of scope.

```
```
