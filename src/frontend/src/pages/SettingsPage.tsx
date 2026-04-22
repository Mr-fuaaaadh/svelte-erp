import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import {
  AlertTriangle,
  Bell,
  Building2,
  Camera,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Download,
  Globe,
  Layout,
  Lock,
  Monitor,
  Palette,
  RefreshCw,
  Shield,
  Smartphone,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

// --- Types ---
type SettingSection =
  | "profile"
  | "security"
  | "school"
  | "roles"
  | "notifications"
  | "appearance"
  | "billing"
  | "integrations"
  | "system";

// --- Sidebar Nav Items ---
const NAV_ITEMS: {
  id: SettingSection;
  label: string;
  icon: React.ElementType;
  badge?: string;
}[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Account Security", icon: Lock },
  { id: "school", label: "School Configuration", icon: Building2 },
  { id: "roles", label: "Roles & Permissions", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard, badge: "Enterprise" },
  { id: "integrations", label: "Integrations", icon: Zap },
  { id: "system", label: "System", icon: Globe },
];

// --- Sub-components ---

function SectionCard({
  title,
  description,
  children,
  onSave,
  saveLabel = "Save Changes",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
}) {
  return (
    <Card className="glass border-border/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">
          {title}
        </CardTitle>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        {children}
        {onSave && (
          <>
            <Separator className="bg-border/40" />
            <div className="flex items-center gap-2 pt-1">
              <Button
                size="sm"
                onClick={onSave}
                data-ocid="settings.save_button"
                type="button"
              >
                {saveLabel}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                data-ocid="settings.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function ToggleRow({
  label,
  description,
  defaultChecked = false,
  ocid,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
  ocid: string;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} data-ocid={ocid} />
    </div>
  );
}

// =====================
// SECTION: Profile
// =====================
function ProfileSection() {
  const [fullName, setFullName] = useState("Rajesh Kumar");
  const [designation, setDesignation] = useState("Super Administrator");
  const [email, setEmail] = useState("rajesh.kumar@aipsa.org");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [org, setOrg] = useState("All India Private School Association");
  const [bio, setBio] = useState(
    "Managing national-level operations for AIPSA. Overseeing 247 affiliated private schools across India with 1,74,000+ students.",
  );

  return (
    <div className="space-y-6">
      <SectionCard
        title="Personal Information"
        description="Your public profile details"
        onSave={() => {}}
      >
        {/* Avatar Upload */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-2xl font-display font-bold text-white shadow-lg shadow-blue-500/20">
              RK
            </div>
            <button
              type="button"
              data-ocid="settings.avatar_upload_button"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-md hover:bg-accent/80 transition-smooth"
            >
              <Camera className="w-3.5 h-3.5 text-accent-foreground" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{fullName}</p>
            <p className="text-xs text-muted-foreground">{designation}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              JPG, PNG up to 2MB
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-9 text-sm"
              data-ocid="settings.profile.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Designation</Label>
            <Input
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="h-9 text-sm"
              data-ocid="settings.profile.designation_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 text-sm"
              data-ocid="settings.profile.email_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Phone Number</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-9 text-sm"
              data-ocid="settings.profile.phone_input"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-xs font-medium">Organization</Label>
            <Input
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="h-9 text-sm"
              data-ocid="settings.profile.org_input"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label className="text-xs font-medium">Bio / About</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="text-sm resize-none"
              data-ocid="settings.profile.bio_textarea"
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// =====================
// SECTION: Security
// =====================
function SecuritySection() {
  const sessions = [
    {
      device: "Windows PC",
      browser: "Chrome 124",
      location: "New Delhi",
      time: "Today at 10:30 AM",
      icon: Monitor,
      current: true,
    },
    {
      device: "MacBook Pro",
      browser: "Safari 17",
      location: "Mumbai",
      time: "Yesterday at 3:15 PM",
      icon: Monitor,
      current: false,
    },
    {
      device: "iPhone 14",
      browser: "Mobile Safari",
      location: "New Delhi",
      time: "2 hours ago",
      icon: Smartphone,
      current: false,
    },
  ];

  return (
    <div className="space-y-5">
      <SectionCard
        title="Change Password"
        description="Update your account password"
        onSave={() => {}}
      >
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Current Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-9 text-sm"
              data-ocid="settings.security.current_pass_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">New Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-9 text-sm"
              data-ocid="settings.security.new_pass_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Confirm New Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-9 text-sm"
              data-ocid="settings.security.confirm_pass_input"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Two-Factor Authentication"
        description="Add an extra layer of security"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Authenticator App (TOTP)
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Use Google Authenticator or Authy
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-xs">
              Enabled
            </Badge>
            <Switch defaultChecked data-ocid="settings.security.2fa_switch" />
          </div>
        </div>
        <Separator className="bg-border/40" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              SMS OTP Backup
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fallback to +91 98765 •••••210
            </p>
          </div>
          <Switch defaultChecked data-ocid="settings.security.sms_otp_switch" />
        </div>
      </SectionCard>

      <SectionCard
        title="Active Sessions"
        description="Devices currently logged into your account"
      >
        <div className="space-y-3">
          {sessions.map((session, i) => (
            <div
              key={session.device}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/40 border border-border/30"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <session.icon className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-foreground">
                    {session.device}
                  </p>
                  {session.current && (
                    <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-[10px] px-1.5 py-0">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {session.browser} · {session.location} · {session.time}
                </p>
              </div>
              {!session.current && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="shrink-0 h-7 text-xs"
                  type="button"
                  data-ocid={`settings.security.revoke_session.${i + 1}`}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive border-destructive/30 hover:bg-destructive/10"
          type="button"
          data-ocid="settings.security.revoke_all_button"
        >
          Revoke All Other Sessions
        </Button>
      </SectionCard>
    </div>
  );
}

// =====================
// SECTION: School Config
// =====================
function SchoolConfigSection() {
  const [schoolName, setSchoolName] = useState("Delhi Public School, Rohini");
  const [affNo, setAffNo] = useState("2730271");
  const workDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [activeDays, setActiveDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const [board, setBoard] = useState<"CBSE" | "ICSE" | "State">("CBSE");
  const [feeStructure, setFeeStructure] = useState<"Term-wise" | "Monthly">(
    "Term-wise",
  );
  const [grading, setGrading] = useState<"Percentage" | "GPA" | "Grades">(
    "Percentage",
  );

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const radioGroup = <T extends string>(
    options: T[],
    current: T,
    setter: (v: T) => void,
    name: string,
  ) => (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setter(opt)}
          data-ocid={`settings.school.${name}_${opt.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth",
            current === opt
              ? "bg-accent text-accent-foreground border-accent"
              : "bg-muted/40 text-muted-foreground border-border/30 hover:border-accent/40",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <SectionCard
      title="School Configuration"
      description="Academic year and institutional settings"
      onSave={() => {}}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5 md:col-span-2">
          <Label className="text-xs font-medium">School Name</Label>
          <Input
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="h-9 text-sm"
            data-ocid="settings.school.name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Affiliation Number</Label>
          <Input
            value={affNo}
            onChange={(e) => setAffNo(e.target.value)}
            className="h-9 text-sm font-mono"
            data-ocid="settings.school.affiliation_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Academic Year</Label>
          <Input
            defaultValue="2024–25"
            className="h-9 text-sm"
            data-ocid="settings.school.academic_year_input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium">Board Affiliation</Label>
        {radioGroup(
          ["CBSE", "ICSE", "State"] as const,
          board,
          setBoard,
          "board",
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium">Working Days</Label>
        <div className="flex gap-2 flex-wrap">
          {workDays.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              data-ocid={`settings.school.day_${day.toLowerCase()}`}
              className={cn(
                "w-10 h-10 rounded-lg text-xs font-medium border transition-smooth",
                activeDays.includes(day)
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-muted/30 text-muted-foreground border-border/30 hover:border-accent/40",
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium">Fee Structure</Label>
        {radioGroup(
          ["Term-wise", "Monthly"] as const,
          feeStructure,
          setFeeStructure,
          "fee",
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium">Grading System</Label>
        {radioGroup(
          ["Percentage", "GPA", "Grades"] as const,
          grading,
          setGrading,
          "grading",
        )}
      </div>
    </SectionCard>
  );
}

// =====================
// SECTION: Roles
// =====================
const ROLES_DATA = [
  {
    name: "Super Admin",
    users: 1,
    permissions: "All permissions",
    created: "Jan 1, 2020",
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    name: "School Admin",
    users: 247,
    permissions: "School mgmt, not billing",
    created: "Jan 1, 2020",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "Teacher",
    users: 8743,
    permissions: "Teaching, attendance, marks",
    created: "Jan 1, 2020",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "Parent",
    users: 45230,
    permissions: "View own child data",
    created: "Mar 15, 2020",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    name: "Student",
    users: 124830,
    permissions: "View own data only",
    created: "Mar 15, 2020",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
];

const MODULES = [
  "Dashboard",
  "CRM",
  "Schools",
  "Students",
  "Teachers",
  "Finance",
  "Analytics",
  "Reports",
];
const PERMISSIONS_MATRIX: Record<string, boolean[]> = {
  "Super Admin": [true, true, true, true, true, true, true, true],
  "School Admin": [true, false, true, true, true, true, false, true],
  Teacher: [true, false, false, true, true, false, false, true],
  Parent: [false, false, false, true, false, false, false, false],
  Student: [false, false, false, true, false, false, false, false],
};

function RolesSection() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Role Management"
        description="Users and their permission levels"
      >
        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Role Name
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Users
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Permissions
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Created
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {ROLES_DATA.map((role, i) => (
                <tr
                  key={role.name}
                  className="border-b border-border/20 last:border-0"
                  data-ocid={`settings.roles.item.${i + 1}`}
                >
                  <td className="py-2.5 px-2">
                    <Badge
                      className={cn("text-xs font-medium border", role.color)}
                    >
                      {role.name}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-2 text-right text-sm font-mono text-foreground tabular-nums">
                    {role.users.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2.5 px-2 text-xs text-muted-foreground">
                    {role.permissions}
                  </td>
                  <td className="py-2.5 px-2 text-xs text-muted-foreground">
                    {role.created}
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-xs"
                      type="button"
                      data-ocid={`settings.roles.edit_button.${i + 1}`}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="Permissions Matrix"
        description="Module access by role"
      >
        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left text-xs font-semibold text-muted-foreground pb-2 px-2 w-28">
                  Module
                </th>
                {ROLES_DATA.map((r) => (
                  <th
                    key={r.name}
                    className="text-center text-xs font-semibold text-muted-foreground pb-2 px-2"
                  >
                    {r.name.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((mod) => (
                <tr
                  key={mod}
                  className="border-b border-border/20 last:border-0"
                >
                  <td className="py-2 px-2 text-xs font-medium text-foreground">
                    {mod}
                  </td>
                  {ROLES_DATA.map((role) => {
                    const has =
                      PERMISSIONS_MATRIX[role.name]?.[MODULES.indexOf(mod)];
                    return (
                      <td key={role.name} className="py-2 px-2 text-center">
                        {has ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// =====================
// SECTION: Notifications
// =====================
const NOTIFICATION_SETTINGS = [
  {
    label: "Email Notifications",
    description: "Receive all alerts via email",
    defaultOn: true,
  },
  {
    label: "SMS Alerts",
    description: "Critical alerts sent to +91 98765 43210",
    defaultOn: true,
  },
  {
    label: "New Lead Assigned",
    description: "When a CRM lead is assigned to you",
    defaultOn: true,
  },
  {
    label: "Payment Received",
    description: "Confirmation when a school pays",
    defaultOn: true,
  },
  {
    label: "Subscription Expiring",
    description: "Alert 30 days before renewal",
    defaultOn: true,
  },
  {
    label: "Support Ticket Update",
    description: "When a ticket is updated or resolved",
    defaultOn: true,
  },
  {
    label: "Weekly Report Email",
    description: "Platform summary every Monday 9 AM",
    defaultOn: false,
  },
  {
    label: "System Maintenance Alerts",
    description: "Downtime and update notifications",
    defaultOn: true,
  },
];

function NotificationsSection() {
  return (
    <SectionCard
      title="Notification Preferences"
      description="Control how and when you get notified"
      onSave={() => {}}
    >
      {NOTIFICATION_SETTINGS.map((item, i) => (
        <ToggleRow
          key={item.label}
          label={item.label}
          description={item.description}
          defaultChecked={item.defaultOn}
          ocid={`settings.notifications.toggle.${i + 1}`}
        />
      ))}
    </SectionCard>
  );
}

// =====================
// SECTION: Appearance
// =====================
const ACCENT_COLORS = [
  { name: "Electric Blue", value: "bg-blue-500", class: "bg-blue-500" },
  { name: "Deep Violet", value: "bg-violet-500", class: "bg-violet-500" },
  { name: "Emerald", value: "bg-emerald-500", class: "bg-emerald-500" },
  { name: "Amber", value: "bg-amber-500", class: "bg-amber-500" },
  { name: "Rose Red", value: "bg-rose-500", class: "bg-rose-500" },
];

function AppearanceSection() {
  const { isDarkMode, toggleDarkMode } = useAppStore();
  const [accentColor, setAccentColor] = useState("Electric Blue");
  const [fontSize, setFontSize] = useState<"Compact" | "Regular" | "Large">(
    "Regular",
  );
  const [sidebarDefault, setSidebarDefault] = useState<
    "Expanded" | "Collapsed"
  >("Expanded");

  return (
    <div className="space-y-5">
      <SectionCard
        title="Theme"
        description="Choose your preferred color scheme"
      >
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Dark Mode",
              value: true,
              preview: "bg-zinc-900 border-zinc-700",
            },
            {
              label: "Light Mode",
              value: false,
              preview: "bg-zinc-100 border-zinc-300",
            },
          ].map((theme) => (
            <button
              key={theme.label}
              type="button"
              onClick={() => {
                if (isDarkMode !== theme.value) toggleDarkMode();
              }}
              data-ocid={`settings.appearance.theme_${theme.value ? "dark" : "light"}`}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-smooth text-left",
                isDarkMode === theme.value
                  ? "border-accent bg-accent/5"
                  : "border-border/40 hover:border-border",
              )}
            >
              <div
                className={cn(
                  "w-full h-16 rounded-lg mb-3 border",
                  theme.preview,
                )}
              />
              <p className="text-sm font-medium text-foreground">
                {theme.label}
              </p>
              {isDarkMode === theme.value && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Accent Color"
        description="Primary accent color for interactive elements"
        onSave={() => {}}
      >
        <div className="flex gap-3 flex-wrap">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setAccentColor(color.name)}
              data-ocid={`settings.appearance.accent_${color.name.toLowerCase().replace(/\s/g, "_")}`}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg border transition-smooth text-xs",
                accentColor === color.name
                  ? "border-foreground/30 bg-muted"
                  : "border-border/30 hover:border-border/60",
              )}
            >
              <span className={cn("w-4 h-4 rounded-full", color.class)} />
              {color.name}
            </button>
          ))}
        </div>

        <Separator className="bg-border/40" />

        <div className="space-y-2">
          <Label className="text-xs font-medium">Font Size</Label>
          <div className="flex gap-2">
            {(["Compact", "Regular", "Large"] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFontSize(size)}
                data-ocid={`settings.appearance.fontsize_${size.toLowerCase()}`}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth",
                  fontSize === size
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-muted/40 text-muted-foreground border-border/30 hover:border-accent/40",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Sidebar Default State</Label>
          <div className="flex gap-2">
            {(["Expanded", "Collapsed"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSidebarDefault(opt)}
                data-ocid={`settings.appearance.sidebar_${opt.toLowerCase()}`}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth",
                  sidebarDefault === opt
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-muted/40 text-muted-foreground border-border/30 hover:border-accent/40",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// =====================
// SECTION: Billing
// =====================
const BILLING_HISTORY = [
  {
    invoice: "INV-2025-0043",
    date: "Apr 1, 2025",
    amount: "₹48,000",
    gst: "₹8,640",
    total: "₹56,640",
    status: "Paid",
  },
  {
    invoice: "INV-2024-0031",
    date: "Apr 1, 2024",
    amount: "₹48,000",
    gst: "₹8,640",
    total: "₹56,640",
    status: "Paid",
  },
  {
    invoice: "INV-2023-0019",
    date: "Apr 1, 2023",
    amount: "₹42,000",
    gst: "₹7,560",
    total: "₹49,560",
    status: "Paid",
  },
  {
    invoice: "INV-2022-0012",
    date: "Apr 1, 2022",
    amount: "₹36,000",
    gst: "₹6,480",
    total: "₹42,480",
    status: "Paid",
  },
  {
    invoice: "INV-2021-0007",
    date: "Apr 1, 2021",
    amount: "₹30,000",
    gst: "₹5,400",
    total: "₹35,400",
    status: "Paid",
  },
];

function BillingSection() {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <div className="space-y-5">
      <SectionCard
        title="Current Subscription"
        description="Your active AIPSA ERP plan"
      >
        <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-violet-500/5 border border-accent/20">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-foreground">
                  Enterprise Plan
                </span>
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-2xl font-display font-bold text-accent mt-1">
                ₹48,000
                <span className="text-sm text-muted-foreground font-normal">
                  /year
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Unlimited schools · API Access · Priority Support
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Next Renewal</p>
              <p className="text-sm font-semibold text-foreground">
                March 31, 2026
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                243 days remaining
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-foreground">Auto-Renew</p>
            <p className="text-xs text-muted-foreground">
              Automatic renewal on March 31, 2026
            </p>
          </div>
          <Switch
            checked={autoRenew}
            onCheckedChange={setAutoRenew}
            data-ocid="settings.billing.auto_renew_switch"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Payment Method"
        description="Your saved payment details"
      >
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">HDFC</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                HDFC Bank •••• 4521
              </p>
              <p className="text-xs text-muted-foreground">Expires 09/27</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            type="button"
            className="h-7 text-xs"
            data-ocid="settings.billing.update_payment_button"
          >
            Update
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        title="Billing History"
        description="Past invoices with GST breakup"
      >
        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Invoice
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Date
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Base
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground pb-2 px-2">
                  GST 18%
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Total
                </th>
                <th className="text-center text-xs font-semibold text-muted-foreground pb-2 px-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {BILLING_HISTORY.map((row, i) => (
                <tr
                  key={row.invoice}
                  className="border-b border-border/20 last:border-0"
                  data-ocid={`settings.billing.invoice.${i + 1}`}
                >
                  <td className="py-2.5 px-2 text-xs font-mono text-accent">
                    {row.invoice}
                  </td>
                  <td className="py-2.5 px-2 text-xs text-muted-foreground">
                    {row.date}
                  </td>
                  <td className="py-2.5 px-2 text-xs text-right font-mono text-foreground">
                    {row.amount}
                  </td>
                  <td className="py-2.5 px-2 text-xs text-right font-mono text-muted-foreground">
                    {row.gst}
                  </td>
                  <td className="py-2.5 px-2 text-xs text-right font-mono font-semibold text-foreground">
                    {row.total}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-xs gap-1"
                      type="button"
                      data-ocid={`settings.billing.download_button.${i + 1}`}
                    >
                      <Download className="w-3 h-3" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// =====================
// SECTION: Integrations
// =====================
const INTEGRATIONS = [
  {
    name: "Razorpay",
    desc: "Payment gateway for fee collection",
    status: true,
    category: "Payments",
    logo: "₹",
  },
  {
    name: "WhatsApp Business API",
    desc: "Parent & student communications",
    status: true,
    category: "Communication",
    logo: "💬",
  },
  {
    name: "Zoom",
    desc: "Online classes and webinars",
    status: false,
    category: "Education",
    logo: "Z",
  },
  {
    name: "Google Workspace",
    desc: "Email and collaboration suite",
    status: true,
    category: "Productivity",
    logo: "G",
  },
  {
    name: "Tally ERP",
    desc: "Accounting and financial sync",
    status: false,
    category: "Finance",
    logo: "T",
  },
  {
    name: "CBSE UDISE+",
    desc: "Official school data portal sync",
    status: true,
    category: "Government",
    logo: "📋",
  },
];

function IntegrationsSection() {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.name, i.status])),
  );

  return (
    <SectionCard
      title="Connected Integrations"
      description="Manage third-party service connections"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {INTEGRATIONS.map((item, i) => (
          <div
            key={item.name}
            className={cn(
              "p-4 rounded-xl border transition-smooth",
              states[item.name]
                ? "border-accent/30 bg-accent/5"
                : "border-border/30 bg-muted/20",
            )}
            data-ocid={`settings.integrations.item.${i + 1}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                    states[item.name]
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.logo}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <Badge
                  className={cn(
                    "text-[10px] px-1.5",
                    states[item.name]
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                      : "bg-muted text-muted-foreground border-border/30",
                  )}
                >
                  {states[item.name] ? "Connected" : "Not Connected"}
                </Badge>
                <Switch
                  checked={states[item.name]}
                  onCheckedChange={(v) =>
                    setStates((prev) => ({ ...prev, [item.name]: v }))
                  }
                  data-ocid={`settings.integrations.toggle.${i + 1}`}
                />
              </div>
            </div>
            {!states[item.name] && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3 h-7 text-xs w-full"
                type="button"
                data-ocid={`settings.integrations.connect_button.${i + 1}`}
              >
                Connect {item.name}
              </Button>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// =====================
// SECTION: System
// =====================
function SystemSection() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="System Information"
        description="Platform version and environment details"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Platform Version", value: "v3.14.2" },
            { label: "Environment", value: "Production" },
            { label: "Database", value: "ICP Canister" },
            { label: "Last Deploy", value: "Apr 18, 2026" },
            { label: "Uptime", value: "99.97%" },
            { label: "Region", value: "India (ICP)" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-lg bg-muted/40 border border-border/30"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-sm font-mono font-medium text-foreground mt-0.5">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Data Management"
        description="Import, export and reset platform data"
      >
        <div className="space-y-3">
          {[
            {
              label: "Export All Data",
              desc: "Download full platform data as CSV/Excel",
              icon: Download,
              action: "Export",
              variant: "outline" as const,
            },
            {
              label: "Sync CBSE UDISE+ Data",
              desc: "Force sync school data from government portal",
              icon: RefreshCw,
              action: "Sync Now",
              variant: "outline" as const,
            },
            {
              label: "Clear Cache",
              desc: "Reset platform cache and computed reports",
              icon: RefreshCw,
              action: "Clear",
              variant: "outline" as const,
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/20"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant={item.variant}
                type="button"
                className="h-7 text-xs"
                data-ocid={`settings.system.action_button.${i + 1}`}
              >
                {item.action}
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>

      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20">
            <div>
              <p className="text-sm font-medium text-foreground">
                Reset All Settings
              </p>
              <p className="text-xs text-muted-foreground">
                Revert all configurations to factory defaults
              </p>
            </div>
            <Button
              size="sm"
              variant="destructive"
              type="button"
              className="h-7 text-xs"
              data-ocid="settings.system.reset_button"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// =====================
// MAIN: SettingsPage
// =====================
const SECTION_COMPONENTS: Record<SettingSection, React.ComponentType> = {
  profile: ProfileSection,
  security: SecuritySection,
  school: SchoolConfigSection,
  roles: RolesSection,
  notifications: NotificationsSection,
  appearance: AppearanceSection,
  billing: BillingSection,
  integrations: IntegrationsSection,
  system: SystemSection,
};

const SECTION_TITLES: Record<SettingSection, string> = {
  profile: "Profile Settings",
  security: "Account Security",
  school: "School Configuration",
  roles: "Roles & Permissions",
  notifications: "Notifications",
  appearance: "Appearance",
  billing: "Billing",
  integrations: "Integrations",
  system: "System",
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>("profile");
  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="space-y-6" data-ocid="settings.page">
      <PageHeader
        title="Settings"
        description="Manage your account, preferences, and platform configuration"
      />

      <div className="flex gap-6 items-start">
        {/* Left Sidebar Nav */}
        <aside className="w-56 shrink-0 sticky top-4">
          <nav
            className="glass rounded-xl p-2 space-y-0.5"
            data-ocid="settings.sidebar_nav"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                data-ocid={`settings.nav_${item.id}`}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-smooth text-left",
                  activeSection === item.id
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 min-w-0 truncate">{item.label}</span>
                {item.badge && (
                  <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/20 text-[9px] px-1.5 py-0 shrink-0">
                    {item.badge}
                  </Badge>
                )}
                {activeSection === item.id && (
                  <ChevronRight className="w-3 h-3 shrink-0" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content */}
        <main
          className="flex-1 min-w-0"
          data-ocid={`settings.content.${activeSection}`}
        >
          <div className="mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">
              {SECTION_TITLES[activeSection]}
            </h2>
          </div>
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
