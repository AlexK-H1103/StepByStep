import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children, onOpenTagManager }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header
        className="fixed top-0 left-0 right-0 z-50 h-16"
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex pt-16">
        <Sidebar
          className="w-56 fixed top-16 h-[calc(100vh-4rem)] md:block "
          onOpenTagManager={onOpenTagManager}
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-6 ml-0 lg:ml-56 min-h-[calc(100vh-4rem)] bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
