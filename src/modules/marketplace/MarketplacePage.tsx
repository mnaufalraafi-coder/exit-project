"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  TrendingUp,
  Clock,
  Building2,
  ShieldAlert,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Button from "@/src/shared/components/Button";
import { Badge } from "@/src/shared/components/Badge";
import { CardSkeleton } from "@/src/shared/components/CardSkeleton";
import {
  marketplaceService,
  type MarketplaceData,
  type MarketplaceItem,
} from "@/src/shared/services/marketplaceService";

type TabInstrument = "ALL" | "P2P Lending" | "SCF";
type TenorFilter = "ALL" | "SHORT" | "LONG";
type ReturnDropdownFilter = "ALL" | "11" | "12";
type SortOption = "returnDesc" | "tenorAsc" | "amountDesc";

const PARTNERS = ["Mitra A", "Mitra B", "Mitra C"];

function formatCurrencyIDR(amount: number): string {
  return (
    "Rp" +
    new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(amount)
  );
}

export default function MarketplacePage() {
  const [data, setData] = useState<MarketplaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search, Dropdowns & Tabs
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabInstrument>("ALL");
  const [tenorFilter, setTenorFilter] = useState<TenorFilter>("ALL");
  const [returnDropdown, setReturnDropdown] = useState<ReturnDropdownFilter>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("returnDesc");

  // Left Filter Panel
  const [prioritizeProfile, setPrioritizeProfile] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [minReturnRange, setMinReturnRange] = useState<number>(10);

  // Detail Modal & Simulation
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [offerSubmittedId, setOfferSubmittedId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await marketplaceService.getMarketplace();
      setData(res);
    } catch {
      setError("Gagal memuat daftar penawaran Marketplace. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    marketplaceService
      .getMarketplace()
      .then((res) => {
        if (!active) return;
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Gagal memuat daftar penawaran Marketplace. Silakan coba kembali.");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const togglePartner = (partner: string) => {
    setSelectedPartners((prev) =>
      prev.includes(partner)
        ? prev.filter((p) => p !== partner)
        : [...prev, partner]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setActiveTab("ALL");
    setTenorFilter("ALL");
    setReturnDropdown("ALL");
    setPrioritizeProfile(false);
    setSelectedPartners([]);
    setMinReturnRange(10);
    setSortBy("returnDesc");
  };

  const isAnyFilterActive =
    searchQuery.trim() !== "" ||
    activeTab !== "ALL" ||
    tenorFilter !== "ALL" ||
    returnDropdown !== "ALL" ||
    prioritizeProfile ||
    selectedPartners.length > 0 ||
    minReturnRange > 10;

  const filteredItems = useMemo(() => {
    if (!data) return [];

    const q = searchQuery.trim().toLowerCase();
    const minReturnEffective = Math.max(
      minReturnRange,
      returnDropdown === "12" ? 12 : returnDropdown === "11" ? 11 : 0
    );

    const result = data.items.filter((item) => {
      if (q && !item.title.toLowerCase().includes(q) && !item.partner.toLowerCase().includes(q)) {
        return false;
      }
      if (activeTab !== "ALL" && item.type !== activeTab) {
        return false;
      }
      if (tenorFilter === "SHORT" && item.tenorMonths > 12) {
        return false;
      }
      if (tenorFilter === "LONG" && item.tenorMonths <= 12) {
        return false;
      }
      if (item.returnPct < minReturnEffective) {
        return false;
      }
      if (selectedPartners.length > 0 && !selectedPartners.includes(item.partner)) {
        return false;
      }
      if (prioritizeProfile && item.tenorMonths > 18) {
        return false;
      }
      return true;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "tenorAsc") return a.tenorMonths - b.tenorMonths;
      if (sortBy === "amountDesc") return b.amount - a.amount;
      return b.returnPct - a.returnPct;
    });
  }, [
    data,
    searchQuery,
    activeTab,
    tenorFilter,
    returnDropdown,
    minReturnRange,
    selectedPartners,
    prioritizeProfile,
    sortBy,
  ]);

  const handleSimulateOffer = async () => {
    if (!selectedItem) return;
    setSubmittingOffer(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setSubmittingOffer(false);
    setOfferSubmittedId(selectedItem.id);
  };

  return (
    <div className="space-y-6">
      {/* Header + Breadcrumb link back to Overview */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Link
            href="/app/overview"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-navy mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Overview</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
            Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Temukan posisi investasi yang sesuai dengan preferensi Anda.
          </p>
        </div>
      </section>

      {/* Search & Dropdown Filter Bar */}
      <section className="bg-exit-white border border-border rounded-2xl p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative flex items-center">
            <Search className="w-4 h-4 text-text-secondary absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari posisi investasi..."
              aria-label="Cari posisi investasi"
              className="w-full h-10 pl-10 pr-4 rounded-[10px] bg-surface-soft border border-border text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>

          {/* Dropdown: Semua Instrumen */}
          <div className="md:col-span-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabInstrument)}
              aria-label="Filter instrumen"
              className="w-full h-10 px-3 rounded-[10px] bg-surface-soft border border-border text-xs font-semibold text-navy outline-none focus:border-gold"
            >
              <option value="ALL">Semua Instrumen</option>
              <option value="P2P Lending">P2P Lending</option>
              <option value="SCF">SCF</option>
            </select>
          </div>

          {/* Dropdown: Tenor */}
          <div className="md:col-span-2">
            <select
              value={tenorFilter}
              onChange={(e) => setTenorFilter(e.target.value as TenorFilter)}
              aria-label="Filter tenor"
              className="w-full h-10 px-3 rounded-[10px] bg-surface-soft border border-border text-xs font-semibold text-navy outline-none focus:border-gold"
            >
              <option value="ALL">Semua Tenor</option>
              <option value="SHORT">&le; 12 Bulan</option>
              <option value="LONG">&gt; 12 Bulan</option>
            </select>
          </div>

          {/* Dropdown: Return */}
          <div className="md:col-span-2">
            <select
              value={returnDropdown}
              onChange={(e) =>
                setReturnDropdown(e.target.value as ReturnDropdownFilter)
              }
              aria-label="Filter tingkat return"
              className="w-full h-10 px-3 rounded-[10px] bg-surface-soft border border-border text-xs font-semibold text-navy outline-none focus:border-gold"
            >
              <option value="ALL">Semua Return</option>
              <option value="11">&ge; 11% p.a.</option>
              <option value="12">&ge; 12% p.a.</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border">
          {(
            [
              { id: "ALL", label: "Semua Penawaran" },
              { id: "P2P Lending", label: "P2P Lending" },
              { id: "SCF", label: "SCF (Securities Crowdfunding)" },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  active
                    ? "bg-navy text-exit-white"
                    : "bg-ivory text-text-secondary hover:text-navy border border-border"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main 2-Column Area: Left Filter Panel + Right Offerings Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Panel */}
        <aside className="lg:col-span-3 bg-exit-white border border-border rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gold-dark" />
              <h2 className="text-sm font-bold text-navy">Filter Penawaran</h2>
            </div>
            {isAnyFilterActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-semibold text-gold-dark hover:text-navy"
              >
                Reset
              </button>
            )}
          </div>

          {/* Toggle: Prioritize Profile */}
          <div className="p-3.5 rounded-xl bg-ivory border border-border space-y-2">
            <label className="flex items-start justify-between gap-3 cursor-pointer">
              <span className="text-xs font-semibold text-navy leading-snug">
                Prioritaskan yang sesuai dengan Profil Saya
              </span>
              <input
                type="checkbox"
                checked={prioritizeProfile}
                onChange={(e) => setPrioritizeProfile(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-border accent-gold shrink-0"
              />
            </label>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Menampilkan penawaran tenor moderat (&le; 18 bulan) sesuai profil risiko Menengah.
            </p>
          </div>

          {/* Partner Checkboxes */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-navy">Mitra Investasi</p>
            <label className="flex items-center gap-2.5 text-xs text-text-primary cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPartners.length === 0}
                onChange={() => setSelectedPartners([])}
                className="w-4 h-4 rounded border-border accent-gold"
              />
              <span className="font-medium">Semua Mitra</span>
            </label>
            {PARTNERS.map((partner) => (
              <label
                key={partner}
                className="flex items-center gap-2.5 text-xs text-text-primary cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPartners.includes(partner)}
                  onChange={() => togglePartner(partner)}
                  className="w-4 h-4 rounded border-border accent-gold"
                />
                <span>{partner}</span>
              </label>
            ))}
          </div>

          {/* Return Range Slider */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-navy">Tingkat Return</span>
              <span className="font-semibold text-gold-dark">
                Min. {minReturnRange}% p.a.
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={13.5}
              step={0.5}
              value={minReturnRange}
              onChange={(e) => setMinReturnRange(Number(e.target.value))}
              aria-label="Filter minimum tingkat return"
              className="w-full accent-gold cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-text-secondary">
              <span>10%</span>
              <span>13,5%</span>
            </div>
          </div>
        </aside>

        {/* Right Listings Area */}
        <div className="lg:col-span-9 space-y-4">
          {/* Meta Header: Count + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-navy">
              {loading
                ? "Memuat penawaran..."
                : isAnyFilterActive
                ? `${filteredItems.length} Penawaran Tersedia`
                : "32 Penawaran Tersedia"}
              {!loading && !isAnyFilterActive && data && (
                <span className="ml-2 text-xs font-normal text-text-secondary">
                  (menampilkan {filteredItems.length} data simulasi)
                </span>
              )}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Urutkan penawaran"
                className="h-9 px-3 rounded-[10px] bg-exit-white border border-border text-xs font-semibold text-navy outline-none focus:border-gold"
              >
                <option value="returnDesc">Return Tertinggi</option>
                <option value="tenorAsc">Tenor Terpendek</option>
                <option value="amountDesc">Nominal Terbesar</option>
              </select>
            </div>
          </div>

          {/* Loading State: 6 Skeleton Cards */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-6 rounded-2xl bg-danger/10 border border-danger/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy">
                    Gagal Memuat Marketplace
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">{error}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={loadData}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-navy text-exit-white text-xs font-semibold hover:bg-navy/90"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Lagi</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredItems.length === 0 && (
            <div className="p-10 rounded-2xl bg-exit-white border border-border text-center space-y-4">
              <p className="text-sm font-semibold text-navy">
                Belum ada penawaran yang cocok. Ubah filter Anda.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset Semua Filter
              </Button>
            </div>
          )}

          {/* Default Populated Grid (3 Columns Desktop) */}
          {!loading && !error && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl bg-exit-white border border-border p-4 shadow-xs hover:border-gold/60 transition-colors flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    {/* Placeholder Visual Cover */}
                    <div className="relative h-28 rounded-xl bg-navy overflow-hidden p-3.5 flex flex-col justify-between">
                      <div
                        className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gold/20 pointer-events-none"
                        aria-hidden="true"
                      />
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <Badge variant="gold">{item.type}</Badge>
                        <span className="text-[11px] font-medium text-exit-white/80">
                          {item.partner}
                        </span>
                      </div>
                      <div className="relative z-10 flex items-center gap-1.5 text-exit-white/90 text-xs font-medium">
                        <Building2 className="w-3.5 h-3.5 text-gold" />
                        <span>Posisi Take-Over Terverifikasi</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-navy leading-snug min-h-[40px]">
                      {item.title}
                    </h3>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-surface-soft border border-border/60">
                      <div>
                        <p className="text-[11px] text-text-secondary">Nominal</p>
                        <p className="text-xs font-bold text-navy mt-0.5">
                          {formatCurrencyIDR(item.amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-text-secondary">
                          Return p.a.
                        </p>
                        <p className="text-xs font-bold text-success mt-0.5">
                          {item.returnPct.toString().replace(".", ",")}% p.a.
                        </p>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5 text-[11px] text-text-secondary pt-1 border-t border-border/60">
                        <Clock className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Tenor tersisa: {item.tenorMonths} bulan</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-text-secondary font-medium">
                          Progres Pendanaan
                        </span>
                        <span className="font-bold text-navy">
                          {item.fundedPct}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-ivory overflow-hidden border border-border/50">
                        <div
                          className="h-full rounded-full bg-gold transition-all"
                          style={{ width: `${item.fundedPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gold Action Button */}
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedItem(item);
                      setOfferSubmittedId(null);
                    }}
                  >
                    Lihat Detail
                  </Button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal / Panel */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="marketplace-detail-title"
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-exit-white border border-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-navy text-exit-white p-5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{selectedItem.type}</Badge>
                  <span className="text-xs text-exit-white/75">
                    {selectedItem.partner}
                  </span>
                </div>
                <h2
                  id="marketplace-detail-title"
                  className="text-lg font-bold leading-snug"
                >
                  {selectedItem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg text-exit-white/70 hover:text-exit-white hover:bg-exit-white/10"
                aria-label="Tutup detail penawaran"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-ivory border border-border">
                  <p className="text-[11px] text-text-secondary">
                    Nominal Pembiayaan
                  </p>
                  <p className="text-sm font-extrabold text-navy mt-0.5">
                    {formatCurrencyIDR(selectedItem.amount)}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-ivory border border-border">
                  <p className="text-[11px] text-text-secondary">
                    Estimasi Return
                  </p>
                  <p className="text-sm font-extrabold text-success mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>
                      {selectedItem.returnPct.toString().replace(".", ",")}% p.a.
                    </span>
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-ivory border border-border">
                  <p className="text-[11px] text-text-secondary">Tenor</p>
                  <p className="text-sm font-bold text-navy mt-0.5">
                    {selectedItem.tenorMonths} Bulan
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-ivory border border-border">
                  <p className="text-[11px] text-text-secondary">
                    Progres Pendanaan
                  </p>
                  <p className="text-sm font-bold text-navy mt-0.5">
                    {selectedItem.fundedPct}% Terdanai
                  </p>
                </div>
              </div>

              {/* Risk & Cost Info (Transparent, non-promissory per Brand Guideline) */}
              <div className="p-4 rounded-xl bg-surface-soft border border-border space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-navy">Informasi Risiko</p>
                    <p className="text-text-secondary mt-0.5 leading-relaxed">
                      Setiap posisi investasi memiliki risiko kredit dan likuiditas. Kinerja historis tidak menjamin imbal hasil di masa mendatang.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border/70">
                  <p className="font-bold text-navy">Informasi Biaya (Simulasi)</p>
                  <p className="text-text-secondary mt-0.5 leading-relaxed">
                    Biaya layanan pengalihan posisi sebesar 0,5% dari nilai transaksi yang disepakati.
                  </p>
                </div>
              </div>

              {/* Mandatory Microcopy */}
              <p className="text-xs font-medium text-navy bg-gold/15 border border-gold/30 rounded-xl px-3.5 py-2.5">
                Periksa kembali informasi posisi sebelum mengajukan penawaran.
              </p>

              {/* Simulation Confirmation */}
              {offerSubmittedId === selectedItem.id ? (
                <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-success font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulasi Penawaran Berhasil Dikirim</span>
                  </div>
                  <p className="text-text-secondary">
                    Penawaran Anda sedang menunggu konfirmasi dari pihak terkait (status simulasi dummy).
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedItem(null)}
                    >
                      Tutup
                    </Button>
                    <Link
                      href="/app/overview"
                      className="text-xs font-semibold text-navy hover:text-gold-dark"
                    >
                      Kembali ke Overview &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedItem(null)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    isLoading={submittingOffer}
                    onClick={handleSimulateOffer}
                  >
                    Ajukan Penawaran
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
