"use client";

import { Providers } from "@/common";
import { ToastsProvider } from "@/hooks";
import { AuthProvider } from "@/hooks/login";

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Providers>
        <ToastsProvider>
          <main>{children}</main>
        </ToastsProvider>
      </Providers>
    </AuthProvider>
  );
}
