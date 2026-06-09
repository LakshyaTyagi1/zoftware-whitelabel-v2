// Software bundles — Starter / Growth / Expansion
import { AED_RATE } from './billing-options';

export type BundleItem = {
  product: string;
  vendor: string;
  category: string;
  originalPrice: number; // per user/mo
  bundlePrice: number;   // discounted per user/mo
  offerCode: string;
};

export type Bundle = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  targetSize: string;    // e.g. "1–10 employees"
  monthlyPrice: number;  // flat team bundle price USD/mo
  originalMonthlyPrice: number;
  savePct: number;
  annualMonthlyPrice: number; // monthly equiv when billed annually (20% off)
  items: BundleItem[];
  highlights: string[];
  activationDays: number;
  color: string;
  badge?: string;
};

export const bundles: Bundle[] = [
  {
    id: 'starter',
    slug: 'starter',
    name: 'Starter Bundle',
    tagline: 'Everything a new business needs to operate.',
    description:
      'A curated stack for small teams getting started — business email, customer chat, and a calling solution, all pre-integrated and ready to activate within 7 days.',
    targetSize: '1–10 employees',
    monthlyPrice: 299,
    originalMonthlyPrice: 499,
    savePct: 40,
    annualMonthlyPrice: 239,
    activationDays: 7,
    color: '#0284C7',
    badge: 'Most Popular',
    items: [
      {
        product: 'Freshchat',
        vendor: 'Freshworks Inc.',
        category: 'Customer Support',
        originalPrice: 49.00,
        bundlePrice: 46.55,
        offerCode: 'freshchat-standard-gcc',
      },
      {
        product: 'Freshcaller',
        vendor: 'Freshworks Inc.',
        category: 'Business Calls',
        originalPrice: 39.00,
        bundlePrice: 37.05,
        offerCode: 'freshcaller-standard-gcc',
      },
      {
        product: 'Zoho Mail',
        vendor: 'Zoho',
        category: 'Business Email',
        originalPrice: 20.00,
        bundlePrice: 19.60,
        offerCode: 'zoho-mail-mail-premium-gcc-half_yearly',
      },
      {
        product: 'Spotler Mail+',
        vendor: 'Spotler',
        category: 'Email Marketing',
        originalPrice: 20.00,
        bundlePrice: 19.00,
        offerCode: 'spotler-mail-standard-gcc',
      },
    ],
    highlights: [
      'Business email with custom domain',
      'Live chat & AI-powered support bot',
      'Cloud calling with IVR',
      'Email marketing with automation',
      'Single invoice, one activation',
      'Activation within 7 days',
    ],
  },
  {
    id: 'growth',
    slug: 'growth',
    name: 'Growth Bundle',
    tagline: 'Scale your sales, service, and IT operations.',
    description:
      'For growing teams that need a proper CRM, IT service management, and customer support stack — with AI-ranked matching built in.',
    targetSize: '10–50 employees',
    monthlyPrice: 599,
    originalMonthlyPrice: 899,
    savePct: 33,
    annualMonthlyPrice: 479,
    activationDays: 7,
    color: '#7C3AED',
    badge: 'Best Value',
    items: [
      {
        product: 'Freshsales',
        vendor: 'Freshworks',
        category: 'CRM & Sales',
        originalPrice: 80.00,
        bundlePrice: 72.00,
        offerCode: 'freshsales-standard-gcc-monthly',
      },
      {
        product: 'Freshservice',
        vendor: 'Freshworks',
        category: 'IT Service Management',
        originalPrice: 49.00,
        bundlePrice: 46.55,
        offerCode: 'freshservice-standard-gcc',
      },
      {
        product: 'Freshchat',
        vendor: 'Freshworks Inc.',
        category: 'Customer Support',
        originalPrice: 49.00,
        bundlePrice: 46.55,
        offerCode: 'freshchat-standard-gcc',
      },
      {
        product: 'Freshcaller',
        vendor: 'Freshworks Inc.',
        category: 'Business Calls',
        originalPrice: 39.00,
        bundlePrice: 37.05,
        offerCode: 'freshcaller-standard-gcc',
      },
      {
        product: 'Zoho Mail',
        vendor: 'Zoho',
        category: 'Business Email',
        originalPrice: 20.00,
        bundlePrice: 19.60,
        offerCode: 'zoho-mail-mail-premium-gcc-half_yearly',
      },
    ],
    highlights: [
      'AI-powered CRM with pipeline management',
      'ITSM with asset & incident tracking',
      'Customer support chat + calling',
      'Business email included',
      'Unified Freshworks dashboard',
      'Priority activation — 7 days',
    ],
  },
  {
    id: 'expansion',
    slug: 'expansion',
    name: 'Expansion Bundle',
    tagline: 'Full enterprise software stack for rapid scale.',
    description:
      'The complete enterprise suite — Freshworks Enterprise plus the full Freshworks family, covering support, sales, IT, helpdesk, and calling in one consolidated contract.',
    targetSize: '50+ employees',
    monthlyPrice: 999,
    originalMonthlyPrice: 1499,
    savePct: 33,
    annualMonthlyPrice: 799,
    activationDays: 7,
    color: '#0F766E',
    badge: 'Enterprise',
    items: [
      {
        product: 'Freshworks',
        vendor: 'Freshworks',
        category: 'Enterprise Suite',
        originalPrice: 79.00,
        bundlePrice: 47.40,
        offerCode: 'freshworks-enterprise-gcc-monthly',
      },
      {
        product: 'Freshsales',
        vendor: 'Freshworks',
        category: 'CRM & Sales',
        originalPrice: 80.00,
        bundlePrice: 72.00,
        offerCode: 'freshsales-standard-gcc-monthly',
      },
      {
        product: 'Freshservice',
        vendor: 'Freshworks',
        category: 'IT Service Management',
        originalPrice: 49.00,
        bundlePrice: 46.55,
        offerCode: 'freshservice-standard-gcc',
      },
      {
        product: 'Freshchat',
        vendor: 'Freshworks Inc.',
        category: 'Customer Support',
        originalPrice: 49.00,
        bundlePrice: 46.55,
        offerCode: 'freshchat-standard-gcc',
      },
      {
        product: 'Freshcaller',
        vendor: 'Freshworks Inc.',
        category: 'Business Calls',
        originalPrice: 39.00,
        bundlePrice: 37.05,
        offerCode: 'freshcaller-standard-gcc',
      },
      {
        product: 'Freshdesk',
        vendor: 'Data Direct Group',
        category: 'Helpdesk',
        originalPrice: 55.00,
        bundlePrice: 52.25,
        offerCode: 'freshdesk-standard-gcc',
      },
    ],
    highlights: [
      'Full Freshworks Enterprise suite',
      'CRM + ITSM + Helpdesk + Support + Calls',
      'Dedicated account manager',
      'Single consolidated invoice',
      'Custom onboarding plan',
      'Fastest activation — 5 days',
    ],
  },
];

export const getBundleBySlug = (slug: string) =>
  bundles.find(b => b.slug === slug);

export const formatBundleAED = (usd: number) =>
  `AED ${Math.round(usd * AED_RATE).toLocaleString()}`;
