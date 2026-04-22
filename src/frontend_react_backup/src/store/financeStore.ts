import {
  mockInvoices,
  mockMonthlyRevenue,
  mockSubscriptions,
} from "@/data/mockData";
import type { Invoice, MonthlyRevenue, Subscription } from "@/types";
import { create } from "zustand";

interface FinanceState {
  invoices: Invoice[];
  subscriptions: Subscription[];
  revenueData: MonthlyRevenue[];
  totalRevenue: () => number;
  pendingRevenue: () => number;
  overdueRevenue: () => number;
}

export const useFinanceStore = create<FinanceState>((_set, get) => ({
  invoices: mockInvoices,
  subscriptions: mockSubscriptions,
  revenueData: mockMonthlyRevenue,
  totalRevenue: () =>
    get()
      .invoices.filter((i) => i.status === "Paid")
      .reduce((sum, i) => sum + i.totalAmount, 0),
  pendingRevenue: () =>
    get()
      .invoices.filter((i) => i.status === "Pending")
      .reduce((sum, i) => sum + i.totalAmount, 0),
  overdueRevenue: () =>
    get()
      .invoices.filter((i) => i.status === "Overdue")
      .reduce((sum, i) => sum + i.totalAmount, 0),
}));
