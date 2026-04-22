import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  FlaskConical,
  GraduationCap,
  Monitor,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

type TabId =
  | "dashboard"
  | "timetable"
  | "attendance"
  | "marks"
  | "homework"
  | "exams"
  | "announcements";

const TABS: { id: TabId; label: string }[] = [
  { id: "dashboard", label: "My Dashboard" },
  { id: "timetable", label: "My Timetable" },
  { id: "attendance", label: "Attendance" },
  { id: "marks", label: "My Marks" },
  { id: "homework", label: "Homework" },
  { id: "exams", label: "Exams" },
  { id: "announcements", label: "Announcements" },
];

// Subject colour config
const subjectColor: Record<string, string> = {
  Math: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  "Math Doubt Class": "text-blue-400 bg-blue-500/10 border-blue-500/25",
  Physics: "text-purple-400 bg-purple-500/10 border-purple-500/25",
  Science: "text-purple-400 bg-purple-500/10 border-purple-500/25",
  "Science Lab": "text-purple-400 bg-purple-500/10 border-purple-500/25",
  English: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Hindi: "text-orange-400 bg-orange-500/10 border-orange-500/25",
  Computer: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
  PE: "text-green-400 bg-green-500/10 border-green-500/25",
  Sports: "text-green-400 bg-green-500/10 border-green-500/25",
  History: "text-slate-400 bg-slate-500/10 border-slate-500/25",
  Art: "text-pink-400 bg-pink-500/10 border-pink-500/25",
  Library: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
  Geography: "text-slate-400 bg-slate-500/10 border-slate-500/25",
  "Career Guidance": "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
  Activities: "text-teal-400 bg-teal-500/10 border-teal-500/25",
  Lunch: "text-muted-foreground bg-muted/30 border-border/20",
};

const getSubjectColor = (subj: string) =>
  subjectColor[subj] ?? "text-slate-400 bg-slate-500/10 border-slate-500/25";

// Timetable data
interface TimetableCell {
  subject: string;
  teacher: string;
  room: string;
}
const timetable: Record<string, TimetableCell[]> = {
  Monday: [
    { subject: "Math", teacher: "RK", room: "C101" },
    { subject: "English", teacher: "SS", room: "C102" },
    { subject: "Physics", teacher: "AP", room: "Lab2" },
    { subject: "Hindi", teacher: "MG", room: "C103" },
    { subject: "Lunch", teacher: "—", room: "—" },
    { subject: "Computer", teacher: "VT", room: "CompLab" },
    { subject: "PE", teacher: "NK", room: "Ground" },
  ],
  Tuesday: [
    { subject: "Science", teacher: "DM", room: "Lab1" },
    { subject: "Math", teacher: "RK", room: "C101" },
    { subject: "English", teacher: "SS", room: "C102" },
    { subject: "History", teacher: "PL", room: "C104" },
    { subject: "Lunch", teacher: "—", room: "—" },
    { subject: "Hindi", teacher: "MG", room: "C103" },
    { subject: "Art", teacher: "RM", room: "ArtRoom" },
  ],
  Wednesday: [
    { subject: "Physics", teacher: "AP", room: "Lab2" },
    { subject: "Computer", teacher: "VT", room: "CompLab" },
    { subject: "Math", teacher: "RK", room: "C101" },
    { subject: "English", teacher: "SS", room: "C102" },
    { subject: "Lunch", teacher: "—", room: "—" },
    { subject: "Science", teacher: "DM", room: "Lab1" },
    { subject: "Library", teacher: "LB", room: "Library" },
  ],
  Thursday: [
    { subject: "Hindi", teacher: "MG", room: "C103" },
    { subject: "Science", teacher: "DM", room: "Lab1" },
    { subject: "Math", teacher: "RK", room: "C101" },
    { subject: "Geography", teacher: "AN", room: "C105" },
    { subject: "Lunch", teacher: "—", room: "—" },
    { subject: "English", teacher: "SS", room: "C102" },
    { subject: "Sports", teacher: "NK", room: "Ground" },
  ],
  Friday: [
    { subject: "English", teacher: "SS", room: "C102" },
    { subject: "Math", teacher: "RK", room: "C101" },
    { subject: "Physics", teacher: "AP", room: "Lab2" },
    { subject: "Hindi", teacher: "MG", room: "C103" },
    { subject: "Lunch", teacher: "—", room: "—" },
    { subject: "Computer", teacher: "VT", room: "CompLab" },
    { subject: "Career Guidance", teacher: "VP", room: "Hall" },
  ],
  Saturday: [
    { subject: "Math Doubt Class", teacher: "RK", room: "C101" },
    { subject: "Science Lab", teacher: "DM", room: "Lab1" },
    { subject: "English", teacher: "SS", room: "C102" },
    { subject: "Hindi", teacher: "MG", room: "C103" },
    { subject: "Lunch", teacher: "—", room: "—" },
    { subject: "Activities", teacher: "NK", room: "Hall" },
  ],
};

const periodTimes = [
  "8:30–9:20",
  "9:20–10:10",
  "10:10–11:00",
  "11:00–11:50",
  "11:50–12:30",
  "12:30–1:20",
  "1:20–2:10",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Attendance data
const attendanceMonths = [
  { month: "Nov", present: 22, total: 24, pct: 91.7 },
  { month: "Dec", present: 18, total: 20, pct: 90 },
  { month: "Jan", present: 23, total: 25, pct: 92 },
  { month: "Feb", present: 19, total: 21, pct: 90.5 },
  { month: "Mar", present: 24, total: 26, pct: 92.3 },
  { month: "Apr", present: 11, total: 12, pct: 91.6 },
];

const attendanceDays: Record<number, "P" | "A" | "H" | "W"> = {
  1: "P",
  2: "P",
  3: "P",
  4: "P",
  5: "W",
  7: "P",
  8: "P",
  9: "P",
  10: "P",
  11: "P",
  12: "W",
  14: "H",
  15: "P",
  16: "P",
  17: "P",
  18: "A",
  19: "W",
  21: "P",
  22: "P",
};

// Marks data
const marksData = [
  {
    subject: "Mathematics",
    ut1: 78,
    ut2: 82,
    hy: "167/200",
    ut3: 85,
    ut4: 88,
    annual: "—",
    pct: "83.4%",
    grade: "A",
    color: "text-blue-400",
  },
  {
    subject: "Science",
    ut1: 71,
    ut2: 75,
    hy: "152/200",
    ut3: 78,
    ut4: 81,
    annual: "—",
    pct: "77.4%",
    grade: "B+",
    color: "text-purple-400",
  },
  {
    subject: "English",
    ut1: 85,
    ut2: 89,
    hy: "176/200",
    ut3: 91,
    ut4: 88,
    annual: "—",
    pct: "87.9%",
    grade: "A",
    color: "text-emerald-400",
  },
  {
    subject: "Hindi",
    ut1: 78,
    ut2: 80,
    hy: "161/200",
    ut3: 82,
    ut4: 84,
    annual: "—",
    pct: "81.4%",
    grade: "A",
    color: "text-orange-400",
  },
  {
    subject: "Social Studies",
    ut1: 72,
    ut2: 76,
    hy: "149/200",
    ut3: 75,
    ut4: 79,
    annual: "—",
    pct: "75.2%",
    grade: "B+",
    color: "text-slate-400",
  },
  {
    subject: "Computer Science",
    ut1: 90,
    ut2: 92,
    hy: "185/200",
    ut3: 94,
    ut4: 92,
    annual: "—",
    pct: "92.6%",
    grade: "A+",
    color: "text-cyan-400",
  },
];

// Homework
type HomeworkStatus = "Pending" | "In Progress" | "Submitted";
const initialHomework = [
  {
    id: 1,
    subject: "Physics",
    title: "Write solutions for Chapter 11 — Numericals 1–15",
    due: "Apr 24",
    urgency: "high",
    status: "Pending" as HomeworkStatus,
  },
  {
    id: 2,
    subject: "Mathematics",
    title: "Practice set: Quadratic Equations — Exercise 4.3",
    due: "Apr 26",
    urgency: "medium",
    status: "In Progress" as HomeworkStatus,
  },
  {
    id: 3,
    subject: "English",
    title: "Book Review: The Diary of a Young Girl (min 500 words)",
    due: "Apr 28",
    urgency: "low",
    status: "Pending" as HomeworkStatus,
  },
];

// Exams
const upcomingExams = [
  {
    name: "Physics Unit Test",
    subject: "Physics",
    date: "May 3",
    time: "9:00 AM",
    duration: "1.5 hrs",
    syllabus: "Ch. 10, 11, 12",
    hall: "Hall A",
    seat: "A-23",
    daysLeft: 11,
  },
  {
    name: "Mathematics Pre-Board",
    subject: "Mathematics",
    date: "May 8",
    time: "9:00 AM",
    duration: "3 hrs",
    syllabus: "Ch. 1–15",
    hall: "Hall B",
    seat: "B-17",
    daysLeft: 16,
  },
  {
    name: "English Literature",
    subject: "English",
    date: "May 12",
    time: "9:00 AM",
    duration: "3 hrs",
    syllabus: "Ch. 1–8",
    hall: "Hall A",
    seat: "A-23",
    daysLeft: 20,
  },
  {
    name: "Hindi Unit Test",
    subject: "Hindi",
    date: "May 15",
    time: "9:00 AM",
    duration: "1.5 hrs",
    syllabus: "Prose: Ch. 3–5",
    hall: "Hall C",
    seat: "C-09",
    daysLeft: 23,
  },
  {
    name: "Social Studies Term Test",
    subject: "Social Studies",
    date: "May 17",
    time: "10:30 AM",
    duration: "2 hrs",
    syllabus: "History Ch. 4–7",
    hall: "Hall B",
    seat: "B-17",
    daysLeft: 25,
  },
  {
    name: "Computer Science Practical",
    subject: "Computer",
    date: "May 20",
    time: "9:00 AM",
    duration: "2 hrs",
    syllabus: "Python, SQL",
    hall: "Comp Lab",
    seat: "System-8",
    daysLeft: 28,
  },
  {
    name: "Science Pre-Board",
    subject: "Science",
    date: "May 22",
    time: "9:00 AM",
    duration: "3 hrs",
    syllabus: "Full Syllabus",
    hall: "Hall A",
    seat: "A-23",
    daysLeft: 30,
  },
  {
    name: "Hindi Pre-Board",
    subject: "Hindi",
    date: "May 25",
    time: "9:00 AM",
    duration: "3 hrs",
    syllabus: "Full Syllabus",
    hall: "Hall C",
    seat: "C-09",
    daysLeft: 33,
  },
  {
    name: "Mathematics Annual",
    subject: "Mathematics",
    date: "Jun 2",
    time: "9:00 AM",
    duration: "3 hrs",
    syllabus: "Full Syllabus",
    hall: "Hall B",
    seat: "B-17",
    daysLeft: 41,
  },
  {
    name: "English Annual",
    subject: "English",
    date: "Jun 5",
    time: "9:00 AM",
    duration: "3 hrs",
    syllabus: "Full Syllabus",
    hall: "Hall A",
    seat: "A-23",
    daysLeft: 44,
  },
];

const recentTests = [
  { subject: "Physics", marks: 36, max: 50, grade: "A", trend: "up" },
  { subject: "Mathematics", marks: 43, max: 50, grade: "A+", trend: "up" },
  { subject: "English", marks: 44, max: 50, grade: "A+", trend: "same" },
  { subject: "Hindi", marks: 38, max: 50, grade: "A", trend: "down" },
  { subject: "Science", marks: 35, max: 50, grade: "B+", trend: "up" },
];

const announcements = [
  {
    id: 1,
    title: "Annual Sports Day — April 28, 2026",
    date: "2026-04-20",
    type: "Event",
    target: "School",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting Scheduled for May 5",
    date: "2026-04-18",
    type: "Meeting",
    target: "School",
  },
  {
    id: 3,
    title: "Mid-Term Examination Schedule Released",
    date: "2026-04-15",
    type: "Exam",
    target: "School",
  },
  {
    id: 4,
    title: "Holiday: Eid Al-Fitr — April 30, 2026",
    date: "2026-04-14",
    type: "Holiday",
    target: "School",
  },
  {
    id: 5,
    title: "Class X-A: Physics extra class on April 25 at 7:30 AM",
    date: "2026-04-22",
    type: "Class",
    target: "Class",
  },
  {
    id: 6,
    title: "Class X-A: Submit Math Project by April 27",
    date: "2026-04-21",
    type: "Assignment",
    target: "Class",
  },
  {
    id: 7,
    title: "Class X-A: Career Counselling Session on April 29",
    date: "2026-04-19",
    type: "Career",
    target: "Class",
  },
];

// Utilities
function urgencyBadgeClass(u: string) {
  if (u === "high")
    return "bg-rose-500/10 text-rose-400 border-rose-500/25 border";
  if (u === "medium")
    return "bg-amber-500/10 text-amber-400 border-amber-500/25 border";
  return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 border";
}
function urgencyColor(u: string) {
  if (u === "high") return "text-rose-400";
  if (u === "medium") return "text-amber-400";
  return "text-emerald-400";
}
function daysUrgencyClass(d: number) {
  if (d < 7) return "text-rose-400";
  if (d < 14) return "text-amber-400";
  return "text-emerald-400";
}
function daysUrgencyBg(d: number) {
  if (d < 7) return "bg-rose-500/10 border-rose-500/25";
  if (d < 14) return "bg-amber-500/10 border-amber-500/25";
  return "bg-emerald-500/10 border-emerald-500/25";
}
function gradeColor(grade: string) {
  if (grade === "A+" || grade === "O") return "text-emerald-400";
  if (grade === "A") return "text-blue-400";
  if (grade === "B+" || grade === "B") return "text-amber-400";
  return "text-rose-400";
}

// ─── Sub-panels ───────────────────────────────
function TodayClasses() {
  const todayPeriods = timetable.Monday;
  const currentPeriodIdx = 1;
  return (
    <Card
      className="glass border-border/30 h-full"
      data-ocid="student.today_classes.card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          Today's Classes — Monday
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 p-4 pt-0">
        {todayPeriods.map((p, i) => {
          const isCurrent = i === currentPeriodIdx;
          const isLunch = p.subject === "Lunch";
          return (
            <div
              key={p.subject}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 border transition-all ${
                isCurrent
                  ? "border-accent/50 bg-accent/10 shadow-glass-subtle"
                  : isLunch
                    ? "border-border/20 bg-muted/20 opacity-60"
                    : "border-transparent hover:bg-muted/20"
              }`}
              data-ocid={`student.today_class.${i + 1}`}
            >
              <span className="text-[10px] text-muted-foreground w-16 shrink-0 font-mono">
                {periodTimes[i] ?? ""}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded border text-nowrap ${getSubjectColor(p.subject)}`}
              >
                {p.subject}
              </span>
              {isCurrent && (
                <Badge className="bg-accent/20 text-accent border-accent/30 text-[9px] ml-auto border">
                  NOW
                </Badge>
              )}
              {!isCurrent && !isLunch && (
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {p.teacher} · {p.room}
                </span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function UpcomingExamsPanel() {
  return (
    <Card
      className="glass border-border/30 h-full"
      data-ocid="student.upcoming_exams.card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          Upcoming Exams
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0">
        {upcomingExams.slice(0, 3).map((ex, i) => (
          <div
            key={ex.name}
            className={`rounded-lg p-3 border ${daysUrgencyBg(ex.daysLeft)}`}
            data-ocid={`student.upcoming_exam.${i + 1}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{ex.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {ex.syllabus}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={`text-sm font-bold font-mono ${daysUrgencyClass(ex.daysLeft)}`}
                >
                  {ex.daysLeft}d
                </p>
                <p className="text-[10px] text-muted-foreground">{ex.date}</p>
              </div>
            </div>
          </div>
        ))}
        <p className="text-[10px] text-muted-foreground text-center pt-1">
          <span className="text-rose-400">●</span> &lt;7 days &nbsp;
          <span className="text-amber-400">●</span> 7–14 days &nbsp;
          <span className="text-emerald-400">●</span> 14+ days
        </p>
      </CardContent>
    </Card>
  );
}

function RecentPerformance() {
  return (
    <Card
      className="glass border-border/30 h-full"
      data-ocid="student.recent_performance.card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Recent Test Scores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-4 pt-0">
        {recentTests.map((t, i) => {
          const pct = Math.round((t.marks / t.max) * 100);
          return (
            <div
              key={t.subject}
              className="flex items-center gap-3"
              data-ocid={`student.test_score.${i + 1}`}
            >
              <span
                className={`text-[10px] px-2 py-0.5 rounded border w-28 shrink-0 ${getSubjectColor(t.subject)}`}
              >
                {t.subject}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-mono font-semibold w-12 text-right">
                {t.marks}/{t.max}
              </span>
              <span
                className={`w-6 shrink-0 ${gradeColor(t.grade)} text-xs font-bold`}
              >
                {t.grade}
              </span>
              {t.trend === "up" && (
                <ArrowUp className="w-3 h-3 text-emerald-400 shrink-0" />
              )}
              {t.trend === "down" && (
                <ArrowDown className="w-3 h-3 text-rose-400 shrink-0" />
              )}
              {t.trend === "same" && (
                <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function PendingHomeworkPanel({
  items,
  onStatusChange,
}: {
  items: typeof initialHomework;
  onStatusChange: (id: number, status: HomeworkStatus) => void;
}) {
  return (
    <Card
      className="glass border-border/30 h-full"
      data-ocid="student.pending_homework.card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-amber-400" />
          Pending Homework
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5 p-4 pt-0">
        {items.map((hw, i) => (
          <div
            key={hw.id}
            className="rounded-lg border border-border/30 bg-muted/10 p-3"
            data-ocid={`student.hw_panel.${i + 1}`}
          >
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border ${getSubjectColor(hw.subject)}`}
              >
                {hw.subject}
              </span>
              <span
                className={`text-[10px] font-semibold ${urgencyColor(hw.urgency)}`}
              >
                Due {hw.due}
              </span>
            </div>
            <p className="text-xs line-clamp-2 mb-2">{hw.title}</p>
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] px-2 py-0.5 rounded ${urgencyBadgeClass(hw.urgency)}`}
              >
                {hw.urgency === "high"
                  ? "Urgent"
                  : hw.urgency === "medium"
                    ? "Medium"
                    : "Low"}
              </span>
              <Select
                value={hw.status}
                onValueChange={(v) =>
                  onStatusChange(hw.id, v as HomeworkStatus)
                }
              >
                <SelectTrigger
                  className="h-6 text-[10px] w-28 border-border/40"
                  data-ocid={`student.hw_status_select.${i + 1}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────
export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [homework, setHomework] = useState(initialHomework);

  function handleHwStatusChange(id: number, status: HomeworkStatus) {
    setHomework((prev) =>
      prev.map((hw) => (hw.id === id ? { ...hw, status } : hw)),
    );
  }

  return (
    <div className="space-y-6" data-ocid="student_portal.page">
      {/* Portal Header */}
      <div className="glass rounded-2xl border border-accent/20 p-5 shadow-glass-subtle">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">
                Hello, Aarav! 👋
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Class X-A &nbsp;·&nbsp; Delhi Public School, Rohini
                &nbsp;·&nbsp; Roll No: 2024-X-042 &nbsp;·&nbsp; CBSE Board
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-accent">
              Monday, 22 April 2025
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Academic Year 2024–25
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        data-ocid="student_portal.quick_stats"
      >
        {[
          {
            icon: Calendar,
            label: "Attendance This Month",
            value: "91.6%",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            icon: Trophy,
            label: "Overall Rank",
            value: "7th in Class",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
          },
          {
            icon: ClipboardList,
            label: "Pending Homework",
            value: "3 Tasks",
            color: "text-rose-400",
            bg: "bg-rose-500/10",
          },
          {
            icon: Zap,
            label: "Next Exam",
            value: "Physics (May 3)",
            color: "text-accent",
            bg: "bg-accent/10",
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="glass rounded-xl border border-border/30 p-4 flex items-center gap-3"
            data-ocid={`student_portal.stat.${i + 1}`}
          >
            <div
              className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground truncate">
                {stat.label}
              </p>
              <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide"
        data-ocid="student_portal.tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-accent text-accent-foreground shadow-glass-subtle"
                : "glass border border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60"
            }`}
            data-ocid={`student_portal.tab.${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Dashboard ── */}
      {activeTab === "dashboard" && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="student_portal.dashboard_tab"
        >
          <TodayClasses />
          <UpcomingExamsPanel />
          <RecentPerformance />
          <PendingHomeworkPanel
            items={homework}
            onStatusChange={handleHwStatusChange}
          />
        </div>
      )}

      {/* ── Tab: Timetable ── */}
      {activeTab === "timetable" && (
        <div data-ocid="student_portal.timetable_tab">
          <Card className="glass border-border/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                Weekly Timetable — Class X-A
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="py-3 px-4 text-left text-muted-foreground font-semibold w-28">
                      Period / Time
                    </th>
                    {days.map((d) => (
                      <th
                        key={d}
                        className="py-3 px-2 text-left text-muted-foreground font-semibold"
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periodTimes.map((time, pi) => (
                    <tr
                      key={time}
                      className="border-b border-border/20 hover:bg-muted/10 transition-colors"
                      data-ocid={`student_portal.timetable_row.${pi + 1}`}
                    >
                      <td className="py-2 px-4">
                        <span className="text-[10px] text-muted-foreground font-mono block">
                          P{pi + 1}
                        </span>
                        <span className="text-[9px] text-muted-foreground/70 font-mono">
                          {time}
                        </span>
                      </td>
                      {days.map((d) => {
                        const cell = timetable[d]?.[pi];
                        if (!cell)
                          return (
                            <td key={d} className="py-2 px-2">
                              <span className="text-[10px] text-muted-foreground/40">
                                —
                              </span>
                            </td>
                          );
                        const isLunch = cell.subject === "Lunch";
                        return (
                          <td key={d} className="py-2 px-2">
                            <div
                              className={`rounded-md px-2 py-1 border text-[10px] ${getSubjectColor(cell.subject)} ${isLunch ? "opacity-50" : ""}`}
                            >
                              <div className="font-semibold">
                                {cell.subject}
                              </div>
                              {!isLunch && (
                                <div className="text-[9px] opacity-70 mt-0.5">
                                  {cell.teacher} · {cell.room}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              {
                label: "Math",
                cls: "text-blue-400 bg-blue-500/10 border-blue-500/25",
              },
              {
                label: "Science/Physics",
                cls: "text-purple-400 bg-purple-500/10 border-purple-500/25",
              },
              {
                label: "English",
                cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
              },
              {
                label: "Hindi",
                cls: "text-orange-400 bg-orange-500/10 border-orange-500/25",
              },
              {
                label: "Computer",
                cls: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
              },
              {
                label: "PE/Sports",
                cls: "text-green-400 bg-green-500/10 border-green-500/25",
              },
            ].map((leg) => (
              <span
                key={leg.label}
                className={`text-[10px] px-2 py-1 rounded border ${leg.cls}`}
              >
                {leg.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Attendance ── */}
      {activeTab === "attendance" && (
        <div className="space-y-4" data-ocid="student_portal.attendance_tab">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {attendanceMonths.map((m, i) => (
              <Card
                key={m.month}
                className="glass border-border/30 text-center"
                data-ocid={`student_portal.attendance_month.${i + 1}`}
              >
                <CardContent className="pt-4 pb-3 px-2">
                  <p className="text-[10px] text-muted-foreground mb-1">
                    {m.month}
                  </p>
                  <p
                    className={`text-lg font-bold font-display ${m.pct >= 90 ? "text-emerald-400" : m.pct >= 75 ? "text-amber-400" : "text-rose-400"}`}
                  >
                    {m.pct}%
                  </p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">
                    {m.present}/{m.total} days
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className="glass border-border/30"
              data-ocid="student_portal.attendance_calendar"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  April 2025 — Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-[9px] text-muted-foreground py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  <div key="offset-sun" />
                  <div key="offset-mon" />
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const status = attendanceDays[day];
                    const style =
                      status === "P"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : status === "A"
                          ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                          : status === "H"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            : status === "W"
                              ? "bg-muted/30 text-muted-foreground border-border/20"
                              : "bg-muted/10 text-muted-foreground/40 border-border/10";
                    return (
                      <div
                        key={day}
                        className={`text-center text-[10px] py-1.5 rounded border font-mono font-semibold ${style}`}
                        data-ocid={`student_portal.cal_day.${day}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {[
                    {
                      label: "Present",
                      cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
                    },
                    {
                      label: "Absent",
                      cls: "bg-rose-500/20 text-rose-400 border-rose-500/30",
                    },
                    {
                      label: "Holiday",
                      cls: "bg-amber-500/20 text-amber-400 border-amber-500/30",
                    },
                    {
                      label: "Weekend",
                      cls: "bg-muted/30 text-muted-foreground border-border/20",
                    },
                  ].map((leg) => (
                    <span
                      key={leg.label}
                      className={`text-[9px] px-2 py-0.5 rounded border ${leg.cls}`}
                    >
                      {leg.label}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card
              className="glass border-border/30"
              data-ocid="student_portal.attendance_trend"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  6-Month Attendance Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                {attendanceMonths.map((m) => (
                  <div key={m.month} className="flex items-center gap-3">
                    <span className="text-xs w-8 text-muted-foreground">
                      {m.month}
                    </span>
                    <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${m.pct}%`,
                          background:
                            m.pct >= 90
                              ? "oklch(0.72 0.18 148)"
                              : m.pct >= 75
                                ? "oklch(0.82 0.18 85)"
                                : "oklch(0.65 0.22 25)",
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold w-12 text-right ${m.pct >= 90 ? "text-emerald-400" : m.pct >= 75 ? "text-amber-400" : "text-rose-400"}`}
                    >
                      {m.pct}%
                    </span>
                  </div>
                ))}
                <div className="mt-4 p-3 rounded-lg border border-border/30 bg-muted/20">
                  <p className="text-xs text-muted-foreground">
                    Overall Attendance:{" "}
                    <span className="text-emerald-400 font-bold">91.6%</span>
                    &nbsp;·&nbsp; Min. Required:{" "}
                    <span className="text-amber-400 font-bold">75%</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── Tab: Marks ── */}
      {activeTab === "marks" && (
        <div className="space-y-4" data-ocid="student_portal.marks_tab">
          <Card className="glass border-border/30">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                Academic Performance — Class X-A (2024–25)
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7"
                data-ocid="student_portal.download_marksheet_button"
              >
                Download Marksheet
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead className="text-xs">Subject</TableHead>
                    <TableHead className="text-xs text-right">
                      UT1 /50
                    </TableHead>
                    <TableHead className="text-xs text-right">
                      UT2 /50
                    </TableHead>
                    <TableHead className="text-xs text-right">
                      Half Yearly
                    </TableHead>
                    <TableHead className="text-xs text-right">
                      UT3 /50
                    </TableHead>
                    <TableHead className="text-xs text-right">
                      UT4 /50
                    </TableHead>
                    <TableHead className="text-xs text-right">Annual</TableHead>
                    <TableHead className="text-xs text-right">
                      Total %
                    </TableHead>
                    <TableHead className="text-xs text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marksData.map((row, i) => (
                    <TableRow
                      key={row.subject}
                      className="border-border/20 hover:bg-muted/10"
                      data-ocid={`student_portal.marks_row.${i + 1}`}
                    >
                      <TableCell className="font-medium">
                        <span className={`text-xs font-semibold ${row.color}`}>
                          {row.subject}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono">
                        {row.ut1}
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono">
                        {row.ut2}
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono">
                        {row.hy}
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono">
                        {row.ut3}
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono">
                        {row.ut4}
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono text-muted-foreground">
                        {row.annual}
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono font-bold">
                        {row.pct}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`text-xs font-bold ${gradeColor(row.grade)}`}
                        >
                          {row.grade}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card
            className="glass border-border/30"
            data-ocid="student_portal.performance_chart"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Subject-wise Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marksData.map((row) => {
                const pct = Number.parseFloat(row.pct);
                return (
                  <div key={row.subject}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold ${row.color}`}>
                        {row.subject}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold font-mono">
                          {row.pct}
                        </span>
                        <span
                          className={`text-xs font-bold ${gradeColor(row.grade)}`}
                        >
                          {row.grade}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Tab: Homework ── */}
      {activeTab === "homework" && (
        <div className="space-y-4" data-ocid="student_portal.homework_tab">
          <div className="grid grid-cols-3 gap-3">
            {(["Pending", "In Progress", "Submitted"] as HomeworkStatus[]).map(
              (s) => {
                const count = homework.filter((h) => h.status === s).length;
                return (
                  <Card
                    key={s}
                    className="glass border-border/30"
                    data-ocid={`student_portal.hw_stat.${s.toLowerCase().replace(" ", "_")}`}
                  >
                    <CardContent className="pt-4 pb-3 flex items-center gap-3">
                      {s === "Pending" && (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      {s === "In Progress" && (
                        <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                      )}
                      {s === "Submitted" && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      <div>
                        <p className="text-lg font-bold font-display">
                          {count}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{s}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>

          <Card className="glass border-border/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-amber-400" />
                All Homework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {homework.map((hw, i) => (
                <div
                  key={hw.id}
                  className="rounded-xl border border-border/30 bg-muted/10 p-4"
                  data-ocid={`student_portal.homework.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border ${getSubjectColor(hw.subject)}`}
                        >
                          {hw.subject}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded ${urgencyBadgeClass(hw.urgency)}`}
                        >
                          {hw.urgency === "high"
                            ? "🔴 Urgent"
                            : hw.urgency === "medium"
                              ? "🟡 Medium"
                              : "🟢 Low Priority"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Due: {hw.due}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{hw.title}</p>
                    </div>
                    <Select
                      value={hw.status}
                      onValueChange={(v) =>
                        handleHwStatusChange(hw.id, v as HomeworkStatus)
                      }
                    >
                      <SelectTrigger
                        className="h-8 text-xs w-32 border-border/40 shrink-0"
                        data-ocid={`student_portal.hw_status.${i + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Tab: Exams ── */}
      {activeTab === "exams" && (
        <div className="space-y-4" data-ocid="student_portal.exams_tab">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {upcomingExams.slice(0, 3).map((ex, i) => (
              <Card
                key={ex.name}
                className={`glass border ${daysUrgencyBg(ex.daysLeft)}`}
                data-ocid={`student_portal.exam_countdown.${i + 1}`}
              >
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border ${getSubjectColor(ex.subject)}`}
                      >
                        {ex.subject}
                      </span>
                      <p className="text-xs font-semibold mt-1.5">{ex.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {ex.date} · {ex.time}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p
                        className={`text-2xl font-bold font-display ${daysUrgencyClass(ex.daysLeft)}`}
                      >
                        {ex.daysLeft}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        days left
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass border-border/30">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-accent" />
                Upcoming Exam Schedule
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7"
                data-ocid="student_portal.download_schedule_button"
              >
                Download Schedule
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead className="text-xs">Exam</TableHead>
                    <TableHead className="text-xs">Subject</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Time</TableHead>
                    <TableHead className="text-xs">Duration</TableHead>
                    <TableHead className="text-xs">Syllabus</TableHead>
                    <TableHead className="text-xs">Hall</TableHead>
                    <TableHead className="text-xs">Seat</TableHead>
                    <TableHead className="text-xs">Countdown</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingExams.map((ex, i) => (
                    <TableRow
                      key={ex.name}
                      className="border-border/20 hover:bg-muted/10"
                      data-ocid={`student_portal.exam_row.${i + 1}`}
                    >
                      <TableCell className="text-xs font-medium">
                        {ex.name}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded border ${getSubjectColor(ex.subject)}`}
                        >
                          {ex.subject}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">{ex.date}</TableCell>
                      <TableCell className="text-xs font-mono">
                        {ex.time}
                      </TableCell>
                      <TableCell className="text-xs">{ex.duration}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {ex.syllabus}
                      </TableCell>
                      <TableCell className="text-xs">{ex.hall}</TableCell>
                      <TableCell className="text-xs font-mono">
                        {ex.seat}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs font-bold ${daysUrgencyClass(ex.daysLeft)}`}
                        >
                          {ex.daysLeft}d
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card
            className="glass border-border/30"
            data-ocid="student_portal.exam_history"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Exam Result History
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead className="text-xs">Exam</TableHead>
                    <TableHead className="text-xs">Subject</TableHead>
                    <TableHead className="text-xs">Held On</TableHead>
                    <TableHead className="text-xs text-right">Marks</TableHead>
                    <TableHead className="text-xs text-center">Grade</TableHead>
                    <TableHead className="text-xs text-right">
                      Class Rank
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Half Yearly Exam",
                      subject: "Mathematics",
                      date: "Nov 12",
                      marks: "167/200",
                      grade: "A",
                      rank: "5th",
                    },
                    {
                      name: "Half Yearly Exam",
                      subject: "English",
                      date: "Nov 13",
                      marks: "176/200",
                      grade: "A",
                      rank: "3rd",
                    },
                    {
                      name: "Half Yearly Exam",
                      subject: "Science",
                      date: "Nov 14",
                      marks: "152/200",
                      grade: "B+",
                      rank: "9th",
                    },
                    {
                      name: "Half Yearly Exam",
                      subject: "Hindi",
                      date: "Nov 15",
                      marks: "161/200",
                      grade: "A",
                      rank: "6th",
                    },
                    {
                      name: "Unit Test 3",
                      subject: "Computer Sci.",
                      date: "Feb 5",
                      marks: "94/100",
                      grade: "A+",
                      rank: "1st",
                    },
                  ].map((r, i) => (
                    <TableRow
                      key={`${r.name}-${r.subject}`}
                      className="border-border/20 hover:bg-muted/10"
                      data-ocid={`student_portal.result_row.${i + 1}`}
                    >
                      <TableCell className="text-xs font-medium">
                        {r.name}
                      </TableCell>
                      <TableCell className="text-xs">{r.subject}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {r.date}
                      </TableCell>
                      <TableCell className="text-xs text-right font-mono font-bold">
                        {r.marks}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`text-xs font-bold ${gradeColor(r.grade)}`}
                        >
                          {r.grade}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-right text-muted-foreground">
                        {r.rank}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Tab: Announcements ── */}
      {activeTab === "announcements" && (
        <div className="space-y-4" data-ocid="student_portal.announcements_tab">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass border-border/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  School Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                  {announcements
                    .filter((a) => a.target === "School")
                    .map((ann, i) => (
                      <div
                        key={ann.id}
                        className="px-5 py-3 hover:bg-muted/20 transition-colors"
                        data-ocid={`student_portal.announcement.${i + 1}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold">{ann.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {ann.date}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-[10px] shrink-0"
                          >
                            {ann.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-accent" />
                  Class X-A Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                  {announcements
                    .filter((a) => a.target === "Class")
                    .map((ann, i) => (
                      <div
                        key={ann.id}
                        className="px-5 py-3 hover:bg-accent/5 transition-colors"
                        data-ocid={`student_portal.class_announcement.${i + 1}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold">{ann.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {ann.date}
                            </p>
                          </div>
                          <Badge className="text-[10px] shrink-0 bg-accent/15 text-accent border-accent/30 border">
                            {ann.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
