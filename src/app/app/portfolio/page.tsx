"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/src/shared/components/StatCard";
import { Skeleton } from "@/src/shared/components/CardSkeleton";
import type { PortfolioData } from "@/src/shared/types/portfolio";

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mock/portfolio");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = (await res.json()) as PortfolioData;
        setData(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <p className="text-text-secondary">Tidak ada data portofolio.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Investasi" value={data.stats.total.toLocaleString("id-ID")} />
        <StatCard title="Total Return" value={data.stats.totalReturn.toLocaleString("id-ID")} />
        <StatCard title="Rata-Rata Return %" value={`${data.stats.avgReturnPct}%`} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-navy mb-2">Komposisi</h3>
        {data.composition.map((c) => (
          <div key={c.label} className="flex justify-between py-2 border-b border-border text-sm">
            <span className="text-navy font-medium">{c.label}</span>
            <span className="text-text-secondary">{c.pct}%</span>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-navy mb-2">Kinerja</h3>
        <p>{data.performance}</p>
      </div>
    </div>
  );
}
