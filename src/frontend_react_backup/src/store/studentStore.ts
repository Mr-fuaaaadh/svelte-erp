import { mockStudents } from "@/data/mockData";
import type { FeeStatus, Student } from "@/types";
import { create } from "zustand";

interface StudentFilters {
  class: string;
  section: string;
  feeStatus: FeeStatus | "All";
  search: string;
}

interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  filters: StudentFilters;
  setFilters: (filters: Partial<StudentFilters>) => void;
  filteredStudents: () => Student[];
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: mockStudents,
  selectedStudent: null,
  setSelectedStudent: (student) => set({ selectedStudent: student }),
  filters: {
    class: "All",
    section: "All",
    feeStatus: "All",
    search: "",
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  filteredStudents: () => {
    const { students, filters } = get();
    return students.filter((student) => {
      const matchClass =
        filters.class === "All" || student.class === filters.class;
      const matchSection =
        filters.section === "All" || student.section === filters.section;
      const matchFee =
        filters.feeStatus === "All" || student.feeStatus === filters.feeStatus;
      const matchSearch =
        !filters.search ||
        student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(filters.search.toLowerCase());
      return matchClass && matchSection && matchFee && matchSearch;
    });
  },
}));
