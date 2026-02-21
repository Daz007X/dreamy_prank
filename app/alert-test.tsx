"use client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, XIcon } from "lucide-react";

export function AlertDemo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-md">
      <Alert
        onAnimationEnd={() => {
          if (isClosing) {
            setIsVisible(false);
            setIsClosing(false);
          }
        }}
        className={`
          relative
          bg-white dark:bg-slate-950
          border-green-500
          text-green-900 dark:text-green-50
          duration-500
          ${
            isClosing
              ? "animate-out fade-out slide-out-to-top-4 fill-mode-forwards"
              : "animate-in fade-in slide-in-from-top-4"
          }
        `}
      >
        {/* ปุ่มปิด */}
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <CheckCircle2Icon className="h-4 w-4 text-green-600" />
        <AlertTitle>Account updated successfully</AlertTitle>
        <AlertDescription>
          Your profile information has been saved. Changes will be reflected
          immediately.
        </AlertDescription>
      </Alert>
    </div>
  );
}
