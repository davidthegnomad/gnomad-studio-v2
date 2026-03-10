import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        // 1. Secure the endpoint (Zero-Trust)
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { zipCode, industry } = await request.json();

        if (!zipCode || !industry) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        // 2. Construct the ORACLE Prompt
        const systemPrompt = `Act as ORACLE, the Lead Intelligence Director and Market Cartographer for Gnomad Studio.
Your mission is to provide high-level competitive intelligence, deep web forensics, and psychological audience profiling. 

When tasked with generating a "Market Analysis & Competitive Brief", present the findings as a Competitive Briefing Report using the following structure:
* Executive Summary: 3-bullet "Key Findings."
* Persona Table: A markdown side-by-side comparison of 3 targeted demographics.
* Competitor SWOT Table: A breakdown of the top 3 rivals, detailing their tech stack, brand positioning, and UX score.
* Actionable Recommendation: One high-level strategy for market messaging.

Use a tone that is methodical, analytical, and sharp. Format the response entirely in cleanly formatted Markdown.`;

        const userPrompt = `Generate a Market Analysis & Competitive Brief for the ${industry} industry in the area surrounding ZIP code ${zipCode}.`;

        // 3. Call Local AI (MORPHEOUS Protocol: Llama 3 / Mistral via local Ollama)
        try {
            const ollamaRes = await fetch("http://localhost:11434/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3", // Switch to "mistral" if preferred
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    stream: false
                })
            });

            if (!ollamaRes.ok) {
                throw new Error("Ollama connection failed");
            }

            const ollamaData = await ollamaRes.json();
            const report = ollamaData.message.content;

            return NextResponse.json({ report });

        } catch (aiError) {
            console.error("AI Generation Error (Falling back to mock):", aiError);

            // Fallback for development if Ollama isn't running
            const fallbackReport = `### Executive Summary
* **High Demand:** ${industry} services in ${zipCode} show a 24% year-over-year search volume increase.
* **Digital Gap:** 80% of local competitors have outdated, non-responsive websites.
* **Price Sensitivity:** The market supports premium pricing for "done-foryou" convenience over budget alternatives.

### Persona Analysis
| Persona | Age | Income | Digital Habits | Pain Point |
|---|---|---|---|---|
| The Busy Professional | 35-45 | $95k+ | Heavy mobile user, trusts Google Reviews | Lack of time, values instant booking |
| The Retiring Boomer | 60-75 | Fixed | Desktop focused, reads "About Us" | Needs to build trust before calling |
| The New Homeowner | 28-35 | $75k+ | Instagram validation, price-compares | Overwhelmed by options, needs guidance |

### Competitor SWOT
| Competitor | Tech Stack / CMS | Positioning | UX Score (1-5) |
|---|---|---|---|
| Alpha ${industry} Co. | WordPress (Divi) | "Established 1995" | 2.5 (Slow mobile load) |
| Bob's Local Service | Wix | "Budget Friendly" | 3.0 (Clean but generic) |
| Elite ${industry} | Custom React | "Premium Luxury" | 4.5 (Fast, but confusing CTA) |

### Actionable Recommendation
**The Gap:** Leverage the "Busy Professional" persona by emphasizing a frictionless, instant-quote mobile experience. Launch a "Zero-Friction" landing page utilizing Next.js for sub-second load times, directly exploiting Alpha Co's slow mobile performance.

*(Note: This is a simulated fallback report as the local AI mesh is currently offline.)*`;

            return NextResponse.json({ report: fallbackReport });
        }

    } catch (error) {
        console.error("Tool API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
