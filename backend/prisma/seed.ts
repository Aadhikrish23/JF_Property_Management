import { PrismaClient, PropertyStatus, ViewingStatus, TaskType, TaskStatus, TaskPriority, CalendarEventStatus } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('Clearing existing database records...');
  
  // Idempotent clean up in reverse dependency order
  await prisma.calendarEvent.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.task.deleteMany();
  await prisma.viewing.deleteMany();
  await prisma.client.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database tables...');

  const demoPasswordHash = hashPassword('demo123');

  // 1. Seed Users (5 CRM Staff Roles)
  const branchManager = await prisma.user.create({
    data: {
      name: 'Marcus Vance',
      email: 'manager@crm.local',
      password: demoPasswordHash,
      role: 'Branch Manager',
    },
  });

  const seniorSalesAgent = await prisma.user.create({
    data: {
      name: 'Sarah Calvert',
      email: 'agent@crm.local',
      password: demoPasswordHash,
      role: 'Senior Sales Agent',
    },
  });

  const salesAgent = await prisma.user.create({
    data: {
      name: 'David Miller',
      email: 'agent2@crm.local',
      password: demoPasswordHash,
      role: 'Sales Agent',
    },
  });

  const viewingAgent = await prisma.user.create({
    data: {
      name: 'Emma Watson',
      email: 'viewing@crm.local',
      password: demoPasswordHash,
      role: 'Viewing Agent',
    },
  });

  const administrator = await prisma.user.create({
    data: {
      name: 'Alex Thorne',
      email: 'admin@crm.local',
      password: demoPasswordHash,
      role: 'Administrator',
    },
  });

  const users = [branchManager, seniorSalesAgent, salesAgent, viewingAgent, administrator];
  console.log(`Created ${users.length} Users.`);

  // 2. Seed Properties (15 properties, mixed statuses)
  const propertiesData = [
    { title: 'Zenith Heights', address: '14 Cheltenham Pl, Brighton BN1 4AA', status: PropertyStatus.ACTIVE },
    { title: 'Oakridge Manor', address: '27 Park Lane, London W1K 1AA', status: PropertyStatus.ACTIVE },
    { title: 'Pinewood Cottage', address: '8 Woods Road, Lyndhurst SO43 7AA', status: PropertyStatus.ACTIVE },
    { title: 'Riverstone Apartments', address: 'Unit 4B, 102 Riverside Dr, Bath BA1 5AA', status: PropertyStatus.ACTIVE },
    { title: 'Meadow View', address: 'Flat 12, Green Pastures, Guildford GU1 1AA', status: PropertyStatus.ACTIVE },
    
    { title: 'The Gables', address: '34 High Street, Winchester SO23 9AA', status: PropertyStatus.UNDER_OFFER },
    { title: 'Harbour View Penthouse', address: 'Apartment 501, Marina Wharf, Portsmouth PO1 2AA', status: PropertyStatus.UNDER_OFFER },
    { title: 'Stonecroft Barn', address: 'Wayside Lane, Chipping Campden GL55 6AA', status: PropertyStatus.UNDER_OFFER },
    { title: 'Willow Cottage', address: '12 Brookside, Castle Combe SN14 7AA', status: PropertyStatus.UNDER_OFFER },
    { title: 'Apex Suites', address: 'Unit 10, Commerce Blvd, Leeds LS1 5AA', status: PropertyStatus.UNDER_OFFER },
    
    { title: 'Maple Grove', address: '15 Suburban Ave, Manchester M20 4AA', status: PropertyStatus.SOLD },
    { title: 'Chestnut Court', address: 'Suite 3, London Road, St Albans AL1 1AA', status: PropertyStatus.SOLD },
    { title: 'The Orchard', address: 'Appleby Road, Canterbury CT1 1AA', status: PropertyStatus.SOLD },
    { title: 'Highfield House', address: 'Colliery Hill, Newcastle NE1 1AA', status: PropertyStatus.SOLD },
    { title: 'Coastal Winds', address: 'Cliff Road, Newquay TR7 1AA', status: PropertyStatus.SOLD }
  ];

  const properties = [];
  for (const item of propertiesData) {
    const prop = await prisma.property.create({ data: item });
    properties.push(prop);
  }
  console.log(`Created ${properties.length} Properties.`);

  // 3. Seed Clients (20 clients, realistic profiles)
  const clientsData = [
    { name: 'John Smith', email: 'john.smith@example.com', phone: '+447700900077' },
    { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '+447700900088' },
    { name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '+447700900099' },
    { name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+447700900100' },
    { name: 'Michael Brown', email: 'michael.brown@example.com', phone: '+447700900111' },
    { name: 'Amanda Wilson', email: 'amanda.wilson@example.com', phone: '+447700900122' },
    { name: 'William Jones', email: 'william.jones@example.com', phone: '+447700900133' },
    { name: 'Olivia Taylor', email: 'olivia.taylor@example.com', phone: '+447700900144' },
    { name: 'James Thomas', email: 'james.thomas@example.com', phone: '+447700900155' },
    { name: 'Sophia Jackson', email: 'sophia.jackson@example.com', phone: '+447700900166' },
    { name: 'Benjamin White', email: 'benjamin.white@example.com', phone: '+447700900177' },
    { name: 'Isabella Harris', email: 'isabella.harris@example.com', phone: '+447700900188' },
    { name: 'Mason Martin', email: 'mason.martin@example.com', phone: '+447700900199' },
    { name: 'Mia Thompson', email: 'mia.thompson@example.com', phone: '+447700900200' },
    { name: 'Jacob Garcia', email: 'jacob.garcia@example.com', phone: '+447700900211' },
    { name: 'Charlotte Martinez', email: 'charlotte.martinez@example.com', phone: '+447700900222' },
    { name: 'Ethan Robinson', email: 'ethan.robinson@example.com', phone: '+447700900233' },
    { name: 'Amelia Clark', email: 'amelia.clark@example.com', phone: '+447700900244' },
    { name: 'Daniel Rodriguez', email: 'daniel.rodriguez@example.com', phone: '+447700900255' },
    { name: 'Harper Lewis', email: 'harper.lewis@example.com', phone: '+447700900266' }
  ];

  const clients = [];
  for (const item of clientsData) {
    const clt = await prisma.client.create({ data: item });
    clients.push(clt);
  }
  console.log(`Created ${clients.length} Clients.`);

  // Helper date generators relative to today
  const today = new Date();
  const getOffsetDate = (daysOffset: number, hoursOffset: number = 0) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysOffset);
    d.setHours(d.getHours() + hoursOffset);
    return d;
  };

  // 4. Seed Viewings (13 viewings, mixed statuses)
  const viewingsData = [
    { propertyIndex: 0, clientIndex: 0, dateTime: getOffsetDate(1, 2), status: ViewingStatus.BOOKED },       // Zenith Heights - John Smith
    { propertyIndex: 1, clientIndex: 1, dateTime: getOffsetDate(0, 4), status: ViewingStatus.CONFIRMED },    // Oakridge Manor - Jane Doe
    { propertyIndex: 2, clientIndex: 2, dateTime: getOffsetDate(2, -1), status: ViewingStatus.BOOKED },      // Pinewood Cottage - Robert Johnson
    { propertyIndex: 3, clientIndex: 3, dateTime: getOffsetDate(0, -2), status: ViewingStatus.COMPLETED },   // Riverstone Apartments - Emily Davis
    { propertyIndex: 4, clientIndex: 4, dateTime: getOffsetDate(-1, 3), status: ViewingStatus.COMPLETED },   // Meadow View - Michael Brown
    { propertyIndex: 5, clientIndex: 5, dateTime: getOffsetDate(3, 1), status: ViewingStatus.CONFIRMED },    // The Gables - Amanda Wilson
    { propertyIndex: 6, clientIndex: 6, dateTime: getOffsetDate(0, 1), status: ViewingStatus.CONFIRMED },    // Harbour View Penthouse - William Jones
    { propertyIndex: 7, clientIndex: 7, dateTime: getOffsetDate(4, 5), status: ViewingStatus.BOOKED },       // Stonecroft Barn - Olivia Taylor
    { propertyIndex: 8, clientIndex: 8, dateTime: getOffsetDate(-2, 0), status: ViewingStatus.COMPLETED },   // Willow Cottage - James Thomas
    { propertyIndex: 9, clientIndex: 9, dateTime: getOffsetDate(5, -3), status: ViewingStatus.BOOKED },      // Apex Suites - Sophia Jackson
    { propertyIndex: 0, clientIndex: 10, dateTime: getOffsetDate(1, -2), status: ViewingStatus.CONFIRMED },  // Zenith Heights - Benjamin White
    { propertyIndex: 1, clientIndex: 11, dateTime: getOffsetDate(-1, -4), status: ViewingStatus.COMPLETED }, // Oakridge Manor - Isabella Harris
    { propertyIndex: 2, clientIndex: 12, dateTime: getOffsetDate(0, 6), status: ViewingStatus.CONFIRMED }     // Pinewood Cottage - Mason Martin
  ];

  const viewings = [];
  for (const item of viewingsData) {
    const v = await prisma.viewing.create({
      data: {
        propertyId: properties[item.propertyIndex].id,
        clientId: clients[item.clientIndex].id,
        dateTime: item.dateTime,
        status: item.status
      }
    });
    viewings.push(v);
  }
  console.log(`Created ${viewings.length} Viewings.`);

  // 5. Seed Tasks (At least 3 per TaskType, total 18 tasks)
  const tasksData = [
    // VIEWING Tasks
    {
      title: 'Confirm viewing for Zenith Heights',
      type: TaskType.VIEWING,
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: getOffsetDate(1),
      assignedUserIndex: 3 // Emma Watson (Viewing Agent)
    },
    {
      title: '[AI Auto-Chase] Schedule viewing follow-up for Oakridge Manor',
      type: TaskType.VIEWING,
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      dueDate: getOffsetDate(0, 2),
      assignedUserIndex: 2 // David Miller (Sales Agent)
    },
    {
      title: 'Reschedule cancelled viewing: Meadow View',
      type: TaskType.VIEWING,
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.LOW,
      dueDate: getOffsetDate(-1),
      assignedUserIndex: 3
    },

    // FEEDBACK Tasks
    {
      title: 'Collect viewing feedback from John Smith',
      type: TaskType.FEEDBACK,
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: getOffsetDate(0, 5),
      assignedUserIndex: 2
    },
    {
      title: '[AI Auto-Chase] Request feedback: Riverstone Apartments',
      type: TaskType.FEEDBACK,
      status: TaskStatus.PENDING,
      priority: TaskPriority.MEDIUM,
      dueDate: getOffsetDate(1),
      assignedUserIndex: 3
    },
    {
      title: 'Process feedback for Oakridge Manor viewing',
      type: TaskType.FEEDBACK,
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.LOW,
      dueDate: getOffsetDate(-2),
      assignedUserIndex: 2
    },

    // OFFER Tasks
    {
      title: 'Review offer of £450,000 from John Smith for Zenith Heights',
      type: TaskType.OFFER,
      status: TaskStatus.PENDING,
      priority: TaskPriority.URGENT,
      dueDate: getOffsetDate(0, 1),
      assignedUserIndex: 1 // Sarah Calvert (Senior Sales Agent)
    },
    {
      title: 'Negotiate offer counter-proposal: The Gables',
      type: TaskType.OFFER,
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: getOffsetDate(2),
      assignedUserIndex: 1
    },
    {
      title: 'Process offer paperwork: Willow Cottage',
      type: TaskType.OFFER,
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.MEDIUM,
      dueDate: getOffsetDate(-1),
      assignedUserIndex: 4 // Alex Thorne (Administrator)
    },

    // APPRAISAL Tasks
    {
      title: 'Schedule market appraisal: Meadow View',
      type: TaskType.APPRAISAL,
      status: TaskStatus.PENDING,
      priority: TaskPriority.MEDIUM,
      dueDate: getOffsetDate(3),
      assignedUserIndex: 0 // Marcus Vance (Branch Manager)
    },
    {
      title: 'Prepare valuation report for 8 Woods Road',
      type: TaskType.APPRAISAL,
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: getOffsetDate(0, 6),
      assignedUserIndex: 1
    },
    {
      title: 'Appraisal review: Riverstone Apartments',
      type: TaskType.APPRAISAL,
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.LOW,
      dueDate: getOffsetDate(-3),
      assignedUserIndex: 0
    },

    // TODO Tasks
    {
      title: 'Upload property listing images for Pinewood Cottage',
      type: TaskType.TODO,
      status: TaskStatus.PENDING,
      priority: TaskPriority.LOW,
      dueDate: getOffsetDate(2),
      assignedUserIndex: 4
    },
    {
      title: '[AI Scheduled] Landlord review follow-up: Emily Davis',
      type: TaskType.TODO,
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGH,
      dueDate: getOffsetDate(0),
      assignedUserIndex: 2
    },
    {
      title: 'Chase unsigned Terms of Business: Stonecroft Barn',
      type: TaskType.TODO,
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      dueDate: getOffsetDate(1),
      assignedUserIndex: 4
    },

    // PROGRESSION Tasks
    {
      title: 'Chase buyer solicitor for Maple Grove contract exchange',
      type: TaskType.PROGRESSION,
      status: TaskStatus.PENDING,
      priority: TaskPriority.URGENT,
      dueDate: getOffsetDate(1),
      assignedUserIndex: 1
    },
    {
      title: 'Verify mortgage offer status: Chestnut Court',
      type: TaskType.PROGRESSION,
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: getOffsetDate(3),
      assignedUserIndex: 2
    },
    {
      title: 'Instruct surveyors for The Orchard sale progression',
      type: TaskType.PROGRESSION,
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.MEDIUM,
      dueDate: getOffsetDate(-4),
      assignedUserIndex: 4
    }
  ];

  const tasks = [];
  for (const item of tasksData) {
    const t = await prisma.task.create({
      data: {
        title: item.title,
        type: item.type,
        status: item.status,
        priority: item.priority,
        dueDate: item.dueDate,
        assignedUserId: users[item.assignedUserIndex].id
      }
    });
    tasks.push(t);
  }
  console.log(`Created ${tasks.length} Tasks.`);

  // 6. Seed Notifications (12 notifications, mixed read states)
  const notificationsData = [
    { title: 'New Offer Received', description: 'Offer of £450,000 submitted by John Smith on Zenith Heights.', type: 'OFFER', isRead: false },
    { title: 'Viewing Confirmed', description: 'Jane Doe confirmed scheduled viewing for Oakridge Manor.', type: 'VIEWING', isRead: true },
    { title: 'Client Follow-up Due', description: '[AI Scheduled] Landlord review with Emily Davis is due today.', type: 'FOLLOW_UP', isRead: false },
    { title: 'Market Appraisal Scheduled', description: 'Appraisal booked for Meadow View on Monday at 10:00 AM.', type: 'APPRAISAL', isRead: false },
    { title: 'Maintenance Escalated', description: 'Tenant reported water leakage at Flat 12, Green Pastures.', type: 'MAINTENANCE', isRead: false },
    { title: 'Offer Accepted', description: 'Vendor accepted offer of £320,000 on Willow Cottage.', type: 'OFFER', isRead: true },
    { title: 'Viewing Feedback Submitted', description: 'Robert Johnson submitted feedback for Pinewood Cottage: "Loved the garden."', type: 'FEEDBACK', isRead: false },
    { title: 'Sale Stalled Alert', description: 'Progression task for Maple Grove is currently 2 days overdue.', type: 'PROGRESSION', isRead: false },
    { title: 'New Client Registered', description: 'Harper Lewis registered as a Buyer search profile.', type: 'CLIENT', isRead: true },
    { title: 'Diary Collision Detected', description: 'Double booking alert: Emma Watson has overlapping viewings at 3:00 PM.', type: 'DIARY', isRead: false },
    { title: 'Document Signed', description: 'Stonecroft Barn Terms of Business signed electronically by Vendor.', type: 'DOCUMENT', isRead: true },
    { title: 'Valuation Completed', description: 'Valuation report for Riverstone Apartments uploaded to CRM.', type: 'APPRAISAL', isRead: true }
  ];

  const notifications = [];
  for (const item of notificationsData) {
    const n = await prisma.notification.create({ data: item });
    notifications.push(n);
  }
  console.log(`Created ${notifications.length} Notifications.`);

  // 7. Seed Calendar Events (11 events, mixed statuses)
  const calendarEventsData = [
    { title: 'Viewing: Zenith Heights (John Smith)', dateTime: getOffsetDate(0, 1), type: 'VIEWING', status: CalendarEventStatus.CONFIRMED },
    { title: 'Property Inspection: Oakridge Manor', dateTime: getOffsetDate(0, 3), type: 'INSPECTION', status: CalendarEventStatus.PENDING },
    { title: 'Valuation appraisal: Meadow View', dateTime: getOffsetDate(1, 0), type: 'VALUATION', status: CalendarEventStatus.NEW },
    { title: 'Client Meeting: John Smith (Offer discussion)', dateTime: getOffsetDate(0, -1), type: 'MEETING', status: CalendarEventStatus.CONFIRMED },
    { title: 'Market Appraisal: 8 Woods Road', dateTime: getOffsetDate(0, 0), type: 'APPRAISAL', status: CalendarEventStatus.DUE_TODAY },
    { title: 'Solicitor Call: Maple Grove sale progression', dateTime: getOffsetDate(0, -3), type: 'PROGRESSION', status: CalendarEventStatus.CONFIRMED },
    { title: 'Viewing: Pinewood Cottage (Mason Martin)', dateTime: getOffsetDate(0, 6), type: 'VIEWING', status: CalendarEventStatus.CONFIRMED },
    { title: 'Staff Briefing: Weekly Operations Review', dateTime: getOffsetDate(0, -4), type: 'MEETING', status: CalendarEventStatus.CONFIRMED },
    { title: 'Viewing: The Gables (Amanda Wilson)', dateTime: getOffsetDate(3, 1), type: 'VIEWING', status: CalendarEventStatus.PENDING },
    { title: 'Viewing: Harbour View Penthouse (William Jones)', dateTime: getOffsetDate(0, 2), type: 'VIEWING', status: CalendarEventStatus.CONFIRMED },
    { title: 'Landlord Review: Jane Doe', dateTime: getOffsetDate(2, -2), type: 'MEETING', status: CalendarEventStatus.NEW }
  ];

  const calendarEvents = [];
  for (const item of calendarEventsData) {
    const ce = await prisma.calendarEvent.create({ data: item });
    calendarEvents.push(ce);
  }
  console.log(`Created ${calendarEvents.length} Calendar Events.`);

  console.log('Database seeding successfully finished!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
