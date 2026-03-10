import { Metadata } from "next";
import AdvisoryPage from "./page";

export const metadata: Metadata = {
    title: "Gnomad Advisory | Business Consulting & Data Analyst | Muskogee, OK",
    description: "Elite operational efficiency, data visibility, and hyperautomation consulting for established businesses in Muskogee and the 918 region. Stop running your million-dollar business on spreadsheets.",
    keywords: ["business analyst Muskogee", "business consulting Muskogee", "operational efficiency", "data analytics Oklahoma", "Lean Six Sigma Tulsa", "Power BI dashboards", "AI integration consulting"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
