import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import type { ReactNode } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { isDarkMode, sidebarCollapsed } = useAppStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden bg-background text-foreground",
      )}
    >
      <Sidebar />
      <div
        className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300",
          sidebarCollapsed ? "ml-0" : "ml-0",
        )}
      >
        <Navbar title={title} />
        <main
          className="flex-1 overflow-y-auto bg-background p-6"
          data-ocid="main.content"
        >
          <div className="max-w-[1600px] mx-auto animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
