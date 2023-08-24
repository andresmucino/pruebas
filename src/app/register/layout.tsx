"use client";

import { ToastsProvider } from "@/hooks";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastsProvider>
      <main>{children}</main>
    </ToastsProvider>
  );
}
