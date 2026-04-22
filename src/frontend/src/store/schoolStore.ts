import { mockSchools } from "@/data/mockData";
import type { School, SchoolStatus, SubscriptionPlan } from "@/types";
import { create } from "zustand";

interface SchoolFilters {
  state: string;
  plan: SubscriptionPlan | "All";
  status: SchoolStatus | "All";
  search: string;
}

interface SchoolState {
  schools: School[];
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
  filters: SchoolFilters;
  setFilters: (filters: Partial<SchoolFilters>) => void;
  filteredSchools: () => School[];
}

export const useSchoolStore = create<SchoolState>((set, get) => ({
  schools: mockSchools,
  selectedSchool: null,
  setSelectedSchool: (school) => set({ selectedSchool: school }),
  filters: {
    state: "All",
    plan: "All",
    status: "All",
    search: "",
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  filteredSchools: () => {
    const { schools, filters } = get();
    return schools.filter((school) => {
      const matchState =
        filters.state === "All" || school.state === filters.state;
      const matchPlan =
        filters.plan === "All" || school.subscriptionPlan === filters.plan;
      const matchStatus =
        filters.status === "All" || school.status === filters.status;
      const matchSearch =
        !filters.search ||
        school.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        school.district.toLowerCase().includes(filters.search.toLowerCase());
      return matchState && matchPlan && matchStatus && matchSearch;
    });
  },
}));
