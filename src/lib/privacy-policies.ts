export type PrivacySection = {
    heading: string;
    paragraphs?: string[];
    list?: string[];
};

export type PrivacyPolicy = {
    slug: string;
    productName: string;
    badge: string;
    metaDescription: string;
    intro: string;
    sections: PrivacySection[];
};

const contactSection: PrivacySection = {
    heading: "Contact Us",
    paragraphs: ["If you have any questions about this privacy policy, please contact us at:"],
    list: [
        "Email: support@gnomadstudio.org",
        "Website: https://gnomadstudio.org",
    ],
};

export const privacyPolicies: Record<string, PrivacyPolicy> = {
    "slate-privacy": {
        slug: "slate-privacy",
        productName: "Gnomad Slate Browser Extension",
        badge: "Gnomad Slate",
        metaDescription:
            "Privacy policy for the Gnomad Slate browser extension — local-first notes, Vault-X secrets, and optional encrypted sync.",
        intro:
            "At Gnomad Studio, we build local-first tools. This Privacy Policy explains how the Gnomad Slate browser extension processes your data.",
        sections: [
            {
                heading: "1. Our Core Privacy Philosophy",
                paragraphs: ["Gnomad Slate is built to be secure, private, and local-first:"],
                list: [
                    "We do not run any database servers, authentication portals, or sync servers.",
                    "We do not collect, read, transmit, or sell any of your notes or passwords.",
                    "No analytics trackers or telemetry scripts are bundled in the extension.",
                ],
            },
            {
                heading: "2. Data We Process and Where It Lives",
                paragraphs: [
                    "All information you input into Gnomad Slate remains in secure browser sandboxes or your own personal cloud accounts:",
                ],
                list: [
                    "Markdown Notes & Scratchpad: Saved locally in chrome.storage.local. Never sent to Gnomad Studio.",
                    "Vault-X Secrets: Encrypted client-side with AES-256-GCM (key derived via PBKDF2-HMAC-SHA256). Decrypted secrets exist only in temporary service-worker memory while unlocked.",
                    "Master Password: Never stored in plaintext — verified with salt + hash in local storage.",
                    "Clipboard History: Stored in chrome.storage.session only; cleared when the browser closes. Clipboard filtering runs locally in JavaScript.",
                ],
            },
            {
                heading: "3. Optional Cross-Device Synchronization",
                paragraphs: ["If you enable sync, data moves through channels you control:"],
                list: [
                    "Chrome Profile Sync: Uses chrome.storage.sync under your Google Account settings.",
                    "Google Drive AppData Sync: Encrypted notes sync to your personal appDataFolder with zero-knowledge encryption before upload.",
                ],
            },
            {
                heading: "4. Third-Party Permissions Declared",
                list: [
                    "storage — local notes, config, and encrypted vault",
                    "sidePanel — scratchpad in the browser side panel",
                    "identity — authorization to sync to your Google Drive",
                    "clipboardRead & clipboardWrite — copy passwords and clipboard history modal",
                    "notifications — sync success/failure alerts",
                ],
            },
            {
                heading: "5. Changes to This Policy",
                paragraphs: [
                    "We will never change Gnomad Slate to collect user data. New features remain opt-in and client-side encrypted.",
                ],
            },
            contactSection,
        ],
    },
    "gnomit-privacy": {
        slug: "gnomit-privacy",
        productName: "Gnomit Secure Secret Links",
        badge: "Gnomit",
        metaDescription:
            "Privacy policy for Gnomit — zero-knowledge, burn-after-read secret sharing. The server never sees your plaintext.",
        intro:
            "Gnomit is a burn-after-read secret link tool operated by Gnomad Studio. This policy explains what data passes through our servers and what never does.",
        sections: [
            {
                heading: "1. Zero-Knowledge Design",
                list: [
                    "Your secret is encrypted in your browser with AES-256-GCM before any network request.",
                    "The decryption key lives only in the URL fragment (#) — browsers do not send fragments to the server.",
                    "We store only ciphertext and an IV in Redis; we cannot decrypt your message.",
                    "After one successful read, the ciphertext is deleted (burn-after-read). Unread secrets expire after 24 hours.",
                ],
            },
            {
                heading: "2. Data We Temporarily Process",
                list: [
                    "Encrypted payload (base64 ciphertext + 12-byte IV) — stored in Redis with a random UUID.",
                    "Client IP address — used only for rate limiting and abuse prevention; not sold or profiled.",
                    "Request timestamps — minimal operational logging; no plaintext secrets are logged.",
                ],
            },
            {
                heading: "3. Data We Do Not Collect",
                list: [
                    "No user accounts or email addresses required to create a link.",
                    "No analytics or advertising trackers in the Gnomit web app.",
                    "No sale of personal data.",
                ],
            },
            {
                heading: "4. Third Parties",
                paragraphs: [
                    "When you self-host or use a Gnomad-operated instance, traffic is served over HTTPS. If you use a cloud LLM or paste service elsewhere, that is separate from Gnomit.",
                ],
            },
            {
                heading: "5. Your Responsibilities",
                list: [
                    "Anyone with the full link (including #key) can decrypt until burn or expiry.",
                    "Links in browser history, screenshots, or chat logs can expose secrets.",
                    "Gnomit cannot recover a lost decryption key.",
                ],
            },
            contactSection,
        ],
    },
    "desktop-assistant-privacy": {
        slug: "desktop-assistant-privacy",
        productName: "Gnomad Desktop Assistant",
        badge: "Desktop Assistant",
        metaDescription:
            "Privacy policy for Gnomad Desktop Assistant — local chat history, optional cloud AI, and OS keychain storage.",
        intro:
            "Gnomad Desktop Assistant is a local-first AI tray app for macOS, Windows, and Linux. This policy describes what stays on your device and what may be sent to AI providers you choose.",
        sections: [
            {
                heading: "1. Summary",
                list: [
                    "Chat sessions, knowledge files, and agent settings are stored on your device by default.",
                    "Gnomad Studio does not operate a centralized chat backend for the app.",
                    "Cloud mode sends prompts to DeepSeek under their API terms.",
                    "Local mode sends prompts only to the Ollama URL you configure (often localhost).",
                    "API keys are stored in your OS keychain, not on Gnomad servers.",
                ],
            },
            {
                heading: "2. Data Stored Locally",
                list: [
                    "Chat sessions — application data directory (gnomad/chats/)",
                    "Knowledge library — gnomad/knowledge/ (skills, uploads, preferences)",
                    "Agent settings & audit log — gnomad/agent-settings.json, agent-audit.jsonl",
                    "UI preferences — local app storage (theme, layout; non-secret)",
                ],
            },
            {
                heading: "3. Data Sent to Third Parties (Your Choice)",
                paragraphs: [
                    "DeepSeek (cloud): Message text, optional attachments, context (app name, window title, clipboard snippet), and knowledge excerpts are sent when you use Cloud provider.",
                    "Ollama (local): Data goes to the server URL you set. Localhost keeps processing on your machine; remote URLs send data to that operator.",
                    "Optional microphone dictation uses your OS speech service (Apple/Google/etc.) — not Gnomad servers.",
                ],
            },
            {
                heading: "4. Clipboard and Window Context",
                paragraphs: [
                    "Gnomad reads the frontmost app, window title, and clipboard locally for context pills. This data is included in prompts only when you send a message to your chosen model.",
                ],
            },
            {
                heading: "5. What We Do Not Do",
                list: [
                    "No Gnomad account required for the desktop app.",
                    "No sale of personal data.",
                    "No centralized chat sync to Gnomad Studio servers in current releases.",
                ],
            },
            contactSection,
        ],
    },
    "camping-sounds-privacy": {
        slug: "camping-sounds-privacy",
        productName: "Gnomad Camping Sounds",
        badge: "Camping Sounds",
        metaDescription:
            "Privacy policy for Gnomad Camping Sounds — a local wilderness ambience mixer with no accounts or tracking.",
        intro:
            "Gnomad Camping Sounds (Wilderness Mixer) is a browser-based ambience app. All mixing happens in your browser.",
        sections: [
            {
                heading: "1. Local-First Operation",
                list: [
                    "No user accounts or login.",
                    "No analytics SDK or telemetry in the app.",
                    "Audio loops are loaded from the app bundle or host; playback is client-side only.",
                ],
            },
            {
                heading: "2. Data Stored on Your Device",
                list: [
                    "Volume levels and preset selections may be saved in localStorage so your mix persists between visits.",
                    "Sleep timer preferences are kept in browser storage only.",
                ],
            },
            {
                heading: "3. Network Activity",
                paragraphs: [
                    "When hosted on gnomadstudio.org, davidcole.cloud, or similar, normal HTTPS page loads apply. The mixer itself does not phone home with usage data.",
                ],
            },
            {
                heading: "4. Children",
                paragraphs: ["The app is not directed at children under 13."],
            },
            contactSection,
        ],
    },
    "capture-privacy": {
        slug: "capture-privacy",
        productName: "Gnomad Capture Browser Extension",
        badge: "Gnomad Capture",
        metaDescription:
            "Privacy policy for Gnomad Capture — full-page screen capture, stitching, and export with no external servers.",
        intro:
            "Gnomad Capture is a Chrome extension for full-page capture and export. All capture and stitching runs locally in your browser.",
        sections: [
            {
                heading: "1. Data Collection",
                list: [
                    "Gnomad Capture does not collect, store on our servers, or transmit your personal data.",
                    "No tracking cookies or third-party analytics.",
                    "No Gnomad-operated backend receives your screenshots.",
                ],
            },
            {
                heading: "2. Permissions and Local Processing",
                list: [
                    "activeTab & scripting — capture the visible page and automated scroll-stitching",
                    "storage — temporarily hold image chunks locally for stitching",
                    "downloads — save PNG/PDF when you click export",
                    "clipboardWrite — copy to clipboard when you explicitly request it",
                ],
            },
            {
                heading: "3. Third-Party Libraries",
                paragraphs: [
                    "jsPDF runs entirely in the extension to generate PDFs. No data is sent to external servers during export.",
                ],
            },
            {
                heading: "4. Security",
                paragraphs: [
                    "Capture and editing occur in the browser sandbox. Your images leave the device only if you save or copy them yourself.",
                ],
            },
            contactSection,
        ],
    },
    "gnome-kan-do-privacy": {
        slug: "gnome-kan-do-privacy",
        productName: "Gnome-Kan-Do Browser Extension",
        badge: "Gnome-Kan-Do",
        metaDescription:
            "Privacy policy for Gnome-Kan-Do — a local-only Kanban new-tab extension with no cloud sync.",
        intro:
            "Gnome-Kan-Do is a local-first Kanban board Chrome extension. Your tasks never leave your browser unless you export them yourself.",
        sections: [
            {
                heading: "1. Data Collection and Storage",
                list: [
                    "We do not collect, transmit, or sell personal data.",
                    "Tasks, columns, and settings are stored locally via chrome.storage.local.",
                    "No Gnomad cloud database or account system.",
                ],
            },
            {
                heading: "2. Permissions",
                list: [
                    "storage — save your Kanban board locally",
                    "contextMenus — right-click to plant a task from selected text",
                    "activeTab — read the current page URL when you use Plant Task (not continuous tracking)",
                ],
            },
            {
                heading: "3. Third-Party Services",
                paragraphs: [
                    "No analytics, ads, or third-party tracking scripts. The extension works offline aside from loading its own local assets.",
                ],
            },
            contactSection,
        ],
    },
    "midnight-gnomad-privacy": {
        slug: "midnight-gnomad-privacy",
        productName: "Midnight Gnomad Browser Extension",
        badge: "Midnight Gnomad",
        metaDescription:
            "Privacy policy for Midnight Gnomad — a local dark-mode extension with no browsing data collection.",
        intro:
            "Midnight Gnomad applies client-side dark-mode filters in your browser. It does not report your browsing activity to Gnomad Studio.",
        sections: [
            {
                heading: "1. Local-Only Processing",
                list: [
                    "CSS inversion and dark-mode detection run entirely on your device.",
                    "No Gnomad servers receive page content, URLs, or browsing history.",
                    "No analytics or advertising networks.",
                ],
            },
            {
                heading: "2. Data Stored Locally",
                list: [
                    "Global on/off state — chrome.storage.local",
                    "Per-domain exclude list — chrome.storage.local",
                ],
            },
            {
                heading: "3. Permissions",
                list: [
                    "storage — remember your preferences and domain blacklist",
                    "activeTab — apply styles to the tab you are viewing",
                    "host_permissions (<all_urls>) — inject dark-mode styles on pages you visit; no data is uploaded because of this permission",
                ],
            },
            {
                heading: "4. Changes",
                paragraphs: [
                    "We may update this policy when permissions or behavior change. Material updates will be reflected here.",
                ],
            },
            contactSection,
        ],
    },
    "mobile-meme-privacy": {
        slug: "mobile-meme-privacy",
        productName: "Gnomad Mobile Meme App",
        badge: "Mobile Meme",
        metaDescription:
            "Privacy policy for Gnomad's Mobile Meme App — local canvas meme creation with no cloud upload.",
        intro:
            "Gnomad's Mobile Meme App is a Capacitor-based meme generator. Images and text you add are processed on your device.",
        sections: [
            {
                heading: "1. Data We Process",
                list: [
                    "Photos you pick from your device gallery are loaded into an in-memory canvas — not uploaded to Gnomad Studio.",
                    "Meme text you type stays on-device until you export.",
                    "Exported memes are saved only where you choose (Downloads, Photos, share sheet).",
                ],
            },
            {
                heading: "2. Data We Do Not Collect",
                list: [
                    "No user accounts or login.",
                    "No analytics SDK in the current app.",
                    "No automatic upload of images or text to Gnomad servers.",
                    "No sale of personal data.",
                ],
            },
            {
                heading: "3. Network Access",
                paragraphs: [
                    "The core meme editor works offline. Network access, if requested by the OS wrapper, is not used to transmit your creations to us.",
                ],
            },
            {
                heading: "4. Mobile Permissions",
                paragraphs: [
                    "On Android/iOS, the app may request storage or photo-library access so you can pick images and save exports. Denying permission limits those features but does not send data to us.",
                ],
            },
            contactSection,
        ],
    },
};

export const privacySlugs = Object.keys(privacyPolicies);

export function getPrivacyPolicy(slug: string): PrivacyPolicy | undefined {
    return privacyPolicies[slug];
}

export function buildPrivacyMetadata(slug: string) {
    const policy = privacyPolicies[slug];
    if (!policy) return {};
    return {
        title: `${policy.productName} Privacy Policy | Gnomad Studio`,
        description: policy.metaDescription,
        alternates: { canonical: `https://gnomadstudio.org/${slug}` },
        robots: { index: true, follow: true },
    };
}
