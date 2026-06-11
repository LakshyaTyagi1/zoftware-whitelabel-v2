'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Phone, Send, ArrowRight, ExternalLink, Minus } from 'lucide-react';
import ZainVoiceCall from './ZainVoiceCall';

type ToolLink = {
  label: string;
  href: string;
  external?: boolean;
};

type DisplayMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  toolLink?: ToolLink;
};

const GREETING: DisplayMessage = {
  id: 'greeting',
  role: 'assistant',
  text: "Hi! I'm **Zain**, your Software Gateway assistant powered by AI. I can help you find the right software, compare pricing, explore bundles, or build a tech strategy.\n\nWhat are you looking for?",
};

const QUICK_TOOLS = [
  { label: 'Smart Search',             emoji: '🔍', href: '/software?tool=search' },
  { label: 'Tech Strategy Builder',    emoji: '📊', href: '/software?tool=strategy' },
  { label: 'Tech Requirement Builder', emoji: '📋', href: '/software?tool=requirements' },
  { label: 'Cost Optimizer',           emoji: '💰', href: 'https://enterprise-level-redesign.vercel.app?autoauth=zv2', external: true },
];

const SUGGESTED = ['Find CRM', 'ERP options', 'HR software', 'Best for SME'];

function messageText(message: UIMessage) {
  return message.parts
    .map(part => (part.type === 'text' ? part.text : ''))
    .join('')
    .trim();
}

function hasText(message: UIMessage) {
  return messageText(message).length > 0;
}

function latestAssistantHasText(messages: UIMessage[]) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i].role === 'assistant') {
      return hasText(messages[i]);
    }
  }

  return false;
}

function friendlyErrorMessage(error?: Error) {
  if (!error) return '';

  try {
    const parsed = JSON.parse(error.message) as { error?: string };
    if (parsed.error) return parsed.error;
  } catch {
    // AI SDK errors can be either plain text or serialized JSON.
  }

  return error.message || 'Please try again.';
}

function safeLinkProps(href: string) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return { href, isExternal: false };
  }

  try {
    const url = new URL(href);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return { href: url.href, isExternal: true };
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function normalizeChatText(text: string) {
  return text
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (/^-{3,}$/.test(trimmed)) return '';
      if (/^#{1,6}\s+/.test(trimmed)) {
        return trimmed.replace(/^#{1,6}\s+(?:\d+\.\s*)?/, '');
      }
      return line.replace(/^\s*[-*]\s+/, '- ');
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function renderText(text: string) {
  return normalizeChatText(text)
    .split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, i) => {
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const linkProps = safeLinkProps(link[2]);
        if (!linkProps) return <span key={i}>{link[1]}</span>;

        return (
          <a
            key={i}
            href={linkProps.href}
            target={linkProps.isExternal ? '_blank' : undefined}
            rel={linkProps.isExternal ? 'noopener noreferrer' : undefined}
            className="font-semibold underline underline-offset-2"
          >
            {link[1]}
          </a>
        );
      }

      const bold = part.match(/^\*\*(.*?)\*\*$/);
      return bold ? <strong key={i}>{bold[1]}</strong> : <span key={i}>{part}</span>;
    });
}

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f4f4f6] rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-400"
          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

// ── ZainChatbot FABs + drawer ─────────────────────────────────────────────────
export default function ZainChatbot({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open,    setOpen]    = useState(defaultOpen);
  const [calling, setCalling] = useState(false);
  const [input,   setInput]   = useState('');
  const [localMessages, setLocalMessages] = useState<DisplayMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const localMessageIdRef = useRef(0);
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), []);
  const { messages, sendMessage, status, error } = useChat({
    transport,
    experimental_throttle: 80,
  });
  const isBusy = status === 'submitted' || status === 'streaming';
  const showTyping = status === 'submitted' || (status === 'streaming' && !latestAssistantHasText(messages));
  const errorMessage = friendlyErrorMessage(error);
  const visibleMessages: DisplayMessage[] = [
    GREETING,
    ...localMessages,
    ...messages.flatMap(message => {
      if (message.role === 'system') return [];

      const text = messageText(message);
      if (!text) return [];

      return [{
        id: message.id,
        role: message.role as 'assistant' | 'user',
        text,
      }];
    }),
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, localMessages, status]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('zain-open', onOpen);
    return () => window.removeEventListener('zain-open', onOpen);
  }, []);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    void sendMessage({ text: trimmed });
    setInput('');
  };

  const quickAction = (tool: typeof QUICK_TOOLS[0]) => {
    localMessageIdRef.current += 1;
    const id = localMessageIdRef.current;
    const reply: DisplayMessage = {
      id: `quick-reply-${id}`,
      role: 'assistant',
      text: `Sure! Here's the link to ${tool.label}.`,
      toolLink: { label: `Launch ${tool.label}`, href: tool.href, external: tool.external } };
    setLocalMessages(prev => [
      ...prev,
      { id: `quick-user-${id}`, role: 'user', text: tool.label },
      reply,
    ]);
  };

  return (
    <>
      {/* ── FABs — hidden when drawer is open so they don't overlap the input ── */}
      {!open && (
        <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
          <button onClick={() => setOpen(true)} title="Chat with Zain"
            className="transition-all hover:scale-105 active:scale-95"
            style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.28))' }}>
            <img src="/zain-avatar.svg" alt="Zain" className="w-14 h-14 block" />
          </button>
          <button onClick={() => setCalling(true)} title="Call Zain"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#16A34A', boxShadow: '0 4px 10px rgba(22,163,74,0.35)' }}>
            <Phone size={15} strokeWidth={2} />
          </button>
        </div>
      )}

      {/* ── Scrim ── */}
      {open && (
        <div className="fixed inset-0 z-[39] bg-black/8 backdrop-blur-[1px]" onClick={() => setOpen(false)} />
      )}

      {/* ── Right drawer ── */}
      <div className={`fixed top-0 right-0 h-screen z-40 flex flex-col bg-white border-l border-black/10 shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: 'min(420px, 95vw)' }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/8 shrink-0"
          style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3a 100%)' }}>
          <div className="relative shrink-0">
            <img src="/zain-avatar.svg" alt="Zain" className="w-10 h-10 rounded-full" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#1a1a3a]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-white leading-none">Zain</p>
            <p className="text-[11px] text-white/50 mt-0.5">Software Gateway · AI Assistant · Online</p>
          </div>
          <button onClick={() => setOpen(false)} title="Minimise chat"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0">
            <Minus size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ minHeight: 0 }}>
          {visibleMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[90%]">
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <img src="/zain-avatar.svg" alt="Zain" className="w-5 h-5 rounded-full" />
                    <span className="text-[10px] font-semibold text-muted">Zain</span>
                  </div>
                )}
                <div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                  msg.role === 'user' ? 'text-white rounded-br-sm' : 'bg-[#f4f4f6] text-[#1a1a1a] rounded-bl-sm'
                }`} style={msg.role === 'user' ? { background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))' } : {}}>
                  {renderText(msg.text)}
                </div>
                {msg.toolLink && (
                  msg.toolLink.external ? (
                    <a href={msg.toolLink.href} target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-xl text-white"
                      style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))' }}>
                      {msg.toolLink.label} <ExternalLink size={11} />
                    </a>
                  ) : (
                    <Link href={msg.toolLink.href}
                      className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-xl text-white"
                      style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))' }}>
                      {msg.toolLink.label} <ArrowRight size={11} />
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {showTyping && (
            <div className="flex justify-start">
              <div className="max-w-[90%]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <img src="/zain-avatar.svg" alt="Zain" className="w-5 h-5 rounded-full" />
                  <span className="text-[10px] font-semibold text-muted">Zain</span>
                </div>
                <TypingDots />
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="flex justify-start">
              <div className="max-w-[90%]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <img src="/zain-avatar.svg" alt="Zain" className="w-5 h-5 rounded-full" />
                  <span className="text-[10px] font-semibold text-muted">Zain</span>
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm text-[12px] leading-relaxed bg-red-50 text-red-700 border border-red-100">
                  Zain could not connect. {errorMessage}
                </div>
              </div>
            </div>
          )}

          {/* Quick action grid after greeting */}
          {visibleMessages.length === 1 && !isBusy && (
            <div className="grid grid-cols-2 gap-2 mt-1">
              {QUICK_TOOLS.map(t => (
                <button key={t.label} onClick={() => quickAction(t)}
                  className="text-left px-3 py-2.5 border border-black/8 rounded-xl text-[12px] font-medium text-[#333] hover:border-black/20 hover:bg-[#f4f4f6] transition-all leading-snug">
                  <span className="block text-muted text-[10px] mb-0.5">{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested chips */}
        {visibleMessages.length <= 3 && !isBusy && (
          <div className="px-5 py-2 border-t border-black/6 flex gap-2 overflow-x-auto shrink-0" style={{ scrollbarWidth: 'none' }}>
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => send(q)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-black/10 text-[#555] hover:border-accent/30 hover:text-accent whitespace-nowrap transition-all shrink-0">
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-black/8 px-4 py-3.5 flex items-center gap-2.5 shrink-0 bg-white">
          <img src="/zain-avatar.svg" alt="Zain" className="w-7 h-7 rounded-full shrink-0" />
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask Zain anything about software…"
            disabled={isBusy}
            className="flex-1 text-[13px] bg-[#f4f4f6] border border-black/8 rounded-xl px-3.5 py-2.5 outline-none focus:border-accent/30 focus:bg-white transition-all disabled:opacity-60" />
          <button onClick={() => send(input)} disabled={!input.trim() || isBusy}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-40 shrink-0 transition-all"
            style={{ background: input.trim() && !isBusy ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))' : '#e5e5e5' }}>
            <Send size={14} />
          </button>
        </div>
      </div>

      {calling && <ZainVoiceCall onClose={() => setCalling(false)} />}
    </>
  );
}
