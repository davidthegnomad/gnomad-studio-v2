export function generateStaticParams() {
    return [
        { toolId: "forensic-competitive-stack" },
        { toolId: "audience-spending-leakage" },
        { toolId: "blue-ocean-gap" },
        { toolId: "traffic-source-check" },
        { toolId: "message-to-market-audit" },
        { toolId: "friction-hunter-audit" },
        { toolId: "blue-margin-layering" },
        { toolId: "fixed-cost-vulnerability" },
        { toolId: "strategic-capital-allocation" },
        { toolId: "market-research" },
        { toolId: "competitive-analysis" },
        { toolId: "marketing-effectiveness" }
    ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
