import { mockNotifications } from "@/data/mockData";
import type { Notification, UserRole } from "@/types";
import { create } from "zustand";

interface AppState {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: "super_admin",
  setCurrentRole: (role) => set({ currentRole: role }),
  isDarkMode: true,
  toggleDarkMode: () =>
    set((state) => {
      const next = !state.isDarkMode;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { isDarkMode: next };
    }),
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  notifications: mockNotifications,
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
