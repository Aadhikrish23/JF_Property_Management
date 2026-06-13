export interface User {
  id: string;
  name: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  type: 'VIEWING' | 'FEEDBACK' | 'OFFER' | 'APPRAISAL' | 'TODO' | 'PROGRESSION';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string | null;
  assignedUser?: User | null;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface UpcomingActivity {
  id: string;
  title: string;
  type: string;
  dateTime: string;
  status: string;
}

export interface DashboardData {
  chaseUps: Task[];
  workflowTasks: Task[];
  notifications: Notification[];
  upcomingActivities: UpcomingActivity[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}
