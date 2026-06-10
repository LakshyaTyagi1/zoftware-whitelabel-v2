export type ZGTicket = {
  id: string;
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  created: string;
  createdAt: string; // ISO string for sorting
  agent: string;
  source: 'zain-chat';
};

const KEY = 'zg_support_tickets';

export function getTickets(): ZGTicket[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

export function createTicket(subject: string, description: string): ZGTicket {
  const now = new Date();
  const ticket: ZGTicket = {
    id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
    subject,
    description,
    status: 'Open',
    priority: 'Medium',
    created: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    createdAt: now.toISOString(),
    agent: 'Deepa Rawat',
    source: 'zain-chat',
  };
  const existing = getTickets();
  localStorage.setItem(KEY, JSON.stringify([ticket, ...existing]));
  window.dispatchEvent(new Event('zg-tickets-updated'));
  return ticket;
}

export function getOpenCount(): number {
  return getTickets().filter(t => t.status === 'Open' || t.status === 'In Progress').length;
}
