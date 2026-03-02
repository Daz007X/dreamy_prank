"use client";

import { type StatCategory } from "@/lib/world-data";
import { StatRow } from "@/components/stat-row";
import { Card } from "@/components/ui/card";
import {
  Users,
  Landmark,
  Newspaper,
  TreePine,
  Wheat,
  Zap,
  Heart,
  Droplets,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Landmark,
  Newspaper,
  TreePine,
  Wheat,
  Zap,
  Heart,
  Droplets,
};

interface StatCategoryCardProps {
  category: StatCategory;
}

export function StatCategoryCard({ category }: StatCategoryCardProps) {
  const Icon = iconMap[category.icon] || Users;

  return (
    <Card className={`overflow-hidden border p-0 ${category.bgColor}`}>
      {/* Category Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/50">
        <Icon className={`h-4.5 w-4.5 ${category.color}`} />
        <h3 className={`text-sm font-semibold ${category.color}`}>
          {category.title}
        </h3>
      </div>

      {/* Stat Rows */}
      <div className="divide-y divide-border/30">
        {category.stats.map((stat) => (
          <StatRow key={stat.id} stat={stat} />
        ))}
      </div>
    </Card>
  );
}
