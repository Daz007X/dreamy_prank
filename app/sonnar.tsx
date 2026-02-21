"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.info("This is for your information, please note.", {
          style: {
            "--normal-bg":
              "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))",
            "--normal-text":
              "light-dark(var(--color-sky-600), var(--color-sky-400))",
            "--normal-border":
              "light-dark(var(--color-sky-600), var(--color-sky-400))",
          } as React.CSSProperties,
        })
      }
    >
      Soft Info Toast
    </Button>
  );
}
