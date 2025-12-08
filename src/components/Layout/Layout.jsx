import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children, onOpenTagManager }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      data-theme="myviolet"
      className="min-h-screen bg-gray-900 text-gray-100"
    >
      {/* Header：固定 */}
      <Header
        className="fixed top-0 left-0 right-0 z-50 h-16"
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* 全体コンテナ */}
      <div className="flex pt-16">
        {/* Sidebar（fixed） */}
        <Sidebar
          className="w-56 fixed top-16 h-[calc(100vh-4rem)] md:block "
          onOpenTagManager={onOpenTagManager}
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Main */}
        <main className="flex-1 p-6 ml-0 md:ml-56 min-h-[calc(100vh-4rem)] bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
