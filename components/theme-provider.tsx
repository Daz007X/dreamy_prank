"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // ✅ เพิ่ม class นี้ที่ html element เพื่อเปิด transition
    document.documentElement.classList.add("transition-theme");
  }, []);

  return (
    <NextThemesProvider {...props}>{mounted && children}</NextThemesProvider>
  );
}
