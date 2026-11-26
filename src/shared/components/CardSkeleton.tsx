import React from "react";

export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-border/60 ${className}`}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div
      className="rounded-2xl bg-exit-white border border-border p-5 space-y-3 shadow-xs"
      aria-hidden="true"
    >
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-5 w-4/5" />
      <div className="grid grid-cols-2 gap-3 pt-1">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-10 w-full rounded-[10px]" />
    </div>
  );
}
