# Property Management CRM Dashboard – Business Requirement Discovery & Workflow Analysis

---

# 1. Executive Summary

## Purpose of the Application

This appears to be a **Property Management / Estate Agency CRM and Workflow Management Platform** designed to help real estate branches manage:

* Properties
* Clients
* Viewings
* Offers
* Sales progression
* Property valuations
* Follow-ups (Chase-Ups)
* Staff activities
* Notifications
* Calendars and scheduling

The dashboard acts as a **Branch Operations Command Center**.

---

## Business Problem Being Solved

Estate agencies typically manage:

* Hundreds of properties
* Thousands of clients
* Multiple agents
* Numerous viewings
* Sales pipelines
* Follow-up activities

Without a centralized CRM:

* Leads are forgotten
* Viewing follow-ups are missed
* Offers are delayed
* Sales progression stalls
* Managers lack visibility

The system solves:

### Operational Problems

* Missed client communication
* Poor task tracking
* Lack of accountability
* Manual follow-ups

### Management Problems

* Limited branch visibility
* Difficult workload balancing
* Lack of performance tracking

### Customer Problems

* Slow responses
* Missed appointments
* Poor communication

---

## Likely End Users

### Primary Users

* Estate Agents
* Property Consultants
* Letting Agents
* Branch Managers
* Sales Progression Teams

### Secondary Users

* Valuation Teams
* Administrators
* Reception Staff
* Property Managers

### Potential Future Users

* Vendors
* Landlords
* Buyers
* Tenants

(via portals)

---

# 2. User Roles Discovery

---

## Branch Manager

Responsible for:

* Branch oversight
* Approving actions
* Monitoring staff
* Reviewing pipeline

Evidence:

* "My Branch"
* Branch overview dashboard

---

## Estate Agent

Responsible for:

* Client management
* Property viewings
* Offers
* Negotiations

Evidence:

* Viewing confirmations
* Client follow-ups
* Offer processing

---

## Sales Progression Officer

Responsible for:

* Sale progression
* Solicitor coordination
* Exchange preparation
* Completion tracking

Evidence:

* "Sales Progression"
* "Chase buyer solicitor"

---

## Valuation Agent

Responsible for:

* Market appraisals
* Property valuation preparation

Evidence:

* Market Appraisals section

---

## Property Administrator

Responsible for:

* Property onboarding
* Documentation
* Workflow support

Evidence:

* Add Property
* To-Do lists

---

## Lettings Agent (Assumption)

Responsible for:

* Landlord reviews
* Tenancy renewals

Evidence:

* AI Scheduled landlord review
* Renewal opportunities

---

## System AI Assistant

Responsible for:

* Auto-chase workflows
* Scheduled reminders
* Suggested actions

Evidence:

* AI Auto-Chase
* AI Scheduled
* Auto Sent

---

# 3. Business Entities

---

# Property

Purpose:

Represents a real estate asset.

Attributes:

* Property ID
* Address
* Type
* Status
* Price
* Branch
* Assigned Agent

Relationships:

* Property → Viewings
* Property → Offers
* Property → Vendor
* Property → Valuation

---

# Client

Purpose:

Represents buyers, vendors, landlords, tenants.

Attributes:

* Client ID
* Name
* Email
* Phone
* Role
* Preferences

Relationships:

* Client → Viewing
* Client → Offer
* Client → Property

---

# Viewing

Purpose:

Property visit appointment.

Attributes:

* Viewing ID
* Date
* Time
* Property
* Agent
* Client
* Status

Relationships:

* Viewing → Property
* Viewing → Client

---

# Offer

Purpose:

Purchase proposal.

Attributes:

* Offer ID
* Amount
* Property
* Buyer
* Status

Relationships:

* Offer → Property
* Offer → Client
* Offer → Negotiation

---

# Valuation

Purpose:

Property appraisal.

Attributes:

* Valuation ID
* Property
* Agent
* Date
* Estimated Value

Relationships:

* Property → Valuation

---

# Task

Purpose:

Work item requiring action.

Attributes:

* Task ID
* Type
* Priority
* Due Date
* Status
* Assigned User

Relationships:

* User → Tasks

---

# Chase-Up

Purpose:

Follow-up action.

Attributes:

* Chase ID
* Related Entity
* Due Date
* Channel
* Status

Relationships:

* Chase → Viewing
* Chase → Offer
* Chase → Client

---

# Notification

Purpose:

Alert users.

Attributes:

* Notification ID
* Type
* Message
* Read Status

Relationships:

* User → Notifications

---

# Diary Event

Purpose:

Scheduled activity.

Attributes:

* Event ID
* Date
* Time
* Type
* Participants

Relationships:

* User → Events

---

# Staff User

Purpose:

System user.

Attributes:

* User ID
* Name
* Role
* Branch

Relationships:

* User → Tasks
* User → Notifications

---

# Branch

Purpose:

Office location.

Attributes:

* Branch ID
* Name
* Location

Relationships:

* Branch → Users
* Branch → Properties

---

# 4. Functional Requirements

---

# Property Management Module

Functions:

* Add Property
* Edit Property
* View Property
* Search Property
* Associate vendor
* Track valuation

---

# Client Management Module

Functions:

* Add Client
* Search Client
* View Client
* Assign Agent

---

# Viewing Management

Functions:

* Book Viewing
* Reschedule Viewing
* Confirm Viewing
* Follow-up Viewing
* Track Viewing Outcome

---

# Offer Management

Functions:

* Record Offer
* Review Offer
* Negotiate Offer
* Track Offer Status

---

# Workflow Management

Functions:

* View tasks by category
* Assign tasks
* Complete tasks
* Escalate overdue items

---

# Chase-Up Management

Functions:

* Manual chase-up
* AI-generated chase-up
* Auto-email sending
* Call reminders

---

# Notification Module

Functions:

* Receive alerts
* Mark read
* Prioritize alerts

---

# Calendar / Diary

Functions:

* Schedule events
* View agenda
* Reschedule
* Calendar integration

---

# Search Module

Functions:

* Global search
* Property search
* Client search
* Viewing search

---

# 5. Workflow Analysis

---

# Add Property Workflow

### Trigger

New instruction received.

### Inputs

* Address
* Vendor
* Price
* Property details

### Process

Create property record → assign agent → activate workflow.

### Outputs

Property added.

### Status

Draft → Active

---

# Add Client Workflow

### Trigger

New enquiry/applicant.

### Inputs

* Contact details
* Preferences

### Process

Create CRM profile.

### Outputs

Client record.

### Status

New → Active

---

# Book Viewing Workflow

### Trigger

Client requests viewing.

### Inputs

* Property
* Client
* Date/time

### Process

Schedule viewing → notify parties.

### Outputs

Viewing booking.

### Status

Booked → Confirmed → Completed

---

# Search Workflow

### Trigger

User search request.

### Inputs

Keywords.

### Process

Query CRM entities.

### Outputs

Results.

---

# Diary Workflow

### Trigger

Event creation.

### Inputs

Date/time/activity.

### Outputs

Calendar event.

### Status

Scheduled → Completed

---

# Chase-Up Workflow

### Trigger

Time-based rules.

Examples:

* 7-day silence
* Feedback due
* Offer pending

### Process

AI or manual follow-up.

### Outputs

Call task
Email task
Reminder

### Status

Pending → Sent → Responded

---

# Workflow Command Centre

Acts as a unified operational queue.

Categories observed:

1. Viewings to Confirm
2. Feedback Required
3. Offers Received
4. Market Appraisals
5. To-Do List
6. Sales Progression

Each category represents a workflow state.

---

# Notifications Workflow

Trigger:

Business event occurs.

Examples:

* Offer received
* Viewing confirmed
* Maintenance escalated

Process:

Generate alert → push to user.

Output:

Notification item.

---

# Upcoming Activities Workflow

Trigger:

Future event exists.

Process:

Retrieve calendar entries.

Output:

Agenda list.

---

# 6. Dashboard Analysis

---

# Quick Actions Widget

Purpose:

Fast workflow initiation.

Data Required:

* Property creation
* Client creation
* Viewing booking
* Search
* Diary

Backend Needs:

* Permission engine
* Navigation routing

---

# Chase-Ups Widget

Purpose:

Actionable follow-ups.

Data Required:

* Due tasks
* AI tasks
* Overdue tasks

Backend:

* Workflow engine
* Rule engine
* Scheduling service

---

# Workflow Command Centre

Purpose:

Operational workload management.

Data Required:

* Task queues
* Status counts
* Assignments

Backend:

* Task service
* Workflow service

---

# Notifications Widget

Purpose:

Real-time awareness.

Data Required:

* Recent events
* Severity
* Read state

Backend:

* Event bus
* Notification service

---

# Upcoming Today Widget

Purpose:

Daily agenda.

Data Required:

* Calendar entries
* Viewing schedules
* Appraisals

Backend:

* Calendar service

---

# 7. Candidate Domain Model

```text
Branch
 ├── Users
 ├── Properties
 └── Tasks

User
 ├── Tasks
 ├── Notifications
 └── Diary Events

Property
 ├── Viewings
 ├── Offers
 ├── Valuations
 └── Vendor

Client
 ├── Viewings
 ├── Offers
 └── Tasks

Viewing
 ├── Feedback
 └── Follow-Ups

Offer
 ├── Negotiations
 └── Sales Progression

Sales Progression
 ├── Solicitors
 ├── Finance
 └── Completion

Task
 ├── Chase-Ups
 └── Notifications
```

---

# 8. Database Planning (PostgreSQL)

Core Tables:

### branches

Branch information.

### users

System users.

### roles

Role definitions.

### user_roles

Many-to-many user assignments.

### clients

CRM contacts.

### client_types

Buyer/Vendor/Landlord/Tenant.

### properties

Property inventory.

### property_statuses

Property lifecycle states.

### viewings

Viewing appointments.

### viewing_feedback

Feedback records.

### offers

Offer records.

### offer_negotiations

Negotiation history.

### valuations

Market appraisals.

### tasks

Work items.

### task_categories

Workflow categories.

### chase_ups

Follow-up records.

### diary_events

Calendar events.

### notifications

Alerts.

### notification_reads

Read tracking.

### activity_logs

Audit trail.

### workflow_rules

Automation definitions.

### ai_recommendations

AI-generated actions.

---

# 9. API Requirement Discovery

## Property APIs

* Create Property
* Update Property
* Get Property
* Search Property

---

## Client APIs

* Create Client
* Update Client
* Search Client
* Get Client Timeline

---

## Viewing APIs

* Book Viewing
* Confirm Viewing
* Cancel Viewing
* Reschedule Viewing
* Record Feedback

---

## Offer APIs

* Create Offer
* Update Offer
* Negotiate Offer
* Get Offer History

---

## Workflow APIs

* Get Tasks
* Assign Task
* Complete Task
* Escalate Task

---

## Notification APIs

* Get Notifications
* Mark Read
* Push Notification

---

## Calendar APIs

* Create Event
* Update Event
* Get Agenda

---

## Dashboard APIs

* Dashboard Summary
* Chase-Up Summary
* Workflow Counts
* Upcoming Activities

---

## AI Workflow APIs

* Generate Chase-Ups
* Approve AI Actions
* Auto Schedule Reviews

---

# 10. Scalability Considerations

## Multi-User Usage

Requirements:

* Concurrent access
* Row-level security
* Branch isolation
* Optimistic locking

---

## Notifications

Requirements:

* Event-driven architecture
* Real-time updates
* WebSocket support

---

## Activity Tracking

Requirements:

* Full audit logs
* User action history
* Entity timelines

---

## Future CRM Growth

Should support:

* Multiple branches
* Multiple regions
* Lettings
* Sales
* Maintenance
* Accounting
* Customer portals
* Mobile applications
* AI assistants

Recommended architecture:

```text
CRM Core
 ├─ Property Service
 ├─ Client Service
 ├─ Viewing Service
 ├─ Offer Service
 ├─ Workflow Service
 ├─ Notification Service
 ├─ Calendar Service
 └─ AI Automation Service
```

---

# 11. Facts vs Assumptions

## Facts Visible in Screens

✔ Branch overview dashboard exists

✔ Add Property

✔ Add Client

✔ Book Viewing

✔ Search

✔ Diary

✔ Chase-Ups module

✔ Workflow Command Centre

✔ Notifications

✔ Upcoming Today calendar

✔ AI-generated actions

✔ Offer management

✔ Market appraisal management

✔ Sales progression management

✔ Task assignment

✔ Overdue tracking

✔ Multi-user environment

---

## Assumptions (Not Directly Visible)

⚠ Lettings workflow exists

⚠ Vendor portal exists

⚠ Tenant portal exists

⚠ Mobile application exists

⚠ External integrations (Outlook/Google Calendar)

⚠ Solicitor integrations

⚠ Email/SMS providers

⚠ AI recommendation engine architecture

⚠ Multi-region deployment

---

## Architectural Conclusion

The screenshots strongly indicate a **modern AI-assisted Estate Agency CRM** that combines:

1. CRM (clients, properties)
2. Workflow management
3. Sales pipeline management
4. Calendar/scheduling
5. Task management
6. AI-powered follow-up automation
7. Branch operations dashboard

From a solution architecture perspective, the system is best modeled as a **workflow-centric CRM**, where nearly every business event (viewing, offer, valuation, renewal, sale progression) generates tasks, notifications, chase-ups, and calendar activities that surface through the Branch Overview dashboard.
