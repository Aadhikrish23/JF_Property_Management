# Property Management CRM MVP

# REST API Design Specification

---

# 1. API Overview

## Purpose

This API supports the approved MVP dashboard and associated CRUD functionality.

Scope includes:

* Dashboard
* Properties
* Clients
* Viewings
* Tasks
* Notifications
* Search
* Calendar Events

Excluded:

* Authentication
* Authorization
* AI services
* Email services
* Real-time communication
* Workflow engines
* Portals

---

# API Standards

## Base URL

```text
/api/v1
```

---

## Content Type

```http
Content-Type: application/json
```

---

## Success Response Format

```json
{
  "success": true,
  "data": {}
}
```

---

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Property title is required"
  }
}
```

---

# 2. Dashboard Module

---

# GET /dashboard

## Purpose

Retrieve all dashboard data in a single request.

Supports:

* Chase-Ups
* Workflow Tasks
* Notifications
* Upcoming Activities

---

## Request

```http
GET /api/v1/dashboard
```

---

## Response

```json
{
  "success": true,
  "data": {
    "chaseUps": [],
    "workflowTasks": [],
    "notifications": [],
    "upcomingEvents": []
  }
}
```

---

## Validation

None

---

## Errors

```json
{
  "success": false,
  "error": {
    "code": "DASHBOARD_LOAD_FAILED",
    "message": "Unable to load dashboard data"
  }
}
```

---

# 3. Properties Module

---

# GET /properties

## Purpose

Retrieve property list.

---

## Query Parameters

| Parameter | Type    | Required |
| --------- | ------- | -------- |
| page      | integer | No       |
| limit     | integer | No       |
| status    | string  | No       |
| search    | string  | No       |

---

## Example

```http
GET /api/v1/properties?page=1&limit=20
```

---

## Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Zenith Heights",
        "address": "14 Cheltenham Pl",
        "status": "ACTIVE"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45
    }
  }
}
```

---

## Validation Rules

### page

```text
Minimum: 1
```

### limit

```text
Minimum: 1
Maximum: 100
```

### status

Allowed:

```text
ACTIVE
UNDER_OFFER
SOLD
```

---

# GET /properties/{id}

## Purpose

Retrieve property details.

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Zenith Heights",
    "address": "14 Cheltenham Pl",
    "status": "ACTIVE"
  }
}
```

---

## Errors

```json
{
  "success": false,
  "error": {
    "code": "PROPERTY_NOT_FOUND",
    "message": "Property not found"
  }
}
```

---

# POST /properties

## Purpose

Create property.

---

## Request Payload

```json
{
  "title": "Zenith Heights",
  "address": "14 Cheltenham Pl",
  "status": "ACTIVE"
}
```

---

## Validation Rules

### title

```text
Required
Max Length: 255
```

### address

```text
Required
```

### status

Allowed:

```text
ACTIVE
UNDER_OFFER
SOLD
```

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid"
  }
}
```

---

# 4. Clients Module

---

# GET /clients

## Query Parameters

| Parameter | Type    |
| --------- | ------- |
| page      | integer |
| limit     | integer |
| search    | string  |

---

## Response

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {}
  }
}
```

---

# GET /clients/{id}

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Sarah Calvert",
    "email": "sarah@example.com",
    "phone": "9999999999"
  }
}
```

---

# POST /clients

## Request Payload

```json
{
  "name": "Sarah Calvert",
  "email": "sarah@example.com",
  "phone": "9999999999"
}
```

---

## Validation Rules

### name

```text
Required
Max Length: 100
```

### email

```text
Optional
Must be valid email
```

### phone

```text
Optional
Max Length: 30
```

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid"
  }
}
```

---

# 5. Viewings Module

---

# GET /viewings

## Query Parameters

| Parameter  | Type    |
| ---------- | ------- |
| page       | integer |
| limit      | integer |
| status     | string  |
| propertyId | uuid    |
| clientId   | uuid    |

---

## Allowed Status Values

```text
BOOKED
CONFIRMED
COMPLETED
```

---

## Response

```json
{
  "success": true,
  "data": {
    "items": []
  }
}
```

---

# POST /viewings

## Request Payload

```json
{
  "propertyId": "uuid",
  "clientId": "uuid",
  "dateTime": "2025-04-21T10:00:00Z",
  "status": "BOOKED"
}
```

---

## Validation Rules

### propertyId

```text
Required
Must exist
```

### clientId

```text
Required
Must exist
```

### dateTime

```text
Required
Valid ISO Date
```

### status

Allowed:

```text
BOOKED
CONFIRMED
COMPLETED
```

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid"
  }
}
```

---

## Errors

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PROPERTY",
    "message": "Property does not exist"
  }
}
```

---

# 6. Tasks Module

---

# GET /tasks

## Purpose

Supports Workflow Command Centre.

---

## Query Parameters

| Parameter | Type    |
| --------- | ------- |
| page      | integer |
| limit     | integer |
| type      | string  |
| status    | string  |
| priority  | string  |

---

## Allowed Types

```text
VIEWING
FEEDBACK
OFFER
APPRAISAL
TODO
PROGRESSION
```

---

## Allowed Statuses

```text
PENDING
IN_PROGRESS
COMPLETED
```

---

## Allowed Priorities

```text
LOW
MEDIUM
HIGH
URGENT
```

---

## Response

```json
{
  "success": true,
  "data": {
    "items": []
  }
}
```

---

# PATCH /tasks/{id}

## Purpose

Update task status.

---

## Request Payload

```json
{
  "status": "COMPLETED"
}
```

---

## Validation

Allowed:

```text
PENDING
IN_PROGRESS
COMPLETED
```

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "COMPLETED"
  }
}
```

---

## Errors

```json
{
  "success": false,
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task not found"
  }
}
```

---

# 7. Notifications Module

---

# GET /notifications

## Query Parameters

| Parameter | Type    |
| --------- | ------- |
| page      | integer |
| limit     | integer |
| isRead    | boolean |

---

## Response

```json
{
  "success": true,
  "data": {
    "items": []
  }
}
```

---

# PATCH /notifications/{id}/read

## Purpose

Mark notification as read.

---

## Request

No body required.

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "isRead": true
  }
}
```

---

## Errors

```json
{
  "success": false,
  "error": {
    "code": "NOTIFICATION_NOT_FOUND",
    "message": "Notification not found"
  }
}
```

---

# 8. Calendar Events Module

---

# GET /calendar-events

## Purpose

Supports Upcoming Activities widget.

---

## Query Parameters

| Parameter | Type     |
| --------- | -------- |
| from      | ISO Date |
| to        | ISO Date |
| status    | string   |

---

## Allowed Statuses

```text
CONFIRMED
PENDING
NEW
DUE_TODAY
```

---

## Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Viewing - Zenith Heights",
        "dateTime": "2025-04-21T10:00:00Z",
        "type": "VIEWING",
        "status": "CONFIRMED"
      }
    ]
  }
}
```

---

# 9. Search Module

---

# GET /search

## Purpose

Global dashboard search.

Supports:

* Properties
* Clients

---

## Query Parameters

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| q         | string | Yes      |

---

## Example

```http
GET /api/v1/search?q=zenith
```

---

## Validation Rules

### q

```text
Required
Minimum Length: 2
Maximum Length: 100
```

---

## Response

```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "uuid",
        "title": "Zenith Heights"
      }
    ],
    "clients": [
      {
        "id": "uuid",
        "name": "Sarah Calvert"
      }
    ]
  }
}
```

---

## Errors

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SEARCH_TERM",
    "message": "Search term must contain at least 2 characters"
  }
}
```

---

# 10. Common Error Codes

| Code                   | Description                |
| ---------------------- | -------------------------- |
| VALIDATION_ERROR       | Request validation failed  |
| RESOURCE_NOT_FOUND     | Generic missing resource   |
| PROPERTY_NOT_FOUND     | Property missing           |
| CLIENT_NOT_FOUND       | Client missing             |
| TASK_NOT_FOUND         | Task missing               |
| NOTIFICATION_NOT_FOUND | Notification missing       |
| INVALID_PROPERTY       | Invalid property reference |
| INVALID_CLIENT         | Invalid client reference   |
| INTERNAL_SERVER_ERROR  | Unexpected failure         |

---

# 11. Pagination Standard

Applicable To:

* Properties
* Clients
* Viewings
* Tasks
* Notifications

Response Structure:

```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

Defaults:

```text
page = 1
limit = 20
```

Maximum:

```text
limit = 100
```

---

# 12. Final API Surface

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | /dashboard               |
| GET    | /properties              |
| GET    | /properties/{id}         |
| POST   | /properties              |
| GET    | /clients                 |
| GET    | /clients/{id}            |
| POST   | /clients                 |
| GET    | /viewings                |
| POST   | /viewings                |
| GET    | /tasks                   |
| PATCH  | /tasks/{id}              |
| GET    | /notifications           |
| PATCH  | /notifications/{id}/read |
| GET    | /calendar-events         |
| GET    | /search                  |

### Total Endpoints

```text
14 REST endpoints
```

This API surface is intentionally minimal and fully aligned with the approved MVP, database design, dashboard requirements, React Query strategy, and 24-hour implementation constraint. It provides complete support for the dashboard UI while avoiding unnecessary complexity or future-scope functionality.
