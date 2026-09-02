// ── MSRX app catalog ──────────────────────────────────────────────────────────
// Single source of truth for every app MSRX ships. Powers the homepage index,
// /apps, the per-app routes at /apps/[slug], the footer sitemap, JSON-LD, and
// llms.txt. Every field here must be factually true — this data is published as
// structured data and read by search and AI crawlers.
//
// Accent colours are AA-compliant (>= 4.5:1) against white, because they are used
// as link text on the app cards, not only as decoration.

export type Platform = "web" | "macos" | "ios";

export type Category =
  | "Study"
  | "Creative"
  | "Productivity"
  | "Utilities"
  | "Security";

export interface App {
  /** URL segment under /apps/. Stable — changing one breaks an indexed page. */
  slug: string;
  name: string;
  /** Two-letter monogram shown on cards. */
  initials: string;
  /** Optional app icon, shown on the app's own page in place of the monogram.
   *  Cards keep the monogram so the catalog grid stays uniform. */
  iconSrc?: string;
  /** AA against white; as text on dark surfaces it is lifted via .accent-text. */
  accent: string;
  platform: Platform;
  category: Category;
  /** Where the app lives. Web apps → their subdomain; native → App Store. */
  href: string;
  /** Set when an app ships on both the web and the Mac App Store. */
  macAppStoreHref?: string;
  /** Call to action on the card, e.g. "Open web app". */
  actionLabel: string;
  /** One line, sentence case, no period. Used in the index and card subtitles. */
  tagline: string;
  /** Full paragraph. Used on the app page and in SoftwareApplication schema. */
  description: string;
  /** Concrete capabilities, drawn from what the app actually does. */
  features: string[];
  /** Deep links into the app's own pages. Feeds cross-domain internal linking. */
  tools?: { label: string; href: string }[];
}

/**
 * How many tools tools.msrx.co.in ships. It states this on its own homepage and
 * the number grows — it was 88 in July and 116 by late August — so it lives in
 * one place and every sentence about it is built from here. Update this line
 * only, and check the live site first: this is a claim, not an estimate.
 */
export const TOOLS_APP_COUNT = 116;

export const apps: App[] = [
  // ── Web ─────────────────────────────────────────────────────────────────────
  {
    slug: "planner",
    name: "MSRX Planner",
    initials: "MP",
    accent: "#15803D",
    platform: "web",
    category: "Study",
    href: "https://planner.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "An academic workspace that plans your week with you",
    description:
      "An AI-powered academic workspace for JEE, NEET, CBSE, ICSE and college students. Plan your week with a drag-and-drop planner, take rich notes, track assignments and exams, build flashcards with spaced-repetition revision, share work in study groups, and watch your knowledge health grow. Works offline and syncs across devices.",
    features: [
      "Drag-and-drop weekly planner with time blocking",
      "Rich note-taking built around your subjects",
      "Assignment and exam tracking",
      "Flashcards with spaced-repetition revision",
      "Study groups for shared workspaces",
      "Knowledge health scoring across every subject",
      "Works offline and syncs across devices",
    ],
    tools: [
      { label: "Smart Planner", href: "https://planner.msrx.co.in/planner" },
      { label: "Rich Notes", href: "https://planner.msrx.co.in/notes" },
      { label: "Flashcards & Revision", href: "https://planner.msrx.co.in/revision" },
      { label: "Study Groups", href: "https://planner.msrx.co.in/groups" },
      { label: "Knowledge Health", href: "https://planner.msrx.co.in/dashboard" },
    ],
  },
  {
    slug: "storyquest",
    name: "MSRX StoryQuest",
    initials: "SQ",
    accent: "#A21CAF",
    platform: "web",
    category: "Study",
    href: "https://story.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "202 STEM missions where the answer comes from a real equation",
    description:
      "Over 200 hands-on STEM missions for classes 1 to 10 — free, no sign-up, works on any phone. Every mission drops you into a system that is going wrong: a crane tipping, a circuit overloading, a pond losing its fish. You get one real variable and a live lab. Move it until the actual equation balances. Physics, chemistry, maths and biology, solved from the relationship rather than guessed.",
    features: [
      "202 missions spanning classes 1 to 10",
      "Every answer is solved from a real equation, never a made-up target",
      "Live lab with one controllable variable per mission",
      "Physics, chemistry, maths and biology",
      "Runs on any phone browser",
      "Free with no sign-up",
    ],
    tools: [
      { label: "Mission Library", href: "https://story.msrx.co.in/missions" },
      { label: "Physics Missions", href: "https://story.msrx.co.in/missions/physics-01" },
      { label: "Chemistry Missions", href: "https://story.msrx.co.in/missions/chemistry-01" },
      { label: "Maths Missions", href: "https://story.msrx.co.in/missions/mathematics-01" },
      { label: "Biology Missions", href: "https://story.msrx.co.in/missions/biology-01" },
    ],
  },
  {
    slug: "weatherwatch",
    name: "MSRX WeatherWatch",
    initials: "WW",
    accent: "#0369A1",
    platform: "web",
    category: "Utilities",
    href: "https://weather.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "Weather and multi-hazard early warning in 14 languages",
    description:
      "An AI-powered weather and multi-hazard early-warning platform. Live conditions, 7-day forecasts, UV and air quality, and 15 hazard engines covering storms, floods, heat and more, with an AI weather assistant that answers in 14 languages. Free, no sign-up, privacy-first.",
    features: [
      "Live conditions and 7-day forecasts",
      "15 hazard engines including storms, floods and heat",
      "UV index and air quality",
      "AI weather assistant across 14 languages",
      "Works offline once loaded",
      "Free with no sign-up",
    ],
    tools: [
      { label: "Live Weather", href: "https://weather.msrx.co.in" },
      { label: "7-Day Forecast", href: "https://weather.msrx.co.in/#analytics" },
      { label: "Weather Highlights", href: "https://weather.msrx.co.in/#highlights" },
      { label: "Insights", href: "https://weather.msrx.co.in/insights" },
      { label: "FAQ", href: "https://weather.msrx.co.in/faq" },
    ],
  },
  {
    slug: "jee-hyperlab",
    name: "JEE HyperLab",
    initials: "JH",
    accent: "#4338CA",
    platform: "web",
    category: "Study",
    href: "https://lab.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "204 interactive PCM simulations for IIT-JEE",
    description:
      "An interactive STEM lab for IIT-JEE that makes all of Physics, Chemistry and Maths visible. Explore 204 simulations in 2D and 3D, change live parameters to see what the equations actually do, and generate exam-grade questions with step-by-step solutions.",
    features: [
      "204 simulations across Physics, Chemistry and Maths",
      "2D and 3D visualisation with live parameter control",
      "Exam-grade question generation with worked solutions",
      "Command palette and favourites for fast navigation",
      "Full IIT-JEE PCM coverage",
      "Free with no sign-up",
    ],
    tools: [
      { label: "Physics Sims", href: "https://lab.msrx.co.in/physics" },
      { label: "Chemistry Sims", href: "https://lab.msrx.co.in/chemistry" },
      { label: "Maths Sims", href: "https://lab.msrx.co.in/mathematics" },
      { label: "Projectile Motion", href: "https://lab.msrx.co.in/sim/projectile-motion" },
      { label: "All Simulations", href: "https://lab.msrx.co.in/sim/" },
    ],
  },
  {
    slug: "graphiq",
    name: "MSRX GraphIQ",
    initials: "GQ",
    accent: "#9333EA",
    platform: "web",
    category: "Creative",
    href: "https://graph.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "Spreadsheet in, 2D and 3D charts out",
    description:
      "Turn spreadsheets into 2D and 3D visualisations, dashboards and AI-generated insights. Drop in a CSV or Excel file and get a presentation-ready chart in seconds, with editable cells and an axis quick-bar for fine control.",
    features: [
      "CSV and Excel import",
      "2D and 3D chart types",
      "Multi-chart dashboards",
      "AI-generated insights from your data",
      "Editable cells and axis quick-bar",
      "Free with no sign-up",
    ],
    tools: [
      { label: "CSV to Chart", href: "https://graph.msrx.co.in/csv-to-chart" },
      { label: "Excel to Chart", href: "https://graph.msrx.co.in/excel-to-chart" },
      { label: "3D Charts", href: "https://graph.msrx.co.in/3d-chart-maker" },
      { label: "Dashboards", href: "https://graph.msrx.co.in/dashboard-maker" },
      { label: "Graph Maker", href: "https://graph.msrx.co.in/online-graph-maker" },
    ],
  },
  {
    slug: "canvasiq",
    name: "MSRX CanvasIQ",
    initials: "CQ",
    accent: "#1D4ED8",
    platform: "web",
    category: "Creative",
    href: "https://canvas.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "Drawing, diagrams and 3D with an AI copilot",
    description:
      "A visual creation studio covering 2D drawing, vector design, diagrams and interactive 3D modelling, with an AI copilot that turns text into graphics. Ships 40+ templates and exports to PNG, SVG, PDF and 3D formats. No sign-up, nothing stored.",
    features: [
      "2D drawing and vector design",
      "Diagramming with flowchart, UML and wireframe templates",
      "Interactive 3D modelling",
      "AI copilot that turns text prompts into graphics",
      "40+ starting templates",
      "PNG, SVG, PDF and 3D export",
    ],
    tools: [
      { label: "AI Drawing", href: "https://canvas.msrx.co.in/workspace" },
      { label: "Flowchart Maker", href: "https://canvas.msrx.co.in/templates/basic-flowchart" },
      { label: "Wireframe Kit", href: "https://canvas.msrx.co.in/templates/mobile-app-wireframe" },
      { label: "UML Diagrams", href: "https://canvas.msrx.co.in/templates/uml-class-diagram" },
      { label: "Kanban Board", href: "https://canvas.msrx.co.in/templates/kanban-board" },
    ],
  },
  {
    slug: "qr-studio",
    name: "MSRX QR Studio",
    initials: "QS",
    accent: "#0E7490",
    platform: "web",
    category: "Creative",
    href: "https://qr.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "21 QR types with gradients, logos and health scoring",
    description:
      "A QR design studio covering 21 QR types with gradients, logos, 30+ frames and editable templates. Real-time health scoring tells you whether a code will actually scan, and one-click optimise fixes it when it will not. Runs entirely in your browser with no login.",
    features: [
      "21 QR code types including URL, WiFi and vCard",
      "Gradient fills, embedded logos and 30+ frames",
      "Editable templates",
      "Real-time scan health scoring",
      "One-click optimise",
      "Runs in-browser with no login",
    ],
    tools: [
      { label: "URL QR Code", href: "https://qr.msrx.co.in" },
      { label: "WiFi QR Code", href: "https://qr.msrx.co.in" },
      { label: "vCard QR", href: "https://qr.msrx.co.in" },
      { label: "AI Designer", href: "https://qr.msrx.co.in" },
      { label: "Frames", href: "https://qr.msrx.co.in" },
    ],
  },
  {
    slug: "meeting",
    name: "MSRX Meeting",
    initials: "MM",
    accent: "#2563EB",
    platform: "web",
    category: "Productivity",
    href: "https://meeting.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "Encrypted video rooms with live AI transcription",
    description:
      "Private, encrypted video rooms with no sign-up and no install, running in any browser. Up to 5 people at HD 1080p with noise cancellation. AI transcribes the call live, answers questions mid-meeting and writes the summary afterwards. Recording is local-only and nothing is stored on MSRX servers.",
    features: [
      "Up to 5 participants at HD 1080p",
      "End-to-end encrypted peer-to-peer media",
      "Live AI transcription",
      "Questions answered mid-call from the transcript",
      "Automatic meeting summary",
      "Noise cancellation and local-only recording",
    ],
    tools: [
      { label: "Start Meeting", href: "https://meeting.msrx.co.in" },
      { label: "AI Transcription", href: "https://meeting.msrx.co.in" },
      { label: "Smart Summary", href: "https://meeting.msrx.co.in" },
      { label: "Noise Cancel", href: "https://meeting.msrx.co.in" },
    ],
  },
  {
    slug: "pulsenet",
    name: "OrionPulseNet",
    initials: "PN",
    accent: "#7C3AED",
    platform: "web",
    category: "Utilities",
    href: "https://pulsenet.msrx.co.in",
    macAppStoreHref: "https://apps.apple.com/us/app/orionpulsenet/id6766838207?mt=12",
    actionLabel: "Open web app",
    tagline: "Speed tests, 16 diagnostics and a copilot for your connection",
    description:
      "Network intelligence for people who want to know why their connection is slow. Real-time speed tests with AI analysis, 16 diagnostic tools including DNS lookup and SSL checking, and an AI copilot that reads the results and tells you what to do. Available as a web app and as a native Mac app.",
    features: [
      "Real-time speed tests with AI analysis",
      "16 network diagnostic tools",
      "DNS lookup and SSL certificate checking",
      "AI copilot that interprets your results",
      "Uptime, latency and health monitoring",
      "Free with no sign-up",
    ],
    tools: [
      { label: "Speed Test", href: "https://pulsenet.msrx.co.in/speed-test" },
      { label: "AI Copilot", href: "https://pulsenet.msrx.co.in/copilot" },
      { label: "DNS Lookup", href: "https://pulsenet.msrx.co.in/tools" },
      { label: "SSL Checker", href: "https://pulsenet.msrx.co.in/tools" },
      { label: "Network Tools", href: "https://pulsenet.msrx.co.in/tools" },
    ],
  },
  {
    slug: "incognitocv",
    name: "IncognitoCV",
    initials: "IC",
    accent: "#0F766E",
    platform: "web",
    category: "Productivity",
    href: "https://cv.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "Match your CV to a job description before you send it",
    description:
      "Paste any job description, upload your CV, and get instant feedback on ATS score, skills gaps and suggested rewrites. Anonymous and free — nothing you upload is ever stored.",
    features: [
      "ATS compatibility scoring",
      "Skills-gap analysis against a specific job",
      "Suggested rewrites for weak sections",
      "Job-match scoring",
      "Anonymous with nothing stored",
    ],
    tools: [
      { label: "ATS Score", href: "https://cv.msrx.co.in" },
      { label: "CV Rewriter", href: "https://cv.msrx.co.in" },
      { label: "Skills Gap", href: "https://cv.msrx.co.in" },
      { label: "Job Match", href: "https://cv.msrx.co.in" },
    ],
  },
  {
    slug: "easy-peasy-gantt",
    name: "Easy-Peasy Gantt",
    initials: "EG",
    accent: "#4F46E5",
    platform: "web",
    category: "Productivity",
    href: "https://gantt.msrx.co.in",
    actionLabel: "Open web app",
    tagline: "Presentation-ready Gantt charts in seconds",
    description:
      "A Gantt chart maker for people who need a clear timeline, not project management software. Build a presentation-ready chart in seconds with 12 themes, critical-path highlighting, milestones and PNG export.",
    features: [
      "12 chart themes",
      "Critical-path highlighting",
      "Milestone markers",
      "AI-guided schedule insights",
      "PNG export at presentation resolution",
      "Free with no sign-up",
    ],
    tools: [
      { label: "AI Insights", href: "https://gantt.msrx.co.in" },
      { label: "Themes", href: "https://gantt.msrx.co.in" },
      { label: "Critical Path", href: "https://gantt.msrx.co.in" },
      { label: "Milestones", href: "https://gantt.msrx.co.in" },
    ],
  },
  {
    slug: "tools",
    name: "MSRX Tools",
    initials: "MT",
    accent: "#0F766E",
    platform: "web",
    category: "Utilities",
    href: "https://tools.msrx.co.in",
    actionLabel: "Open web app",
    tagline: `${TOOLS_APP_COUNT} file, image and text tools that never upload your files`,
    description:
      `A suite of ${TOOLS_APP_COUNT} everyday utilities across seven groups — merge and split PDFs, compress convert crop and watermark images, zip and unzip archives, format and validate JSON, encode and decode Base64 and URLs, encrypt a file with a passphrase, and a set of calculators and generators. Every one runs entirely inside your own browser, so your files are read on your device and never uploaded. Free, no account, and it keeps working offline.`,
    features: [
      "Merge, split, organise and extract pages from PDFs",
      "Compress, convert, resize, crop, rotate and watermark images",
      "Zip and unzip archives without installing anything",
      "Format, validate and convert JSON and other text data",
      "Base64, URL and HTML-entity encoding and decoding",
      "Encrypt and decrypt a file with a passphrase",
      "Calculators and generators — EMI, GST, SIP, unit conversion and more",
      "Everything runs in your browser — files are never uploaded",
      "Free, no account, works offline",
    ],
    tools: [
      { label: "Merge PDF", href: "https://tools.msrx.co.in/pdf/merge-pdf" },
      { label: "Compress Image", href: "https://tools.msrx.co.in/image/compress-image" },
      { label: "Convert Image", href: "https://tools.msrx.co.in/image/convert-image" },
      { label: "Base64 Encode", href: "https://tools.msrx.co.in/dev/base64-encode" },
      { label: "Loan EMI Calculator", href: "https://tools.msrx.co.in/calculator/loan-emi-calculator" },
    ],
  },

  // ── macOS ───────────────────────────────────────────────────────────────────
  {
    slug: "canvas-ai",
    name: "MSRX Canvas AI",
    initials: "CA",
    accent: "#5B21B6",
    platform: "macos",
    category: "Creative",
    href: "https://apps.apple.com/us/app/msrx-canvas-ai/id6784137969?mt=12",
    actionLabel: "Mac App Store",
    tagline: "Paint and annotate screenshots with on-device AI",
    description:
      "A paint and annotation studio for the Mac. Draw, sketch and mark up screenshots with AI that runs entirely on your device. Fast, private and fully offline — nothing leaves your Mac.",
    features: [
      "Freehand drawing and painting tools",
      "Screenshot annotation",
      "On-device AI with no network calls",
      "Works fully offline",
      "Native Mac app",
    ],
  },
  {
    slug: "orionseek",
    name: "OrionSeek",
    initials: "OS",
    accent: "#166534",
    platform: "macos",
    category: "Utilities",
    href: "https://apps.apple.com/us/app/orionseek/id6770491595?mt=12",
    actionLabel: "Mac App Store",
    tagline: "Find anything on your Mac instantly",
    description:
      "A system search utility for macOS built for speed. Search across your Mac and get results as you type.",
    features: [
      "Fast system-wide search",
      "Results as you type",
      "Native Mac app",
    ],
  },
  {
    slug: "orionshield",
    // Renamed on the App Store; the slug stays so the indexed URL survives.
    name: "MSRX Shield",
    initials: "MS",
    accent: "#C2410C",
    platform: "macos",
    category: "Security",
    href: "https://apps.apple.com/us/app/orionshield/id6764576967?mt=12",
    actionLabel: "Mac App Store",
    tagline: "Security and privacy protection that stays out of the way",
    description:
      "Security and privacy protection for macOS that runs quietly in the background, keeping threats away without interrupting your work.",
    features: [
      "Background threat protection",
      "Privacy safeguards",
      "Low-noise, low-interruption design",
      "Native Mac app",
    ],
  },
  {
    slug: "orion-process-explorer",
    name: "Orion Process Explorer",
    initials: "PE",
    accent: "#BE123C",
    platform: "macos",
    category: "Utilities",
    href: "https://apps.apple.com/us/app/orionprocessexplorer/id6762134959?mt=12",
    actionLabel: "Mac App Store",
    tagline: "See exactly what your Mac is doing",
    description:
      "A system resource monitor for macOS. Inspect running processes and see where your CPU, memory and energy are actually going.",
    features: [
      "Live process inspection",
      "CPU, memory and energy usage",
      "System resource monitoring",
      "Native Mac app",
    ],
  },
  {
    slug: "orionclean",
    // Renamed on the App Store; the slug stays so the indexed URL survives.
    name: "MSRX Clean",
    initials: "MC",
    accent: "#115E59",
    platform: "macos",
    category: "Utilities",
    href: "https://apps.apple.com/us/app/orionclean/id6761111012?mt=12",
    actionLabel: "Mac App Store",
    tagline: "Reclaim disk space without losing what matters",
    description:
      "Disk cleanup for macOS that finds space you can safely reclaim and leaves alone the things you cannot afford to lose.",
    features: [
      "Reclaimable-space scanning",
      "Safe-by-default cleanup",
      "Native Mac app",
    ],
  },

  // ── iOS ─────────────────────────────────────────────────────────────────────
  {
    slug: "guardtrack-pro",
    name: "GuardTrack Pro",
    initials: "GT",
    accent: "#3730A3",
    platform: "ios",
    category: "Productivity",
    href: "https://apps.apple.com/us/app/guardtrack-pro/id6774895956",
    actionLabel: "App Store",
    tagline: "Patrols, incidents and reports for security teams",
    description:
      "Security team management for iPhone and iPad. Run patrols, log incidents and produce reports from the field.",
    features: [
      "Patrol scheduling and tracking",
      "Incident logging",
      "Field reporting",
      "iPhone and iPad",
    ],
  },
  {
    slug: "numly",
    // Renamed on the App Store; the slug stays so the indexed URL survives.
    name: "MSRX AI Calculator",
    initials: "AC",
    accent: "#B45309",
    platform: "ios",
    category: "Utilities",
    href: "https://apps.apple.com/us/app/numly-ai-smart-calculator/id6759639887",
    actionLabel: "App Store",
    tagline: "A calculator that understands plain English",
    description:
      "A calculator for iPhone and iPad that reads natural language as readily as it reads symbols. Type what you mean and get the answer, including for complex multi-step expressions.",
    features: [
      "Natural-language input",
      "Complex multi-step expressions",
      "iPhone and iPad",
    ],
  },
  {
    slug: "pdf-compressor",
    name: "MSRX PDF Compressor",
    initials: "PC",
    iconSrc: "/apps/pdf-compressor.png",
    accent: "#7C3AED",
    platform: "ios",
    category: "Utilities",
    href: "https://apps.apple.com/us/app/msrx-pdf-compressor/id6759563556",
    actionLabel: "App Store",
    tagline: "Shrink PDFs without turning the text into pictures",
    description:
      "Most PDF compressors flatten every page to an image, so the file shrinks but the text stops being selectable, searchable or readable aloud. This one decides page by page: text pages keep their text, scans get re-encoded. Everything runs on the device.",
    features: [
      "Decides page by page: text pages keep their text, scans are re-encoded",
      "Fits a file under 5, 10, 20 or 25 MB by testing real pages",
      "Shows where the megabytes are before you compress",
      "Compares the original and the result side by side, page by page",
      "Compresses batches, with per-file results and a combined total",
      "History with a running total of everything saved",
      "Greyscale conversion for scans and photographs",
      "Compresses from any app's share sheet, and from Shortcuts",
      "Dark Mode, Dynamic Type and VoiceOver throughout",
      "No uploads, no accounts, no network access at all",
      "Free, with no ads or in-app purchases",
      "iPhone and iPad",
    ],
  },
  {
    slug: "passportfast",
    name: "MSRX PassportFast",
    initials: "PF",
    accent: "#047857",
    platform: "ios",
    category: "Utilities",
    href: "https://apps.apple.com/us/app/passportfast/id6759985939",
    actionLabel: "App Store",
    tagline: "Passport photos, measured",
    description:
      "A passport photo is refused on head height and eye line, not on its outer dimensions. This solves the crop from your face, shows the millimetres it achieved against the published rule, and tells you when an authority will not accept an app-made photo at all.",
    features: [
      "Head height and eye line drive the crop",
      "A camera guide that goes green only when the crop would pass",
      "Twelve formats, each with its authority and the date it was read",
      "Print sheets and PDF at true physical size",
      "Everything on device — no account, no network",
      "iPhone and iPad",
    ],
  },
];

// ── Derived views ─────────────────────────────────────────────────────────────

export const PLATFORM_LABEL: Record<Platform, string> = {
  web: "Web",
  macos: "macOS",
  ios: "iPhone & iPad",
};

/** Short tag used in the homepage index rows and card badges. */
export const PLATFORM_TAG: Record<Platform, string> = {
  web: "WEB",
  macos: "MAC",
  ios: "iOS",
};

/**
 * Every platform an app actually ships on. `platform` names the primary one;
 * a `macAppStoreHref` on a non-Mac app means it also ships natively on the Mac.
 * Derived rather than stored so the two can never disagree — and so the app
 * stays ONE catalog entry. It was listed twice once; that is what caused drift.
 */
export function platformsOf(app: App): Platform[] {
  return app.macAppStoreHref && app.platform !== "macos"
    ? [app.platform, "macos"]
    : [app.platform];
}

export function isDualPlatform(app: App): boolean {
  return platformsOf(app).length > 1;
}

/** "WEB" — or "WEB · MAC" for an app that ships on both. */
export function platformTag(app: App): string {
  return platformsOf(app)
    .map((p) => PLATFORM_TAG[p])
    .join(" · ");
}

/** "Web" — or "Web & macOS". */
export function platformLabel(app: App): string {
  return platformsOf(app)
    .map((p) => PLATFORM_LABEL[p])
    .join(" & ");
}

// Platform groupings. An app on two platforms appears in both — these are views
// of the catalog, not a partition of it, so `apps.length` stays the real count.
export const webApps = apps.filter((a) => platformsOf(a).includes("web"));
export const macApps = apps.filter((a) => platformsOf(a).includes("macos"));
export const iosApps = apps.filter((a) => platformsOf(a).includes("ios"));

export function getApp(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug);
}

/**
 * The most recently launched app. Drives the homepage spotlight and its "new"
 * label — update this one line when the next app ships, and every surface that
 * announces it follows. Throws at build if the slug is wrong, so a typo cannot
 * quietly leave the spotlight empty.
 */
export const NEWEST_SLUG = "tools";

export const newest = (() => {
  const found = apps.find((a) => a.slug === NEWEST_SLUG);
  if (!found) throw new Error(`NEWEST_SLUG names a missing app: ${NEWEST_SLUG}`);
  return found;
})();

/**
 * Spelled-out counts, so prose can stay literate without hardcoding a number
 * that goes stale the moment an app ships. Falls back to the numeral above the
 * range a sentence would ever spell out anyway.
 */
const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one",
  "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six",
  "twenty-seven", "twenty-eight", "twenty-nine", "thirty",
];

export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/** "Twenty-one" — capitalised, for the start of a sentence or a headline. */
export function NumberWord(n: number): string {
  const w = numberWord(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

/** Web apps that open with no account. Planner is the one that asks for one. */
export const ACCOUNT_REQUIRED_SLUGS = ["planner"];
export const noAccountWebApps = webApps.filter(
  (a) => !ACCOUNT_REQUIRED_SLUGS.includes(a.slug)
);

/** Same-category apps, falling back to same-platform, capped at three. */
export function relatedApps(app: App, limit = 3): App[] {
  const sameCategory = apps.filter(
    (a) => a.slug !== app.slug && a.category === app.category
  );
  const samePlatform = apps.filter(
    (a) =>
      a.slug !== app.slug &&
      a.platform === app.platform &&
      !sameCategory.includes(a)
  );
  return [...sameCategory, ...samePlatform].slice(0, limit);
}
