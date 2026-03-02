"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface LiveCounterProps {
  baseValue: number;
  ratePerSecond: number;
  unit?: string;
  className?: string;
}

export function LiveCounter({
  baseValue,
  ratePerSecond,
  unit = "",
  className,
}: LiveCounterProps) {
  const [value, setValue] = useState(baseValue);
  const startTimeRef = useRef(Date.now());
  const frameRef = useRef<number | null>(null);

  // Calculate "today" offset: seconds since midnight UTC
  const getSecondsSinceMidnight = () => {
    const now = new Date();
    return (
      now.getUTCHours() * 3600 +
      now.getUTCMinutes() * 60 +
      now.getUTCSeconds() +
      now.getUTCMilliseconds() / 1000
    );
  };

  useEffect(() => {
    const initialOffset =
      baseValue === 0 ? getSecondsSinceMidnight() * ratePerSecond : 0;
    setValue(baseValue + initialOffset);
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const newValue = baseValue + initialOffset + elapsed * ratePerSecond;
      setValue(newValue);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [baseValue, ratePerSecond]);

  const formatNumber = (num: number): string => {
    const rounded = Math.floor(num);
    return rounded.toLocaleString("en-US");
  };

  return (
    <span className={className}>
      {unit && <span className="mr-0.5">{unit}</span>}
      {formatNumber(value)}
    </span>
  );
}
