// Real billing options from zoftwarehub inventory — GCC region
export type BillingOption = {
  id: string;
  product: string;
  vendor: string;
  plan: string;
  offerCode: string;
  region: 'GCC';
  billingCycle: 'monthly' | 'half_yearly';
  price: number;          // discounted price per user
  originalPrice: number;  // before discount
  discountPct: number;
  priceUnit: 'user';
  minUnits: number;
  maxUnits: null;         // unlimited
  activationDays: number;
  category: string;
  categorySlug: string;
  tags: string[];
  description: string;
};

export const billingOptions: BillingOption[] = [
  {
    id: 'freshworks-enterprise-gcc-monthly',
    product: 'Freshworks',
    vendor: 'Freshworks',
    plan: 'Enterprise',
    offerCode: 'freshworks-enterprise-gcc-monthly',
    region: 'GCC',
    billingCycle: 'monthly',
    price: 47.40,
    originalPrice: 79.00,
    discountPct: 40,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'CRM & Sales',
    categorySlug: 'crm-sales',
    tags: ['CRM', 'Enterprise', 'Freshworks'],
    description: 'Full Freshworks suite for enterprise — CRM, support, and collaboration in one platform.',
  },
  {
    id: 'zoho-mail-premium-gcc-half_yearly',
    product: 'Zoho Mail',
    vendor: 'Zoho',
    plan: 'Mail Premium',
    offerCode: 'zoho-mail-mail-premium-gcc-half_yearly',
    region: 'GCC',
    billingCycle: 'half_yearly',
    price: 19.60,
    originalPrice: 20.00,
    discountPct: 2,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'Digital Workspace & Productivity',
    categorySlug: 'digital-workspace',
    tags: ['Email', 'Zoho', 'Business Email'],
    description: 'Professional business email with 50GB mailbox, custom domain, and zero ads.',
  },
  {
    id: 'spotler-mail-standard-gcc',
    product: 'Spotler Mail+',
    vendor: 'Spotler',
    plan: 'Standard',
    offerCode: 'spotler-mail-standard-gcc',
    region: 'GCC',
    billingCycle: 'monthly',
    price: 19.00,
    originalPrice: 20.00,
    discountPct: 5,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'Marketing',
    categorySlug: 'marketing',
    tags: ['Email Marketing', 'Campaigns', 'Automation'],
    description: 'Email marketing automation with drag-and-drop campaigns, analytics, and list management.',
  },
  {
    id: 'gamma-standard-gcc-half_yearly',
    product: 'Gamma',
    vendor: 'Gamma Tech, Inc.',
    plan: 'Standard',
    offerCode: 'gamma-standard-gcc-half_yearly',
    region: 'GCC',
    billingCycle: 'half_yearly',
    price: 19.00,
    originalPrice: 20.00,
    discountPct: 5,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'Digital Workspace & Productivity',
    categorySlug: 'digital-workspace',
    tags: ['AI Presentations', 'Collaboration', 'Documents'],
    description: 'AI-powered presentation and document platform — create polished decks in minutes.',
  },
  {
    id: 'freshsales-standard-gcc-monthly',
    product: 'Freshsales',
    vendor: 'Freshworks',
    plan: 'Standard',
    offerCode: 'freshsales-standard-gcc-monthly',
    region: 'GCC',
    billingCycle: 'monthly',
    price: 72.00,
    originalPrice: 80.00,
    discountPct: 10,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'CRM & Sales',
    categorySlug: 'crm-sales',
    tags: ['CRM', 'Sales', 'Pipeline'],
    description: 'AI-powered CRM with built-in phone, email, and activity timeline to close deals faster.',
  },
  {
    id: 'freshchat-standard-gcc',
    product: 'Freshchat',
    vendor: 'Freshworks Inc.',
    plan: 'Standard',
    offerCode: 'freshchat-standard-gcc',
    region: 'GCC',
    billingCycle: 'monthly',
    price: 46.55,
    originalPrice: 49.00,
    discountPct: 5,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'Customer Service & Communication',
    categorySlug: 'customer-service',
    tags: ['Live Chat', 'Customer Support', 'Messaging'],
    description: 'Modern messaging platform with AI-powered bots for customer support across web, mobile, and social.',
  },
  {
    id: 'freshcaller-standard-gcc',
    product: 'Freshcaller',
    vendor: 'Freshworks Inc.',
    plan: 'Standard',
    offerCode: 'freshcaller-standard-gcc',
    region: 'GCC',
    billingCycle: 'monthly',
    price: 37.05,
    originalPrice: 39.00,
    discountPct: 5,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'Customer Service & Communication',
    categorySlug: 'customer-service',
    tags: ['Call Center', 'VoIP', 'Business Phone'],
    description: 'Cloud call center with smart escalations, IVR, and real-time dashboards for GCC businesses.',
  },
  {
    id: 'freshservice-standard-gcc',
    product: 'Freshservice',
    vendor: 'Freshworks',
    plan: 'Standard',
    offerCode: 'freshservice-standard-gcc',
    region: 'GCC',
    billingCycle: 'monthly',
    price: 46.55,
    originalPrice: 49.00,
    discountPct: 5,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 7,
    category: 'IT Administration',
    categorySlug: 'it-administration',
    tags: ['ITSM', 'Helpdesk', 'IT Service Management'],
    description: 'IT service management with asset tracking, incident management, and change management.',
  },
  {
    id: 'freshdesk-standard-gcc',
    product: 'Freshdesk',
    vendor: 'Data Direct Group',
    plan: 'Standard',
    offerCode: 'freshdesk-standard-gcc',
    region: 'GCC',
    billingCycle: 'monthly',
    price: 52.25,
    originalPrice: 55.00,
    discountPct: 5,
    priceUnit: 'user',
    minUnits: 1,
    maxUnits: null,
    activationDays: 5,
    category: 'Customer Service & Communication',
    categorySlug: 'customer-service',
    tags: ['Helpdesk', 'Ticketing', 'Support'],
    description: 'Omnichannel customer support platform with AI, automation, and self-service portals.',
  },
];

export const getBillingOptionByProduct = (product: string) =>
  billingOptions.find(b => b.product.toLowerCase() === product.toLowerCase());

export const getBillingOptionsByCategory = (categorySlug: string) =>
  billingOptions.filter(b => b.categorySlug === categorySlug);

export const AED_RATE = 3.67;

export const formatAED = (usd: number) =>
  `AED ${Math.round(usd * AED_RATE).toLocaleString()}`;
