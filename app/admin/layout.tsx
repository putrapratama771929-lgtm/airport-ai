import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin Portal - Sam Ratulangi AI",
  description: "Panel administrasi & analitik AI Concierge Bandara Internasional Sam Ratulangi (MDC)",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
