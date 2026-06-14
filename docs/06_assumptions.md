# Property Management CRM MVP

# Assumptions and Technical Considerations Document

## Version 1.0

## Assessment Architecture Decision Record

---

# 1. Purpose

This document captures the assumptions, constraints, technical considerations, scope limitations, and architectural tradeoffs used during the design of the Property Management CRM MVP.

The purpose is to justify design decisions and demonstrate engineering judgement appropriate for a 24-hour technical assessment.

This document should be read alongside:

* Business Analysis
* MVP Scope Definition
* Architecture Design
* Database Design
* API Design

---

# 2. Assessment Context

The solution is based solely on the provided dashboard screenshots.

No additional business requirements, process documentation, user stories, or technical specifications were supplied.

Therefore, all design decisions prioritize:

* Deliverability
* Maintainability
* Realistic business modeling
* Demonstration of engineering capability
* Scope control

over feature completeness.

---

# 3. Functional Assumptions

## 3.1 Single Internal CRM User Context

### Assumption

The dashboard is intended for internal estate agency staff.

### Justification

All visible screens focus on:

* Properties
* Clients
* Viewings
* Tasks
* Notifications
* Internal workflows

No customer-facing functionality is visible.

---

## 3.2 Dashboard-Centric Workflow

### Assumption

The dashboard is the primary application entry point.

### Justification

The screenshots emphasize:

* Workflow Command Centre
* Chase-Ups
* Notifications
* Upcoming Activities

This suggests operational management rather than deep transactional workflows.

---

## 3.3 Tasks Drive Workflow

### Assumption

Workflow categories can be represented as task types.

### Justification

Visible workflow categories:

* Viewings
* Feedback
* Offers
* Appraisals
* To-Do
* Sales Progression

can all be represented through a single Task entity.

This significantly reduces implementation complexity.

---

## 3.4 Limited Property Lifecycle

### Assumption

Properties require only basic status management.

Supported statuses:

```text
ACTIVE
UNDER_OFFER
SOLD
```

### Justification

Only these states are required to support dashboard displays.

---

## 3.5 Limited Viewing Lifecycle

### Assumption

Viewings require only:

```text
BOOKED
CONFIRMED
COMPLETED
```

### Justification

Additional lifecycle states are not visible in the screenshots.

---

## 3.6 Notifications Are Informational

### Assumption

Notifications are dashboard records only.

### Justification

No evidence exists of:

* Push notifications
* Email delivery
* SMS delivery

Therefore notifications are stored and displayed only.

---

## 3.7 Calendar Events Are Independent Records

### Assumption

Upcoming activities are standalone calendar entries.

### Justification

The dashboard only requires activity display.

Complex scheduling behavior is unnecessary.

---

# 4. Technical Assumptions

---

## 4.1 Monolithic Application

### Assumption

The application is deployed as a single frontend and backend system.

### Justification

The assessment duration is 24 hours.

A monolithic architecture:

* reduces setup time
* reduces operational complexity
* remains scalable for MVP requirements

---

## 4.2 PostgreSQL as the Single Source of Truth

### Assumption

All persistent business data resides in PostgreSQL.

### Justification

Database requirements are small and relational.

No secondary storage is required.

---

## 4.3 Prisma ORM

### Assumption

Prisma provides all database access.

### Justification

Prisma offers:

* type safety
* migration support
* rapid development

which are ideal for assessment delivery.

---

## 4.4 REST Architecture

### Assumption

All client-server communication uses REST APIs.

### Justification

REST is:

* widely understood
* simple to implement
* sufficient for dashboard interactions

---

## 4.5 React Query for Data Fetching

### Assumption

React Query manages:

* server state
* caching
* loading states
* query invalidation

### Justification

Reduces frontend complexity while demonstrating modern React practices.

---

## 4.6  Authentication Assumption

A lightweight JWT-based authentication layer has been implemented
to satisfy assessment requirements.

The implementation includes:

- Login endpoint
- JWT token issuance
- Protected API routes
- Client-side route protection
- Logout

The implementation intentionally omits:

- RBAC
- Refresh tokens
- Password reset
- MFA
- OAuth

# 5. Scope Exclusions

The following features are intentionally excluded.

---

## Authentication Assumptions

The assessment implementation includes a lightweight JWT authentication system.

### Implemented

* Login endpoint
* JWT token issuance
* Protected API routes
* Axios authentication interceptor
* Client-side route protection
* Logout functionality

The authentication implementation is intentionally simplified for assessment purposes.

### Excluded

* Registration
* Password reset
* OAuth
* MFA
* Refresh tokens
* RBAC
* User management workflows

The objective is to demonstrate secure route protection rather than a complete identity platform.


---

## Multi-Tenant Support

Excluded:

* Tenant isolation
* Organization management
* Branch partitioning

Reason:

No evidence of multi-tenancy requirements.

---

## Vendor Portal

Excluded.

Reason:

Not visible.

---

## Tenant Portal

Excluded.

Reason:

Not visible.

---

## Mobile Applications

Excluded.

Reason:

Assessment targets web implementation only.

---

## Document Management

Excluded:

* Uploads
* Attachments
* Contracts

Reason:

Not represented in screenshots.

---

## Email Integration

Excluded.

Reason:

No visible requirement.

---

## SMS Integration

Excluded.

Reason:

No visible requirement.

---

## Calendar Synchronization

Excluded:

* Google Calendar
* Outlook

Reason:

Not required for dashboard rendering.

---

## AI Engines

Excluded:

* Recommendation engines
* Predictive models
* Workflow optimization

Reason:

The assessment does not require actual AI functionality.

---

## Real-Time Communication

Excluded:

* WebSockets
* Push updates
* Live feeds

Reason:

Polling and standard API requests are sufficient.

---

## Workflow Automation Engines

Excluded:

* Rule processing
* Escalation engines
* Auto-assignment

Reason:

Not required for MVP.

---

## Reporting & Analytics

Excluded:

* KPI dashboards
* Revenue reporting
* Agent performance reporting

Reason:

Not present in screenshots.

---

# 6. Mocked Functionality

Several dashboard elements appear operationally complex but can be safely represented using seeded data.

---

## AI Auto-Chase

Displayed as:

```text
AI Auto-Chase
```

Implementation:

Static task records.

No AI logic.

---

## AI Scheduled

Displayed as:

```text
AI Scheduled
```

Implementation:

Seeded notification/task entries.

No scheduling engine.

---

## Sales Progression

Implementation:

Task category only.

No progression workflow.

---

## Market Appraisals

Implementation:

Task category only.

No valuation workflow.

---

## Offer Tracking

Implementation:

Task records.

No negotiation process.

---

## Workflow Command Centre

Implementation:

Task filtering.

No workflow engine.

---

## Notification Feed

Implementation:

Database records.

No delivery mechanism.

---

# 7. Architectural Tradeoffs

---

## Tradeoff 1: Single Dashboard Endpoint

Decision:

```text
GET /dashboard
```

returns aggregated dashboard data.

Advantages:

* fewer frontend requests
* simpler React Query usage
* faster dashboard load

Disadvantage:

* less granular API structure

Accepted because:

Dashboard is primary screen.

---

## Tradeoff 2: Tasks as Workflow Engine

Decision:

Use a generic Task table.

Advantages:

* dramatically simpler model
* fewer tables
* faster implementation

Disadvantage:

* less specialized workflow modeling

Accepted because:

Workflow behavior is not assessed.

---

## Tradeoff 3: Notifications Without Ownership

Decision:

Notifications are global records.

Advantages:

* simpler schema
* simpler APIs

Disadvantage:

* no per-user notification management

Accepted because:

Single-user demo assumption.

---

## Tradeoff 4: Calendar Events Decoupled From Viewings

Decision:

Store events separately.

Advantages:

* easier dashboard rendering
* flexible seed data

Disadvantage:

* duplicate scheduling concepts

Accepted because:

Assessment prioritizes UI demonstration.

---

## Tradeoff 5: Minimal CRUD Operations

Decision:

Only Create and Read operations are implemented for major entities.

Advantages:

* lower implementation effort
* sufficient for assessment

Disadvantage:

* incomplete lifecycle management

Accepted because:

CRUD completeness is not required by screenshots.

---

# 8. Future Enhancements (Post-Assessment)

The following enhancements are intentionally deferred.

---

## Phase 2

### Authentication

* Login
* JWT
* Role-based access

### Activity Logging

* Audit trails
* Change tracking

### Full CRUD

* Update
* Delete

---

## Phase 3

### Workflow Enhancements

* Offer workflows
* Valuation workflows
* Sales progression workflows

### Notification Ownership

* User-specific notifications

### Dashboard Metrics

* KPI tracking

---

## Phase 4

### Communication Integrations

* Email
* SMS
* Calendar synchronization

---

## Phase 5

### Automation

* Workflow automation
* Rule engines
* Scheduled actions

---

## Phase 6

### Advanced CRM Features

* Vendor portal
* Tenant portal
* Mobile applications

---

# 9. Risk Assessment

| Risk               | Impact | Mitigation                              |
| ------------------ | ------ | --------------------------------------- |
| Over-engineering   | High   | Strict MVP scope                        |
| Excessive entities | Medium | Generic Task model                      |
| Complex workflows  | High   | Mock workflow states                    |
| API proliferation  | Medium | Aggregated dashboard API                |
| Time overrun       | High   | Focus on dashboard-first implementation |
| Incomplete UI      | High   | Prioritize visible screens              |

---

# 10. Final Architectural Position

This MVP intentionally favors:

* Simplicity
* Clear architecture
* Deliverability
* Maintainability

over:

* Feature completeness
* Enterprise-scale patterns
* Premature optimization

# 11. Security Considerations

The assessment reviewer explicitly indicated that security is an important evaluation criterion.

The MVP implementation will therefore include:

- Request validation
- Server-side input validation
- Proper HTTP status codes
- Centralized error handling
- Environment variable configuration
- ORM-based database access through Prisma
- Basic API hardening practices

Out of Scope:

* RBAC
* OAuth
* MFA
* Refresh tokens
* Password reset
* Advanced security infrastructure

Authentication and basic authorization are implemented through JWT-based route protection to satisfy assessment requirements.

The advanced security capabilities listed above are excluded due to assessment scope and timeline constraints.

The resulting solution is a pragmatic, assessment-appropriate architecture that accurately reproduces the supplied dashboard experience, demonstrates competency in React, Node.js, PostgreSQL, and Prisma, and remains achievable by a single engineer within a 24-hour implementation window.
