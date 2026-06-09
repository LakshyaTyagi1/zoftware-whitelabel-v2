'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Package, Search, Zap } from 'lucide-react';
import UserProfilePanel from './UserProfilePanel';

// Open ticket count — drives notification dot
const OPEN_TICKETS = 1;

const breadcrumbMap: Record<string, string> = {
  '/software': 'Browse Software',
  '/bundles': 'Bundles',
  '/checkout': 'Checkout',
};

export default function GatewayHeader() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  const crumb =
    breadcrumbMap[pathname] ||
    (pathname.startsWith('/software/category') ? 'Category' :
     pathname.startsWith('/software/product') ? 'Product Detail' :
     pathname.startsWith('/bundles/') ? 'Bundle Detail' :
     'Software Gateway');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-black/8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link href="/dubai-chamber" className="flex items-center shrink-0">
            <img src="/data-direct-logo.svg" alt="Data Direct" className="h-6 w-auto" />
          </Link>

          <div className="w-px h-4 bg-black/12 shrink-0" />

          {/* Gateway label */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-5 h-5 rounded-sm bg-[#007AFF] flex items-center justify-center">
              <Zap size={11} strokeWidth={2} className="text-white" />
            </div>
            <span className="text-[12px] font-semibold text-black hidden sm:block">Software Gateway</span>
          </div>

          <div className="w-px h-4 bg-black/12 shrink-0 hidden sm:block" />

          {/* Breadcrumb */}
          <span className="text-[12px] text-[#86868b] hidden sm:block truncate">{crumb}</span>

          {/* Right nav */}
          <div className="ml-auto flex items-center gap-1.5">
            <Link href="/software"
              className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-[#86868b] hover:text-black transition-colors px-2.5 py-1.5 rounded-sm hover:bg-[#f5f5f7]">
              <Search size={12} /> Browse
            </Link>
            <Link href="/software?view=bundles"
              className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-[#86868b] hover:text-black transition-colors px-2.5 py-1.5 rounded-sm hover:bg-[#f5f5f7]">
              <Package size={12} /> Bundles
            </Link>
            <Link href="/dubai-chamber"
              className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold text-[#007AFF] hover:text-[#0051D5] transition-colors px-3 py-1.5 border border-[#007AFF]/20 rounded-sm hover:bg-[#007AFF]/5 min-h-[36px]">
              <ArrowLeft size={12} /> Dubai Chamber
            </Link>

            {/* ── User avatar / profile trigger ── */}
            <button
              onClick={() => setProfileOpen(true)}
              aria-label="Open user profile"
              className="relative w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold hover:scale-105 transition-transform shrink-0 ml-1"
              style={{ background: 'linear-gradient(135deg, #007AFF, #0051D5)' }}
            >
              RS
              {/* Notification dot — open tickets */}
              {OPEN_TICKETS > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#ea580c] border-2 border-white flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white leading-none">{OPEN_TICKETS}</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Profile slide-out panel */}
      {profileOpen && <UserProfilePanel onClose={() => setProfileOpen(false)} />}
    </>
  );
}
