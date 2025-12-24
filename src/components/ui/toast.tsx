import type React from "react";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      duration={3000}
      position="bottom-right"
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--primary)",
        } as React.CSSProperties
      }
    />
  );
}
