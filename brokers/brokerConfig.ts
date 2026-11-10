export type BrokerConfig = {
  name: string;
  description: string;
  accountTypes: string[];
  tradingPlatforms: string[];
  partnerUrl: string | null;
  newAccountInstructions: string;
  existingAccountInstructions: string;
  existingAccountLinkingSupported: boolean;
};

export const supportedBrokerConfigs: BrokerConfig[] = [
  {
    name: 'HFM',
    description: 'Regulated multi-asset broker with high-volume FX pairs.',
    accountTypes: [],
    tradingPlatforms: [],
    partnerUrl: null,
    newAccountInstructions: 'Open your broker account through the TradeStack partner link so your account can be associated with TradeStack where supported.',
    existingAccountInstructions: 'Broker-specific existing-account instructions are not configured yet. Check with the broker about its available referral or IB attribution process.',
    existingAccountLinkingSupported: true,
  },
  {
    name: 'XM',
    description: 'Established broker with tiered spreads across major pairs.',
    accountTypes: [],
    tradingPlatforms: [],
    partnerUrl: null,
    newAccountInstructions: 'Open your broker account through the TradeStack partner link so your account can be associated with TradeStack where supported.',
    existingAccountInstructions: 'Broker-specific existing-account instructions are not configured yet. Check with the broker about its available referral or IB attribution process.',
    existingAccountLinkingSupported: true,
  },
  {
    name: 'IC Markets',
    description: 'Raw-spread ECN pricing built for active traders.',
    accountTypes: [],
    tradingPlatforms: [],
    partnerUrl: null,
    newAccountInstructions: 'Open your broker account through the TradeStack partner link so your account can be associated with TradeStack where supported.',
    existingAccountInstructions: 'Broker-specific existing-account instructions are not configured yet. Check with the broker about its available referral or IB attribution process.',
    existingAccountLinkingSupported: true,
  },
];
