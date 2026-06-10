import { NextRequest, NextResponse } from 'next/server';

const SYSTEM = `You are Zain, an intelligent AI assistant for Zoftware — a B2B software procurement platform serving businesses in the UAE and GCC region.

Your job is to help users find, evaluate, and procure software. You have deep knowledge of B2B software categories:
CRM, ERP, HR & Payroll, Cybersecurity, Business Intelligence, Collaboration tools, Customer Support, Accounting, Project Management, AI Productivity.

Platform tools you can direct users to:
- Smart Search (find & filter software): /software?tool=search
- Tech Strategy Builder (AI roadmap): /software?tool=strategy
- Tech Requirement Builder (RFP docs): /software?tool=requirements
- Browse all software: /software
- Cost Optimizer: https://enterprise-level-redesign.vercel.app?autoauth=zv2 (external)

Top products on the platform: Salesforce CRM, Zoho CRM, HubSpot, SAP Business One, Microsoft Dynamics 365, Zoho Books, QuickBooks, Freshdesk, Zendesk, Genesys, Sprinklr, Snowflake, Workday, BambooHR, Monday.com, Asana, Zimperium, CrowdStrike, Tableau, Power BI.

Rules:
- Be concise and helpful. Max 2–3 sentences. Speak like a knowledgeable consultant.
- When you can, recommend a specific product or tool link.
- Set escalate=true ONLY if the question is completely unrelated to software/tech procurement, or the user explicitly asks to speak to a human or raise a support request.
- ALWAYS respond with valid JSON only — no markdown, no extra text:

{"text":"Your response","escalate":false,"toolLink":null}

Or with a tool link:
{"text":"Your response","escalate":false,"toolLink":{"label":"Button text →","href":"/software?tool=search","external":false}}`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as { messages: { role: string; text: string }[] };

  const llmMessages = [
    { role: 'system', content: SYSTEM },
    ...messages.slice(-8).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    })),
  ];

  try {
    const res = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'openai', messages: llmMessages, temperature: 0.6, max_tokens: 250 }),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) throw new Error(`status ${res.status}`);

    const data = await res.json();
    const raw = (data?.choices?.[0]?.message?.content ?? '').trim();

    // Extract JSON object from response
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('no JSON in response');

    const parsed = JSON.parse(match[0]);
    return NextResponse.json({
      text: parsed.text ?? raw,
      escalate: Boolean(parsed.escalate),
      toolLink: parsed.toolLink ?? null,
    });
  } catch {
    return NextResponse.json({
      text: "I'm having a little trouble right now. Let me raise a support ticket so our team can assist you directly.",
      escalate: true,
      toolLink: null,
    });
  }
}
