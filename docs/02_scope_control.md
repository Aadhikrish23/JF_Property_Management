# Executive Scope Decision

The screenshots represent a **dashboard-driven CRM prototype**, not a complete estate agency platform.

Therefore:

**The assessment is NOT asking you to build:**

❌ Full property management

❌ Full sales progression system

❌ Full lettings system

❌ AI automation engine

❌ Notification infrastructure

❌ Calendar platform

❌ Multi-branch CRM

Instead:

✅ Build enough backend data and frontend UI to accurately render the dashboard and demonstrate CRUD/API capability.

---

# Entity Scope Review

## MUST IMPLEMENT

These entities are directly required by the screenshots.

### User

Used everywhere.

Fields:

* id
* name
* email
* role

---

### Property

Visible in:

* Add Property
* Viewings
* Offers
* Valuations

Fields:

* id
* title
* address
* status

---

### Client

Visible throughout dashboard.

Fields:

* id
* name
* phone
* email

---

### Viewing

Visible in:

* Book Viewing
* Upcoming Today
* Viewings To Confirm

Fields:

* id
* propertyId
* clientId
* dateTime
* status

---

### Task

This is actually the core entity.

The Workflow Command Centre is essentially a task board.

Fields:

* id
* title
* type
* status
* priority
* dueDate
* assignedUserId

---

### Notification

Visible in dashboard.

Fields:

* id
* title
* description
* type
* read
* createdAt

---

### Calendar Event

Used by Upcoming Today.

Fields:

* id
* title
* dateTime
* type
* status

---

## NICE TO HAVE

Only implement if time remains.

### Offer

Visible but only lightly.

Fields:

* id
* propertyId
* clientId
* amount
* status

---

### Valuation

Visible in one dashboard tab.

Fields:

* id
* propertyId
* scheduledDate
* status

---

### Activity Log

Useful for demonstrating architecture.

Fields:

* id
* entityType
* entityId
* action
* createdAt

---

## OUT OF SCOPE

### Sales Progression Entity

Only mocked data needed.

No workflow required.

---

### Negotiations

Not required.

---

### Solicitors

Not required.

---

### Finance

Not required.

---

### Tenancy Renewals

Not required.

---

### Landlords

Not required.

---

### Maintenance

Only notification text.

No module.

---

### AI Recommendation Engine

Not required.

Just seed AI-generated records.

---

# Module Scope Review

---

## MUST IMPLEMENT

### Dashboard Module

Required.

Contains:

* Summary widgets
* Chase-ups
* Workflow tabs
* Notifications
* Upcoming activities

---

### Property Module

Minimal CRUD.

Required because Add Property exists.

---

### Client Module

Minimal CRUD.

Required because Add Client exists.

---

### Viewing Module

Minimal CRUD.

Required because Book Viewing exists.

---

### Task Module

Required.

Drives Workflow Command Centre.

---

### Search Module

Simple search endpoint.

Search:

* Properties
* Clients

---

## NICE TO HAVE

### Offer Module

Read-only.

---

### Valuation Module

Read-only.

---

## OUT OF SCOPE

### Sales Progression Module

### Lettings Module

### Maintenance Module

### Messaging Module

### Document Management

### AI Automation

---

# Workflow Scope Review

---

## MUST IMPLEMENT

### Add Property

Create property record.

---

### Add Client

Create client record.

---

### Book Viewing

Create viewing record.

---

### Dashboard Loading

Retrieve:

* tasks
* notifications
* events

---

### Search

Search:

* property
* client

---

## NICE TO HAVE

### Update Task Status

Example:

* Confirm
* Negotiate

---

## OUT OF SCOPE

### Auto-Chase Engine

Seed static data.

---

### AI Approval Workflow

Seed static data.

---

### Email Automation

No implementation.

---

### Escalation Engine

No implementation.

---

# API Scope Review

## MUST IMPLEMENT

### Dashboard

```http
GET /dashboard
```

Returns:

* chaseups
* tasks
* notifications
* upcomingEvents

---

### Properties

```http
GET /properties
GET /properties/:id
POST /properties
```

---

### Clients

```http
GET /clients
GET /clients/:id
POST /clients
```

---

### Viewings

```http
GET /viewings
POST /viewings
```

---

### Tasks

```http
GET /tasks
PATCH /tasks/:id
```

---

### Notifications

```http
GET /notifications
PATCH /notifications/:id/read
```

---

### Search

```http
GET /search?q=
```

---

## NICE TO HAVE

### Offers

```http
GET /offers
```

---

### Valuations

```http
GET /valuations
```

---

# Database Scope (Prisma/Postgres)

## Final Required Tables

### users

```text
id
name
email
role
```

---

### properties

```text
id
title
address
status
createdAt
```

---

### clients

```text
id
name
email
phone
createdAt
```

---

### viewings

```text
id
propertyId
clientId
dateTime
status
```

---

### tasks

```text
id
title
type
status
priority
dueDate
assignedUserId
```

---

### notifications

```text
id
title
description
type
read
createdAt
```

---

### calendar_events

```text
id
title
dateTime
type
status
```

---

## Optional Tables

### offers

### valuations

---

# Required React Components

## Dashboard Page

---

### Header

Branch information

---

### Quick Actions

* Add Property
* Add Client
* Book Viewing
* Search
* Diary

---

### ChaseUpsWidget

Cards at top.

---

### WorkflowCommandCentre

Tabbed task board.

Tabs:

* Viewings
* Feedback
* Offers
* Appraisals
* Todo
* Sales Progression

Can all be backed by Task records.

---

### NotificationPanel

Right sidebar.

---

### UpcomingActivitiesPanel

Right sidebar.

---

### Sidebar Navigation

Static.

---

# What Can Be Mocked

A senior engineer would absolutely mock these.

### AI Generated Labels

```text
AI Scheduled
Auto Sent
AI Auto-Chase
```

Static strings.

---

### Offer Negotiation

Static task.

---

### Sales Progression

Static task category.

---

### Market Appraisal

Static task category.

---

# Deferred Future Enhancements

These belong in the architecture document but NOT the assessment build.

## Phase 2

* Authentication
* RBAC
* Activity logs
* Offer workflow
* Valuation workflow

---

## Phase 3

* Email integration
* SMS integration
* Calendar sync
* Real-time notifications

---

## Phase 4

* AI follow-up generation
* AI prioritization
* AI workflow recommendations

---

## Phase 5

* Vendor portal
* Buyer portal
* Tenant portal
* Mobile applications

---

# Final MVP Scope (24-Hour Assessment)

If I were reviewing this assessment as a lead architect, I would approve only:

### Backend

* Node.js + Express
* Prisma
* PostgreSQL
* 7 tables
* 7–8 endpoints

### Frontend

* React
* Dashboard page
* CRUD forms
* Dashboard widgets
* Search

### Data

* Seed realistic estate agency data

### Demonstration Goals

* Clean architecture
* Proper relational schema
* API integration
* Dashboard rendering
* Filtering/searching
* Scalable folder structure

Everything else should be documented as future enhancements rather than implemented. This gives the highest chance of delivering a polished, working solution within 24 hours while still showing senior-level architectural judgment.
