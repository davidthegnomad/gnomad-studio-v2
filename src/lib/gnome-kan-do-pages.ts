import type { ExtensionProduct } from "@/components/ExtensionProductPage";

export const gnomeKanDoProduct: ExtensionProduct = {
    badge: "Gnome-Kan-Do",
    name: "Gnome-Kan-Do",
    tagline: "Cultivate focus. Harvest productivity.",
    description:
        "A local-only Kanban board Chrome extension with a pixel-art garden theme. Organize tasks in Sprouting, Growing, and Harvested columns — with a gnome who keeps you honest about work-in-progress limits.",
    features: [
        {
            title: "Garden Kanban",
            description:
                "Drag tasks through Sprouting, Growing, and Harvested columns. Visual WIP warnings appear when your Growing column gets overcrowded.",
        },
        {
            title: "Plant from the web",
            description:
                "Highlight text on any page, right-click, and Plant a Task. The source URL is saved automatically.",
        },
        {
            title: "Private & offline",
            description:
                "All tasks stay on your device via chrome.storage.local. No accounts, no cloud sync, no tracking.",
        },
    ],
    homeHref: "/gnome-kan-do",
    privacyHref: "/gnome-kan-do-privacy",
    supportHref: "/gnome-kan-do-support",
    contactEmail: "support@gnomadstudio.org",
    faqs: [
        {
            question: "Where is my data stored?",
            answer: "All data is stored locally on your machine using Chrome's local storage. Gnomad Studio does not receive your tasks.",
        },
        {
            question: "Why is the gnome angry?",
            answer: 'If you have more than 3 tasks in the "Growing" column, the gnome gets stressed. Finish or move tasks to calm him down.',
        },
        {
            question: "How do I delete a task?",
            answer: 'Click the trash icon on any card. Harvested tasks auto-clear after 3 seconds by default — turn this off in Settings.',
        },
        {
            question: "How do I add a task from a webpage?",
            answer: 'Select text on any page, right-click, and choose "Plant a Task". The page title and URL are attached automatically.',
        },
        {
            question: "Can I back up my tasks?",
            answer: "Yes. Open Settings (gear icon) and use Export JSON / Import JSON.",
        },
        {
            question: "How do I change the WIP limit?",
            answer: "Open Settings and adjust the Growing column limit (default is 3).",
        },
    ],
};

export const gnomeKanDoHomeMetadata = {
    title: "Gnome-Kan-Do | Pixel Garden Kanban Chrome Extension",
    description:
        "Gnome-Kan-Do is a local-only Kanban new-tab extension with a pixel-art garden theme. Plant tasks, track WIP limits, and keep your data private.",
    alternates: { canonical: "https://gnomadstudio.org/gnome-kan-do" },
};

export const gnomeKanDoSupportMetadata = {
    title: "Gnome-Kan-Do Support | Gnomad Studio",
    description: "Get help with the Gnome-Kan-Do Chrome extension — FAQs and contact support.",
    alternates: { canonical: "https://gnomadstudio.org/gnome-kan-do-support" },
};
