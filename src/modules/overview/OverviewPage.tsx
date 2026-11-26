"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Layers,
  Tag,
  ArrowLeftRight,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { StatCard } from "@/src/shared/components/StatCard";
import { PerformanceChart } from "@/src/shared/components/PerformanceChart";
import { Skeleton } from "@/src/shared/components/CardSkeleton";
import { authService } from "@/src/shared/services/authService";
import { overviewService, type OverviewData } from "@/src/shared/services/overviewService";

type PeriodFilter = "6m" | "3m" | "1y";

function formatCurrencyIDR(amount: number): string {
  return (
    "Rp" +
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(amount)
  );
}

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<PeriodFilter>("6m");
  const [userName, setUserName] = useState("Wiji");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await overviewService.getOverview();
      setData(res);
    } catch {
      setError("Gagal memuat ringkasan portofolio. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    overviewService
      .getOverview()
      .then((res) => {
        if (!active) return;
        const user = authService.getCurrentUser();
        if (user?.nickname) {
          setUserName(user.nickname);
        }
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Gagal memuat ringkasan portofolio. Silakan coba kembali.");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Period-adjusted chart slices
  const chartData = React.useMemo(() => {
    if (!data) return { months: [], value: [] };
    if (period === "3m") {
      return {
        months: data.performance.months.slice(-3),
        value: data.performance.value.slice(-3),
      };
    }
    return {
      months: data.performance.months,
      value: data.performance.value,
    };
  }, [data, period]);

  return (
    <div className="space-y-6">
      {/* Header Greeting (MO05 + WF05) */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Overview
        </h1>
        <p className="text-base font-semibold text-navy mt-1">
          Selamat datang kembali, <span className="text-gold-dark">{userName}!</span>
        </p>
        <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
          Kelola investasi, pantau performa, dan temukan peluang take-over posisi terbaik di EXIT.
        </p>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6" aria-label="Memuat data Overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-exit-white border border-border space-y-3"
              >
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-44" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-exit-white border border-border space-y-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="lg:col-span-7 p-6 rounded-2xl bg-exit-white border border-border space-y-4">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-6 rounded-2xl bg-danger/10 border border-danger/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-navy">Terjadi Kendala</p>
              <p className="text-xs text-text-secondary mt-0.5">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-navy text-exit-white text-xs font-semibold hover:bg-navy/90 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      {/* Empty State (if new user with 0 positions) */}
      {!loading && !error && data && data.stats.activePositions === 0 && (
        <div className="p-10 rounded-2xl bg-exit-white border border-border text-center space-y-4">
          <p className="text-sm font-semibold text-navy">
            Belum ada posisi aktif. Mulai dari Marketplace.
          </p>
          <Link
            href="/app/marketplace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-gold hover:bg-gold-dark text-navy text-sm font-semibold transition-colors"
          >
            <span>Ke Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Default Populated State */}
      {!loading && !error && data && data.stats.activePositions > 0 && (
        <>
          {/* 3 Stat Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              title="Nilai Portofolio"
              value={formatCurrencyIDR(data.stats.portfolioValue)}
              subtitle="Total nilai investasi aktif"
              variant="navy"
              icon={<Wallet className="w-4 h-4" />}
            />
            <StatCard
              title="Total Imbal Hasil"
              value={formatCurrencyIDR(data.stats.totalReturn)}
              subtitle={`+${data.performance.growthPct.toString().replace(".", ",")}% p.a.`}
              subtitleTone="success"
              icon={<TrendingUp className="w-4 h-4" />}
            />
            <StatCard
              title="Posisi Aktif"
              value={`${data.stats.activePositions} Posisi`}
              subtitle="P2P Lending & SCF"
              icon={<Layers className="w-4 h-4" />}
            />
          </section>

          {/* Activity Summary + Performance Chart */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Ringkasan Aktivitas */}
            <div className="lg:col-span-5 bg-exit-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-navy mb-1">
                  Ringkasan Aktivitas
                </h2>
                <p className="text-xs text-text-secondary mb-4">
                  Pantau penawaran, permintaan take-over, dan negosiasi Anda.
                </p>

                <div className="divide-y divide-border">
                  <Link
                    href="/app/offers"
                    className="flex items-center justify-between py-3.5 hover:bg-ivory/60 -mx-2 px-2 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-gold/15 text-gold-dark flex items-center justify-center">
                        <Tag className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          Penawaran Baru
                        </p>
                        <p className="text-[11px] text-text-secondary">
                          Posisi baru yang siap ditinjau
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-navy">
                        {data.activity.newOffers}
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-navy" />
                    </div>
                  </Link>

                  <Link
                    href="/app/requests"
                    className="flex items-center justify-between py-3.5 hover:bg-ivory/60 -mx-2 px-2 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
                        <ArrowLeftRight className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          Permintaan Take-over
                        </p>
                        <p className="text-[11px] text-text-secondary">
                          Menunggu persetujuan &amp; verifikasi
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-navy">
                        {data.activity.takeoverRequests}
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-navy" />
                    </div>
                  </Link>

                  <Link
                    href="/app/negotiations"
                    className="flex items-center justify-between py-3.5 hover:bg-ivory/60 -mx-2 px-2 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-warning/15 text-warning flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          Negosiasi Aktif
                        </p>
                        <p className="text-[11px] text-text-secondary">
                          Tinjau penyesuaian ketentuan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-navy">
                        {data.activity.activeNegotiations}
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-navy" />
                    </div>
                  </Link>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-border">
                <Link
                  href="/app/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-gold-dark transition-colors"
                >
                  <span>Lihat Ringkasan Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Performa Portofolio */}
            <div className="lg:col-span-7 bg-exit-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-navy">
                    Performa Portofolio
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Perkembangan nilai portofolio (Januari – Juni)
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-bold">
                    +{data.performance.growthPct.toString().replace(".", ",")}%
                  </span>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
                    aria-label="Pilih periode performa portofolio"
                    className="h-9 px-3 rounded-[10px] bg-surface-soft border border-border text-xs font-semibold text-navy outline-none focus:border-gold"
                  >
                    <option value="6m">6 Bulan</option>
                    <option value="3m">3 Bulan</option>
                    <option value="1y">1 Tahun</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <PerformanceChart
                  months={chartData.months}
                  values={chartData.value}
                  unit={data.performance.unit}
                />
              </div>
            </div>
          </section>

          {/* Bottom Navy CTA Banner linking to Marketplace */}
          <section className="rounded-2xl bg-navy text-exit-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm relative overflow-hidden">
            <div
              className="absolute right-0 top-0 w-56 h-56 rounded-full bg-gold/10 -translate-y-1/2 translate-x-1/4 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <h2 className="text-lg sm:text-xl font-bold text-exit-white">
                Temukan Peluang Take-over
              </h2>
              <p className="text-xs sm:text-sm text-exit-white/75 mt-1">
                Jelajahi posisi investasi dari berbagai mitra terpercaya.
              </p>
            </div>
            <Link
              href="/app/marketplace"
              className="relative z-10 inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[10px] bg-gold hover:bg-gold-dark text-navy font-semibold text-sm transition-colors shrink-0 shadow-sm"
            >
              <span>Ke Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </>
      )}
    </div>
  );
}
