import { mockTeachers } from "@/data/mockData";
import type { Teacher, TeacherStatus } from "@/types";
import { create } from "zustand";

interface TeacherFilters {
  subject: string;
  status: TeacherStatus | "All";
  school: string;
  search: string;
}

interface TeacherState {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  filters: TeacherFilters;
  setFilters: (filters: Partial<TeacherFilters>) => void;
  filteredTeachers: () => Teacher[];
}

export const useTeacherStore = create<TeacherState>((set, get) => ({
  teachers: mockTeachers,
  selectedTeacher: null,
  setSelectedTeacher: (teacher) => set({ selectedTeacher: teacher }),
  filters: {
    subject: "All",
    status: "All",
    school: "All",
    search: "",
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  filteredTeachers: () => {
    const { teachers, filters } = get();
    return teachers.filter((teacher) => {
      const matchSubject =
        filters.subject === "All" || teacher.subject === filters.subject;
      const matchStatus =
        filters.status === "All" || teacher.status === filters.status;
      const matchSchool =
        filters.school === "All" || teacher.school === filters.school;
      const matchSearch =
        !filters.search ||
        teacher.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(filters.search.toLowerCase());
      return matchSubject && matchStatus && matchSchool && matchSearch;
    });
  },
}));
