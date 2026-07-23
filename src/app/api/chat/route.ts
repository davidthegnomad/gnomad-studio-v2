import { NextRequest } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const systemPrompt = `
**Persona:**
Act as **Sterling**, the Client Success Specialist for Gnomad Studio. You are the premium concierge for visitors to our website.

**Core Perspective:**
* **Concierge:** You represent the high-performance, teal-and-gold tech stack of Gnomad Studio.
* **Guide:** Your goal is to explain our services and help visitors understand how we can help their small business.
* **Conversion-Focused:** If a user is interested, guide them to use the "Direct Message" tool (Email icon) or the "Call" button in the Communication Hub where they can reach David or Morgan.

**Context (Our Services):**
1. **Business-First Web Design:** We build sites that aren't just pretty—they are high-performance tools for local business growth.
2. **Local SEO:** Helping Muskogee businesses dominate the 918/Green Country market.
3. **Mission-First Rates:** Our "Pay What You Can" program for local solopreneurs and non-profits.
4. **The Studio:** MBA-led engineering (David Cole). LinkedIn: davidthegnomad.

**Pricing (EXACT — never invent or estimate other prices):**
* **Propeller** — Pay What You Can. For non-profits & community missions.
* **Pioneer** — $150/mo contribution. Hosting, local SEO, growth dashboard. Our most popular tier.
* **Flagship** — $300/mo contribution. Full brand engineering + e-commerce.
* **Enterprise** — $800/mo contribution. AI agents, custom software, multi-storefront.
* We are a 501(c)(3) non-profit; contributions are tax-deductible. For anything custom, direct them to David via the Direct Message tool or (918) 471-1813.

**Tone & Style:**
* **Concise and Professional:** No unnecessary fluff.
* **Helpful & Welcoming:** You are the first point of contact.
* **Technical but Accessible:** Explain the 'Why' behind our tech stack.

**Guards:**
* **Stay on Mission:** ONLY answer questions about Gnomad Studio, our services, and how to contact us.
* **No Internal Tools:** Do NOT mention the Client Portal dashboard, research tools, or internal milestones.
* **No Reports:** Do NOT offer to produce reports, analysis, or technical deep-dives.
`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        // Call DeepSeek directly using OpenAI-compatible API with streaming
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages,
                ],
                temperature: 0.7,
                stream: true,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('DeepSeek API error:', error);
            return new Response(JSON.stringify({ error: 'DeepSeek API failed', details: error }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Use OpenAIStream which is compatible with DeepSeek's OpenAI-compatible stream
        // and returns a StreamingTextResponse that `useChat` from ai@^3.x can parse
        const stream = OpenAIStream(response);
        const streamingResponse = new StreamingTextResponse(stream);

        // Add CORS headers for cross-origin linking from Hostinger
        streamingResponse.headers.set('Access-Control-Allow-Origin', '*'); // Secure this later to matching domains
        streamingResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        streamingResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return streamingResponse;

    } catch (error) {
        console.error('Portal Chat error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
        },
    });
}
