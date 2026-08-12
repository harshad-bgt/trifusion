// ============================================================
// Trifusion Site Configuration
// Central place for all site-wide configuration
// [TODO: Replace placeholders with real Trifusion data]
// ============================================================

export const siteConfig = {
    name: "TriFusion Tech LLP",
    tagline: "Engineering Digital Products That Move Businesses Forward",
    description: "TriFusion Tech LLP builds custom software, GST accounting systems, mobile applications, and AI-powered systems for businesses ready to scale.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://trifusiontechnology.in",
    ogImage: "/images/og-default.png",

    contact: {
        email: process.env.TRIFUSION_EMAIL || "trifusiontech.llp@gmail.com",
        phone: process.env.TRIFUSION_PHONE || "+91 93095 05277",
        whatsapp: process.env.TRIFUSION_WHATSAPP || "+919309505277",
        address: process.env.TRIFUSION_ADDRESS || "Katraj-Kondhwa Road, Katraj, Pune - 411046, Maharashtra, India",
        addressShort: "Katraj-Kondhwa Road, Katraj, Pune - 411046",
        mapsUrl: "https://maps.google.com/?q=Katraj-Kondhwa+Road,+Katraj,+Pune+411046",
    },

    social: {
        linkedin:  "https://www.linkedin.com/in/trifusion-technology-llp-031447427",
        twitter:   "https://x.com/trifusiontech",
        instagram: "https://www.instagram.com/trifusiontechnology?igsh=dGZheGNnM2xkZ2t3",
        facebook:  "https://www.facebook.com/profile.php?id=61593171780174",
        github:    "",
    },

    // Navigation structure
    nav: {
        solutions: [
            { label: "Custom Software Development", href: "/solutions/custom-software-development" },
            { label: "Web Application Development", href: "/solutions/web-application-development" },
            { label: "Mobile App Development", href: "/solutions/mobile-app-development" },
            { label: "Smart GST & Accounting Systems", href: "/solutions/smart-gst-accounting" },
            { label: "AI & Machine Learning", href: "/solutions/ai-ml" },
            { label: "Data Analytics & BI", href: "/solutions/data-analytics" },
            { label: "Cloud & DevOps", href: "/solutions/cloud-devops" },
            { label: "API & System Integration", href: "/solutions/api-integration" },
            { label: "UI/UX Engineering", href: "/solutions/ui-ux" },
            { label: "Digital Transformation", href: "/solutions/digital-transformation" },
        ],
        industries: [
            { label: "Healthcare", href: "/industries/healthcare" },
            { label: "Education", href: "/industries/education" },
            { label: "FinTech", href: "/industries/fintech" },
            { label: "E-Commerce", href: "/industries/ecommerce" },
            { label: "Logistics", href: "/industries/logistics" },
            { label: "Real Estate", href: "/industries/real-estate" },
            { label: "Manufacturing", href: "/industries/manufacturing" },
            { label: "Retail", href: "/industries/retail" },
        ],
        company: [
            { label: "About Trifusion", href: "/company/about" },
            { label: "Our Process", href: "/company/process" },
            { label: "Technology", href: "/company/technology" },
        ],
    },

    // Technology stack (structured data for homepage)
    techStack: {
        Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Flutter"],
        Backend: ["Node.js", "Python", "Express", "FastAPI", "NestJS", "Go"],
        Mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
        Database: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite"],
        Cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
        "AI / ML": ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face"],
        DevOps: ["GitHub Actions", "Terraform", "Nginx", "PM2", "Datadog"],
        Analytics: ["Metabase", "Grafana", "BigQuery", "dbt", "Apache Airflow"],
    },

    // Engagement models
    engagementModels: [
        {
            title: "Project-Based",
            description: "Fixed scope, timeline, and investment. Ideal for well-defined products and specific deliverables.",
            idealFor: "Defined MVPs, feature builds, redesigns",
            duration: "4–16 weeks",
            highlights: ["Fixed budget", "Scoped deliverables", "Clear milestones"],
        },
        {
            title: "Dedicated Team",
            description: "A dedicated engineering team embedded into your roadmap. You get the output without the overhead of hiring.",
            idealFor: "Growing startups, product companies, scale-ups",
            duration: "3+ months",
            highlights: ["Full-time capacity", "Direct collaboration", "Flexible scope"],
        },
        {
            title: "Technology Partner",
            description: "A long-term engineering partnership covering development, architecture, and scaling strategy.",
            idealFor: "Established businesses, complex systems, ongoing product evolution",
            duration: "Ongoing",
            highlights: ["Strategic input", "Architecture ownership", "Continuous delivery"],
        },
    ],

    // Process steps
    process: [
        {
            step: "01",
            title: "Discovery",
            description: "We learn your business, users, technical constraints, and goals. We ask hard questions because the right architecture depends on honest answers.",
        },
        {
            step: "02",
            title: "Strategy & Architecture",
            description: "We translate requirements into a technical plan — stack, data model, infrastructure, and sprint structure — before a single line of code is written.",
        },
        {
            step: "03",
            title: "Development",
            description: "Agile sprints with weekly demos, daily progress, and continuous testing. You see the product evolve in real time.",
        },
        {
            step: "04",
            title: "QA & Launch",
            description: "Structured quality assurance, performance testing, security review, and a controlled launch with rollback planning.",
        },
        {
            step: "05",
            title: "Support & Scale",
            description: "We monitor, maintain, and evolve. As your business grows, the architecture grows with it.",
        },
    ],

    // Default SEO
    seo: {
        defaultTitle: "Trifusion Technology LLP | Software Engineering & Digital Products",
        titleTemplate: "%s | Trifusion Technology",
        defaultDescription: "Trifusion Technology LLP builds custom software, SaaS products, mobile apps, and AI-powered systems for businesses ready to scale.",
    },

    // Footer links
    footer: {
        solutions: [
            { label: "Custom Software", href: "/solutions/custom-software-development" },
            { label: "Web Applications", href: "/solutions/web-application-development" },
            { label: "Mobile Apps", href: "/solutions/mobile-app-development" },
            { label: "Smart GST & Accounting", href: "/solutions/smart-gst-accounting" },
            { label: "AI & ML", href: "/solutions/ai-ml" },
        ],
        company: [
            { label: "About", href: "/company/about" },
            { label: "Our Process", href: "/company/process" },
            { label: "Technology", href: "/company/technology" },
            { label: "Careers", href: "/careers" },
        ],
        resources: [
            { label: "Case Studies", href: "/case-studies" },
            { label: "Insights", href: "/insights" },
            { label: "FAQ", href: "/#faq" },
        ],
        legal: [
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms-of-service" },
        ],
    },
};

export type SiteConfig = typeof siteConfig;
