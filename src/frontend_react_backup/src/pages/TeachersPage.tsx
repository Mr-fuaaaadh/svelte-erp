import KPICard from "@/components/ui/KPICard";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  IndianRupee,
  MoreHorizontal,
  RefreshCw,
  Search,
  Star,
  TrendingUp,
  UserCheck,
  UserMinus,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type LocalTeacherStatus = "Active" | "On Leave" | "Probation";
type PayrollStatus = "Processed" | "Pending" | "On Hold";
type LeaveStatus = "Pending" | "Approved" | "Rejected";
type LeaveType =
  | "Casual Leave"
  | "Medical Leave"
  | "Maternity/Paternity"
  | "Emergency"
  | "Earned Leave";

interface TeacherRecord {
  id: string;
  name: string;
  school: string;
  subject: string;
  qualification: string;
  salary: number;
  joiningDate: string;
  status: LocalTeacherStatus;
}

interface PayrollRecord {
  id: string;
  teacherName: string;
  school: string;
  basic: number;
  da: number;
  hra: number;
  gross: number;
  deductions: number;
  netPayable: number;
  month: string;
  status: PayrollStatus;
}

interface AttendanceRecord {
  id: string;
  teacherName: string;
  school: string;
  workingDays: number;
  present: number;
  absent: number;
  halfDay: number;
  leavesTaken: number;
  attendancePct: number;
}

interface LeaveRecord {
  id: string;
  teacherName: string;
  school: string;
  leaveType: LeaveType;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: LeaveStatus;
}

interface PerformanceRecord {
  id: string;
  teacherName: string;
  school: string;
  studentsTaught: number;
  avgStudentScore: number;
  parentRating: number;
  punctuality: number;
  overallRating: number;
  remarks: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const teachersList: TeacherRecord[] = [
  {
    id: "TCH001",
    name: "Sunita Sharma",
    school: "DPS Rohini",
    subject: "Mathematics",
    qualification: "M.Sc. Mathematics",
    salary: 45000,
    joiningDate: "2018-07-12",
    status: "Active",
  },
  {
    id: "TCH002",
    name: "Rajesh Kumar",
    school: "St. Xavier's Mumbai",
    subject: "Physics",
    qualification: "M.Sc. Physics, B.Ed.",
    salary: 52000,
    joiningDate: "2016-03-22",
    status: "Active",
  },
  {
    id: "TCH003",
    name: "Anita Patel",
    school: "Ryan International Surat",
    subject: "Chemistry",
    qualification: "M.Sc. Chemistry",
    salary: 48000,
    joiningDate: "2019-06-15",
    status: "Active",
  },
  {
    id: "TCH004",
    name: "Mohan Iyer",
    school: "Amity School Noida",
    subject: "English",
    qualification: "M.A. English, B.Ed.",
    salary: 43000,
    joiningDate: "2020-08-01",
    status: "Active",
  },
  {
    id: "TCH005",
    name: "Geeta Nair",
    school: "Kendriya Vidyalaya Kochi",
    subject: "Biology",
    qualification: "M.Sc. Biology",
    salary: 38000,
    joiningDate: "2021-04-10",
    status: "Active",
  },
  {
    id: "TCH006",
    name: "Suresh Verma",
    school: "Delhi Public School Jaipur",
    subject: "Hindi",
    qualification: "M.A. Hindi, B.Ed.",
    salary: 36000,
    joiningDate: "2017-09-05",
    status: "On Leave",
  },
  {
    id: "TCH007",
    name: "Kavitha Reddy",
    school: "Narayana School Hyderabad",
    subject: "History",
    qualification: "M.A. History",
    salary: 40000,
    joiningDate: "2020-01-15",
    status: "Active",
  },
  {
    id: "TCH008",
    name: "Pramod Joshi",
    school: "Podar International Mumbai",
    subject: "Geography",
    qualification: "M.A. Geography, B.Ed.",
    salary: 42000,
    joiningDate: "2019-11-20",
    status: "Probation",
  },
  {
    id: "TCH009",
    name: "Rekha Singh",
    school: "DPS Rohini",
    subject: "Computer Science",
    qualification: "MCA, B.Ed.",
    salary: 55000,
    joiningDate: "2018-02-28",
    status: "Active",
  },
  {
    id: "TCH010",
    name: "Deepak Malhotra",
    school: "Amity School Noida",
    subject: "Physical Education",
    qualification: "B.P.Ed., M.P.Ed.",
    salary: 34000,
    joiningDate: "2022-06-01",
    status: "Active",
  },
  {
    id: "TCH011",
    name: "Priya Menon",
    school: "St. Xavier's Mumbai",
    subject: "Mathematics",
    qualification: "M.Sc. Mathematics, B.Ed.",
    salary: 47000,
    joiningDate: "2017-07-18",
    status: "Active",
  },
  {
    id: "TCH012",
    name: "Arun Mishra",
    school: "Ryan International Surat",
    subject: "Physics",
    qualification: "M.Sc. Physics",
    salary: 50000,
    joiningDate: "2015-04-14",
    status: "Active",
  },
  {
    id: "TCH013",
    name: "Lakshmi Devi",
    school: "Kendriya Vidyalaya Kochi",
    subject: "Chemistry",
    qualification: "M.Sc. Chemistry, B.Ed.",
    salary: 39000,
    joiningDate: "2021-08-09",
    status: "On Leave",
  },
  {
    id: "TCH014",
    name: "Vikram Saxena",
    school: "Narayana School Hyderabad",
    subject: "Biology",
    qualification: "M.Sc. Biology, B.Ed.",
    salary: 44000,
    joiningDate: "2016-10-22",
    status: "Active",
  },
  {
    id: "TCH015",
    name: "Nandita Roy",
    school: "Podar International Mumbai",
    subject: "English",
    qualification: "M.A. English",
    salary: 41000,
    joiningDate: "2020-03-11",
    status: "Active",
  },
  {
    id: "TCH016",
    name: "Harish Gupta",
    school: "Delhi Public School Jaipur",
    subject: "Hindi",
    qualification: "M.A. Hindi",
    salary: 37000,
    joiningDate: "2019-09-25",
    status: "Active",
  },
  {
    id: "TCH017",
    name: "Swati Kulkarni",
    school: "DPS Rohini",
    subject: "History",
    qualification: "M.A. History, B.Ed.",
    salary: 43000,
    joiningDate: "2018-12-03",
    status: "Probation",
  },
  {
    id: "TCH018",
    name: "Bhaskar Rao",
    school: "Amity School Noida",
    subject: "Geography",
    qualification: "M.A. Geography",
    salary: 40000,
    joiningDate: "2022-01-17",
    status: "Active",
  },
  {
    id: "TCH019",
    name: "Meena Tripathi",
    school: "St. Xavier's Mumbai",
    subject: "Computer Science",
    qualification: "M.Tech, B.Ed.",
    salary: 58000,
    joiningDate: "2014-06-30",
    status: "Active",
  },
  {
    id: "TCH020",
    name: "Santosh Pillai",
    school: "Kendriya Vidyalaya Kochi",
    subject: "Physical Education",
    qualification: "B.P.Ed.",
    salary: 32000,
    joiningDate: "2023-01-05",
    status: "Probation",
  },
];

const payrollList: PayrollRecord[] = [
  {
    id: "PAY001",
    teacherName: "Sunita Sharma",
    school: "DPS Rohini",
    basic: 28000,
    da: 7560,
    hra: 9440,
    gross: 45000,
    deductions: 5850,
    netPayable: 39150,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY002",
    teacherName: "Rajesh Kumar",
    school: "St. Xavier's Mumbai",
    basic: 32000,
    da: 8640,
    hra: 11360,
    gross: 52000,
    deductions: 6760,
    netPayable: 45240,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY003",
    teacherName: "Anita Patel",
    school: "Ryan International Surat",
    basic: 30000,
    da: 8100,
    hra: 9900,
    gross: 48000,
    deductions: 6240,
    netPayable: 41760,
    month: "April 2025",
    status: "Pending",
  },
  {
    id: "PAY004",
    teacherName: "Mohan Iyer",
    school: "Amity School Noida",
    basic: 27000,
    da: 7290,
    hra: 8710,
    gross: 43000,
    deductions: 5590,
    netPayable: 37410,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY005",
    teacherName: "Geeta Nair",
    school: "Kendriya Vidyalaya Kochi",
    basic: 24000,
    da: 6480,
    hra: 7520,
    gross: 38000,
    deductions: 4940,
    netPayable: 33060,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY006",
    teacherName: "Suresh Verma",
    school: "Delhi Public School Jaipur",
    basic: 22500,
    da: 6075,
    hra: 7425,
    gross: 36000,
    deductions: 4680,
    netPayable: 31320,
    month: "April 2025",
    status: "On Hold",
  },
  {
    id: "PAY007",
    teacherName: "Kavitha Reddy",
    school: "Narayana School Hyderabad",
    basic: 25000,
    da: 6750,
    hra: 8250,
    gross: 40000,
    deductions: 5200,
    netPayable: 34800,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY008",
    teacherName: "Pramod Joshi",
    school: "Podar International Mumbai",
    basic: 26000,
    da: 7020,
    hra: 8980,
    gross: 42000,
    deductions: 5460,
    netPayable: 36540,
    month: "April 2025",
    status: "Pending",
  },
  {
    id: "PAY009",
    teacherName: "Rekha Singh",
    school: "DPS Rohini",
    basic: 34000,
    da: 9180,
    hra: 11820,
    gross: 55000,
    deductions: 7150,
    netPayable: 47850,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY010",
    teacherName: "Deepak Malhotra",
    school: "Amity School Noida",
    basic: 21000,
    da: 5670,
    hra: 7330,
    gross: 34000,
    deductions: 4420,
    netPayable: 29580,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY011",
    teacherName: "Priya Menon",
    school: "St. Xavier's Mumbai",
    basic: 29000,
    da: 7830,
    hra: 10170,
    gross: 47000,
    deductions: 6110,
    netPayable: 40890,
    month: "April 2025",
    status: "Pending",
  },
  {
    id: "PAY012",
    teacherName: "Arun Mishra",
    school: "Ryan International Surat",
    basic: 31000,
    da: 8370,
    hra: 10630,
    gross: 50000,
    deductions: 6500,
    netPayable: 43500,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY013",
    teacherName: "Lakshmi Devi",
    school: "Kendriya Vidyalaya Kochi",
    basic: 24000,
    da: 6480,
    hra: 8520,
    gross: 39000,
    deductions: 5070,
    netPayable: 33930,
    month: "April 2025",
    status: "On Hold",
  },
  {
    id: "PAY014",
    teacherName: "Vikram Saxena",
    school: "Narayana School Hyderabad",
    basic: 27000,
    da: 7290,
    hra: 9710,
    gross: 44000,
    deductions: 5720,
    netPayable: 38280,
    month: "April 2025",
    status: "Processed",
  },
  {
    id: "PAY015",
    teacherName: "Nandita Roy",
    school: "Podar International Mumbai",
    basic: 25500,
    da: 6885,
    hra: 8615,
    gross: 41000,
    deductions: 5330,
    netPayable: 35670,
    month: "April 2025",
    status: "Processed",
  },
];

const attendanceList: AttendanceRecord[] = [
  {
    id: "ATT001",
    teacherName: "Sunita Sharma",
    school: "DPS Rohini",
    workingDays: 26,
    present: 25,
    absent: 1,
    halfDay: 0,
    leavesTaken: 1,
    attendancePct: 96.2,
  },
  {
    id: "ATT002",
    teacherName: "Rajesh Kumar",
    school: "St. Xavier's Mumbai",
    workingDays: 26,
    present: 24,
    absent: 2,
    halfDay: 1,
    leavesTaken: 2,
    attendancePct: 92.3,
  },
  {
    id: "ATT003",
    teacherName: "Anita Patel",
    school: "Ryan International Surat",
    workingDays: 26,
    present: 26,
    absent: 0,
    halfDay: 0,
    leavesTaken: 0,
    attendancePct: 100,
  },
  {
    id: "ATT004",
    teacherName: "Mohan Iyer",
    school: "Amity School Noida",
    workingDays: 26,
    present: 23,
    absent: 3,
    halfDay: 0,
    leavesTaken: 2,
    attendancePct: 88.5,
  },
  {
    id: "ATT005",
    teacherName: "Geeta Nair",
    school: "Kendriya Vidyalaya Kochi",
    workingDays: 26,
    present: 25,
    absent: 0,
    halfDay: 2,
    leavesTaken: 1,
    attendancePct: 96.2,
  },
  {
    id: "ATT006",
    teacherName: "Suresh Verma",
    school: "Delhi Public School Jaipur",
    workingDays: 26,
    present: 10,
    absent: 16,
    halfDay: 0,
    leavesTaken: 16,
    attendancePct: 38.5,
  },
  {
    id: "ATT007",
    teacherName: "Kavitha Reddy",
    school: "Narayana School Hyderabad",
    workingDays: 26,
    present: 26,
    absent: 0,
    halfDay: 0,
    leavesTaken: 0,
    attendancePct: 100,
  },
  {
    id: "ATT008",
    teacherName: "Pramod Joshi",
    school: "Podar International Mumbai",
    workingDays: 26,
    present: 24,
    absent: 2,
    halfDay: 0,
    leavesTaken: 1,
    attendancePct: 92.3,
  },
  {
    id: "ATT009",
    teacherName: "Rekha Singh",
    school: "DPS Rohini",
    workingDays: 26,
    present: 25,
    absent: 1,
    halfDay: 0,
    leavesTaken: 1,
    attendancePct: 96.2,
  },
  {
    id: "ATT010",
    teacherName: "Deepak Malhotra",
    school: "Amity School Noida",
    workingDays: 26,
    present: 22,
    absent: 4,
    halfDay: 0,
    leavesTaken: 3,
    attendancePct: 84.6,
  },
  {
    id: "ATT011",
    teacherName: "Priya Menon",
    school: "St. Xavier's Mumbai",
    workingDays: 26,
    present: 26,
    absent: 0,
    halfDay: 0,
    leavesTaken: 0,
    attendancePct: 100,
  },
  {
    id: "ATT012",
    teacherName: "Vikram Saxena",
    school: "Narayana School Hyderabad",
    workingDays: 26,
    present: 25,
    absent: 1,
    halfDay: 1,
    leavesTaken: 1,
    attendancePct: 96.2,
  },
];

const leavesList: LeaveRecord[] = [
  {
    id: "LV001",
    teacherName: "Suresh Verma",
    school: "Delhi Public School Jaipur",
    leaveType: "Medical Leave",
    from: "15 Apr 2025",
    to: "30 Apr 2025",
    days: 16,
    reason: "Post-surgery recovery — advised complete bed rest",
    status: "Approved",
  },
  {
    id: "LV002",
    teacherName: "Lakshmi Devi",
    school: "Kendriya Vidyalaya Kochi",
    leaveType: "Maternity/Paternity",
    from: "01 Apr 2025",
    to: "30 Jun 2025",
    days: 91,
    reason: "Maternity leave as per government guidelines",
    status: "Approved",
  },
  {
    id: "LV003",
    teacherName: "Pramod Joshi",
    school: "Podar International Mumbai",
    leaveType: "Casual Leave",
    from: "22 Apr 2025",
    to: "23 Apr 2025",
    days: 2,
    reason: "Family function — sister's wedding",
    status: "Pending",
  },
  {
    id: "LV004",
    teacherName: "Deepak Malhotra",
    school: "Amity School Noida",
    leaveType: "Emergency",
    from: "18 Apr 2025",
    to: "21 Apr 2025",
    days: 4,
    reason: "Father hospitalised — medical emergency",
    status: "Approved",
  },
  {
    id: "LV005",
    teacherName: "Nandita Roy",
    school: "Podar International Mumbai",
    leaveType: "Earned Leave",
    from: "28 Apr 2025",
    to: "02 May 2025",
    days: 3,
    reason: "Annual leave encashment — planned trip",
    status: "Pending",
  },
  {
    id: "LV006",
    teacherName: "Harish Gupta",
    school: "Delhi Public School Jaipur",
    leaveType: "Casual Leave",
    from: "24 Apr 2025",
    to: "24 Apr 2025",
    days: 1,
    reason: "Personal work",
    status: "Rejected",
  },
  {
    id: "LV007",
    teacherName: "Mohan Iyer",
    school: "Amity School Noida",
    leaveType: "Medical Leave",
    from: "10 Apr 2025",
    to: "12 Apr 2025",
    days: 3,
    reason: "Viral fever — doctor prescribed rest",
    status: "Approved",
  },
  {
    id: "LV008",
    teacherName: "Priya Menon",
    school: "St. Xavier's Mumbai",
    leaveType: "Earned Leave",
    from: "05 May 2025",
    to: "09 May 2025",
    days: 5,
    reason: "Personal vacation",
    status: "Pending",
  },
];

const performanceList: PerformanceRecord[] = [
  {
    id: "PERF001",
    teacherName: "Rekha Singh",
    school: "DPS Rohini",
    studentsTaught: 142,
    avgStudentScore: 87,
    parentRating: 4.8,
    punctuality: 98,
    overallRating: 4.7,
    remarks: "Outstanding — consistent top scorer results",
  },
  {
    id: "PERF002",
    teacherName: "Anita Patel",
    school: "Ryan International Surat",
    studentsTaught: 118,
    avgStudentScore: 84,
    parentRating: 4.6,
    punctuality: 100,
    overallRating: 4.6,
    remarks: "Excellent teaching methodology and student engagement",
  },
  {
    id: "PERF003",
    teacherName: "Kavitha Reddy",
    school: "Narayana School Hyderabad",
    studentsTaught: 135,
    avgStudentScore: 83,
    parentRating: 4.5,
    punctuality: 96,
    overallRating: 4.5,
    remarks: "Highly praised by parents for interactive sessions",
  },
  {
    id: "PERF004",
    teacherName: "Sunita Sharma",
    school: "DPS Rohini",
    studentsTaught: 128,
    avgStudentScore: 81,
    parentRating: 4.4,
    punctuality: 96,
    overallRating: 4.4,
    remarks: "Strong fundamentals, consistent student improvement",
  },
  {
    id: "PERF005",
    teacherName: "Priya Menon",
    school: "St. Xavier's Mumbai",
    studentsTaught: 140,
    avgStudentScore: 80,
    parentRating: 4.4,
    punctuality: 100,
    overallRating: 4.4,
    remarks: "Perfect attendance, excellent curriculum delivery",
  },
  {
    id: "PERF006",
    teacherName: "Vikram Saxena",
    school: "Narayana School Hyderabad",
    studentsTaught: 122,
    avgStudentScore: 79,
    parentRating: 4.3,
    punctuality: 96,
    overallRating: 4.3,
    remarks: "Good practical demonstrations, lab results improved",
  },
  {
    id: "PERF007",
    teacherName: "Rajesh Kumar",
    school: "St. Xavier's Mumbai",
    studentsTaught: 115,
    avgStudentScore: 78,
    parentRating: 4.3,
    punctuality: 92,
    overallRating: 4.2,
    remarks: "Strong subject knowledge, needs to improve punctuality",
  },
  {
    id: "PERF008",
    teacherName: "Geeta Nair",
    school: "Kendriya Vidyalaya Kochi",
    studentsTaught: 108,
    avgStudentScore: 76,
    parentRating: 4.1,
    punctuality: 96,
    overallRating: 4.1,
    remarks: "Steady improvement in board exam preparation",
  },
  {
    id: "PERF009",
    teacherName: "Nandita Roy",
    school: "Podar International Mumbai",
    studentsTaught: 112,
    avgStudentScore: 75,
    parentRating: 4.0,
    punctuality: 96,
    overallRating: 4.0,
    remarks: "Good classroom management, students enjoy sessions",
  },
  {
    id: "PERF010",
    teacherName: "Arun Mishra",
    school: "Ryan International Surat",
    studentsTaught: 126,
    avgStudentScore: 74,
    parentRating: 3.9,
    punctuality: 92,
    overallRating: 3.9,
    remarks: "Scope for improvement in assessment frequency",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-3.5 h-3.5",
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground",
          )}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground font-mono">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function AttendancePct({ pct }: { pct: number }) {
  const cls =
    pct >= 95
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : pct >= 80
        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
        : "bg-rose-500/10 text-rose-400 border-rose-500/20";
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[11px] font-mono font-medium border px-2 py-0.5",
        cls,
      )}
    >
      {pct.toFixed(1)}%
    </Badge>
  );
}

function PayrollBadge({ status }: { status: PayrollStatus }) {
  const cfg: Record<PayrollStatus, string> = {
    Processed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "On Hold": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-[11px] font-medium border px-2 py-0.5", cfg[status])}
    >
      {status}
    </Badge>
  );
}

function LeaveBadge({ status }: { status: LeaveStatus }) {
  const cfg: Record<LeaveStatus, string> = {
    Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
  const icons: Record<LeaveStatus, React.ReactNode> = {
    Approved: <CheckCircle2 className="w-3 h-3" />,
    Pending: <Clock className="w-3 h-3" />,
    Rejected: <XCircle className="w-3 h-3" />,
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[11px] font-medium border px-2 py-0.5 gap-1",
        cfg[status],
      )}
    >
      {icons[status]}
      {status}
    </Badge>
  );
}

function TeacherBadge({ status }: { status: LocalTeacherStatus }) {
  const map: Record<LocalTeacherStatus, "Active" | "On Leave" | "Pending"> = {
    Active: "Active",
    "On Leave": "On Leave",
    Probation: "Pending",
  };
  return <StatusBadge status={map[status]} dot />;
}

function GlassCard({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "glass rounded-xl border border-border/30 overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Tab: Teachers Directory ──────────────────────────────────────────────────

function TeachersTab() {
  const [search, setSearch] = useState("");
  const filtered = teachersList.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.school.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="teachers.search_input"
            placeholder="Search teachers, subjects, schools…"
            className="pl-9 bg-muted/20 border-border/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 border-border/50"
          data-ocid="teachers.filter_button"
        >
          <Filter className="w-4 h-4" /> Filter
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 border-border/50"
          data-ocid="teachers.export_button"
        >
          <Download className="w-4 h-4" /> Export
        </Button>
        <Button
          type="button"
          size="sm"
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="teachers.directory.add_button"
        >
          <Users className="w-4 h-4" /> Add Teacher
        </Button>
      </div>

      <GlassCard>
        <ScrollArea className="w-full">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                {[
                  "Teacher ID",
                  "Name",
                  "School",
                  "Subject",
                  "Qualification",
                  "Salary/Month",
                  "Joining Date",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr
                  key={t.id}
                  data-ocid={`teachers.item.${i + 1}`}
                  className="border-b border-border/20 hover:bg-muted/10 transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">
                      {t.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className="font-medium text-foreground truncate">
                        {t.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[160px]">
                    <span className="truncate block">{t.school}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className="text-[11px] bg-accent/5 text-accent border-accent/20 whitespace-nowrap"
                    >
                      {t.subject}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[160px]">
                    <span className="truncate block">{t.qualification}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-emerald-400">
                      {fmt(t.salary)}/mo
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(t.joiningDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <TeacherBadge status={t.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-muted-foreground hover:text-accent"
                        data-ocid={`teachers.view_button.${i + 1}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-muted-foreground hover:text-accent"
                        data-ocid={`teachers.edit_button.${i + 1}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-muted-foreground hover:text-amber-400"
                        data-ocid={`teachers.salary_button.${i + 1}`}
                      >
                        <IndianRupee className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-muted-foreground"
                        data-ocid={`teachers.more_button.${i + 1}`}
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <div className="px-4 py-3 border-t border-border/30 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {teachersList.length} teachers
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs border-border/50"
              data-ocid="teachers.pagination_prev"
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs bg-accent/10 text-accent border-accent/30"
            >
              1
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs border-border/50"
              data-ocid="teachers.pagination_next"
            >
              Next
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Tab: Payroll ─────────────────────────────────────────────────────────────

function PayrollTab() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleAll = () => {
    setSelected(
      selected.size === payrollList.length
        ? new Set()
        : new Set(payrollList.map((p) => p.id)),
    );
  };

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const summaries = [
    { label: "Total Payroll", value: "₹4.2Cr", cls: "text-foreground" },
    { label: "Processed", value: "₹3.8Cr", cls: "text-emerald-400" },
    { label: "Pending", value: "₹41L", cls: "text-amber-400" },
    { label: "Current Month", value: "April 2025", cls: "text-accent" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaries.map((s) => (
          <div
            key={s.label}
            className="glass rounded-xl border border-border/30 px-5 py-4"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {s.label}
            </p>
            <p className={cn("text-xl font-display font-bold mt-1", s.cls)}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {selected.size > 0 && (
          <span className="text-xs text-accent font-medium bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20">
            {selected.size} selected
          </span>
        )}
        <Button
          type="button"
          size="sm"
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="payroll.process_button"
        >
          <RefreshCw className="w-4 h-4" /> Process Payroll
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 border-border/50"
          data-ocid="payroll.export_button"
        >
          <Download className="w-4 h-4" /> Export Payslips
        </Button>
        <div
          className="ml-auto flex items-center gap-2 text-xs text-muted-foreground glass rounded-lg border border-border/40 px-3 py-2 cursor-pointer"
          data-ocid="payroll.period_select"
        >
          <Calendar className="w-4 h-4" />
          <span>April 2025</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>

      <GlassCard>
        <ScrollArea className="w-full">
          <table className="w-full min-w-[1200px] text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    data-ocid="payroll.select_all"
                    checked={selected.size === payrollList.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                {[
                  "Teacher",
                  "School",
                  "Basic",
                  "DA",
                  "HRA",
                  "Total Gross",
                  "Deductions (PF+TDS)",
                  "Net Payable",
                  "Month",
                  "Status",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payrollList.map((p, i) => (
                <tr
                  key={p.id}
                  data-ocid={`payroll.item.${i + 1}`}
                  className={cn(
                    "border-b border-border/20 hover:bg-muted/10 transition-colors duration-150",
                    selected.has(p.id) && "bg-accent/5",
                  )}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      data-ocid={`payroll.checkbox.${i + 1}`}
                      checked={selected.has(p.id)}
                      onCheckedChange={() => toggle(p.id)}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {p.teacherName}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[140px]">
                    <span className="truncate block">{p.school}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {fmt(p.basic)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {fmt(p.da)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {fmt(p.hra)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-foreground">
                    {fmt(p.gross)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-rose-400">
                    -{fmt(p.deductions)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-bold text-emerald-400">
                    {fmt(p.netPayable)}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {p.month}
                  </td>
                  <td className="px-4 py-3">
                    <PayrollBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 text-muted-foreground hover:text-accent"
                      data-ocid={`payroll.view_button.${i + 1}`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </GlassCard>
    </div>
  );
}

// ─── Tab: Attendance ──────────────────────────────────────────────────────────

function AttendanceTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground glass rounded-lg border border-border/40 px-4 py-2 cursor-pointer"
          data-ocid="attendance.period_select"
        >
          <Calendar className="w-4 h-4" />
          <span>April 2025</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 border-border/50"
          data-ocid="attendance.export_button"
        >
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      <GlassCard>
        <ScrollArea className="w-full">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                {[
                  "Teacher",
                  "School",
                  "Working Days",
                  "Present",
                  "Absent",
                  "Half Day",
                  "Leaves Taken",
                  "Attendance %",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((a, i) => (
                <tr
                  key={a.id}
                  data-ocid={`attendance.item.${i + 1}`}
                  className="border-b border-border/20 hover:bg-muted/10 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {a.teacherName}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[160px]">
                    <span className="truncate block">{a.school}</span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-sm font-semibold text-foreground">
                    {a.workingDays}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-sm font-semibold text-emerald-400">
                    {a.present}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-sm font-semibold text-rose-400">
                    {a.absent}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-sm text-amber-400">
                    {a.halfDay}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-sm text-muted-foreground">
                    {a.leavesTaken}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <AttendancePct pct={a.attendancePct} />
                      <div className="w-24 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            a.attendancePct >= 95
                              ? "bg-emerald-400"
                              : a.attendancePct >= 80
                                ? "bg-amber-400"
                                : "bg-rose-400",
                          )}
                          style={{ width: `${a.attendancePct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {a.attendancePct >= 95 ? (
                      <Badge
                        variant="outline"
                        className="text-[11px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      >
                        Excellent
                      </Badge>
                    ) : a.attendancePct >= 80 ? (
                      <Badge
                        variant="outline"
                        className="text-[11px] bg-amber-500/10 text-amber-400 border-amber-500/20"
                      >
                        Good
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-[11px] bg-rose-500/10 text-rose-400 border-rose-500/20"
                      >
                        Below Avg
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </GlassCard>
    </div>
  );
}

// ─── Tab: Leave Management ────────────────────────────────────────────────────

function LeaveTab() {
  const balances = [
    { type: "Casual Leave (CL)", used: 4, total: 12, bar: "bg-blue-400" },
    { type: "Medical Leave (ML)", used: 3, total: 10, bar: "bg-rose-400" },
    { type: "Earned Leave (EL)", used: 8, total: 30, bar: "bg-violet-400" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {balances.map((lb) => (
          <div
            key={lb.type}
            className="glass rounded-xl border border-border/30 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {lb.type}
              </p>
              <span className="font-mono text-sm font-bold text-foreground">
                {lb.used}/{lb.total}
              </span>
            </div>
            <div className="w-full h-2 bg-muted/40 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full", lb.bar)}
                style={{ width: `${(lb.used / lb.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {lb.total - lb.used} days remaining
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="sm"
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="leave.apply_button"
        >
          <Calendar className="w-4 h-4" /> Apply Leave
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 border-border/50"
          data-ocid="leave.filter_button"
        >
          <Filter className="w-4 h-4" /> Filter by Status
        </Button>
      </div>

      <GlassCard>
        <ScrollArea className="w-full">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                {[
                  "Teacher",
                  "School",
                  "Leave Type",
                  "From",
                  "To",
                  "Days",
                  "Reason",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leavesList.map((lv, i) => (
                <tr
                  key={lv.id}
                  data-ocid={`leave.item.${i + 1}`}
                  className="border-b border-border/20 hover:bg-muted/10 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {lv.teacherName}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[140px]">
                    <span className="truncate block">{lv.school}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className="text-[11px] bg-muted/40 text-muted-foreground border-border/50 whitespace-nowrap"
                    >
                      {lv.leaveType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {lv.from}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {lv.to}
                  </td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-foreground">
                    {lv.days}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px]">
                    <span className="line-clamp-2">{lv.reason}</span>
                  </td>
                  <td className="px-4 py-3">
                    <LeaveBadge status={lv.status} />
                  </td>
                  <td className="px-4 py-3">
                    {lv.status === "Pending" ? (
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="sm"
                          className="h-7 px-2 text-xs gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                          data-ocid={`leave.approve_button.${i + 1}`}
                        >
                          <CheckCircle2 className="w-3 h-3" /> Approve
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="h-7 px-2 text-xs gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                          data-ocid={`leave.reject_button.${i + 1}`}
                        >
                          <XCircle className="w-3 h-3" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        {lv.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </GlassCard>
    </div>
  );
}

// ─── Tab: Performance ─────────────────────────────────────────────────────────

function PerformanceTab() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wide">
            Top Performer — April 2025
          </p>
          <p className="text-base font-display font-bold text-foreground mt-0.5">
            Rekha Singh — DPS Rohini
          </p>
          <p className="text-xs text-muted-foreground">
            Computer Science · 142 students · 98% punctuality
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <StarRating rating={4.7} />
        </div>
      </div>

      <GlassCard>
        <ScrollArea className="w-full">
          <table className="w-full min-w-[1050px] text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                {[
                  "#",
                  "Teacher",
                  "School",
                  "Students",
                  "Avg Score",
                  "Parent Rating",
                  "Punctuality",
                  "Overall Rating",
                  "Remarks",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {performanceList.map((p, i) => (
                <tr
                  key={p.id}
                  data-ocid={`performance.item.${i + 1}`}
                  className="border-b border-border/20 hover:bg-muted/10 transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold",
                        i === 0
                          ? "bg-amber-400/20 text-amber-400"
                          : i === 1
                            ? "bg-muted/60 text-muted-foreground"
                            : "bg-muted/40 text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {p.teacherName}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[140px]">
                    <span className="truncate block">{p.school}</span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono font-semibold text-foreground">
                    {p.studentsTaught}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-mono font-bold text-accent">
                        {p.avgStudentScore}%
                      </span>
                      <div className="w-16 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent/70 rounded-full"
                          style={{ width: `${p.avgStudentScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={p.parentRating} />
                  </td>
                  <td className="px-4 py-3">
                    <AttendancePct pct={p.punctuality} />
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={p.overallRating} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[220px]">
                    <span className="line-clamp-2">{p.remarks}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </GlassCard>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeachersPage() {
  const kpis = [
    {
      title: "Total Teachers",
      value: "8,743",
      change: 6.2,
      changeType: "up" as const,
      icon: Users,
      color: "blue" as const,
      subtitle: "Across 312 partner schools",
    },
    {
      title: "Present Today",
      value: "7,891",
      change: 2.1,
      changeType: "up" as const,
      icon: UserCheck,
      color: "emerald" as const,
      subtitle: "90.3% attendance rate",
    },
    {
      title: "On Leave",
      value: "312",
      change: 4.8,
      changeType: "down" as const,
      icon: UserMinus,
      color: "amber" as const,
      subtitle: "3.6% leave rate today",
    },
    {
      title: "Salary Due",
      value: "₹4.2Cr",
      change: 3.1,
      changeType: "up" as const,
      icon: IndianRupee,
      color: "violet" as const,
      subtitle: "April 2025 payroll",
    },
  ];

  return (
    <div className="space-y-6 p-1" data-ocid="teachers.page">
      <PageHeader
        title="Teachers & HR Portal"
        description="Manage teachers, payroll, attendance, and leave across all schools"
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 border-border/50"
              data-ocid="teachers.report_button"
            >
              <TrendingUp className="w-4 h-4" /> Generate Report
            </Button>
            <Button
              type="button"
              size="sm"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              data-ocid="teachers.add_teacher_button"
            >
              <Users className="w-4 h-4" /> Add Teacher
            </Button>
          </>
        }
      />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        data-ocid="teachers.kpi.section"
      >
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      <Tabs defaultValue="directory" data-ocid="teachers.tabs">
        <TabsList className="glass border border-border/40 h-10 p-1 gap-0.5">
          {[
            { value: "directory", label: "Teachers" },
            { value: "payroll", label: "Payroll" },
            { value: "attendance", label: "Attendance" },
            { value: "leave", label: "Leave Management" },
            { value: "performance", label: "Performance" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-ocid={`teachers.${tab.value}.tab`}
              className="text-xs font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md transition-all duration-200 px-3"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
          <TabsContent value="directory" className="mt-0">
            <TeachersTab />
          </TabsContent>
          <TabsContent value="payroll" className="mt-0">
            <PayrollTab />
          </TabsContent>
          <TabsContent value="attendance" className="mt-0">
            <AttendanceTab />
          </TabsContent>
          <TabsContent value="leave" className="mt-0">
            <LeaveTab />
          </TabsContent>
          <TabsContent value="performance" className="mt-0">
            <PerformanceTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
