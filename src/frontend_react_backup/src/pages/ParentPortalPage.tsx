import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  Download,
  FileText,
  GraduationCap,
  IndianRupee,
  Megaphone,
  MonitorPlay,
  User,
  Video,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type Tab =
  | "dashboard"
  | "attendance"
  | "fee"
  | "report"
  | "homework"
  | "announcements"
  | "classes";

interface TimetableEntry {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  isBreak?: boolean;
}

interface FeeItem {
  head: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: "Paid" | "Due" | "Overdue";
}

interface PaymentRecord {
  id: string;
  date: string;
  head: string;
  amount: number;
  mode: string;
  receipt: string;
}

interface ReportSubject {
  subject: string;
  maxMarks: number;
  term1: number | string;
  term2: number | string;
  final: number | string;
  grade: string;
}

interface HomeworkItem {
  id: string;
  subject: string;
  topic: string;
  teacher: string;
  assigned: string;
  due: string;
  status: "Pending" | "In Progress" | "Completed";
  marks?: string;
}

interface AnnItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "Academic" | "Events" | "Holiday" | "Fee";
  unread: boolean;
}

interface OnlineClass {
  id: string;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  duration: string;
  link: string;
}

interface Recording {
  id: string;
  subject: string;
  date: string;
  duration: string;
}

const timetable: TimetableEntry[] = [
  {
    time: "8:30 AM",
    subject: "Mathematics",
    teacher: "Mrs. Sunita Verma",
    room: "Room 201",
  },
  {
    time: "9:30 AM",
    subject: "English",
    teacher: "Mr. Anand Kumar",
    room: "Room 105",
  },
  { time: "10:30 AM", subject: "Break", teacher: "", room: "", isBreak: true },
  {
    time: "11:00 AM",
    subject: "Physics",
    teacher: "Dr. Meera Iyer",
    room: "Lab 1",
  },
  {
    time: "12:00 PM",
    subject: "Hindi",
    teacher: "Mrs. Kavitha Rao",
    room: "Room 203",
  },
  { time: "1:00 PM", subject: "Lunch", teacher: "", room: "", isBreak: true },
  {
    time: "2:00 PM",
    subject: "Computer Science",
    teacher: "Mr. Rahul Das",
    room: "Lab 2",
  },
  {
    time: "3:00 PM",
    subject: "Physical Education",
    teacher: "Mr. Suresh Coach",
    room: "Ground",
  },
];

const recentMarks = [
  {
    subject: "Mathematics",
    test: "Unit Test 3",
    marks: 42,
    max: 50,
    grade: "A",
  },
  {
    subject: "Physics",
    test: "Practical Exam",
    marks: 18,
    max: 20,
    grade: "A+",
  },
  {
    subject: "English",
    test: "Comprehension",
    marks: 27,
    max: 30,
    grade: "A+",
  },
  {
    subject: "Computer Science",
    test: "Lab Test",
    marks: 19,
    max: 20,
    grade: "A+",
  },
];

const notices = [
  { id: "n1", text: "Annual Day celebration on 15th May 2025", icon: "🎭" },
  {
    id: "n2",
    text: "Parent-Teacher Meeting: 20th April, 9 AM – 1 PM",
    icon: "👨‍👩‍👧",
  },
  {
    id: "n3",
    text: "Summer vacation from 1st June to 30th June 2025",
    icon: "☀️",
  },
];

const aprilAttendance: Record<
  number,
  "present" | "absent" | "holiday" | "halfday"
> = {
  1: "present",
  2: "present",
  3: "present",
  4: "holiday",
  5: "holiday",
  6: "absent",
  7: "present",
  8: "present",
  9: "present",
  10: "present",
  11: "holiday",
  12: "holiday",
  13: "present",
  14: "holiday",
  15: "present",
  16: "present",
  17: "present",
  18: "halfday",
  19: "holiday",
  20: "holiday",
  21: "present",
  22: "present",
  23: "present",
  24: "present",
  25: "present",
  26: "holiday",
  27: "holiday",
  28: "present",
  29: "present",
  30: "present",
};

const monthlyAttendance = [
  {
    month: "October 2024",
    schoolDays: 22,
    present: 20,
    absent: 1,
    halfDay: 1,
    pct: "95.5",
  },
  {
    month: "November 2024",
    schoolDays: 20,
    present: 19,
    absent: 1,
    halfDay: 0,
    pct: "95.0",
  },
  {
    month: "December 2024",
    schoolDays: 18,
    present: 14,
    absent: 3,
    halfDay: 1,
    pct: "80.6",
  },
  {
    month: "January 2025",
    schoolDays: 23,
    present: 21,
    absent: 2,
    halfDay: 0,
    pct: "91.3",
  },
  {
    month: "February 2025",
    schoolDays: 20,
    present: 17,
    absent: 2,
    halfDay: 1,
    pct: "87.5",
  },
  {
    month: "March 2025",
    schoolDays: 22,
    present: 18,
    absent: 3,
    halfDay: 1,
    pct: "84.1",
  },
  {
    month: "April 2025",
    schoolDays: 22,
    present: 20,
    absent: 1,
    halfDay: 1,
    pct: "91.6",
  },
];

const feeItems: FeeItem[] = [
  {
    head: "Tuition Fee",
    amount: 42000,
    dueDate: "Apr 5, 2024",
    paidDate: "Apr 3, 2024",
    status: "Paid",
  },
  {
    head: "Development Fee",
    amount: 8000,
    dueDate: "Apr 5, 2024",
    paidDate: "Apr 3, 2024",
    status: "Paid",
  },
  {
    head: "Lab Fee",
    amount: 3500,
    dueDate: "May 10, 2024",
    paidDate: "May 8, 2024",
    status: "Paid",
  },
  {
    head: "Sports Fee",
    amount: 2000,
    dueDate: "Jun 5, 2024",
    paidDate: "Jun 4, 2024",
    status: "Paid",
  },
  {
    head: "Annual Fee",
    amount: 8500,
    dueDate: "Apr 30, 2025",
    paidDate: null,
    status: "Due",
  },
];

const paymentHistory: PaymentRecord[] = [
  {
    id: "p1",
    date: "Apr 3, 2024",
    head: "Tuition Fee",
    amount: 42000,
    mode: "UPI",
    receipt: "RCP-2024-001",
  },
  {
    id: "p2",
    date: "Apr 3, 2024",
    head: "Development Fee",
    amount: 8000,
    mode: "UPI",
    receipt: "RCP-2024-002",
  },
  {
    id: "p3",
    date: "May 8, 2024",
    head: "Lab Fee",
    amount: 3500,
    mode: "Net Banking",
    receipt: "RCP-2024-003",
  },
  {
    id: "p4",
    date: "Jun 4, 2024",
    head: "Sports Fee",
    amount: 2000,
    mode: "Debit Card",
    receipt: "RCP-2024-004",
  },
  {
    id: "p5",
    date: "Jul 5, 2024",
    head: "Bus Fee (Q2)",
    amount: 4500,
    mode: "UPI",
    receipt: "RCP-2024-005",
  },
  {
    id: "p6",
    date: "Oct 2, 2024",
    head: "Bus Fee (Q3)",
    amount: 4500,
    mode: "UPI",
    receipt: "RCP-2024-006",
  },
  {
    id: "p7",
    date: "Jan 6, 2025",
    head: "Bus Fee (Q4)",
    amount: 4500,
    mode: "Net Banking",
    receipt: "RCP-2025-001",
  },
  {
    id: "p8",
    date: "Mar 15, 2025",
    head: "Exam Fee",
    amount: 1200,
    mode: "UPI",
    receipt: "RCP-2025-002",
  },
];

const reportSubjects: ReportSubject[] = [
  {
    subject: "Mathematics",
    maxMarks: 100,
    term1: 85,
    term2: 88,
    final: 86,
    grade: "A",
  },
  {
    subject: "Science",
    maxMarks: 100,
    term1: 78,
    term2: 82,
    final: 80,
    grade: "B+",
  },
  {
    subject: "English",
    maxMarks: 100,
    term1: 91,
    term2: 89,
    final: 90,
    grade: "A+",
  },
  {
    subject: "Hindi",
    maxMarks: 100,
    term1: 82,
    term2: 79,
    final: 81,
    grade: "A",
  },
  {
    subject: "Social Studies",
    maxMarks: 100,
    term1: 76,
    term2: 80,
    final: 78,
    grade: "B+",
  },
  {
    subject: "Computer Science",
    maxMarks: 100,
    term1: 94,
    term2: 96,
    final: 95,
    grade: "A+",
  },
  {
    subject: "Physical Education",
    maxMarks: 100,
    term1: "Pass",
    term2: "Pass",
    final: "Pass",
    grade: "Pass",
  },
];

const homeworkItems: HomeworkItem[] = [
  {
    id: "hw1",
    subject: "Mathematics",
    topic: "Chapter 5 Exercise 5.3 — Arithmetic Progressions",
    teacher: "Mrs. Sunita Verma",
    assigned: "Apr 21, 2025",
    due: "Apr 23, 2025",
    status: "Pending",
  },
  {
    id: "hw2",
    subject: "English",
    topic: "Essay on Climate Change (500 words)",
    teacher: "Mr. Anand Kumar",
    assigned: "Apr 20, 2025",
    due: "Apr 25, 2025",
    status: "In Progress",
  },
  {
    id: "hw3",
    subject: "Physics",
    topic: "Lab report on refraction of light experiments",
    teacher: "Dr. Meera Iyer",
    assigned: "Apr 19, 2025",
    due: "Apr 28, 2025",
    status: "Pending",
  },
  {
    id: "hw4",
    subject: "Computer Science",
    topic: "Python program on loops and iterations",
    teacher: "Mr. Rahul Das",
    assigned: "Apr 18, 2025",
    due: "Apr 23, 2025",
    status: "Completed",
    marks: "9/10",
  },
  {
    id: "hw5",
    subject: "Hindi",
    topic: "Comprehension passage — Kabir ke Dohe",
    teacher: "Mrs. Kavitha Rao",
    assigned: "Apr 21, 2025",
    due: "Apr 24, 2025",
    status: "Pending",
  },
  {
    id: "hw6",
    subject: "Social Studies",
    topic: "Map work — Rivers of India",
    teacher: "Mr. Deepak Nair",
    assigned: "Apr 17, 2025",
    due: "Apr 22, 2025",
    status: "Completed",
    marks: "18/20",
  },
  {
    id: "hw7",
    subject: "Mathematics",
    topic: "Trigonometry revision worksheet",
    teacher: "Mrs. Sunita Verma",
    assigned: "Apr 15, 2025",
    due: "Apr 18, 2025",
    status: "Completed",
    marks: "23/25",
  },
  {
    id: "hw8",
    subject: "Science",
    topic: "Diagram of digestive system with labelling",
    teacher: "Mrs. Priya Singh",
    assigned: "Apr 14, 2025",
    due: "Apr 17, 2025",
    status: "Completed",
    marks: "9/10",
  },
  {
    id: "hw9",
    subject: "English",
    topic: "Grammar exercises — Voice and Narration",
    teacher: "Mr. Anand Kumar",
    assigned: "Apr 13, 2025",
    due: "Apr 15, 2025",
    status: "Completed",
    marks: "14/15",
  },
  {
    id: "hw10",
    subject: "Physics",
    topic: "Numericals on Ohm's Law",
    teacher: "Dr. Meera Iyer",
    assigned: "Apr 10, 2025",
    due: "Apr 13, 2025",
    status: "Completed",
    marks: "12/15",
  },
];

const annData: AnnItem[] = [
  {
    id: "a1",
    title: "Annual Sports Day 2025",
    content:
      "Annual Sports Day will be held on 10th May 2025. All students are requested to participate in at least one event. Registrations open until 30th April.",
    date: "Apr 20, 2025",
    category: "Events",
    unread: true,
  },
  {
    id: "a2",
    title: "CBSE Board Exam Date Sheet Released",
    content:
      "CBSE has released the Class X board exam date sheet for 2025-26. Students can download from school portal. First exam: March 1, 2026.",
    date: "Apr 18, 2025",
    category: "Academic",
    unread: true,
  },
  {
    id: "a3",
    title: "Annual Fee Due Reminder",
    content:
      "Annual fees of ₹8,500 are due by 30th April 2025. Please make payment through the portal to avoid late fee charges.",
    date: "Apr 17, 2025",
    category: "Fee",
    unread: true,
  },
  {
    id: "a4",
    title: "Parent-Teacher Meeting — April 2025",
    content:
      "PTM scheduled for 20th April 2025, 9 AM to 1 PM. All parents are requested to meet respective class teachers.",
    date: "Apr 15, 2025",
    category: "Events",
    unread: false,
  },
  {
    id: "a5",
    title: "Summer Vacation 2025",
    content:
      "School will remain closed from 1st June to 30th June 2025 for summer vacations. School reopens on 1st July 2025.",
    date: "Apr 12, 2025",
    category: "Holiday",
    unread: false,
  },
  {
    id: "a6",
    title: "Diwali Vacation Notice",
    content:
      "School holiday for Diwali from 20th October to 24th October 2025. Students are encouraged to participate in cultural activities.",
    date: "Apr 10, 2025",
    category: "Holiday",
    unread: false,
  },
  {
    id: "a7",
    title: "Pre-Board Examination Schedule",
    content:
      "Pre-board examinations for Class X will commence from 10th January 2026. Time table will be shared by 1st December 2025.",
    date: "Apr 8, 2025",
    category: "Academic",
    unread: false,
  },
  {
    id: "a8",
    title: "Digital Library Access Extended",
    content:
      "All Class X students now have access to digital library resources including NCERT e-books, sample papers, and video lectures.",
    date: "Apr 5, 2025",
    category: "Academic",
    unread: false,
  },
  {
    id: "a9",
    title: "Annual Day Celebration",
    content:
      "Annual Day celebration on 15th May 2025. Programme includes cultural performances, prize distribution, and chief guest address.",
    date: "Apr 3, 2025",
    category: "Events",
    unread: false,
  },
  {
    id: "a10",
    title: "Q4 Fee Payment Deadline",
    content:
      "Last date for Q4 fee payment is April 30, 2025. Late fee of ₹500 will be charged after due date. Pay online via portal.",
    date: "Apr 1, 2025",
    category: "Fee",
    unread: false,
  },
];

const upcomingClasses: OnlineClass[] = [
  {
    id: "oc1",
    subject: "Mathematics",
    teacher: "Mrs. Sunita Verma",
    date: "Apr 23, 2025",
    time: "4:00 PM",
    duration: "60 min",
    link: "https://zoom.us/j/91234567",
  },
  {
    id: "oc2",
    subject: "Physics",
    teacher: "Dr. Meera Iyer",
    date: "Apr 24, 2025",
    time: "5:00 PM",
    duration: "90 min",
    link: "https://zoom.us/j/98765432",
  },
  {
    id: "oc3",
    subject: "English",
    teacher: "Mr. Anand Kumar",
    date: "Apr 25, 2025",
    time: "3:30 PM",
    duration: "60 min",
    link: "https://zoom.us/j/87654321",
  },
  {
    id: "oc4",
    subject: "Computer Science",
    teacher: "Mr. Rahul Das",
    date: "Apr 26, 2025",
    time: "4:30 PM",
    duration: "60 min",
    link: "https://zoom.us/j/76543210",
  },
];

const recordings: Recording[] = [
  {
    id: "r1",
    subject: "Mathematics — Quadratic Equations",
    date: "Apr 18, 2025",
    duration: "58 min",
  },
  {
    id: "r2",
    subject: "Physics — Laws of Motion",
    date: "Apr 16, 2025",
    duration: "75 min",
  },
  {
    id: "r3",
    subject: "English — Letter Writing",
    date: "Apr 15, 2025",
    duration: "52 min",
  },
  {
    id: "r4",
    subject: "Computer — Python Basics",
    date: "Apr 13, 2025",
    duration: "65 min",
  },
  {
    id: "r5",
    subject: "Hindi — Premchand ka Sahitya",
    date: "Apr 11, 2025",
    duration: "48 min",
  },
];

const kpiStats = [
  {
    id: "kpi-att",
    label: "Overall Attendance",
    value: "87.3%",
    color: "text-emerald-400",
    icon: "📊",
  },
  {
    id: "kpi-month",
    label: "This Month",
    value: "91.6%",
    color: "text-emerald-400",
    icon: "📅",
  },
  {
    id: "kpi-bal",
    label: "Fee Balance",
    value: "₹8,500",
    color: "text-amber-400",
    icon: "💰",
  },
  {
    id: "kpi-grade",
    label: "Report Card",
    value: "Grade A",
    color: "text-blue-400",
    icon: "🎓",
  },
] as const;

const childrenList = [
  { id: "aarav", name: "Aarav Sharma", cls: "X-A", roll: "2024-X-042", idx: 0 },
  {
    id: "ananya",
    name: "Ananya Sharma",
    cls: "VII-B",
    roll: "2024-VII-087",
    idx: 1,
  },
];

function GlassCard({
  className,
  children,
}: { className?: string; children: React.ReactNode }) {
  return <div className={cn("glass rounded-xl", className)}>{children}</div>;
}

function SecTitle({
  icon: Icon,
  title,
  className,
}: { icon: React.ElementType; title: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <h3 className="font-display font-semibold text-foreground text-sm">
        {title}
      </h3>
    </div>
  );
}

function DashboardTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <GlassCard className="p-5">
        <SecTitle
          icon={Clock}
          title="Today's Schedule — Monday, 22 April 2025"
        />
        <div className="space-y-1">
          {timetable.map((e) => (
            <div
              key={e.time}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth",
                e.isBreak ? "bg-muted/30" : "hover:bg-muted/20",
              )}
            >
              <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">
                {e.time}
              </span>
              {e.isBreak ? (
                <span className="text-xs text-muted-foreground italic">
                  {e.subject}
                </span>
              ) : (
                <>
                  <div className="w-1 h-4 rounded-full bg-blue-500/60 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {e.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {e.teacher} · {e.room}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="space-y-5">
        <GlassCard className="p-5">
          <SecTitle icon={Bell} title="Recent Notices" />
          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border/40"
              >
                <span className="text-xl shrink-0">{n.icon}</span>
                <p className="text-sm text-foreground leading-snug">{n.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SecTitle icon={IndianRupee} title="Fee Summary" />
          <div className="space-y-2 text-sm mb-3">
            {[
              {
                id: "fs-total",
                label: "Total Annual Fees",
                value: "₹72,000",
                color: "text-foreground",
              },
              {
                id: "fs-paid",
                label: "Paid",
                value: "₹63,500",
                color: "text-emerald-400",
              },
              {
                id: "fs-bal",
                label: "Balance Due",
                value: "₹8,500",
                color: "text-amber-400",
              },
            ].map((r) => (
              <div key={r.id} className="flex justify-between">
                <span className="text-muted-foreground">{r.label}</span>
                <span className={cn("font-medium", r.color)}>{r.value}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Due Date</span>
              <span className="text-rose-400 font-medium">30 April 2025</span>
            </div>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: "88.2%" }}
            />
          </div>
          <Button
            type="button"
            data-ocid="fee.pay_now.primary_button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            <CreditCard className="w-4 h-4 mr-2" /> Pay ₹8,500 Now
          </Button>
        </GlassCard>
      </div>

      <GlassCard className="p-5 lg:col-span-2">
        <SecTitle icon={GraduationCap} title="Recent Test Results" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {recentMarks.map((m, i) => (
            <div
              key={m.subject}
              data-ocid={`marks.item.${i + 1}`}
              className="p-3 rounded-lg bg-muted/20 border border-border/30 text-center"
            >
              <p className="text-xs text-muted-foreground mb-1">{m.subject}</p>
              <p className="text-2xl font-display font-bold text-foreground">
                {m.marks}
                <span className="text-sm text-muted-foreground">/{m.max}</span>
              </p>
              <Badge className="mt-1 text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border">
                {m.grade}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{m.test}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function AttendanceTab() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const calColorMap: Record<string, string> = {
    present: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    absent: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    holiday: "bg-blue-400/20 text-blue-400 border-blue-400/30",
    halfday: "bg-amber-400/20 text-amber-400 border-amber-400/30",
  };

  return (
    <div className="space-y-5">
      <GlassCard className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <SecTitle
            icon={Calendar}
            title="April 2025 — Attendance Calendar"
            className="mb-0"
          />
          <div className="flex gap-4 text-xs flex-wrap">
            {[
              { id: "lg-pr", color: "bg-emerald-500", label: "Present" },
              { id: "lg-ab", color: "bg-rose-500", label: "Absent" },
              { id: "lg-ho", color: "bg-blue-400", label: "Holiday" },
              { id: "lg-hd", color: "bg-amber-400", label: "Half Day" },
            ].map((l) => (
              <div key={l.id} className="flex items-center gap-1.5">
                <span className={cn("w-2.5 h-2.5 rounded-full", l.color)} />
                <span className="text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="text-center text-xs font-medium text-muted-foreground py-1"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* April 1 = Tuesday => 2 blank pads */}
          <div key="pad-sun" />
          <div key="pad-mon" />
          {days.map((day) => {
            const st = aprilAttendance[day];
            return (
              <div
                key={`d${day}`}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg text-xs font-medium border transition-smooth",
                  st
                    ? calColorMap[st]
                    : "bg-muted/10 text-muted-foreground/50 border-border/10",
                )}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-4 gap-3">
          {[
            {
              id: "s-days",
              label: "School Days",
              value: "22",
              color: "text-foreground",
            },
            {
              id: "s-pr",
              label: "Present",
              value: "20",
              color: "text-emerald-400",
            },
            { id: "s-ab", label: "Absent", value: "1", color: "text-rose-400" },
            {
              id: "s-hd",
              label: "Half Day",
              value: "1",
              color: "text-amber-400",
            },
          ].map((s) => (
            <div key={s.id} className="text-center p-3 rounded-lg bg-muted/20">
              <p className={cn("text-2xl font-display font-bold", s.color)}>
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm">
          <span className="text-muted-foreground">April Attendance: </span>
          <span className="font-semibold text-emerald-400 text-base">
            91.6%
          </span>
        </p>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <div className="p-5 pb-3">
          <SecTitle
            icon={Calendar}
            title="Attendance Summary — Last 7 Months"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="attendance.table">
            <thead>
              <tr className="border-t border-border/40 bg-muted/20">
                {[
                  "Month",
                  "School Days",
                  "Present",
                  "Absent",
                  "Half Day",
                  "Attendance %",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyAttendance.map((row, i) => (
                <tr
                  key={row.month}
                  data-ocid={`attendance.row.${i + 1}`}
                  className="border-t border-border/30 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-foreground">
                    {row.month}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {row.schoolDays}
                  </td>
                  <td className="px-5 py-3 text-emerald-400 font-medium">
                    {row.present}
                  </td>
                  <td className="px-5 py-3 text-rose-400 font-medium">
                    {row.absent}
                  </td>
                  <td className="px-5 py-3 text-amber-400 font-medium">
                    {row.halfDay}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "font-semibold",
                        Number.parseFloat(row.pct) >= 90
                          ? "text-emerald-400"
                          : Number.parseFloat(row.pct) >= 80
                            ? "text-amber-400"
                            : "text-rose-400",
                      )}
                    >
                      {row.pct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

function FeeTab() {
  return (
    <div className="space-y-5">
      <GlassCard className="overflow-hidden">
        <div className="p-5 pb-3">
          <SecTitle
            icon={IndianRupee}
            title="Fee Structure — Academic Year 2024-25"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="fee.table">
            <thead>
              <tr className="border-t border-border/40 bg-muted/20">
                {[
                  "Fee Head",
                  "Amount",
                  "Due Date",
                  "Paid Date",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feeItems.map((fee, i) => (
                <tr
                  key={fee.head}
                  data-ocid={`fee.row.${i + 1}`}
                  className="border-t border-border/30 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-foreground">
                    {fee.head}
                  </td>
                  <td className="px-5 py-3 font-mono text-foreground">
                    ₹{fee.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {fee.dueDate}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {fee.paidDate ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <Badge
                      className={cn(
                        "text-[11px] border inline-flex items-center gap-1",
                        fee.status === "Paid" &&
                          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                        fee.status === "Due" &&
                          "bg-amber-500/10 text-amber-400 border-amber-500/20",
                        fee.status === "Overdue" &&
                          "bg-rose-500/10 text-rose-400 border-rose-500/20",
                      )}
                    >
                      {fee.status === "Paid" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    {fee.status === "Paid" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground"
                      >
                        <Download className="w-3 h-3 mr-1" /> Receipt
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        data-ocid="fee.pay_now.secondary_button"
                      >
                        Pay Now
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <div className="p-5 pb-3">
          <SecTitle icon={FileText} title="Payment History" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="payment.table">
            <thead>
              <tr className="border-t border-border/40 bg-muted/20">
                {[
                  "Receipt No.",
                  "Date",
                  "Fee Head",
                  "Amount",
                  "Mode",
                  "Download",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((p, i) => (
                <tr
                  key={p.id}
                  data-ocid={`payment.row.${i + 1}`}
                  className="border-t border-border/30 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-5 py-3 font-mono text-xs text-blue-400">
                    {p.receipt}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p.date}</td>
                  <td className="px-5 py-3 text-foreground">{p.head}</td>
                  <td className="px-5 py-3 font-mono font-medium text-emerald-400">
                    ₹{p.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p.mode}</td>
                  <td className="px-5 py-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Download className="w-3 h-3 mr-1" /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

function ReportTab() {
  const infoRows = [
    { id: "ri-student", label: "Student", value: "Aarav Sharma" },
    { id: "ri-class", label: "Class", value: "X — Section A" },
    { id: "ri-roll", label: "Roll No.", value: "2024-X-042" },
    { id: "ri-school", label: "School", value: "DPS Rohini, Delhi" },
  ];
  return (
    <GlassCard className="overflow-hidden">
      <div className="p-5 border-b border-border/40 bg-gradient-to-r from-blue-500/5 to-violet-500/5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-foreground text-lg">
              Academic Report Card
            </h3>
            <p className="text-sm text-muted-foreground">
              Term 1 & Term 2 — Academic Year 2024-25
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" className="text-xs">
            <Download className="w-3 h-3 mr-1" /> Download PDF
          </Button>
        </div>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {infoRows.map((r) => (
            <div key={r.id}>
              <p className="text-xs text-muted-foreground">{r.label}</p>
              <p className="font-medium text-foreground">{r.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" data-ocid="report.table">
          <thead>
            <tr className="bg-muted/20">
              {[
                "Subject",
                "Max Marks",
                "Term 1",
                "Term 2",
                "Final",
                "Grade",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportSubjects.map((row, i) => (
              <tr
                key={row.subject}
                data-ocid={`report.row.${i + 1}`}
                className="border-t border-border/30 hover:bg-muted/10 transition-colors"
              >
                <td className="px-5 py-3 font-medium text-foreground">
                  {row.subject}
                </td>
                <td className="px-5 py-3 text-muted-foreground text-center">
                  {row.maxMarks}
                </td>
                <td className="px-5 py-3 text-center font-mono">
                  {String(row.term1)}
                </td>
                <td className="px-5 py-3 text-center font-mono">
                  {String(row.term2)}
                </td>
                <td className="px-5 py-3 text-center font-mono font-semibold text-foreground">
                  {String(row.final)}
                </td>
                <td className="px-5 py-3">
                  <Badge
                    className={cn(
                      "text-[11px] border",
                      row.grade.startsWith("A") &&
                        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      row.grade.startsWith("B") &&
                        "bg-blue-500/10 text-blue-400 border-blue-500/20",
                      row.grade === "Pass" &&
                        "bg-muted text-muted-foreground border-border",
                    )}
                  >
                    {row.grade}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-5 border-t border-border/40 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Overall Result
            </p>
            <p className="text-xl font-display font-bold text-emerald-400">
              First Division — 83.7%
            </p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border px-3 py-1.5 text-sm">
            Grade A
          </Badge>
        </div>
        <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Class Teacher's Remarks
          </p>
          <p className="text-sm text-foreground italic leading-relaxed">
            "Aarav is a dedicated student showing consistent improvement in all
            subjects. His performance in Computer Science and English has been
            exemplary. He actively participates in class activities and shows
            great potential. With focused effort in Social Studies and Science,
            he can achieve even better results in the upcoming board
            examinations."
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            — Mrs. Priya Sharma, Class Teacher X-A
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function HomeworkTab() {
  const pending = homeworkItems.filter((h) => h.status !== "Completed").length;
  return (
    <GlassCard className="overflow-hidden">
      <div className="p-5 pb-3 flex items-center justify-between">
        <SecTitle
          icon={BookOpen}
          title="Homework & Assignments"
          className="mb-0"
        />
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border">
          {pending} Pending
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" data-ocid="homework.table">
          <thead>
            <tr className="border-t border-border/40 bg-muted/20">
              {[
                "Subject",
                "Topic",
                "Assigned By",
                "Assigned",
                "Due Date",
                "Status",
                "Marks",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {homeworkItems.map((hw, i) => (
              <tr
                key={hw.id}
                data-ocid={`homework.row.${i + 1}`}
                className="border-t border-border/30 hover:bg-muted/10 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {hw.subject}
                </td>
                <td className="px-4 py-3 text-muted-foreground max-w-[200px]">
                  <p className="truncate">{hw.topic}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                  {hw.teacher}
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                  {hw.assigned}
                </td>
                <td className="px-4 py-3 text-xs whitespace-nowrap font-medium text-foreground">
                  {hw.due}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    className={cn(
                      "text-[11px] border",
                      hw.status === "Completed" &&
                        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      hw.status === "Pending" &&
                        "bg-amber-500/10 text-amber-400 border-amber-500/20",
                      hw.status === "In Progress" &&
                        "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    )}
                  >
                    {hw.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {hw.marks ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

type AnnCat = "All" | "Academic" | "Events" | "Holiday" | "Fee";
const annCats: AnnCat[] = ["All", "Academic", "Events", "Holiday", "Fee"];
const annCatColors: Record<string, string> = {
  Academic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Events: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Holiday: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Fee: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function AnnouncementsTab() {
  const [filter, setFilter] = useState<AnnCat>("All");
  const unread = annData.filter((a) => a.unread).length;
  const filtered =
    filter === "All" ? annData : annData.filter((a) => a.category === filter);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {annCats.map((cat) => (
          <button
            key={cat}
            type="button"
            data-ocid={`announcements.filter.${cat.toLowerCase()}`}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth",
              filter === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "glass text-muted-foreground border-border/40 hover:text-foreground",
            )}
          >
            {cat}
            {cat === "All" && unread > 0 && (
              <span className="ml-1.5 bg-rose-500 text-white rounded-full text-[10px] px-1.5 py-0.5">
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="space-y-3" data-ocid="announcements.list">
        {filtered.map((ann, i) => (
          <GlassCard
            key={ann.id}
            className={cn(
              "p-4 transition-smooth hover:border-border/60",
              ann.unread && "border-blue-500/30",
            )}
          >
            <div
              data-ocid={`announcements.item.${i + 1}`}
              className="flex gap-3"
            >
              {ann.unread && (
                <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-1.5" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h4 className="font-semibold text-foreground text-sm leading-snug">
                    {ann.title}
                  </h4>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      className={cn(
                        "text-[10px] border",
                        annCatColors[ann.category],
                      )}
                    >
                      {ann.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {ann.date}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ann.content}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function OnlineClassesTab() {
  return (
    <div className="space-y-5">
      <GlassCard className="overflow-hidden">
        <div className="p-5 pb-3">
          <SecTitle icon={Video} title="Upcoming Live Classes" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="classes.upcoming.table">
            <thead>
              <tr className="border-t border-border/40 bg-muted/20">
                {["Subject", "Teacher", "Date", "Time", "Duration", "Join"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {upcomingClasses.map((cls, i) => (
                <tr
                  key={cls.id}
                  data-ocid={`classes.upcoming.row.${i + 1}`}
                  className="border-t border-border/30 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-foreground">
                    {cls.subject}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {cls.teacher}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {cls.date}
                  </td>
                  <td className="px-5 py-3 text-foreground font-medium">
                    {cls.time}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {cls.duration}
                  </td>
                  <td className="px-5 py-3">
                    <Button
                      type="button"
                      size="sm"
                      className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                      data-ocid={`classes.join.button.${i + 1}`}
                      onClick={() => window.open(cls.link, "_blank")}
                    >
                      <MonitorPlay className="w-3 h-3 mr-1" /> Join Zoom
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <div className="p-5 pb-3">
          <SecTitle icon={Video} title="Recent Recordings" />
        </div>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            data-ocid="classes.recordings.table"
          >
            <thead>
              <tr className="border-t border-border/40 bg-muted/20">
                {["Subject", "Date", "Duration", "Watch"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recordings.map((rec, i) => (
                <tr
                  key={rec.id}
                  data-ocid={`classes.recording.row.${i + 1}`}
                  className="border-t border-border/30 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-foreground">
                    {rec.subject}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {rec.date}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {rec.duration}
                  </td>
                  <td className="px-5 py-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                    >
                      <Video className="w-3 h-3 mr-1" /> Watch
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: GraduationCap },
  { id: "attendance", label: "Attendance", icon: Calendar },
  { id: "fee", label: "Fee Payment", icon: IndianRupee },
  { id: "report", label: "Report Card", icon: FileText },
  { id: "homework", label: "Homework", icon: BookOpen },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "classes", label: "Online Classes", icon: Video },
];

export default function ParentPortalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [selectedChild, setSelectedChild] = useState(0);
  const [childDropdown, setChildDropdown] = useState(false);
  const child = childrenList[selectedChild];
  const unreadCount = annData.filter((a) => a.unread).length;

  return (
    <div className="space-y-6" data-ocid="parent.portal.page">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden glass rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.08)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-emerald-500/5 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shrink-0">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground leading-tight">
                Welcome, Mrs. Sunita Sharma
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {child.name} · Class {child.cls} · Delhi Public School, Rohini ·
                Roll No: {child.roll}
              </p>
            </div>
          </div>
          <div className="relative shrink-0" data-ocid="parent.child_switcher">
            <button
              type="button"
              onClick={() => setChildDropdown((v) => !v)}
              className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl border border-border/40 hover:border-border/70 transition-smooth text-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <span className="font-medium text-foreground">{child.name}</span>
              <span className="text-xs text-muted-foreground">
                Class {child.cls}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  childDropdown && "rotate-180",
                )}
              />
            </button>
            {childDropdown && (
              <div className="absolute right-0 top-full mt-1.5 glass rounded-xl border border-border/50 overflow-hidden z-20 min-w-[220px] shadow-lg">
                {childrenList.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    data-ocid={`parent.child_option.${c.idx + 1}`}
                    onClick={() => {
                      setSelectedChild(c.idx);
                      setChildDropdown(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left transition-smooth hover:bg-muted/30",
                      c.idx === selectedChild && "bg-blue-500/10",
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {c.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Class {c.cls} · Roll {c.roll}
                      </p>
                    </div>
                    {c.idx === selectedChild && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpiStats.map((stat, i) => (
          <div
            key={stat.id}
            data-ocid={`parent.kpi.${i + 1}`}
            className="glass rounded-xl p-4 border border-border/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{stat.icon}</span>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
            <p className={cn("text-2xl font-display font-bold", stat.color)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass rounded-xl border border-border/40 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-border/40">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-ocid={`parent.tab.${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-smooth border-b-2 relative",
                  isActive
                    ? "border-blue-500 text-blue-400 bg-blue-500/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
                {tab.id === "announcements" && unreadCount > 0 && (
                  <span className="absolute top-2 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="p-5">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "attendance" && <AttendanceTab />}
          {activeTab === "fee" && <FeeTab />}
          {activeTab === "report" && <ReportTab />}
          {activeTab === "homework" && <HomeworkTab />}
          {activeTab === "announcements" && <AnnouncementsTab />}
          {activeTab === "classes" && <OnlineClassesTab />}
        </div>
      </div>
    </div>
  );
}
