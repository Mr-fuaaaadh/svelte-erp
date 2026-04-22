export type UserRole =
  | "super_admin"
  | "school_admin"
  | "teacher"
  | "parent"
  | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  school?: string;
}

export type SubscriptionPlan = "Basic" | "Professional" | "Enterprise";
export type SchoolStatus = "Active" | "Inactive" | "Pending" | "Expired";

export interface School {
  id: string;
  name: string;
  state: string;
  district: string;
  subscriptionPlan: SubscriptionPlan;
  status: SchoolStatus;
  studentCount: number;
  teacherCount: number;
  revenue: number;
  gstNo: string;
  principal: string;
  phone: string;
  email: string;
  address: string;
  joinedDate: string;
}

export type FeeStatus = "Paid" | "Pending" | "Overdue" | "Partial";

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  feeStatus: FeeStatus;
  admissionDate: string;
  attendance: number;
  parentName: string;
  parentPhone: string;
  address: string;
  school: string;
  photo?: string;
  dob: string;
  gender: "Male" | "Female";
}

export type TeacherStatus = "Active" | "On Leave" | "Resigned";

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  salary: number;
  joiningDate: string;
  status: TeacherStatus;
  attendance: number;
  leaveBalance: number;
  school: string;
  phone: string;
  email: string;
  classes: string[];
}

export type LeadStage =
  | "New"
  | "Contacted"
  | "Demo Scheduled"
  | "Proposal Sent"
  | "Negotiation"
  | "Won"
  | "Lost";

export interface Lead {
  id: string;
  schoolName: string;
  contactName: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  stage: LeadStage;
  assignedTo: string;
  nextFollowup: string;
  value: number;
  notes: string;
  createdAt: string;
}

export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

export interface Invoice {
  id: string;
  invoiceNo: string;
  schoolName: string;
  amount: number;
  gstAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  gstNo: string;
  plan: SubscriptionPlan;
}

export type SubscriptionStatus = "Active" | "Expired" | "Cancelled" | "Trial";

export interface Subscription {
  id: string;
  schoolName: string;
  plan: SubscriptionPlan;
  amount: number;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  autoRenew: boolean;
}

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: string;
}

export interface DashboardStats {
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  newLeads: number;
  pendingSupport: number;
  schoolGrowth: number;
  revenueGrowth: number;
  studentGrowth: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  subscriptions: number;
  newSchools: number;
}

export interface StateStats {
  state: string;
  schools: number;
  students: number;
  revenue: number;
}
