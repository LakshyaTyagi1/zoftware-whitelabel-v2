'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, FileText, BarChart2, TrendingDown, ArrowRight, Zap,
  MessageSquare, Phone, X, Send, Sparkles, ChevronRight,
  ExternalLink, Package
} from 'lucide-react';
import { gatewayProducts } from '@/data/gateway-products';
import ThemeToggle from '@/components/ThemeToggle';

// ── Tool cards — ordered per spec ────────────────────────────────────────────
const tools = [
  {
    icon: <Search size={22} strokeWidth={1.5} />,
    label: 'Smart Search',
    desc: 'Find the right software from 50+ verified products in seconds. Filter by category, budget, or business size.',
    href: '/software',
    color: 'var(--color-accent)',
    external: false,
    badge: 'Instant results',
  },
  {
    icon: <BarChart2 size={22} strokeWidth={1.5} />,
    label: 'Tech Strategy Builder',
    desc: 'Get a full tech strategy and implementation roadmap tailored to your business — in under 1 minute.',
    href: '/software/report/strategy',
    color: '#7C3AED',
    external: false,
    badge: 'AI-generated',
  },
  {
    icon: <FileText size={22} strokeWidth={1.5} />,
    label: 'Tech Requirement Builder',
    desc: 'Generate a detailed technical requirements document for your software procurement — ready to share with vendors.',
    href: '/software/report/requirements',
    color: '#0284C7',
    external: false,
    badge: 'RFP-ready',
  },
  {
    icon: <TrendingDown size={22} strokeWidth={1.5} />,
    label: 'Cost Optimizer',
    desc: 'Analyse your current software spend and uncover savings opportunities instantly. GCC benchmark pricing included.',
    href: 'https://enterprise-level-redesign.vercel.app?autoauth=zv2',
    color: '#16A34A',
    external: true,
    badge: 'Save up to 40%',
  },
];

// ── Logos ─────────────────────────────────────────────────────────────────────
const logos = [
  { name: 'Zoho',         src: '/logos/zoho.avif'        },
  { name: 'Dynamics 365', src: '/logos/dynamics365.avif' },
  { name: 'Sprinklr',     src: '/logos/sprinklr.avif'    },
  { name: 'Snowflake',    src: '/logos/snowflake.avif'   },
  { name: 'Genesys',      src: '/logos/genesys.avif'     },
  { name: 'Tally',        src: '/logos/tally.avif'       },
  { name: 'Workleap',     src: '/logos/workleap.avif'    },
  { name: 'Zimperium',    src: '/logos/zimperium.avif'   },
];

// ── Chatbot ──────────────────────────────────────────────────────────────────
type Message = {
  role: 'assistant' | 'user';
  text: string;
  products?: typeof gatewayProducts;
  toolLink?: { label: string; href: string; external?: boolean };
};

const GREETING: Message = {
  role: 'assistant',
  text: "Hi! I'm Zora, your Software Gateway assistant. I can help you find the right software, build a requirements document, or create a tech strategy.\n\nWhat are you looking for?",
};

function searchProducts(query: string) {
  const q = query.toLowerCase();
  return gatewayProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.vendor.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  ).slice(0, 4);
}

function Chatbot({ defaultOpen }: { defaultOpen: boolean }) {
  const [open, setOpen]       = useState(defaultOpen);
  const [input, setInput]     = useState('');
  const [messages, setMsgs]   = useState<Message[]>([GREETING]);
  const bottomRef             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    const q = text.toLowerCase();

    let reply: Message;
    if (q.includes('smart search') || q.includes('search software') || q.includes('find software')) {
      reply = {
        role: 'assistant',
        text: 'Smart Search lets you browse all 50+ verified products, filter by category, and sort by price or rating.',
        toolLink: { label: 'Open Smart Search →', href: '/software' },
      };
    } else if (q.includes('strateg') || q.includes('roadmap') || q.includes('tech plan')) {
      reply = {
        role: 'assistant',
        text: 'The Tech Strategy Builder generates a full implementation roadmap tailored to your business in under a minute.',
        toolLink: { label: 'Build My Tech Strategy →', href: '/software/report/strategy' },
      };
    } else if (q.includes('requirement') || q.includes('rfp') || q.includes('procurement') || q.includes('document')) {
      reply = {
        role: 'assistant',
        text: 'The Tech Requirement Builder creates a professional RFP-ready document you can share directly with software vendors.',
        toolLink: { label: 'Build Requirements Doc →', href: '/software/report/requirements' },
      };
    } else if (q.includes('cost') || q.includes('saving') || q.includes('spend') || q.includes('budget') || q.includes('optimize')) {
      reply = {
        role: 'assistant',
        text: 'The Cost Optimizer benchmarks your current software spend against GCC pricing to find savings opportunities instantly.',
        toolLink: { label: 'Analyse My Spend →', href: 'https://enterprise-level-redesign.vercel.app?autoauth=zv2', external: true },
      };
    } else {
      const results = searchProducts(text);
      if (results.length > 0) {
        reply = {
          role: 'assistant',
          text: `I found ${results.length} software product${results.length > 1 ? 's' : ''} matching "${text}":`,
          products: results,
        };
      } else {
        reply = {
          role: 'assistant',
          text: `I didn't find an exact match for "${text}", but you can browse all 50+ products using Smart Search or let me help you build a requirements document.`,
          toolLink: { label: 'Try Smart Search →', href: '/software' },
        };
      }
    }

    setMsgs(prev => [...prev, userMsg, reply]);
    setInput('');
  };

  const handleQuickAction = (tool: typeof tools[0]) => {
    const userMsg: Message = { role: 'user', text: `Open ${tool.label}` };
    const reply: Message = {
      role: 'assistant',
      text: tool.desc,
      toolLink: { label: `Launch ${tool.label} →`, href: tool.href, external: tool.external },
    };
    setMsgs(prev => [...prev, userMsg, reply]);
  };

  return (
    <>
      {/* Floating icon buttons — bottom right */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        {/* Call button */}
        <a href="tel:+97148000000"
          className="w-11 h-11 rounded-full bg-white border border-black/12 shadow-lg flex items-center justify-center text-[#555] hover:text-black hover:shadow-xl transition-all">
          <Phone size={17} />
        </a>
        {/* Chat toggle */}
        <button onClick={() => setOpen(o => !o)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
          style={{ background: 'var(--color-accent)' }}>
          {open ? <X size={18} /> : <MessageSquare size={18} />}
        </button>
      </div>

      {/* Chat panel — slides in from right */}
      <div className={`fixed bottom-24 right-6 w-[360px] z-40 flex flex-col rounded-xl overflow-hidden bg-white border border-black/10 shadow-2xl transition-all duration-300 origin-bottom-right ${
        open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`} style={{ maxHeight: '540px' }}>

        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-black/8"
          style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))' }}>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white leading-none">Zora</p>
            <p className="text-[10px] text-white/70 mt-0.5">Software Gateway · AI Assistant</p>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0 }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full mb-1.5 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))' }}>
                    <Sparkles size={11} className="text-white" />
                  </div>
                )}
                <div className={`px-3 py-2 rounded-xl text-[12px] leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'bg-[#f5f5f7] text-[#333] rounded-bl-sm'
                }`} style={msg.role === 'user' ? { backgroundColor: 'var(--color-accent)' } : {}}>
                  {msg.text}
                </div>

                {/* Product results */}
                {msg.products && (
                  <div className="mt-2 space-y-1.5">
                    {msg.products.map(p => (
                      <Link key={p.id} href={`/software/product/${p.slug}`}
                        className="flex items-center gap-2.5 bg-white border border-black/8 rounded-lg px-3 py-2 hover:border-accent/30 hover:bg-accent/4 transition-all group">
                        <div className="w-7 h-7 rounded-md bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600 shrink-0">
                          {p.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-black leading-none group-hover:text-accent transition-colors">{p.name}</p>
                          <p className="text-[10px] text-muted mt-0.5 truncate">{p.category}</p>
                        </div>
                        <ChevronRight size={11} className="text-muted group-hover:text-accent shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Tool link */}
                {msg.toolLink && (
                  msg.toolLink.external ? (
                    <a href={msg.toolLink.href} target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg text-white transition-colors"
                      style={{ backgroundColor: 'var(--color-accent)' }}>
                      {msg.toolLink.label} <ExternalLink size={11} />
                    </a>
                  ) : (
                    <Link href={msg.toolLink.href}
                      className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg text-white transition-colors"
                      style={{ backgroundColor: 'var(--color-accent)' }}>
                      {msg.toolLink.label} <ArrowRight size={11} />
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Quick actions — only show after greeting */}
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {tools.map(t => (
                <button key={t.label} onClick={() => handleQuickAction(t)}
                  className="text-left px-2.5 py-2 border border-black/8 rounded-lg text-[11px] font-medium text-[#333] hover:border-accent/30 hover:bg-accent/5 transition-all leading-snug">
                  {t.label}
                </button>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-black/8 px-3 py-2.5 flex items-center gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask about any software…"
            className="flex-1 text-[12px] bg-[#f5f5f7] border border-black/8 rounded-lg px-3 py-2 outline-none focus:border-accent/30 focus:ring-2 focus:ring-accent/8 transition-all"
          />
          <button onClick={() => send(input)} disabled={!input.trim()}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white disabled:opacity-40 transition-all shrink-0"
            style={{ backgroundColor: 'var(--color-accent)' }}>
            <Send size={13} />
          </button>
        </div>
      </div>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SoftwareGatewayPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-black/8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/dubai-chamber" className="flex items-center gap-2 shrink-0 text-[13px] text-muted hover:text-black transition-colors">
            ← Dubai Chamber
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center">
              <Zap size={13} strokeWidth={2} className="text-white" />
            </div>
            <span className="text-[14px] font-bold text-black tracking-tight">Software Gateway</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/software"
              className="flex items-center gap-1.5 bg-black text-white text-[12px] font-semibold px-4 py-2 rounded-sm hover:bg-[#333] transition-colors min-h-[36px]">
              Browse All <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-black/8"
        style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fbff 50%, #ffffff 100%)' }}>
        <div className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: 'radial-gradient(circle, #007AFF18 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #007AFF 0%, transparent 70%)', transform: 'translate(25%, -25%)' }} />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-14 sm:py-18 text-center">
          <div className="inline-flex items-center gap-2 border border-accent/20 bg-accent/6 px-3 py-1.5 rounded-full text-[11px] font-semibold text-accent mb-6 tracking-wide">
            <Zap size={11} strokeWidth={2.5} />
            Exclusive Software Gateway · Dubai Chamber of Commerce
          </div>
          <h1 className="text-[36px] sm:text-[52px] font-semibold text-black tracking-tight leading-[1.05] mb-5 max-w-[720px] mx-auto">
            Procure the right software.<br />
            <span className="text-accent">In minutes, not months.</span>
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#555] leading-[1.7] max-w-[520px] mx-auto mb-8">
            AI-powered tools to discover, evaluate, and procure the right business software — with GCC-exclusive pricing and expert support.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/software"
              className="flex items-center gap-2 bg-accent text-white px-6 py-3 text-[14px] font-semibold rounded-sm hover:bg-accent-hover transition-all min-h-[44px] shadow-lg shadow-accent/20">
              Browse 50+ Products <ArrowRight size={15} strokeWidth={2} />
            </Link>
            <Link href="/software/report/requirements"
              className="flex items-center gap-2 border border-black/15 text-black px-6 py-3 text-[14px] font-medium rounded-sm hover:bg-surface hover:border-black/25 transition-all min-h-[44px]">
              Build Requirements Doc
            </Link>
          </div>

          {/* Mini stats */}
          <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-black/8">
            {[
              { n: '50+', l: 'Verified products' },
              { n: 'GCC', l: 'Exclusive pricing' },
              { n: '7 days', l: 'Avg. activation' },
            ].map(({ n, l }) => (
              <div key={l} className="text-center">
                <p className="text-[20px] font-semibold text-black">{n}</p>
                <p className="text-[11px] text-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Logo strip ── */}
      <div className="border-b border-black/8 bg-white py-4 overflow-hidden">
        <p className="text-center text-[10px] font-semibold text-muted uppercase tracking-[0.12em] mb-3">
          Trusted software providers on the Gateway
        </p>
        <div className="relative">
          <div className="th-logo-fade-l absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" />
          <div className="th-logo-fade-r absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" />
          <div className="flex items-center w-max" style={{ animation: 'marquee 32s linear infinite' }}>
            {(Array(4).fill(logos).flat() as typeof logos).map((brand, i) => (
              <div key={i} className="flex items-center shrink-0 px-8">
                <img src={brand.src} alt={brand.name} className="h-5 w-auto max-w-[90px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool cards ── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold text-muted tracking-[0.12em] uppercase mb-2">AI-Powered Tools</p>
          <h2 className="text-[24px] sm:text-[32px] font-semibold text-black tracking-tight">
            Four tools. Every procurement need.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool, i) => (
            tool.external ? (
              <a key={tool.label} href={tool.href} target="_blank" rel="noopener noreferrer"
                className="relative border border-black/8 rounded-sm p-6 hover:border-black/20 hover:shadow-lg transition-all group bg-white overflow-hidden cursor-pointer flex flex-col">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle, ${tool.color}18 0%, transparent 70%)` }} />

                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center relative"
                    style={{ backgroundColor: tool.color + '12' }}>
                    <span style={{ color: tool.color }}>{tool.icon}</span>
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border-2 flex items-center justify-center text-[8px] font-bold"
                      style={{ color: tool.color, borderColor: tool.color + '40' }}>
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ color: tool.color, backgroundColor: tool.color + '12', border: `1px solid ${tool.color}25` }}>
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-[17px] font-semibold text-black mb-2 leading-tight">{tool.label}</h3>
                <p className="text-[13px] text-[#555] leading-[1.65] mb-5 flex-1">{tool.desc}</p>

                <div className="flex items-center gap-1.5 text-[12px] font-semibold group-hover:gap-2.5 transition-all"
                  style={{ color: tool.color }}>
                  Get started <ExternalLink size={12} />
                </div>
              </a>
            ) : (
              <Link key={tool.label} href={tool.href}
                className="relative border border-black/8 rounded-sm p-6 hover:border-black/20 hover:shadow-lg transition-all group bg-white overflow-hidden flex flex-col">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle, ${tool.color === 'var(--color-accent)' ? '#007AFF' : tool.color}18 0%, transparent 70%)` }} />

                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center relative"
                    style={{ backgroundColor: typeof tool.color === 'string' && tool.color.startsWith('var') ? 'var(--color-accent)' + '12' : tool.color + '12' }}>
                    <span style={{ color: tool.color }}>{tool.icon}</span>
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border-2 flex items-center justify-center text-[8px] font-bold"
                      style={{ color: typeof tool.color === 'string' && tool.color.startsWith('var') ? 'var(--color-accent)' : tool.color, borderColor: typeof tool.color === 'string' && tool.color.startsWith('var') ? 'var(--color-accent)' : tool.color }}>
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      color: typeof tool.color === 'string' && tool.color.startsWith('var') ? 'var(--color-accent)' : tool.color,
                      backgroundColor: typeof tool.color === 'string' && tool.color.startsWith('var') ? 'rgba(0,122,255,0.08)' : tool.color + '12',
                      border: `1px solid ${typeof tool.color === 'string' && tool.color.startsWith('var') ? 'rgba(0,122,255,0.2)' : tool.color + '25'}`,
                    }}>
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-[17px] font-semibold text-black mb-2 leading-tight">{tool.label}</h3>
                <p className="text-[13px] text-[#555] leading-[1.65] mb-5 flex-1">{tool.desc}</p>

                <div className="flex items-center gap-1.5 text-[12px] font-semibold group-hover:gap-2.5 transition-all"
                  style={{ color: typeof tool.color === 'string' && tool.color.startsWith('var') ? 'var(--color-accent)' : tool.color }}>
                  Get started <ArrowRight size={12} />
                </div>
              </Link>
            )
          ))}
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-t border-black/8 bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { v: '50+', l: 'Verified products', c: 'var(--color-accent)' },
              { v: '12', l: 'Software categories', c: 'var(--color-accent)' },
              { v: 'Up to 40%', l: 'Bundle savings', c: 'var(--color-accent)' },
              { v: '7 days', l: 'Average activation', c: '#FF9500' },
            ].map(({ v, l, c }) => (
              <div key={l} className="border border-black/8 rounded-sm px-4 py-3.5 bg-white">
                <p className="text-[18px] font-semibold leading-none mb-1" style={{ color: c }}>{v}</p>
                <p className="text-[11px] text-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer line ── */}
      <div className="border-t border-black/8 py-5 text-center">
        <p className="text-[11px] text-muted">
          Powered by <span className="font-semibold text-black">Zoftware</span> · Trusted by 5,000+ businesses across MENA & GCC
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/software" className="flex items-center gap-1 text-[11px] text-muted hover:text-black transition-colors">
            <Package size={10} /> Browse All Software
          </Link>
          <Link href="/dubai-chamber" className="text-[11px] text-muted hover:text-black transition-colors">
            Dubai Chamber →
          </Link>
        </div>
      </div>

      {/* ── Chatbot ── */}
      <Chatbot defaultOpen={true} />
    </div>
  );
}
