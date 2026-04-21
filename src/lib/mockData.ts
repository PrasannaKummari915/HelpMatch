// Mock Data and Type Definitions for HelpMatch AI

export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';
export type IssueSeverity = 'Low' | 'Medium' | 'High';
export type IssueType = 'Food' | 'Water' | 'Health' | 'Shelter' | 'Disaster' | 'Other';

export interface Issue {
  id: string;
  title: string;
  type: IssueType;
  severity: IssueSeverity;
  peopleAffected: number;
  description: string;
  location: { lat: number; lng: number; name: string };
  status: IssueStatus;
  priorityScore: number;
  reportedAt: string;
  assignedVolunteerId?: string;
}

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Flood causing water shortage',
    type: 'Water',
    severity: 'High',
    peopleAffected: 150,
    description: 'Major flooding has disrupted clean water supply.',
    location: { lat: 17.3850, lng: 78.4867, name: 'Area A' },
    status: 'Pending',
    priorityScore: 95,
    reportedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Trapped family in building',
    type: 'Disaster',
    severity: 'High',
    peopleAffected: 5,
    description: 'A family is trapped on the second floor due to heavy water currents.',
    location: { lat: 17.3950, lng: 78.4767, name: 'Area D' },
    status: 'Pending',
    priorityScore: 100,
    reportedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Need warm blankets',
    type: 'Shelter',
    severity: 'Low',
    peopleAffected: 30,
    description: 'People in the temporary shelter are freezing and need blankets.',
    location: { lat: 17.4150, lng: 78.5067, name: 'Area E' },
    status: 'Pending',
    priorityScore: 30,
    reportedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Need medical supplies at shelter',
    type: 'Health',
    severity: 'Medium',
    peopleAffected: 45,
    description: 'Basic medical kits running low.',
    location: { lat: 17.4050, lng: 78.4967, name: 'Area B' },
    status: 'In Progress',
    priorityScore: 60,
    reportedAt: new Date().toISOString(),
    assignedVolunteerId: 'v1',
  },
  {
    id: '6',
    title: 'Road blocked by debris',
    type: 'Other',
    severity: 'Medium',
    peopleAffected: 0,
    description: 'Main access road to shelter is blocked by fallen trees.',
    location: { lat: 17.3750, lng: 78.4667, name: 'Area F' },
    status: 'In Progress',
    priorityScore: 50,
    reportedAt: new Date().toISOString(),
    assignedVolunteerId: 'v2',
  },
  {
    id: '3',
    title: 'Food packets required',
    type: 'Food',
    severity: 'Low',
    peopleAffected: 20,
    description: 'Require immediate food distribution.',
    location: { lat: 17.3650, lng: 78.4767, name: 'Area C' },
    status: 'Resolved',
    priorityScore: 25,
    reportedAt: new Date().toISOString(),
    assignedVolunteerId: 'v3',
  }
];

export interface Volunteer {
  id: string;
  name: string;
  skills: string[];
  points: number;
  assignedTasks: string[]; // Issue IDs
}

export const mockVolunteers: Volunteer[] = [
  { id: 'v1', name: 'Ravi', skills: ['Medical', 'Driving'], points: 120, assignedTasks: ['2'] },
  { id: 'v2', name: 'Anil', skills: ['Logistics'], points: 95, assignedTasks: [] },
  { id: 'v3', name: 'You', skills: ['Coordination'], points: 80, assignedTasks: [] },
];
