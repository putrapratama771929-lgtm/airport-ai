import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";

export const metadata = {
  title: "Dashboard Analitik - Admin Sam Ratulangi AI",
  description: "Statistik performa AI Concierge dan log pertanyaan penumpang Bandara Sam Ratulangi (MDC).",
};

export default function DashboardPage() {
  return <AdminDashboardView />;
}
