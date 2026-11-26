// src/shared/types/portfolio.ts
export interface PortfolioStats {
  total: number;
  totalReturn: number;
  avgReturnPct: number;
}

export interface CompositionItem {
  label: string;
  pct: number;
}

export interface PortfolioData {
  stats: PortfolioStats;
  composition: CompositionItem[];
  performance: string;
}
