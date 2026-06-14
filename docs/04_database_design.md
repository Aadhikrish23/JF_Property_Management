# Property Management CRM MVP

# PostgreSQL & Prisma Database Design Document

---

# 1. Database Design Objectives

This database design is intentionally constrained to the approved MVP scope.

Goals:

* Support dashboard rendering
* Support CRUD operations
* Support React + Node + Prisma demonstration
* Support realistic relational modeling
* Remain achievable within a 24-hour assessment

Authentication is implemented using a lightweight JWT-based approach.

The User entity stores:

* Email
* Role
* Password Hash

Authentication responsibilities include:

* Login credential verification
* JWT token generation
* Protected API access

Advanced identity management remains intentionally out of scope:

* OAuth
* MFA
* Password reset workflows
* SSO
* Refresh token rotation
* RBAC


Explicitly Excluded:

* Role permission frameworks
* AI engines
* Event processing
* Workflow engines
* Messaging systems
* Multi-tenant support
* Vendor/Tenant portals

---


# 2. Database Overview

## Core Business Areas

```text
Users
│
├── Tasks
│
└── Dashboard Ownership


Properties
│
├── Viewings
│
└── Tasks


Clients
│
├── Viewings
│
└── Tasks


Dashboard
│
├── Notifications
├── Calendar Events
└── Tasks
```

---

# 3. Entity Relationship Diagram (ERD)

```text
┌─────────────┐
│    Users    │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────┐
│    Tasks    │
└──────┬──────┘
       │
       │
       │
 ┌─────┴─────┐
 │           │
 │           │
 ▼           ▼

Properties    Clients
     │         │
     │         │
     └────┬────┘
          │
          │
          ▼
      Viewings


Notifications

CalendarEvents
```

---

# 4. Entity Definitions

---

# 4.1 Users

## Purpose

Represents CRM staff members.

Examples:

* Branch Manager
* Sales Agent
* Viewing Agent

---

## Table Name

```text
users
```

---

## Columns

| Column     | Type         | Nullable | Description   |
| ---------- | ------------ | -------- | ------------- |
| id         | UUID         | No       | Primary key   |
| name       | VARCHAR(100) | No       | Full name     |
| email      | VARCHAR(255) | No       | Unique email  |
| password   | VARCHAR(255) | No       | Password      |
| role       | VARCHAR(50)  | No       | User role     |
| created_at | TIMESTAMP    | No       | Creation date |
| updated_at | TIMESTAMP    | No       | Last update   |

---

## Constraints

Primary Key:

```text
PK_users
```

Unique:

```text
email
```

---

## Indexes

```text
IDX_users_email
IDX_users_role
```

---

# Relationships

```text
User
  └── Tasks (1:N)
```

---

# 4.2 Properties

## Purpose

Represents properties being marketed.

---

## Table Name

```text
properties
```

---

## Columns

| Column     | Type         | Nullable | Description      |
| ---------- | ------------ | -------- | ---------------- |
| id         | UUID         | No       | Primary key      |
| title      | VARCHAR(255) | No       | Display title    |
| address    | TEXT         | No       | Property address |
| status     | VARCHAR(30)  | No       | Property status  |
| created_at | TIMESTAMP    | No       | Creation date    |
| updated_at | TIMESTAMP    | No       | Last update      |

---

## Allowed Status Values

```text
ACTIVE
UNDER_OFFER
SOLD
```

---

## Constraints

Primary Key:

```text
PK_properties
```

Check Constraint:

```text
CHK_property_status
```

---

## Indexes

```text
IDX_properties_status
IDX_properties_title
```

---

# Relationships

```text
Property
   └── Viewings (1:N)
```

---

# 4.3 Clients

## Purpose

Represents CRM contacts.

---

## Table Name

```text
clients
```

---

## Columns

| Column     | Type         | Nullable | Description   |
| ---------- | ------------ | -------- | ------------- |
| id         | UUID         | No       | Primary key   |
| name       | VARCHAR(100) | No       | Client name   |
| email      | VARCHAR(255) | Yes      | Email         |
| phone      | VARCHAR(30)  | Yes      | Phone         |
| created_at | TIMESTAMP    | No       | Creation date |
| updated_at | TIMESTAMP    | No       | Last update   |

---

## Constraints

Primary Key:

```text
PK_clients
```

---

## Indexes

```text
IDX_clients_name
IDX_clients_email
```

---

# Relationships

```text
Client
   └── Viewings (1:N)
```

---

# 4.4 Viewings

## Purpose

Represents scheduled property viewings.

---

## Table Name

```text
viewings
```

---

## Columns

| Column      | Type        | Nullable | Description       |
| ----------- | ----------- | -------- | ----------------- |
| id          | UUID        | No       | Primary key       |
| property_id | UUID        | No       | FK → Properties   |
| client_id   | UUID        | No       | FK → Clients      |
| date_time   | TIMESTAMP   | No       | Viewing date/time |
| status      | VARCHAR(30) | No       | Viewing status    |
| created_at  | TIMESTAMP   | No       | Creation date     |
| updated_at  | TIMESTAMP   | No       | Last update       |

---

## Allowed Status Values

```text
BOOKED
CONFIRMED
COMPLETED
```

---

## Constraints

Primary Key:

```text
PK_viewings
```

Foreign Keys:

```text
FK_viewing_property
FK_viewing_client
```

Check Constraint:

```text
CHK_viewing_status
```

---

## Indexes

```text
IDX_viewings_property
IDX_viewings_client
IDX_viewings_datetime
IDX_viewings_status
```

---

# Relationships

```text
Property (1)
     │
     ▼
Viewings (N)

Client (1)
     │
     ▼
Viewings (N)
```

---

# 4.5 Tasks

## Purpose

Drives the Workflow Command Centre.

All workflow tabs are backed by this table.

Examples:

* Viewing confirmation
* Feedback required
* Offer received
* Market appraisal
* To-do
* Sales progression

---

## Table Name

```text
tasks
```

---

## Columns

| Column           | Type         | Nullable | Description       |
| ---------------- | ------------ | -------- | ----------------- |
| id               | UUID         | No       | Primary key       |
| title            | VARCHAR(255) | No       | Task title        |
| type             | VARCHAR(30)  | No       | Workflow category |
| status           | VARCHAR(30)  | No       | Task status       |
| priority         | VARCHAR(20)  | No       | Priority          |
| due_date         | TIMESTAMP    | Yes      | Due date          |
| assigned_user_id | UUID         | Yes      | FK → Users        |
| created_at       | TIMESTAMP    | No       | Creation date     |
| updated_at       | TIMESTAMP    | No       | Last update       |

---

## Allowed Type Values

```text
VIEWING
FEEDBACK
OFFER
APPRAISAL
TODO
PROGRESSION
```

---

## Allowed Status Values

```text
PENDING
IN_PROGRESS
COMPLETED
```

---

## Allowed Priority Values

```text
LOW
MEDIUM
HIGH
URGENT
```

---

## Constraints

Primary Key:

```text
PK_tasks
```

Foreign Key:

```text
FK_task_user
```

Check Constraints:

```text
CHK_task_type
CHK_task_status
CHK_task_priority
```

---

## Indexes

```text
IDX_tasks_type
IDX_tasks_status
IDX_tasks_priority
IDX_tasks_due_date
IDX_tasks_assigned_user
```

---

# Relationships

```text
User (1)
   │
   ▼
Tasks (N)
```

---

# 4.6 Notifications

## Purpose

Supports dashboard notification panel.

Examples:

* Offer received
* Viewing confirmed
* Maintenance escalated

---

## Table Name

```text
notifications
```

---

## Columns

| Column      | Type         | Nullable | Description        |
| ----------- | ------------ | -------- | ------------------ |
| id          | UUID         | No       | Primary key        |
| title       | VARCHAR(255) | No       | Notification title |
| description | TEXT         | No       | Details            |
| type        | VARCHAR(50)  | No       | Notification type  |
| is_read     | BOOLEAN      | No       | Read flag          |
| created_at  | TIMESTAMP    | No       | Creation date      |

---

## Constraints

Primary Key:

```text
PK_notifications
```

---

## Indexes

```text
IDX_notifications_type
IDX_notifications_read
IDX_notifications_created
```

---

# Relationships

None required for MVP.

Notifications are dashboard feed items.

---

# 4.7 Calendar Events

## Purpose

Supports Upcoming Today widget.

Examples:

* Viewing
* Inspection
* Valuation

---

## Table Name

```text
calendar_events
```

---

## Columns

| Column     | Type         | Nullable | Description    |
| ---------- | ------------ | -------- | -------------- |
| id         | UUID         | No       | Primary key    |
| title      | VARCHAR(255) | No       | Event title    |
| date_time  | TIMESTAMP    | No       | Scheduled time |
| type       | VARCHAR(50)  | No       | Event type     |
| status     | VARCHAR(30)  | No       | Event status   |
| created_at | TIMESTAMP    | No       | Creation date  |
| updated_at | TIMESTAMP    | No       | Last update    |

---

## Allowed Status Values

```text
CONFIRMED
PENDING
NEW
DUE_TODAY
```

---

## Constraints

Primary Key:

```text
PK_calendar_events
```

Check Constraint:

```text
CHK_event_status
```

---

## Indexes

```text
IDX_events_datetime
IDX_events_status
IDX_events_type
```

---

# Relationships

None required for MVP.

Calendar widget only requires event retrieval.

---

# 5. Prisma Model Design

## Total Models

```text
User
Property
Client
Viewing
Task
Notification
CalendarEvent
```

---

## Prisma Relationships

### User → Task

```text
User
  has many Tasks

Task
  belongs to User
```

---

### Property → Viewing

```text
Property
  has many Viewings

Viewing
  belongs to Property
```

---

### Client → Viewing

```text
Client
  has many Viewings

Viewing
  belongs to Client
```

---

# 6. Query Optimization Strategy

## Dashboard Queries

Most frequently accessed:

```text
Tasks
Notifications
Calendar Events
```

Indexes added for:

* status
* due_date
* created_at
* event date

---

## Search Queries

Most common:

```text
Property title
Client name
Client email
```

Indexes:

```text
IDX_properties_title
IDX_clients_name
IDX_clients_email
```

---

## Viewing Queries

Most common:

```text
Upcoming viewings
Property viewings
Client viewings
```

Indexes:

```text
IDX_viewings_datetime
IDX_viewings_property
IDX_viewings_client
```

---

# 7. Final Database Summary

## MVP Tables

| Table           | Purpose                 |
| --------------- | ----------------------- |
| users           | CRM staff               |
| properties      | Property records        |
| clients         | Customer records        |
| viewings        | Property appointments   |
| tasks           | Workflow command centre |
| notifications   | Dashboard alerts        |
| calendar_events | Upcoming activities     |

---

## Relationship Count

```text
User       → Tasks           (1:N)

Property   → Viewings        (1:N)

Client     → Viewings        (1:N)
```

---

## Database Characteristics

* Fully normalized for MVP
* Minimal joins
* Dashboard-oriented
* Prisma-friendly
* PostgreSQL-friendly
* Simple migration strategy
* Easily expandable after assessment

This schema is the smallest relational model that fully supports all approved dashboard screens, APIs, workflows, and UI requirements while remaining realistic for a 24-hour implementation.
