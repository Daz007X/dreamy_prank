"use client";

import { type WorldStat } from "@/lib/world-data";
import { LiveCounter } from "@/components/live-counter";

interface StatRowProps {
  stat: WorldStat;
}

export function StatRow({ stat }: StatRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-4 hover:bg-muted/50 transition-colors group">
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {stat.label}
      </span>
      <LiveCounter
        baseValue={stat.baseValue}
        ratePerSecond={stat.ratePerSecond}
        unit={stat.unit}
        className={`font-mono text-sm font-semibold tabular-nums ${stat.color}`}
      />
    </div>
  );
}
