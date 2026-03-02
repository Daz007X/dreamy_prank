"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { Globe, Clock } from "lucide-react";
import { worldCategories } from "@/lib/world-data";
import { StatCategoryCard } from "@/components/stat-category-card";
import { LiveClock } from "@/components/live-clock";
import { AvatarWithBadge } from "@/components/sample";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories =
    activeCategory === "all"
      ? worldCategories
      : worldCategories.filter((c) => c.id === activeCategory);

  return (
    <SidebarProvider>
      
      <AppSidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SidebarInset>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4">
          
          <div className="flex items-center gap-2">
            
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Globe className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-sm hidden sm:inline">
              
              World Monitor
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <LiveClock />
              <ModeToggle />
              <AvatarWithBadge />
            </div>
            
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {activeCategory === "all"
                ? "World Statistics"
                : filteredCategories[0]?.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time world statistics and counters — updated live every second
            </p>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
            {filteredCategories.map((category) => (
              <StatCategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground/60">
            Estimated values based on publicly available global data sources.
            <br />
            Numbers are approximations and updated in real time.
          </div>
        </main>
      </SidebarInset>
      
    </SidebarProvider>
  );
}