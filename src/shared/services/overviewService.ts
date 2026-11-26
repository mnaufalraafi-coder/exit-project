import overviewRaw from "@/src/db/mock/overview.json";

export interface OverviewStats {
  portfolioValue: number;
  totalReturn: number;
  activePositions: number;
}

export interface OverviewActivity {
  newOffers: number;
  takeoverRequests: number;
  activeNegotiations: number;
}

export interface OverviewPerformance {
  months: string[];
  value: number[];
  unit: string;
  growthPct: number;
}

export interface OverviewData {
  stats: OverviewStats;
  activity: OverviewActivity;
  performance: OverviewPerformance;
}

export const overviewService = {
  async getOverview(): Promise<OverviewData> {
    await new Promise((resolve) => setTimeout(resolve, 180));
    return overviewRaw as OverviewData;
  },
};
