"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import {
  Users,
  Landmark,
  Newspaper,
  TreePine,
  Wheat,
  Zap,
  Heart,
  Droplets,
  Globe,
  LayoutDashboard,
  InfoIcon
} from "lucide-react";

const categories = [
  { id: "all", label: "Dashboard", icon: LayoutDashboard },
  { id: "population", label: "Population", icon: Users },
  { id: "government-economics", label: "Government & Economics", icon: Landmark },
  { id: "society-media", label: "Society & Media", icon: Newspaper },
  { id: "environment", label: "Environment", icon: TreePine },
  { id: "food", label: "Food", icon: Wheat },
  { id: "energy", label: "Energy", icon: Zap },
  { id: "health", label: "Health", icon: Heart },
  { id: "water", label: "Water", icon: Droplets },
];

interface AppSidebarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function AppSidebar({ activeCategory, onCategoryChange }: AppSidebarProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const checkAuthentication = () => {
    setIsAuthenticated(true); 
  }
  if (!isAuthenticated) {
    checkAuthentication();
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Globe className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">World Monitor</span>
            <span className="text-[11px] text-muted-foreground">Real-time Statistics</span>
          </div>
        </div>
      </SidebarHeader>
      {
          isAuthenticated && 
          <Alert>
          <InfoIcon className="text-red-400"/>
          <AlertTitle>You are not authorized</AlertTitle>
          <AlertDescription>
            Your need to login to access the dashboard. Please contact your administrator for more information.
          </AlertDescription>
        </Alert>
        }
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((cat) => (
                <SidebarMenuItem key={cat.id}>
                  <SidebarMenuButton
                    isActive={activeCategory === cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className="cursor-pointer"
                  >
                    <cat.icon className="h-4 w-4" />
                    <span>{cat.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-[11px] text-muted-foreground text-center">
          Data updates in real-time
          <br />
          <span className="text-[10px] opacity-60">Sources: UN, WHO, IEA, FAO</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
