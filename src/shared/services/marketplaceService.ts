import marketplaceRaw from "@/src/db/mock/marketplace.json";

export type InstrumentType = "P2P Lending" | "SCF";

export interface MarketplaceItem {
  id: string;
  title: string;
  type: InstrumentType;
  amount: number;
  returnPct: number;
  tenorMonths: number;
  fundedPct: number;
  partner: string;
}

export interface MarketplaceData {
  total: number;
  sort: string;
  items: MarketplaceItem[];
  catatan?: string;
}

export const marketplaceService = {
  async getMarketplace(): Promise<MarketplaceData> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return marketplaceRaw as MarketplaceData;
  },
};
