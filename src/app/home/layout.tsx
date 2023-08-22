import { AuthProvider } from "@/hooks/login";

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <AuthProvider>
        <main >{children}</main>
      </AuthProvider>
    );
  }
  