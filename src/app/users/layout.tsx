"use client";

import { Providers } from "@/common";
import { AuthProvider } from "@/hooks/login";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Providers>
        <main>{children}</main>
      </Providers>
    </AuthProvider>
  );
}
