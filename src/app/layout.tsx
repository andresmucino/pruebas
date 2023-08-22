"use client";

import "@elastic/eui/dist/eui_theme_light.css";

import { EuiProvider } from "@elastic/eui";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";
import { Providers } from "@/common";
import { AuthProvider } from "@/hooks/login";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <AuthProvider>
      <EuiProvider colorMode="light">
        <Providers>
          <html lang="en">
            <body>
                  <Navbar onClick={() => setNavIsOpen(!navIsOpen)} />
                  <Sidebar
                    navIsOpen={navIsOpen}
                    setNavIsOpen={() => setNavIsOpen(!navIsOpen)}
                  />
              {children}
            </body>
          </html>
        </Providers>
      </EuiProvider>
    </AuthProvider>
  );
}
