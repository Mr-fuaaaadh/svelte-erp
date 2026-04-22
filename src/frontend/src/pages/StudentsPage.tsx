import KPICard from "@/components/ui/KPICard";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { FeeStatus } from "@/types";
import {
  AlertTriangle,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StudentRecord {
  id: string;
  rollNo: string;
  name: string;
  class: string;
  section: string;
  school: string;
  parentName: string;
  parentPhone: string;
  feeStatus: FeeStatus;
  admissionDate: string;
  attendance: number;
  address: string;
  gender: "Male" | "Female";
  dob: string;
  email: string;
  feeDue: number;
  feePaid: number;
  lastPayment: string;
}

interface ExamRecord {
  id: string;
  studentName: string;
  class: string;
  subject: string;
  maxMarks: number;
  obtained: number;
  school: string;
}

interface AttendanceSchool {
  id: string;
  name: string;
  total: number;
  present: number;
  absent: number;
  late: number;
}

interface AdmissionRecord {
  id: string;
  admNo: string;
  name: string;
  class: string;
  school: string;
  date: string;
  documents: "Complete" | "Incomplete" | "Pending";
  status: "Applied" | "Verified" | "Interview" | "Admitted";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockStudents: StudentRecord[] = [
  {
    id: "s01",
    rollNo: "DPS-X-001",
    name: "Aarav Sharma",
    class: "X",
    section: "A",
    school: "DPS Rohini, Delhi",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 98110 23456",
    feeStatus: "Paid",
    admissionDate: "12 Apr 2022",
    attendance: 94,
    address: "A-42, Rohini Sector 15, Delhi",
    gender: "Male",
    dob: "14 Mar 2009",
    email: "aarav.sharma@dps.edu",
    feeDue: 48000,
    feePaid: 48000,
    lastPayment: "01 Apr 2026",
  },
  {
    id: "s02",
    rollNo: "RIP-IX-018",
    name: "Priya Patel",
    class: "IX",
    section: "B",
    school: "Ryan International, Pune",
    parentName: "Suresh Patel",
    parentPhone: "+91 94220 87654",
    feeStatus: "Paid",
    admissionDate: "08 Jun 2023",
    attendance: 91,
    address: "B-7, Baner Road, Pune",
    gender: "Female",
    dob: "22 Jul 2010",
    email: "priya.patel@ryan.edu",
    feeDue: 55000,
    feePaid: 55000,
    lastPayment: "02 Apr 2026",
  },
  {
    id: "s03",
    rollNo: "KVK-XI-034",
    name: "Rahul Singh",
    class: "XI",
    section: "C",
    school: "Kendriya Vidyalaya, Kanpur",
    parentName: "Vikram Singh",
    parentPhone: "+91 99350 12345",
    feeStatus: "Pending",
    admissionDate: "15 Mar 2021",
    attendance: 78,
    address: "12, Civil Lines, Kanpur",
    gender: "Male",
    dob: "05 Sep 2008",
    email: "rahul.singh@kv.edu",
    feeDue: 32000,
    feePaid: 0,
    lastPayment: "—",
  },
  {
    id: "s04",
    rollNo: "BVBS-VIII-011",
    name: "Kavya Reddy",
    class: "VIII",
    section: "A",
    school: "Bhashyam Vidyashram, Hyderabad",
    parentName: "Ravi Reddy",
    parentPhone: "+91 94400 67890",
    feeStatus: "Paid",
    admissionDate: "01 Jun 2024",
    attendance: 97,
    address: "Plot 45, Madhapur, Hyderabad",
    gender: "Female",
    dob: "18 Jan 2011",
    email: "kavya.reddy@bvbs.edu",
    feeDue: 62000,
    feePaid: 62000,
    lastPayment: "03 Apr 2026",
  },
  {
    id: "s05",
    rollNo: "APS-XII-007",
    name: "Aditya Kumar",
    class: "XII",
    section: "B",
    school: "Amity Public School, Noida",
    parentName: "Pramod Kumar",
    parentPhone: "+91 98990 34567",
    feeStatus: "Overdue",
    admissionDate: "22 Apr 2019",
    attendance: 65,
    address: "F-23, Sector 18, Noida",
    gender: "Male",
    dob: "03 Nov 2007",
    email: "aditya.kumar@amity.edu",
    feeDue: 72000,
    feePaid: 30000,
    lastPayment: "15 Jan 2026",
  },
  {
    id: "s06",
    rollNo: "HCS-VII-052",
    name: "Sneha Mehta",
    class: "VII",
    section: "A",
    school: "Holy Cross School, Ahmedabad",
    parentName: "Nilesh Mehta",
    parentPhone: "+91 98250 45678",
    feeStatus: "Partial",
    admissionDate: "10 Jun 2025",
    attendance: 88,
    address: "G-5, Navrangpura, Ahmedabad",
    gender: "Female",
    dob: "27 May 2012",
    email: "sneha.mehta@hcs.edu",
    feeDue: 28000,
    feePaid: 14000,
    lastPayment: "10 Mar 2026",
  },
  {
    id: "s07",
    rollNo: "SCC-IX-024",
    name: "Arjun Nair",
    class: "IX",
    section: "D",
    school: "Sree Chaitanya College, Kochi",
    parentName: "Sreekumar Nair",
    parentPhone: "+91 94470 56789",
    feeStatus: "Paid",
    admissionDate: "03 Jun 2023",
    attendance: 93,
    address: "TC 12/456, Thiruvananthapuram",
    gender: "Male",
    dob: "12 Feb 2010",
    email: "arjun.nair@scc.edu",
    feeDue: 45000,
    feePaid: 45000,
    lastPayment: "01 Apr 2026",
  },
  {
    id: "s08",
    rollNo: "JBS-VI-039",
    name: "Pooja Gupta",
    class: "VI",
    section: "B",
    school: "Jawahar Bal Bhavan, Lucknow",
    parentName: "Ashok Gupta",
    parentPhone: "+91 99200 67890",
    feeStatus: "Pending",
    admissionDate: "14 Apr 2026",
    attendance: 82,
    address: "48, Hazratganj, Lucknow",
    gender: "Female",
    dob: "08 Oct 2013",
    email: "pooja.gupta@jbb.edu",
    feeDue: 22000,
    feePaid: 0,
    lastPayment: "—",
  },
  {
    id: "s09",
    rollNo: "MPS-X-016",
    name: "Vivek Joshi",
    class: "X",
    section: "C",
    school: "Modern Public School, Bhopal",
    parentName: "Hemant Joshi",
    parentPhone: "+91 98230 78901",
    feeStatus: "Paid",
    admissionDate: "06 Jun 2022",
    attendance: 90,
    address: "E-12, Arera Colony, Bhopal",
    gender: "Male",
    dob: "19 Jun 2009",
    email: "vivek.joshi@mps.edu",
    feeDue: 38000,
    feePaid: 38000,
    lastPayment: "05 Apr 2026",
  },
  {
    id: "s10",
    rollNo: "NSS-XI-028",
    name: "Ananya Iyer",
    class: "XI",
    section: "A",
    school: "Nalanda Senior Secondary, Chennai",
    parentName: "Krishnamurthy Iyer",
    parentPhone: "+91 94440 89012",
    feeStatus: "Paid",
    admissionDate: "18 Mar 2021",
    attendance: 96,
    address: "12B, Nungambakkam, Chennai",
    gender: "Female",
    dob: "31 Aug 2008",
    email: "ananya.iyer@nss.edu",
    feeDue: 58000,
    feePaid: 58000,
    lastPayment: "02 Apr 2026",
  },
  {
    id: "s11",
    rollNo: "DPS-IX-041",
    name: "Rohan Verma",
    class: "IX",
    section: "A",
    school: "DPS Rohini, Delhi",
    parentName: "Sunil Verma",
    parentPhone: "+91 98112 90123",
    feeStatus: "Overdue",
    admissionDate: "12 Jun 2023",
    attendance: 71,
    address: "C-18, Pitampura, Delhi",
    gender: "Male",
    dob: "14 Apr 2010",
    email: "rohan.verma@dps.edu",
    feeDue: 48000,
    feePaid: 12000,
    lastPayment: "20 Dec 2025",
  },
  {
    id: "s12",
    rollNo: "SBM-VIII-062",
    name: "Meera Krishnan",
    class: "VIII",
    section: "B",
    school: "Saraswati Bal Mandir, Jaipur",
    parentName: "Gopal Krishnan",
    parentPhone: "+91 94140 01234",
    feeStatus: "Paid",
    admissionDate: "01 Apr 2024",
    attendance: 95,
    address: "22, Vaishali Nagar, Jaipur",
    gender: "Female",
    dob: "25 Nov 2011",
    email: "meera.krishnan@sbm.edu",
    feeDue: 26000,
    feePaid: 26000,
    lastPayment: "01 Apr 2026",
  },
  {
    id: "s13",
    rollNo: "APS-VII-019",
    name: "Ishaan Malhotra",
    class: "VII",
    section: "C",
    school: "Amity Public School, Noida",
    parentName: "Pankaj Malhotra",
    parentPhone: "+91 98990 12345",
    feeStatus: "Partial",
    admissionDate: "07 Jun 2025",
    attendance: 85,
    address: "H-3, Sector 62, Noida",
    gender: "Male",
    dob: "10 Jul 2012",
    email: "ishaan.malhotra@amity.edu",
    feeDue: 72000,
    feePaid: 36000,
    lastPayment: "15 Feb 2026",
  },
  {
    id: "s14",
    rollNo: "RIP-X-033",
    name: "Disha Kapoor",
    class: "X",
    section: "B",
    school: "Ryan International, Pune",
    parentName: "Amit Kapoor",
    parentPhone: "+91 94220 23456",
    feeStatus: "Paid",
    admissionDate: "02 Jun 2022",
    attendance: 92,
    address: "32, Koregaon Park, Pune",
    gender: "Female",
    dob: "07 Mar 2009",
    email: "disha.kapoor@ryan.edu",
    feeDue: 55000,
    feePaid: 55000,
    lastPayment: "03 Apr 2026",
  },
  {
    id: "s15",
    rollNo: "STXII-A-005",
    name: "Karthik Sundaram",
    class: "XII",
    section: "A",
    school: "Sri Thakur Vidyalaya, Coimbatore",
    parentName: "Venkatesh Sundaram",
    parentPhone: "+91 98430 34567",
    feeStatus: "Paid",
    admissionDate: "19 Mar 2019",
    attendance: 98,
    address: "14, RS Puram, Coimbatore",
    gender: "Male",
    dob: "01 Oct 2007",
    email: "karthik.s@stv.edu",
    feeDue: 41000,
    feePaid: 41000,
    lastPayment: "01 Apr 2026",
  },
  {
    id: "s16",
    rollNo: "GNS-VI-077",
    name: "Nidhi Agarwal",
    class: "VI",
    section: "D",
    school: "Gyan Niketan School, Patna",
    parentName: "Sanjay Agarwal",
    parentPhone: "+91 94310 45678",
    feeStatus: "Pending",
    admissionDate: "10 Apr 2026",
    attendance: 79,
    address: "8, Boring Road, Patna",
    gender: "Female",
    dob: "15 Dec 2013",
    email: "nidhi.agarwal@gns.edu",
    feeDue: 18000,
    feePaid: 0,
    lastPayment: "—",
  },
  {
    id: "s17",
    rollNo: "KVH-XI-022",
    name: "Siddharth Rao",
    class: "XI",
    section: "B",
    school: "Kendriya Vidyalaya, Hyderabad",
    parentName: "Narasimha Rao",
    parentPhone: "+91 94400 56789",
    feeStatus: "Paid",
    admissionDate: "05 Mar 2021",
    attendance: 88,
    address: "23, Banjara Hills, Hyderabad",
    gender: "Male",
    dob: "28 Jul 2008",
    email: "sidd.rao@kvh.edu",
    feeDue: 34000,
    feePaid: 34000,
    lastPayment: "04 Apr 2026",
  },
  {
    id: "s18",
    rollNo: "BIS-IX-044",
    name: "Tanvi Desai",
    class: "IX",
    section: "C",
    school: "Bharatiya Vidya Bhavan, Surat",
    parentName: "Mahesh Desai",
    parentPhone: "+91 98260 67890",
    feeStatus: "Overdue",
    admissionDate: "11 Jun 2023",
    attendance: 68,
    address: "67, Adajan, Surat",
    gender: "Female",
    dob: "03 Apr 2010",
    email: "tanvi.desai@bvb.edu",
    feeDue: 29000,
    feePaid: 8000,
    lastPayment: "10 Nov 2025",
  },
  {
    id: "s19",
    rollNo: "DPS-VII-066",
    name: "Rishi Banerjee",
    class: "VII",
    section: "A",
    school: "DPS Rohini, Delhi",
    parentName: "Animesh Banerjee",
    parentPhone: "+91 98310 78901",
    feeStatus: "Paid",
    admissionDate: "08 Jun 2025",
    attendance: 91,
    address: "B-24, Preet Vihar, Delhi",
    gender: "Male",
    dob: "17 Sep 2012",
    email: "rishi.banerjee@dps.edu",
    feeDue: 48000,
    feePaid: 48000,
    lastPayment: "06 Apr 2026",
  },
  {
    id: "s20",
    rollNo: "VPS-X-055",
    name: "Lavanya Menon",
    class: "X",
    section: "D",
    school: "Vidya Public School, Thiruvananthapuram",
    parentName: "Suresh Menon",
    parentPhone: "+91 94470 89012",
    feeStatus: "Partial",
    admissionDate: "15 Apr 2022",
    attendance: 87,
    address: "TC 8/223, Kesavadasapuram, Trivandrum",
    gender: "Female",
    dob: "22 Jun 2009",
    email: "lavanya.menon@vps.edu",
    feeDue: 36000,
    feePaid: 18000,
    lastPayment: "20 Feb 2026",
  },
  {
    id: "s21",
    rollNo: "SMS-XII-003",
    name: "Akash Tiwari",
    class: "XII",
    section: "C",
    school: "Saraswati Modern School, Varanasi",
    parentName: "Ram Tiwari",
    parentPhone: "+91 99350 90123",
    feeStatus: "Paid",
    admissionDate: "14 Mar 2019",
    attendance: 95,
    address: "D-11, Lanka, Varanasi",
    gender: "Male",
    dob: "08 Feb 2007",
    email: "akash.tiwari@sms.edu",
    feeDue: 27000,
    feePaid: 27000,
    lastPayment: "02 Apr 2026",
  },
  {
    id: "s22",
    rollNo: "NSS-VIII-038",
    name: "Shruti Pillai",
    class: "VIII",
    section: "D",
    school: "Nalanda Senior Secondary, Chennai",
    parentName: "Ajay Pillai",
    parentPhone: "+91 94440 01234",
    feeStatus: "Paid",
    admissionDate: "02 Jun 2024",
    attendance: 93,
    address: "15, T Nagar, Chennai",
    gender: "Female",
    dob: "29 Dec 2011",
    email: "shruti.pillai@nss.edu",
    feeDue: 58000,
    feePaid: 58000,
    lastPayment: "01 Apr 2026",
  },
  {
    id: "s23",
    rollNo: "HCS-IX-047",
    name: "Dev Chauhan",
    class: "IX",
    section: "B",
    school: "Holy Cross School, Ahmedabad",
    parentName: "Bharat Chauhan",
    parentPhone: "+91 98250 12345",
    feeStatus: "Pending",
    admissionDate: "09 Jun 2023",
    attendance: 76,
    address: "H-8, Satellite, Ahmedabad",
    gender: "Male",
    dob: "11 Aug 2010",
    email: "dev.chauhan@hcs.edu",
    feeDue: 28000,
    feePaid: 0,
    lastPayment: "—",
  },
  {
    id: "s24",
    rollNo: "RIP-VI-081",
    name: "Manya Srivastava",
    class: "VI",
    section: "A",
    school: "Ryan International, Pune",
    parentName: "Arvind Srivastava",
    parentPhone: "+91 94220 23456",
    feeStatus: "Paid",
    admissionDate: "12 Apr 2026",
    attendance: 89,
    address: "41, Shivajinagar, Pune",
    gender: "Female",
    dob: "06 Mar 2014",
    email: "manya.sri@ryan.edu",
    feeDue: 55000,
    feePaid: 55000,
    lastPayment: "12 Apr 2026",
  },
  {
    id: "s25",
    rollNo: "APS-X-029",
    name: "Harsh Pandey",
    class: "X",
    section: "A",
    school: "Amity Public School, Noida",
    parentName: "Rajendra Pandey",
    parentPhone: "+91 98990 34567",
    feeStatus: "Paid",
    admissionDate: "04 Jun 2022",
    attendance: 92,
    address: "J-7, Sector 50, Noida",
    gender: "Male",
    dob: "30 Apr 2009",
    email: "harsh.pandey@amity.edu",
    feeDue: 72000,
    feePaid: 72000,
    lastPayment: "01 Apr 2026",
  },
  {
    id: "s26",
    rollNo: "GNS-XI-014",
    name: "Ritika Jha",
    class: "XI",
    section: "D",
    school: "Gyan Niketan School, Patna",
    parentName: "Rajesh Jha",
    parentPhone: "+91 94310 45678",
    feeStatus: "Overdue",
    admissionDate: "10 Mar 2021",
    attendance: 60,
    address: "5, Boring Canal Road, Patna",
    gender: "Female",
    dob: "14 May 2008",
    email: "ritika.jha@gns.edu",
    feeDue: 18000,
    feePaid: 5000,
    lastPayment: "30 Oct 2025",
  },
  {
    id: "s27",
    rollNo: "STXII-B-009",
    name: "Aditi Krishnaswamy",
    class: "XII",
    section: "B",
    school: "Sri Thakur Vidyalaya, Coimbatore",
    parentName: "Ravishankar Krishnaswamy",
    parentPhone: "+91 98430 56789",
    feeStatus: "Paid",
    admissionDate: "16 Mar 2019",
    attendance: 97,
    address: "7, Gandhipuram, Coimbatore",
    gender: "Female",
    dob: "09 Jan 2007",
    email: "aditi.k@stv.edu",
    feeDue: 41000,
    feePaid: 41000,
    lastPayment: "03 Apr 2026",
  },
  {
    id: "s28",
    rollNo: "KVK-VII-053",
    name: "Yash Dubey",
    class: "VII",
    section: "B",
    school: "Kendriya Vidyalaya, Kanpur",
    parentName: "Anil Dubey",
    parentPhone: "+91 99350 67890",
    feeStatus: "Partial",
    admissionDate: "05 Jun 2025",
    attendance: 83,
    address: "34, Swaroop Nagar, Kanpur",
    gender: "Male",
    dob: "21 Oct 2012",
    email: "yash.dubey@kv.edu",
    feeDue: 32000,
    feePaid: 16000,
    lastPayment: "01 Mar 2026",
  },
  {
    id: "s29",
    rollNo: "MPS-IX-031",
    name: "Kriti Saxena",
    class: "IX",
    section: "A",
    school: "Modern Public School, Bhopal",
    parentName: "Deepak Saxena",
    parentPhone: "+91 98230 78901",
    feeStatus: "Paid",
    admissionDate: "07 Jun 2023",
    attendance: 90,
    address: "F-9, Shyamla Hills, Bhopal",
    gender: "Female",
    dob: "03 Dec 2010",
    email: "kriti.saxena@mps.edu",
    feeDue: 38000,
    feePaid: 38000,
    lastPayment: "04 Apr 2026",
  },
  {
    id: "s30",
    rollNo: "BIS-X-022",
    name: "Nikhil Bose",
    class: "X",
    section: "C",
    school: "Bharatiya Vidya Bhavan, Surat",
    parentName: "Subhash Bose",
    parentPhone: "+91 98260 89012",
    feeStatus: "Paid",
    admissionDate: "09 Jun 2022",
    attendance: 94,
    address: "12, Citylight, Surat",
    gender: "Male",
    dob: "16 Jul 2009",
    email: "nikhil.bose@bvb.edu",
    feeDue: 29000,
    feePaid: 29000,
    lastPayment: "02 Apr 2026",
  },
];

const mockAdmissions: AdmissionRecord[] = [
  {
    id: "a01",
    admNo: "ADM-2026-0892",
    name: "Prerna Agarwal",
    class: "VI",
    school: "DPS Rohini, Delhi",
    date: "18 Apr 2026",
    documents: "Complete",
    status: "Admitted",
  },
  {
    id: "a02",
    admNo: "ADM-2026-0891",
    name: "Suyash Pandey",
    class: "IX",
    school: "Ryan International, Pune",
    date: "17 Apr 2026",
    documents: "Complete",
    status: "Interview",
  },
  {
    id: "a03",
    admNo: "ADM-2026-0890",
    name: "Tara Venkatesh",
    class: "XI",
    school: "Nalanda Senior Secondary, Chennai",
    date: "16 Apr 2026",
    documents: "Incomplete",
    status: "Verified",
  },
  {
    id: "a04",
    admNo: "ADM-2026-0889",
    name: "Akhil Mishra",
    class: "VII",
    school: "Kendriya Vidyalaya, Kanpur",
    date: "15 Apr 2026",
    documents: "Pending",
    status: "Applied",
  },
  {
    id: "a05",
    admNo: "ADM-2026-0888",
    name: "Isha Mathur",
    class: "X",
    school: "Amity Public School, Noida",
    date: "14 Apr 2026",
    documents: "Complete",
    status: "Admitted",
  },
  {
    id: "a06",
    admNo: "ADM-2026-0887",
    name: "Tarun Bhatt",
    class: "VIII",
    school: "Bhashyam Vidyashram, Hyderabad",
    date: "13 Apr 2026",
    documents: "Complete",
    status: "Interview",
  },
  {
    id: "a07",
    admNo: "ADM-2026-0886",
    name: "Divya Nambiar",
    class: "VI",
    school: "Sree Chaitanya College, Kochi",
    date: "12 Apr 2026",
    documents: "Incomplete",
    status: "Applied",
  },
  {
    id: "a08",
    admNo: "ADM-2026-0885",
    name: "Mohit Yadav",
    class: "XII",
    school: "Saraswati Modern School, Varanasi",
    date: "11 Apr 2026",
    documents: "Complete",
    status: "Verified",
  },
  {
    id: "a09",
    admNo: "ADM-2026-0884",
    name: "Roshni Ghosh",
    class: "IX",
    school: "Gyan Niketan School, Patna",
    date: "10 Apr 2026",
    documents: "Complete",
    status: "Admitted",
  },
  {
    id: "a10",
    admNo: "ADM-2026-0883",
    name: "Pranav Iyer",
    class: "X",
    school: "Sri Thakur Vidyalaya, Coimbatore",
    date: "09 Apr 2026",
    documents: "Pending",
    status: "Applied",
  },
];

const mockAttendance: AttendanceSchool[] = [
  {
    id: "at01",
    name: "DPS Rohini, Delhi",
    total: 2840,
    present: 2698,
    absent: 112,
    late: 30,
  },
  {
    id: "at02",
    name: "Ryan International, Pune",
    total: 3120,
    present: 2934,
    absent: 148,
    late: 38,
  },
  {
    id: "at03",
    name: "Kendriya Vidyalaya, Kanpur",
    total: 1870,
    present: 1645,
    absent: 185,
    late: 40,
  },
  {
    id: "at04",
    name: "Bhashyam Vidyashram, Hyderabad",
    total: 2210,
    present: 2165,
    absent: 35,
    late: 10,
  },
  {
    id: "at05",
    name: "Amity Public School, Noida",
    total: 2650,
    present: 2385,
    absent: 220,
    late: 45,
  },
  {
    id: "at06",
    name: "Nalanda Senior Secondary, Chennai",
    total: 1980,
    present: 1922,
    absent: 48,
    late: 10,
  },
  {
    id: "at07",
    name: "Holy Cross School, Ahmedabad",
    total: 1540,
    present: 1386,
    absent: 132,
    late: 22,
  },
  {
    id: "at08",
    name: "Sree Chaitanya College, Kochi",
    total: 1720,
    present: 1617,
    absent: 92,
    late: 11,
  },
  {
    id: "at09",
    name: "Modern Public School, Bhopal",
    total: 1380,
    present: 1242,
    absent: 110,
    late: 28,
  },
  {
    id: "at10",
    name: "Gyan Niketan School, Patna",
    total: 970,
    present: 756,
    absent: 186,
    late: 28,
  },
];

const mockExams: ExamRecord[] = [
  {
    id: "e01",
    studentName: "Aarav Sharma",
    class: "X-A",
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 96,
    school: "DPS Rohini",
  },
  {
    id: "e02",
    studentName: "Priya Patel",
    class: "IX-B",
    subject: "Science",
    maxMarks: 100,
    obtained: 88,
    school: "Ryan International",
  },
  {
    id: "e03",
    studentName: "Kavya Reddy",
    class: "VIII-A",
    subject: "English",
    maxMarks: 100,
    obtained: 93,
    school: "Bhashyam Vidyashram",
  },
  {
    id: "e04",
    studentName: "Karthik Sundaram",
    class: "XII-A",
    subject: "Computer Science",
    maxMarks: 100,
    obtained: 97,
    school: "Sri Thakur Vidyalaya",
  },
  {
    id: "e05",
    studentName: "Ananya Iyer",
    class: "XI-A",
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 91,
    school: "Nalanda Senior Secondary",
  },
  {
    id: "e06",
    studentName: "Rahul Singh",
    class: "XI-C",
    subject: "Social Studies",
    maxMarks: 100,
    obtained: 72,
    school: "Kendriya Vidyalaya",
  },
  {
    id: "e07",
    studentName: "Aditya Kumar",
    class: "XII-B",
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 58,
    school: "Amity Public School",
  },
  {
    id: "e08",
    studentName: "Sneha Mehta",
    class: "VII-A",
    subject: "Hindi",
    maxMarks: 100,
    obtained: 85,
    school: "Holy Cross School",
  },
  {
    id: "e09",
    studentName: "Arjun Nair",
    class: "IX-D",
    subject: "Science",
    maxMarks: 100,
    obtained: 89,
    school: "Sree Chaitanya College",
  },
  {
    id: "e10",
    studentName: "Meera Krishnan",
    class: "VIII-B",
    subject: "English",
    maxMarks: 100,
    obtained: 94,
    school: "Saraswati Bal Mandir",
  },
  {
    id: "e11",
    studentName: "Rohan Verma",
    class: "IX-A",
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 64,
    school: "DPS Rohini",
  },
  {
    id: "e12",
    studentName: "Tanvi Desai",
    class: "IX-C",
    subject: "Hindi",
    maxMarks: 100,
    obtained: 47,
    school: "Bharatiya Vidya Bhavan",
  },
  {
    id: "e13",
    studentName: "Shruti Pillai",
    class: "VIII-D",
    subject: "Social Studies",
    maxMarks: 100,
    obtained: 90,
    school: "Nalanda Senior Secondary",
  },
  {
    id: "e14",
    studentName: "Akash Tiwari",
    class: "XII-C",
    subject: "Computer Science",
    maxMarks: 100,
    obtained: 95,
    school: "Saraswati Modern School",
  },
  {
    id: "e15",
    studentName: "Lavanya Menon",
    class: "X-D",
    subject: "Science",
    maxMarks: 100,
    obtained: 79,
    school: "Vidya Public School",
  },
  {
    id: "e16",
    studentName: "Ishaan Malhotra",
    class: "VII-C",
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 76,
    school: "Amity Public School",
  },
  {
    id: "e17",
    studentName: "Disha Kapoor",
    class: "X-B",
    subject: "English",
    maxMarks: 100,
    obtained: 92,
    school: "Ryan International",
  },
  {
    id: "e18",
    studentName: "Siddharth Rao",
    class: "XI-B",
    subject: "Science",
    maxMarks: 100,
    obtained: 83,
    school: "Kendriya Vidyalaya",
  },
  {
    id: "e19",
    studentName: "Aditi Krishnaswamy",
    class: "XII-B",
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 98,
    school: "Sri Thakur Vidyalaya",
  },
  {
    id: "e20",
    studentName: "Vivek Joshi",
    class: "X-C",
    subject: "Hindi",
    maxMarks: 100,
    obtained: 81,
    school: "Modern Public School",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getGrade(pct: number): { grade: string; className: string } {
  if (pct >= 90)
    return {
      grade: "A+",
      className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    };
  if (pct >= 80)
    return {
      grade: "A",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    };
  if (pct >= 70)
    return {
      grade: "B",
      className: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    };
  if (pct >= 60)
    return {
      grade: "C",
      className: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    };
  if (pct >= 50)
    return {
      grade: "D",
      className: "bg-orange-500/15 text-orange-400 border-orange-500/25",
    };
  return {
    grade: "F",
    className: "bg-rose-500/15 text-rose-400 border-rose-500/25",
  };
}

function formatRupee(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const TABS = [
  "Overview",
  "Admissions",
  "Attendance",
  "Marks & Exams",
  "Fee Status",
] as const;
type Tab = (typeof TABS)[number];

function TabBar({
  active,
  onChange,
}: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div
      className="flex gap-1 p-1 rounded-lg bg-muted/40 w-fit"
      data-ocid="students.tabs"
    >
      {TABS.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          data-ocid={`students.tab.${t.toLowerCase().replace(/[\s&]+/g, "_")}`}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            active === t
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function AttendancePct({ pct }: { pct: number }) {
  const color =
    pct >= 90
      ? "text-emerald-400"
      : pct >= 75
        ? "text-amber-400"
        : "text-rose-400";
  const barColor =
    pct >= 90 ? "bg-emerald-500" : pct >= 75 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={cn("text-xs font-mono font-semibold w-10 text-right", color)}
      >
        {pct}%
      </span>
    </div>
  );
}

// ─── Student Detail Modal ─────────────────────────────────────────────────────
function StudentModal({
  student,
  onClose,
}: { student: StudentRecord | null; onClose: () => void }) {
  if (!student) return null;
  const balance = student.feeDue - student.feePaid;
  const collectionRate =
    student.feeDue > 0
      ? Math.round((student.feePaid / student.feeDue) * 100)
      : 0;

  return (
    <Dialog open={!!student} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl glass border-border/50 p-0 overflow-hidden"
        data-ocid="students.dialog"
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-border/50 bg-gradient-to-r from-card to-muted/20">
          <button
            type="button"
            onClick={onClose}
            data-ocid="students.close_button"
            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 border-2 border-accent/30">
                <AvatarFallback className="text-sm font-bold bg-accent/20 text-accent">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-lg font-display font-bold text-foreground">
                  {student.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {student.rollNo}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 border-accent/30 text-accent"
                  >
                    Class {student.class}-{student.section}
                  </Badge>
                  <StatusBadge status={student.feeStatus} />
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-2 gap-5 max-h-[500px] overflow-y-auto">
          {/* Personal Info */}
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
              Personal Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: CalendarCheck,
                  label: "Date of Birth",
                  val: student.dob,
                },
                { icon: UserCircle, label: "Gender", val: student.gender },
                { icon: GraduationCap, label: "School", val: student.school },
                {
                  icon: BookOpen,
                  label: "Admitted On",
                  val: student.admissionDate,
                },
                { icon: Mail, label: "Email", val: student.email },
                { icon: MapPin, label: "Address", val: student.address },
              ].map(({ icon: Icon, label, val }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30"
                >
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                    <p className="text-xs font-medium text-foreground truncate">
                      {val}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
              Parent Contact
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <UserCircle className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Parent Name
                  </p>
                  <p className="text-xs font-medium">{student.parentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Phone</p>
                  <p className="text-xs font-mono font-medium">
                    {student.parentPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
              Attendance
            </p>
            <div className="p-3 rounded-lg bg-muted/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">This Term</span>
                <span
                  className={cn(
                    "text-sm font-mono font-bold",
                    student.attendance >= 90
                      ? "text-emerald-400"
                      : student.attendance >= 75
                        ? "text-amber-400"
                        : "text-rose-400",
                  )}
                >
                  {student.attendance}%
                </span>
              </div>
              <Progress value={student.attendance} className="h-2" />
              <p className="text-[10px] text-muted-foreground">
                {student.attendance >= 90
                  ? "Excellent attendance"
                  : student.attendance >= 75
                    ? "Satisfactory attendance"
                    : "Below required threshold"}
              </p>
            </div>
          </div>

          {/* Fee History */}
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
              Fee Summary
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                {
                  label: "Total Due",
                  val: formatRupee(student.feeDue),
                  color: "text-foreground",
                },
                {
                  label: "Paid",
                  val: formatRupee(student.feePaid),
                  color: "text-emerald-400",
                },
                {
                  label: "Balance",
                  val: formatRupee(balance),
                  color:
                    balance > 0 ? "text-rose-400" : "text-muted-foreground",
                },
                {
                  label: "Collection %",
                  val: `${collectionRate}%`,
                  color:
                    collectionRate === 100
                      ? "text-emerald-400"
                      : collectionRate >= 50
                        ? "text-amber-400"
                        : "text-rose-400",
                },
              ].map(({ label, val, color }) => (
                <div
                  key={label}
                  className="text-center p-3 rounded-lg bg-muted/30"
                >
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                  <p
                    className={cn("text-sm font-mono font-bold mt-0.5", color)}
                  >
                    {val}
                  </p>
                </div>
              ))}
            </div>
            {student.lastPayment !== "—" && (
              <p className="text-[10px] text-muted-foreground mt-2">
                Last payment on{" "}
                <span className="text-foreground">{student.lastPayment}</span>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────
function OverviewTab({
  onSelectStudent,
}: { onSelectStudent: (s: StudentRecord) => void }) {
  const [search, setSearch] = useState("");
  const filtered = search
    ? mockStudents.filter((s) =>
        `${s.name} ${s.rollNo} ${s.school} ${s.class}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
    : mockStudents;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, roll no, school…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-sm"
            data-ocid="students.overview.search_input"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {filtered.length} students
        </span>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {[
                "Roll No",
                "Student",
                "Class",
                "School",
                "Parent",
                "Fee Status",
                "Admission Date",
                "Actions",
              ].map((h) => (
                <TableHead key={h} className="text-xs font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s, i) => (
              <TableRow
                key={s.id}
                className="hover:bg-muted/20 transition-colors cursor-pointer"
                data-ocid={`students.overview.item.${i + 1}`}
                onClick={() => onSelectStudent(s)}
              >
                <TableCell className="text-[11px] font-mono text-muted-foreground">
                  {s.rollNo}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 shrink-0">
                      <AvatarFallback className="text-[9px] bg-accent/20 text-accent">
                        {getInitials(s.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{s.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  {s.class}-{s.section}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">
                  {s.school}
                </TableCell>
                <TableCell className="text-xs">{s.parentName}</TableCell>
                <TableCell>
                  <StatusBadge status={s.feeStatus} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {s.admissionDate}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStudent(s);
                      }}
                      data-ocid={`students.view_profile.${i + 1}`}
                      className="text-[11px] text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      Profile
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const admissionStatusConfig = {
  Applied: {
    label: "Applied",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  Verified: {
    label: "Verified",
    className: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  Interview: {
    label: "Interview",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  Admitted: {
    label: "Admitted",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
};
const docConfig = {
  Complete: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Incomplete: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Pending: "bg-muted text-muted-foreground border-border",
};

function AdmissionsTab() {
  const pipeline = [
    { label: "Applied", count: 245, color: "bg-blue-500" },
    { label: "Documents Verified", count: 189, color: "bg-violet-500" },
    { label: "Interview Scheduled", count: 67, color: "bg-amber-500" },
    { label: "Admitted", count: 34, color: "bg-emerald-500" },
  ];
  return (
    <div className="space-y-5">
      {/* Pipeline */}
      <div
        className="grid grid-cols-4 gap-3"
        data-ocid="students.admissions.pipeline"
      >
        {pipeline.map((p, i) => (
          <div
            key={p.label}
            className="glass rounded-xl p-4 border border-border/40 text-center"
            data-ocid={`students.admissions.stage.${i + 1}`}
          >
            <div className={cn("w-2 h-2 rounded-full mx-auto mb-2", p.color)} />
            <p className="text-xl font-display font-bold text-foreground">
              {p.count}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
              {p.label}
            </p>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {[
                "Admission No",
                "Student Name",
                "Class",
                "School",
                "Date",
                "Documents",
                "Status",
              ].map((h) => (
                <TableHead key={h} className="text-xs font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAdmissions.map((a, i) => {
              const aStatus = admissionStatusConfig[a.status];
              return (
                <TableRow
                  key={a.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`students.admissions.item.${i + 1}`}
                >
                  <TableCell className="text-[11px] font-mono text-muted-foreground">
                    {a.admNo}
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    {a.name}
                  </TableCell>
                  <TableCell className="text-xs">{a.class}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">
                    {a.school}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {a.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0 border",
                        docConfig[a.documents],
                      )}
                    >
                      {a.documents}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0 border",
                        aStatus.className,
                      )}
                    >
                      {aStatus.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AttendanceTab() {
  return (
    <div className="space-y-3" data-ocid="students.attendance.section">
      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />{" "}
          90%+ Excellent
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />{" "}
          75–90% Good
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />{" "}
          Below 75% Critical
        </span>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {[
                "School",
                "Total Students",
                "Present Today",
                "Absent",
                "Late",
                "Attendance %",
              ].map((h) => (
                <TableHead key={h} className="text-xs font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAttendance.map((school, i) => {
              const pct = Math.round((school.present / school.total) * 100);
              return (
                <TableRow
                  key={school.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`students.attendance.item.${i + 1}`}
                >
                  <TableCell className="text-xs font-medium">
                    {school.name}
                  </TableCell>
                  <TableCell className="text-xs text-right font-mono">
                    {school.total.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-xs text-right font-mono text-emerald-400">
                    {school.present.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-xs text-right font-mono text-rose-400">
                    {school.absent}
                  </TableCell>
                  <TableCell className="text-xs text-right font-mono text-amber-400">
                    {school.late}
                  </TableCell>
                  <TableCell>
                    <AttendancePct pct={pct} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function MarksTab() {
  return (
    <div className="space-y-3" data-ocid="students.marks.section">
      <div className="flex items-center gap-3 flex-wrap text-[10px] font-semibold">
        {[
          {
            grade: "A+",
            className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
            label: "90–100",
          },
          {
            grade: "A",
            className:
              "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
            label: "80–89",
          },
          {
            grade: "B",
            className: "bg-blue-500/15 text-blue-400 border-blue-500/25",
            label: "70–79",
          },
          {
            grade: "C",
            className: "bg-amber-500/15 text-amber-400 border-amber-500/25",
            label: "60–69",
          },
          {
            grade: "D",
            className: "bg-orange-500/15 text-orange-400 border-orange-500/25",
            label: "50–59",
          },
          {
            grade: "F",
            className: "bg-rose-500/15 text-rose-400 border-rose-500/25",
            label: "<50",
          },
        ].map(({ grade, className, label }) => (
          <Badge
            key={grade}
            variant="outline"
            className={cn("border text-[10px] gap-1", className)}
          >
            {grade} <span className="text-[9px] opacity-70">{label}%</span>
          </Badge>
        ))}
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {[
                "Student Name",
                "Class",
                "Subject",
                "Max",
                "Obtained",
                "Percentage",
                "Grade",
                "School",
              ].map((h) => (
                <TableHead key={h} className="text-xs font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExams.map((e, i) => {
              const pct = Math.round((e.obtained / e.maxMarks) * 100);
              const { grade, className } = getGrade(pct);
              return (
                <TableRow
                  key={e.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`students.marks.item.${i + 1}`}
                >
                  <TableCell className="text-xs font-medium">
                    {e.studentName}
                  </TableCell>
                  <TableCell className="text-xs">{e.class}</TableCell>
                  <TableCell className="text-xs">{e.subject}</TableCell>
                  <TableCell className="text-xs text-right font-mono">
                    {e.maxMarks}
                  </TableCell>
                  <TableCell className="text-xs text-right font-mono font-semibold">
                    {e.obtained}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            pct >= 90
                              ? "bg-yellow-500"
                              : pct >= 80
                                ? "bg-emerald-500"
                                : pct >= 70
                                  ? "bg-blue-500"
                                  : pct >= 60
                                    ? "bg-amber-500"
                                    : pct >= 50
                                      ? "bg-orange-500"
                                      : "bg-rose-500",
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {pct}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0 font-bold border",
                        className,
                      )}
                    >
                      {grade}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {e.school}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FeeStatusTab() {
  const feeKpis = [
    {
      label: "Total Collected",
      val: "₹2.4Cr",
      color: "text-emerald-400",
      sub: "This academic year",
    },
    {
      label: "Pending",
      val: "₹38.5L",
      color: "text-amber-400",
      sub: "342 students",
    },
    {
      label: "Overdue",
      val: "₹12.1L",
      color: "text-rose-400",
      sub: "67 students",
    },
    {
      label: "Collection Rate",
      val: "85%",
      color: "text-blue-400",
      sub: "Target: 95%",
    },
  ];
  return (
    <div className="space-y-4" data-ocid="students.fee.section">
      <div className="grid grid-cols-4 gap-3">
        {feeKpis.map((k, i) => (
          <div
            key={k.label}
            className="glass rounded-xl p-4 border border-border/40"
            data-ocid={`students.fee.kpi.${i + 1}`}
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {k.label}
            </p>
            <p className={cn("text-xl font-display font-bold mt-1", k.color)}>
              {k.val}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {[
                "Student",
                "School",
                "Class",
                "Fee Due",
                "Paid",
                "Balance",
                "Last Payment",
                "Status",
              ].map((h) => (
                <TableHead key={h} className="text-xs font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudents.map((s, i) => {
              const balance = s.feeDue - s.feePaid;
              return (
                <TableRow
                  key={s.id}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`students.fee.item.${i + 1}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 shrink-0">
                        <AvatarFallback className="text-[9px] bg-accent/20 text-accent">
                          {getInitials(s.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{s.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">
                    {s.school}
                  </TableCell>
                  <TableCell className="text-xs">
                    {s.class}-{s.section}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-right">
                    {formatRupee(s.feeDue)}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-right text-emerald-400">
                    {formatRupee(s.feePaid)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-xs font-mono text-right",
                      balance > 0 ? "text-rose-400" : "text-muted-foreground",
                    )}
                  >
                    {balance > 0 ? formatRupee(balance) : "—"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {s.lastPayment}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={s.feeStatus} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(
    null,
  );

  return (
    <div className="space-y-6" data-ocid="students.page">
      <PageHeader
        title="Students Management"
        description="Records, attendance, admissions, marks, and fee tracking across all schools"
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="students.export_button"
            >
              Export
            </Button>
            <Button type="button" size="sm" data-ocid="students.admit_button">
              + Admit Student
            </Button>
          </>
        }
      />

      {/* KPI Tiles */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-ocid="students.kpi.section"
      >
        <KPICard
          title="Total Students"
          value="1,24,830"
          icon={GraduationCap}
          color="blue"
          change={4.2}
          changeType="up"
          subtitle="Across 412 schools"
        />
        <KPICard
          title="Present Today"
          value="1,08,203"
          icon={CheckCircle2}
          color="emerald"
          subtitle="86.7% attendance rate"
        />
        <KPICard
          title="Fee Defaulters"
          value="3,421"
          icon={AlertTriangle}
          color="rose"
          change={2.1}
          changeType="down"
          subtitle="Overdue + partial"
        />
        <KPICard
          title="New Admissions"
          value="892"
          icon={TrendingUp}
          color="amber"
          change={12.4}
          changeType="up"
          subtitle="This month"
        />
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <TabBar active={activeTab} onChange={setActiveTab} />
          {activeTab === "Fee Status" && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>All amounts in INR</span>
            </div>
          )}
          {activeTab === "Attendance" && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>As of today, 22 Apr 2026</span>
            </div>
          )}
          {activeTab === "Marks & Exams" && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Term 2, 2025–26 Results</span>
            </div>
          )}
        </div>

        <div className="transition-all duration-200">
          {activeTab === "Overview" && (
            <OverviewTab onSelectStudent={setSelectedStudent} />
          )}
          {activeTab === "Admissions" && <AdmissionsTab />}
          {activeTab === "Attendance" && <AttendanceTab />}
          {activeTab === "Marks & Exams" && <MarksTab />}
          {activeTab === "Fee Status" && <FeeStatusTab />}
        </div>
      </div>

      {/* Student Detail Modal */}
      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
