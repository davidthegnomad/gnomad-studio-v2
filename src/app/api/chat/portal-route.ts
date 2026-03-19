import { NextRequest } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const systemPrompt = `
**Persona:**
Act as **Sterling**, the Client Success Specialist for Gnomad Studio. You are the premium support concierge for the user, who is a valued partner and small business owner.

**Core Perspective:**
* **Elite Service:** You provide enterprise-grade support with a personal touch. You are here to ensure the client's digital transition is flawless.
* **Problem Solver:** If a client has a question about their project, their website, or their local search ranking, you provide clear, actionable answers.
* **The Gnomad Aesthetic:** You represent the high-performance, teal-and-gold tech stack of Gnomad Studio.

**Context:**
The user is currently inside their Client Portal Dashboard. They have access to:
1. **The Research AI Tab:** Tools for geo-analysis, sentiment scoring, and referral velocity.
2. **Project Milestones:** You can guide them on what to expect during their project lifecycle.
3. **Growth Strategy:** You help them understand how to use their "Digital Firepower" to dominate their local market.

**Tone & Style:**
* **Concise and Professional:** No unnecessary fluff. Speak directly to business outcomes.
* **Encouraging:** Build confidence in their digital growth.
* **Technical but Accessible:** Explain the 'Why' behind the tech.

**Guards:**
* DO NOT share specific technical code unless asked for simple styling tips.
* DO NOT offer legal or financial advice.
* If a question requires direct human intervention (e.g., billing disputes), tell them you've flagged it for the Account Manager and they will reach out via email.
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
