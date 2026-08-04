'use client';

import { HrSidebar } from '@/components/layout/hr-sidebar';
import { Header } from '@/components/layout/header';
import { useState } from 'react';
import { SearchProvider } from '@/context/SearchContext';

export default function HrDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SearchProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground ">
        <HrSidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
          <Header setSidebarOpen={setSidebarOpen} isCollapsed={isCollapsed} />
          <main className="flex-1 p-4">
              {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
