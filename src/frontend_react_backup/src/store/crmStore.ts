import { mockLeads } from "@/data/mockData";
import type { Lead, LeadStage } from "@/types";
import { create } from "zustand";

interface LeadFilters {
  stage: LeadStage | "All";
  state: string;
  assignedTo: string;
  search: string;
}

interface CrmState {
  leads: Lead[];
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  filters: LeadFilters;
  setFilters: (filters: Partial<LeadFilters>) => void;
  filteredLeads: () => Lead[];
  pipelineStats: () => Record<LeadStage, number>;
}

export const useCrmStore = create<CrmState>((set, get) => ({
  leads: mockLeads,
  selectedLead: null,
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  filters: {
    stage: "All",
    state: "All",
    assignedTo: "All",
    search: "",
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  filteredLeads: () => {
    const { leads, filters } = get();
    return leads.filter((lead) => {
      const matchStage =
        filters.stage === "All" || lead.stage === filters.stage;
      const matchState =
        filters.state === "All" || lead.state === filters.state;
      const matchAssigned =
        filters.assignedTo === "All" || lead.assignedTo === filters.assignedTo;
      const matchSearch =
        !filters.search ||
        lead.schoolName.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(filters.search.toLowerCase());
      return matchStage && matchState && matchAssigned && matchSearch;
    });
  },
  pipelineStats: () => {
    const { leads } = get();
    const stats: Record<LeadStage, number> = {
      New: 0,
      Contacted: 0,
      "Demo Scheduled": 0,
      "Proposal Sent": 0,
      Negotiation: 0,
      Won: 0,
      Lost: 0,
    };
    for (const lead of leads) {
      stats[lead.stage]++;
    }
    return stats;
  },
}));
