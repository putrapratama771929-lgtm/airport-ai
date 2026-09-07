"use client";

import { useEffect } from "react";
import { AdminErrorState } from "@/components/admin/admin-error-state";

export default function AdminGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin portal error:", error);
  }, [error]);

  return (
    <div className="py-12">
      <AdminErrorState
        title="Terjadi Kesalahan pada Portal Admin"
        description={error.message || "Sistem mengalami kendala saat memproses permintaan data admin bandara."}
        errorCode={error.digest || "ERR_ADMIN_RUNTIME"}
        onRetry={() => reset()}
      />
    </div>
  );
}
