import Layout from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnalyticsPage from "@/pages/AnalyticsPage";
import CrmPage from "@/pages/CrmPage";
import DashboardPage from "@/pages/DashboardPage";
import FinancePage from "@/pages/FinancePage";
import LoginPage from "@/pages/LoginPage";
import ParentPortalPage from "@/pages/ParentPortalPage";
import SchoolsPage from "@/pages/SchoolsPage";
import SettingsPage from "@/pages/SettingsPage";
import StudentPortalPage from "@/pages/StudentPortalPage";
import StudentsPage from "@/pages/StudentsPage";
import TeachersPage from "@/pages/TeachersPage";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

// Auth guard wrapper component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loginStatus } = useInternetIdentity();
  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Programmatic redirect via throwing for TanStack Router compatibility
    throw redirect({ to: "/login" });
  }

  return <>{children}</>;
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <TooltipProvider delayDuration={300}>
      <Outlet />
      <Toaster position="top-right" richColors />
    </TooltipProvider>
  ),
});

// Login route — no Layout wrapper
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AuthGuard>
      <Layout title="Dashboard">
        <DashboardPage />
      </Layout>
    </AuthGuard>
  ),
});

const crmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crm",
  component: () => (
    <AuthGuard>
      <Layout title="CRM & Sales">
        <CrmPage />
      </Layout>
    </AuthGuard>
  ),
});

const schoolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/schools",
  component: () => (
    <AuthGuard>
      <Layout title="Schools">
        <SchoolsPage />
      </Layout>
    </AuthGuard>
  ),
});

const studentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/students",
  component: () => (
    <AuthGuard>
      <Layout title="Students">
        <StudentsPage />
      </Layout>
    </AuthGuard>
  ),
});

const teachersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teachers",
  component: () => (
    <AuthGuard>
      <Layout title="Teachers & HR">
        <TeachersPage />
      </Layout>
    </AuthGuard>
  ),
});

const financeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/finance",
  component: () => (
    <AuthGuard>
      <Layout title="Finance & Billing">
        <FinancePage />
      </Layout>
    </AuthGuard>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => (
    <AuthGuard>
      <Layout title="Analytics Center">
        <AnalyticsPage />
      </Layout>
    </AuthGuard>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <AuthGuard>
      <Layout title="Settings">
        <SettingsPage />
      </Layout>
    </AuthGuard>
  ),
});

const parentPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/parent",
  component: () => (
    <AuthGuard>
      <Layout title="Parent Portal">
        <ParentPortalPage />
      </Layout>
    </AuthGuard>
  ),
});

const studentPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/student",
  component: () => (
    <AuthGuard>
      <Layout title="Student Portal">
        <StudentPortalPage />
      </Layout>
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  indexRoute,
  dashboardRoute,
  crmRoute,
  schoolsRoute,
  studentsRoute,
  teachersRoute,
  financeRoute,
  analyticsRoute,
  settingsRoute,
  parentPortalRoute,
  studentPortalRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
