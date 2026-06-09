'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  X, User, Building2, Mail, Phone, CheckCircle, Clock, Package,
  FileText, BarChart2, MessageSquare, AlertCircle, ChevronRight,
  Star, Shield, Download, ExternalLink, Zap, ArrowRight,
  Ticket, ChevronDown, Edit2, Bell
} from 'lucide-react';

// ── Mock data ──────────────────────────────────────────────────────────────
const mockUser = {
  firstName: 'Ravi',
  lastName: 'Sharma',
  email: 'ravi.sharma@gulf-enterprises.ae',
  phone: '+971 50 123 4567',
  role: 'Chief Technology Officer',
  company: 'Gulf Enterprises LLC',
  companySize: '51–200 employees',
  industry: 'Trading & Distribution',
  trn: 'AE123456789012345',
  memberSince: 'March 2024',
  avatar: 'RS',
};

const mockCompany = {
  name: 'Gulf Enterprises LLC',
  license: 'DED-2019-8847123',
  address: 'Al Quoz Industrial Area 2, Dubai, UAE',
  country: 'United Arab Emirates',
  website: 'gulf-enterprises.ae',
  vatNumber: 'AE123456789012345',
  industry: 'Trading & Distribution',
  employees: '51–200',
};

const mockContact = {
  name: 'Sana Al-Rashidi',
  title: 'Customer Success Manager',
  email: 'sana@zoftware.com',
  phone: '+971 4 000 0001',
  whatsapp: '+971 55 000 0001',
  avatar: 'SR',
  availability: 'Sun–Thu, 9am–6pm GST',
};

const mockPurchases = [
  {
    id: 'ORD-A1F3',
    name: 'Salesforce CRM',
    vendor: 'Salesforce',
    logo: 'SF',
    plan: 'Enterprise',
    licenses: 10,
    billing: 'Annual',
    price: '$1,200/mo',
    status: 'Active',
    activatedOn: '15 Apr 2025',
    nextRenewal: '15 Apr 2026',
    type: 'software',
    slug: 'salesforce',
    department: 'Sales',
    holders: [
      { name: 'Ravi Sharma', email: 'ravi.sharma@gulf-enterprises.ae', role: 'Admin / Owner' },
      { name: 'Aisha Al-Mansoori', email: 'aisha.m@gulf-enterprises.ae', role: 'Sales Lead' },
      { name: 'John Doe', email: 'john.doe@gulf-enterprises.ae', role: 'Sales Agent' },
    ],
  },
  {
    id: 'ORD-B8C2',
    name: 'Zoho Books',
    vendor: 'Zoho',
    logo: 'ZB',
    plan: 'Professional',
    licenses: 5,
    billing: 'Monthly',
    price: '$245/mo',
    status: 'Active',
    activatedOn: '01 Jun 2025',
    nextRenewal: '01 Jul 2026',
    type: 'software',
    slug: 'zoho-books',
    department: 'Finance',
    holders: [
      { name: 'Ravi Sharma', email: 'ravi.sharma@gulf-enterprises.ae', role: 'Billing Admin' },
      { name: 'Sarah Jenkins', email: 'sarah.j@gulf-enterprises.ae', role: 'Accountant' },
    ],
  },
  {
    id: 'ORD-C4D7',
    name: 'Freshdesk',
    vendor: 'Freshworks',
    logo: 'FD',
    plan: 'Growth',
    licenses: 5,
    billing: 'Monthly',
    price: '$75/mo',
    status: 'Activating',
    activatedOn: '—',
    nextRenewal: '—',
    type: 'software',
    slug: 'freshdesk',
    department: 'Customer Support',
    holders: [
      { name: 'Ravi Sharma', email: 'ravi.sharma@gulf-enterprises.ae', role: 'Admin' },
      { name: 'Michael Chang', email: 'michael.c@gulf-enterprises.ae', role: 'Support Agent' },
    ],
  },
  {
    id: 'BND-001',
    name: 'Growth Bundle',
    vendor: 'Zoftware',
    logo: 'GB',
    plan: 'Bundle',
    licenses: 1,
    billing: 'Annual',
    price: '$599/mo',
    status: 'Active',
    activatedOn: '10 Mar 2025',
    nextRenewal: '10 Mar 2026',
    type: 'bundle',
    slug: 'growth',
    department: 'Operations',
    holders: [
      { name: 'Ravi Sharma', email: 'ravi.sharma@gulf-enterprises.ae', role: 'Primary Holder' }
    ],
  },
];

const mockRfpReports = [
  {
    id: 'RFP-2025-001',
    title: 'CRM & Sales Automation RFP',
    date: '12 May 2025',
    status: 'Completed',
    summary: 'Evaluated 6 CRM platforms. Top recommendation: Salesforce Enterprise with 94% match score.',
    matched: ['Salesforce CRM', 'Zoho CRM', 'HubSpot CRM'],
    score: '94%',
  },
  {
    id: 'RFP-2025-002',
    title: 'Finance & Accounting Tech RFP',
    date: '03 Jun 2025',
    status: 'Completed',
    summary: 'Focused on GCC-compliant accounting with VAT. Zoho Books rated highest for mid-market.',
    matched: ['Zoho Books', 'QuickBooks Online', 'Xero'],
    score: '88%',
  },
];

const mockStrategyReports = [
  {
    id: 'STR-2025-001',
    title: 'Digital Transformation Roadmap — ERP',
    date: '20 Apr 2025',
    status: 'Completed',
    phases: ['Phase 1: Core ERP (SAP B1)', 'Phase 2: CRM Integration', 'Phase 3: Analytics & BI'],
    summary: 'Three-phase 18-month roadmap prioritising operational ERP rollout followed by customer experience layer.',
  },
];

const mockTickets = [
  {
    id: 'TKT-8841',
    subject: 'Salesforce CRM — SSO configuration assistance',
    status: 'Open',
    priority: 'Medium',
    created: '28 May 2025',
    lastUpdate: '2 hours ago',
    agent: 'Sana Al-Rashidi',
  },
  {
    id: 'TKT-7923',
    subject: 'Invoice request for Zoho Books — Q2 2025',
    status: 'Resolved',
    priority: 'Low',
    created: '05 Apr 2025',
    lastUpdate: '10 Apr 2025',
    agent: 'Sana Al-Rashidi',
  },
];

const mockChats = [
  { date: 'Today', summary: 'Asked about Freshdesk activation timeline', bot: 'Zain AI' },
  { date: '3 days ago', summary: 'Compared HubSpot vs Salesforce pricing for 20 users', bot: 'Zain AI' },
  { date: '1 week ago', summary: 'Queried bundle upgrade options', bot: 'Zain AI' },
];

// ── Tab type ───────────────────────────────────────────────────────────────
type Tab = 'overview' | 'purchases' | 'reports' | 'support';

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, string> = {
    Active: 'bg-[#dcfce7] text-[#16a34a]',
    Activating: 'bg-[#fef3c7] text-[#d97706]',
    Resolved: 'bg-[#f5f5f7] text-[#86868b]',
    Open: 'bg-[#fff7ed] text-[#ea580c]',
    Completed: 'bg-[#eff6ff] text-[#007AFF]',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${cfg[status] || 'bg-[#f5f5f7] text-[#86868b]'}`}>
      {status}
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function UserProfilePanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overview');
  const [expandCompany, setExpandCompany] = useState(false);
  const [expandedHolders, setExpandedHolders] = useState<string[]>([]);

  const toggleHolders = (id: string) => {
    setExpandedHolders(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const openTickets = mockTickets.filter(t => t.status === 'Open').length;

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'purchases', label: 'Purchases', badge: mockPurchases.length },
    { id: 'reports', label: 'Reports', badge: mockRfpReports.length + mockStrategyReports.length },
    { id: 'support', label: 'Support', badge: openTickets || undefined },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col overflow-hidden"
        style={{ animation: 'slideInRight 0.22s cubic-bezier(0.16,1,0.3,1)' }}>
        <style>{`@keyframes slideInRight { from { transform: translateX(100%); opacity: 0.6; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* ── Panel header ── */}
        <div className="shrink-0 border-b border-black/8">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-bold shrink-0"
                style={{ background: 'linear-gradient(135deg, #007AFF, #0051D5)' }}>
                {mockUser.avatar}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-black leading-tight">
                  {mockUser.firstName} {mockUser.lastName}
                </p>
                <p className="text-[11px] text-[#86868b]">{mockUser.role} · {mockUser.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f7] text-[#86868b] hover:text-black transition-colors relative">
                <Bell size={15} />
                {openTickets > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ea580c]" />
                )}
              </button>
              <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f7] text-[#86868b] hover:text-black transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 border-t border-black/6 divide-x divide-black/6">
            {[
              { v: mockPurchases.length.toString(), l: 'Active products' },
              { v: (mockRfpReports.length + mockStrategyReports.length).toString(), l: 'Reports saved' },
              { v: openTickets.toString(), l: 'Open tickets', alert: openTickets > 0 },
            ].map(({ v, l, alert }) => (
              <div key={l} className="py-2.5 text-center">
                <p className={`text-[17px] font-semibold ${alert ? 'text-[#ea580c]' : 'text-black'}`}>{v}</p>
                <p className="text-[9px] text-[#86868b] leading-snug px-1">{l}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-t border-black/6">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-semibold border-b-2 transition-colors ${
                  tab === t.id ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-[#86868b] hover:text-black'
                }`}>
                {t.label}
                {t.badge !== undefined && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    tab === t.id ? 'bg-[#007AFF] text-white' : 'bg-[#f5f5f7] text-[#86868b]'
                  }`}>{t.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto">

          {/* ─── OVERVIEW TAB ─── */}
          {tab === 'overview' && (
            <div className="p-5 space-y-5">
              {/* Profile card */}
              <div className="border border-black/8 rounded-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-[#f9fafb] border-b border-black/8">
                  <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.07em]">Profile</span>
                  <button className="flex items-center gap-1 text-[11px] text-[#007AFF] hover:text-[#0051D5]">
                    <Edit2 size={10} /> Edit
                  </button>
                </div>
                <div className="p-4 space-y-2.5">
                  {[
                    { icon: <User size={12} />, label: 'Name', value: `${mockUser.firstName} ${mockUser.lastName}` },
                    { icon: <Mail size={12} />, label: 'Email', value: mockUser.email },
                    { icon: <Phone size={12} />, label: 'Phone', value: mockUser.phone },
                    { icon: <Shield size={12} />, label: 'Member since', value: mockUser.memberSince },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-[#86868b] shrink-0">{icon}</span>
                      <span className="text-[11px] text-[#86868b] w-20 shrink-0">{label}</span>
                      <span className="text-[12px] text-black font-medium truncate">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company details */}
              <div className="border border-black/8 rounded-sm overflow-hidden">
                <button
                  onClick={() => setExpandCompany(e => !e)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#f9fafb] border-b border-black/8 hover:bg-[#f0f0f0] transition-colors">
                  <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.07em]">Company Details</span>
                  <ChevronDown size={13} className={`text-[#86868b] transition-transform ${expandCompany ? 'rotate-180' : ''}`} />
                </button>
                {expandCompany && (
                  <div className="p-4 space-y-2.5">
                    {[
                      { icon: <Building2 size={12} />, label: 'Company', value: mockCompany.name },
                      { icon: <Shield size={12} />, label: 'License No.', value: mockCompany.license },
                      { icon: <Zap size={12} />, label: 'VAT / TRN', value: mockCompany.vatNumber },
                      { icon: <User size={12} />, label: 'Industry', value: mockCompany.industry },
                      { icon: <User size={12} />, label: 'Team size', value: mockCompany.employees },
                      { icon: <ExternalLink size={12} />, label: 'Website', value: mockCompany.website },
                      { icon: <Mail size={12} />, label: 'Address', value: mockCompany.address },
                    ].map(({ icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <span className="text-[#86868b] shrink-0 mt-0.5">{icon}</span>
                        <span className="text-[11px] text-[#86868b] w-20 shrink-0">{label}</span>
                        <span className="text-[12px] text-black font-medium leading-snug">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {!expandCompany && (
                  <div className="px-4 py-3">
                    <p className="text-[12px] font-medium text-black">{mockCompany.name}</p>
                    <p className="text-[11px] text-[#86868b]">{mockCompany.industry} · {mockCompany.employees}</p>
                  </div>
                )}
              </div>

              {/* Primary point of contact */}
              <div className="border border-black/8 rounded-sm overflow-hidden">
                <div className="px-4 py-3 bg-[#f9fafb] border-b border-black/8">
                  <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.07em]">Your Customer Success Manager</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0051D5, #003CA6)' }}>
                      {mockContact.avatar}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-black">{mockContact.name}</p>
                      <p className="text-[11px] text-[#86868b]">{mockContact.title}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-[9px] font-semibold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                      Online
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: <Mail size={11} />, value: mockContact.email },
                      { icon: <Phone size={11} />, value: mockContact.phone },
                      { icon: <Clock size={11} />, value: mockContact.availability },
                    ].map(({ icon, value }) => (
                      <div key={value} className="flex items-center gap-2 text-[11px] text-[#555]">
                        <span className="text-[#86868b]">{icon}</span> {value}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <a href={`mailto:${mockContact.email}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold bg-[#007AFF] text-white rounded-sm hover:bg-[#0051D5] transition-colors">
                      <Mail size={11} /> Email
                    </a>
                    <a href={`https://wa.me/${mockContact.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold border border-black/10 text-black rounded-sm hover:bg-[#f5f5f7] transition-colors">
                      <MessageSquare size={11} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── PURCHASES TAB ─── */}
          {tab === 'purchases' && (
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-black">{mockPurchases.length} active subscriptions</p>
                <Link href="/software" onClick={onClose}
                  className="text-[11px] font-semibold text-[#007AFF] hover:text-[#0051D5] flex items-center gap-1">
                  Browse more <ArrowRight size={10} />
                </Link>
              </div>

              {mockPurchases.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    router.push(p.type === 'bundle' ? `/bundles/${p.slug}` : `/software/product/${p.slug}`);
                  }}
                  className="block border border-black/8 rounded-sm overflow-hidden hover:border-black/16 hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <div className="w-10 h-10 rounded-sm bg-[#f5f5f7] border border-black/8 flex items-center justify-center shrink-0 text-black">
                      <span className="text-[11px] font-bold">{p.logo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[13px] font-semibold text-black truncate group-hover:text-[#007AFF] transition-colors">{p.name}</p>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className="text-[11px] text-[#86868b]">
                        {p.vendor} · {p.plan} · {p.licenses} {p.type === 'bundle' ? 'bundle' : 'users'} · <span className="font-medium text-zinc-500">{p.department}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-semibold text-black">{p.price}</p>
                      <p className="text-[10px] text-[#86868b]">{p.billing}</p>
                    </div>
                  </div>
                  <div className="border-t border-black/6 px-4 py-2 flex items-center justify-between bg-[#f9fafb]">
                    <div className="text-[10px] text-[#86868b] flex items-center gap-3">
                      {p.status === 'Activating' ? (
                        <span className="flex items-center gap-1 text-[#d97706]">
                          <Clock size={9} /> Activation in progress
                        </span>
                      ) : (
                        <>
                          <span>Activated {p.activatedOn}</span>
                          <span className="text-[#c7c7cc]">·</span>
                          <span>Renews {p.nextRenewal}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleHolders(p.id);
                        }}
                        className="flex items-center gap-1 text-[10px] font-semibold text-[#007AFF] hover:text-[#0051D5] bg-[#007AFF]/5 hover:bg-[#007AFF]/10 px-2 py-0.5 rounded-sm transition-colors shrink-0"
                      >
                        <span>Holders</span>
                        <ChevronDown size={10} className={`transition-transform duration-200 shrink-0 ${expandedHolders.includes(p.id) ? 'rotate-180' : ''}`} />
                      </button>
                      <span className="text-[10px] font-mono text-[#86868b]">{p.id}</span>
                    </div>
                  </div>
                  {expandedHolders.includes(p.id) && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="border-t border-black/6 bg-white px-4 py-3 space-y-2 text-[11px]"
                    >
                      <p className="font-semibold text-zinc-500 text-[10px] uppercase tracking-wider mb-1">License Holders ({p.licenses} total)</p>
                      <div className="divide-y divide-black/4 max-h-[150px] overflow-y-auto pr-1">
                        {p.holders.map((h, i) => (
                          <div key={i} className="py-1.5 flex items-center justify-between gap-3 text-zinc-700">
                            <div>
                              <p className="font-semibold text-black">{h.name}</p>
                              <p className="text-[10px] text-zinc-400 font-mono">{h.email}</p>
                            </div>
                            <span className="text-[9px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded-full font-medium shrink-0">
                              {h.role}
                            </span>
                          </div>
                        ))}
                      </div>
                      {p.licenses > p.holders.length && (
                        <p className="text-[10px] text-zinc-400 italic pt-1 border-t border-zinc-100">
                          + {p.licenses - p.holders.length} unassigned licenses remaining
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Spend summary */}
              <div className="border border-[#007AFF]/15 bg-[#eff6ff] rounded-sm p-4">
                <p className="text-[11px] font-semibold text-[#007AFF] mb-2">Monthly spend summary</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[22px] font-semibold text-black">$1,520</p>
                    <p className="text-[11px] text-[#86868b]">/ month across all products</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-semibold text-[#16a34a]">Saving $680/mo</p>
                    <p className="text-[10px] text-[#86868b]">vs list prices</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── REPORTS TAB ─── */}
          {tab === 'reports' && (
            <div className="p-5 space-y-5">

              {/* RFP Reports */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #007AFF, #0051D5)' }}>
                    <FileText size={12} className="text-white" />
                  </div>
                  <p className="text-[12px] font-semibold text-black">Tech Requirement Reports</p>
                  <span className="text-[10px] font-semibold bg-[#f5f5f7] text-[#86868b] px-2 py-0.5 rounded-full ml-auto">{mockRfpReports.length} reports</span>
                </div>
                <div className="space-y-3">
                  {mockRfpReports.map(r => (
                    <div key={r.id} className="border border-black/8 rounded-sm p-4 hover:border-black/16 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-[13px] font-semibold text-black leading-tight">{r.title}</p>
                        <StatusBadge status={r.status} />
                      </div>
                      <p className="text-[11px] text-[#555] leading-snug mb-3">{r.summary}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {r.matched.map(m => (
                          <span key={m} className="text-[10px] bg-[#f5f5f7] text-[#555] px-1.5 py-0.5 rounded-sm">{m}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-[#86868b]">
                          <span>{r.date}</span>
                          <span className="font-semibold text-[#007AFF]">Match: {r.score}</span>
                        </div>
                        <button className="flex items-center gap-1 text-[11px] font-semibold text-[#007AFF] hover:text-[#0051D5]">
                          <Download size={10} /> Download RFP
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/6" />

              {/* Strategy Reports */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0051D5, #003CA6)' }}>
                    <BarChart2 size={12} className="text-white" />
                  </div>
                  <p className="text-[12px] font-semibold text-black">Tech Strategy Reports</p>
                  <span className="text-[10px] font-semibold bg-[#f5f5f7] text-[#86868b] px-2 py-0.5 rounded-full ml-auto">{mockStrategyReports.length} report</span>
                </div>
                <div className="space-y-3">
                  {mockStrategyReports.map(r => (
                    <div key={r.id} className="border border-black/8 rounded-sm p-4 hover:border-black/16 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-[13px] font-semibold text-black leading-tight">{r.title}</p>
                        <StatusBadge status={r.status} />
                      </div>
                      <p className="text-[11px] text-[#555] leading-snug mb-3">{r.summary}</p>
                      <div className="space-y-1 mb-3">
                        {r.phases.map((ph, i) => (
                          <div key={ph} className="flex items-center gap-2 text-[11px] text-[#555]">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                              style={{ backgroundColor: i === 0 ? '#007AFF' : i === 1 ? '#0051D5' : '#000' }}>
                              {i + 1}
                            </span>
                            {ph}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#86868b]">{r.date}</span>
                        <button className="flex items-center gap-1 text-[11px] font-semibold text-[#007AFF] hover:text-[#0051D5]">
                          <Download size={10} /> Download Roadmap
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to open builders */}
              <div className="border border-black/8 rounded-sm p-4 bg-[#f9fafb] text-center">
                <p className="text-[12px] font-semibold text-black mb-1">Generate a new report</p>
                <p className="text-[11px] text-[#86868b] mb-3">Use our AI builders to create RFPs or tech roadmaps instantly</p>
                <div className="flex gap-2">
                  <Link href="/software?mode=requirements" onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold bg-[#007AFF] text-white rounded-sm hover:bg-[#0051D5] transition-colors">
                    <FileText size={11} /> RFP Builder
                  </Link>
                  <Link href="/software?mode=strategy" onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold border border-black/10 text-black rounded-sm hover:bg-[#f0f0f0] transition-colors">
                    <BarChart2 size={11} /> Strategy Builder
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ─── SUPPORT TAB ─── */}
          {tab === 'support' && (
            <div className="p-5 space-y-5">

              {/* Open tickets */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[12px] font-semibold text-black">Support Tickets</p>
                  <button className="flex items-center gap-1 text-[11px] font-semibold text-[#007AFF] hover:text-[#0051D5]">
                    <Ticket size={10} /> New ticket
                  </button>
                </div>
                <div className="space-y-3">
                  {mockTickets.map(t => (
                    <div key={t.id} className="border border-black/8 rounded-sm p-4 hover:border-black/16 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="text-[12px] font-semibold text-black leading-tight">{t.subject}</p>
                        <StatusBadge status={t.status} />
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-[#86868b] mt-2">
                        <span className="font-mono">{t.id}</span>
                        <span className="text-[#c7c7cc]">·</span>
                        <span>{t.priority} priority</span>
                        <span className="text-[#c7c7cc]">·</span>
                        <span>Updated {t.lastUpdate}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-[#555]">
                        <User size={10} className="text-[#86868b]" /> Assigned to {t.agent}
                      </div>
                      {t.status === 'Open' && (
                        <button className="mt-2 text-[11px] font-semibold text-[#007AFF] hover:text-[#0051D5] flex items-center gap-1">
                          View thread <ChevronRight size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/6" />

              {/* Chat history */}
              <div>
                <p className="text-[12px] font-semibold text-black mb-3">Zain AI Chat History</p>
                <div className="space-y-2">
                  {mockChats.map((c, i) => (
                    <div key={i} className="flex items-start gap-3 border border-black/8 rounded-sm p-3">
                      <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shrink-0">
                        <MessageSquare size={12} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-black leading-snug">{c.summary}</p>
                        <p className="text-[10px] text-[#86868b] mt-1">{c.date} · {c.bot}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/6" />

              {/* Contact block */}
              <div className="border border-black/8 rounded-sm p-4">
                <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.07em] mb-3">Reach Support</p>
                <div className="space-y-2 mb-3">
                  {[
                    { icon: <Mail size={12} />, label: 'Email', value: 'support@zoftware.com', href: 'mailto:support@zoftware.com' },
                    { icon: <Phone size={12} />, label: 'Toll-free', value: '800 ZOFT (9638)', href: 'tel:8009638' },
                    { icon: <MessageSquare size={12} />, label: 'WhatsApp', value: '+971 55 000 0000', href: 'https://wa.me/971550000000' },
                  ].map(({ icon, label, value, href }) => (
                    <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-[#007AFF] transition-colors group">
                      <span className="text-[#86868b] group-hover:text-[#007AFF] transition-colors">{icon}</span>
                      <span className="text-[11px] text-[#86868b] w-16 shrink-0">{label}</span>
                      <span className="text-[12px] font-medium text-black group-hover:text-[#007AFF] transition-colors">{value}</span>
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#86868b] bg-[#f5f5f7] rounded-sm px-3 py-2">
                  <Clock size={10} />
                  <span>Support hours: Sun–Thu 9am–6pm GST · Priority SLA: 4 hours</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ── Panel footer ── */}
        <div className="shrink-0 border-t border-black/8 px-5 py-3 bg-[#f9fafb] flex items-center justify-between">
          <p className="text-[10px] text-[#86868b]">Member since {mockUser.memberSince}</p>
          <button className="text-[11px] font-semibold text-[#86868b] hover:text-black transition-colors flex items-center gap-1">
            <ExternalLink size={10} /> Full account settings
          </button>
        </div>
      </div>
    </>
  );
}
