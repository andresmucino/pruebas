"use client";

import { Providers } from "@/common";
import { ToastsProvider } from "@/hooks";
import { AuthProvider } from "@/hooks/login";

export default function CreateShipmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ToastsProvider>
        <Providers>
          <main>{children}</main>
        </Providers>
      </ToastsProvider>
    </AuthProvider>
  );
}
