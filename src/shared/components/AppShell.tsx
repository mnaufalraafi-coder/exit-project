"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  PieChart,
  Tag,
  FileText,
  MessageSquare,
  History,
  Building2,
  HelpCircle,
  Settings,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { authService } from "@/src/shared/services/authService";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MAIN_NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/app/overview", icon: LayoutDashboard },
  { name: "Marketplace", href: "/app/marketplace", icon: Store },
  { name: "Portfolio", href: "/app/portfolio", icon: PieChart },
  { name: "My Offers", href: "/app/offers", icon: Tag },
  { name: "My Requests", href: "/app/requests", icon: FileText },
  { name: "Negotiations", href: "/app/negotiations", icon: MessageSquare },
  { name: "Activity History", href: "/app/activity", icon: History },
  { name: "Our Partners", href: "/app/partners", icon: Building2 },
  { name: "Help & Support", href: "/app/help", icon: HelpCircle },
];

export interface AppShellProps {
  title?: string;
  children: React.ReactNode;
}

/**
 * Global AppShell for EXIT investor portal (/app/*).
 * Navy sidebar with gold active indicator + Profile & Settings at bottom,
 * responsive drawer below 1024px (lg), and topbar with notifications & Investor menu.
 */
export function AppShell({ title, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("Wiji Sejati");
  const [userEmail, setUserEmail] = useState("wiji.sejati@email.com");

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      const current = authService.getCurrentUser();
      if (current) {
        setUserName(current.fullName || current.nickname || "Wiji Sejati");
        setUserEmail(current.email || "wiji.sejati@email.com");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    router.push("/login");
  };

  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-navy text-exit-white px-4 py-6">
      {/* Brand Logo */}
      <div className="flex items-center justify-between px-2 pb-6 mb-4 border-b border-exit-white/10">
        <Link href="/app/overview" className="inline-flex items-center">
          <Image
            src="/logo-white.png"
            alt="EXIT - Early Investment Take Over"
            width={132}
            height={48}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-exit-white/70 hover:text-exit-white hover:bg-exit-white/10"
          aria-label="Tutup menu navigasi"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main 9 Menu Items */}
      <nav aria-label="Menu Investor EXIT" className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenus}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm transition-colors ${
                    active
                      ? "bg-gold text-navy font-semibold shadow-xs"
                      : "text-exit-white/80 font-medium hover:bg-exit-white/10 hover:text-exit-white"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      active ? "text-navy" : "text-exit-white/70"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Profile & Settings */}
      <div className="pt-4 mt-4 border-t border-exit-white/15">
        <Link
          href="/app/profile"
          onClick={closeMenus}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm transition-colors ${
            isActivePath("/app/profile")
              ? "bg-gold text-navy font-semibold"
              : "text-exit-white/80 font-medium hover:bg-exit-white/10 hover:text-exit-white"
          }`}
        >
          <Settings
            className={`w-4 h-4 shrink-0 ${
              isActivePath("/app/profile") ? "text-navy" : "text-exit-white/70"
            }`}
          />
          <span>Profile &amp; Settings</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-ivory text-text-primary font-sans">
      {/* Desktop Fixed Sidebar (>= 1024px) */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Drawer (< 1024px) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-navy/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-68 max-w-[82vw] h-full shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Right Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-ivory/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-navy hover:bg-navy/5"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/app/overview" className="lg:hidden inline-flex items-center">
              <Image
                src="/logo-full.png"
                alt="EXIT"
                width={120}
                height={42}
                className="h-7 w-auto object-contain"
              />
            </Link>
            {title && (
              <span className="hidden lg:inline-block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {title}
              </span>
            )}
          </div>

          {/* Right Utilities: Notifications + Investor Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 relative">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
                className="relative p-2 rounded-[10px] border border-border bg-exit-white text-navy hover:border-gold transition-colors"
                aria-label="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold"
                  aria-hidden="true"
                />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-exit-white border border-border shadow-lg p-3 z-40">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                    <span className="text-xs font-bold text-navy">Notifikasi</span>
                    <span className="text-[11px] font-medium text-gold-dark">
                      3 Baru
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs">
                    <li className="p-2 rounded-lg bg-surface-soft border border-border/60">
                      <p className="font-semibold text-navy">3 Penawaran Baru</p>
                      <p className="text-text-secondary mt-0.5">
                        Posisi baru tersedia di Marketplace.
                      </p>
                    </li>
                    <li className="p-2 rounded-lg bg-surface-soft border border-border/60">
                      <p className="font-semibold text-navy">2 Permintaan Take-over</p>
                      <p className="text-text-secondary mt-0.5">
                        Menunggu konfirmasi peninjauan Anda.
                      </p>
                    </li>
                    <li className="p-2 rounded-lg bg-surface-soft border border-border/60">
                      <p className="font-semibold text-navy">1 Negosiasi Aktif</p>
                      <p className="text-text-secondary mt-0.5">
                        Tinjau perubahan ketentuan penawaran.
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Investor Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setNotifOpen(false);
                }}
                className="inline-flex items-center gap-2 h-9 px-3 rounded-[10px] border border-border bg-exit-white text-navy hover:border-gold transition-colors text-xs font-semibold"
              >
                <span className="w-6 h-6 rounded-full bg-navy text-gold flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </span>
                <span>Investor</span>
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-exit-white border border-border shadow-lg p-2 z-40">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-xs font-bold text-navy truncate">{userName}</p>
                    <p className="text-[11px] text-text-secondary truncate">
                      {userEmail}
                    </p>
                  </div>
                  <Link
                    href="/app/overview"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-navy hover:bg-ivory"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Overview</span>
                  </Link>
                  <Link
                    href="/app/marketplace"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-navy hover:bg-ivory"
                  >
                    <Store className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Marketplace</span>
                  </Link>
                  <Link
                    href="/app/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-navy hover:bg-ivory"
                  >
                    <Settings className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Profile &amp; Settings</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-danger hover:bg-danger/10 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Screen Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
