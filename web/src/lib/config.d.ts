export declare const siteConfig: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    ogImage: string;
    contact: {
        email: string;
        phone: string;
        whatsapp: string;
        address: string;
    };
    social: {
        linkedin: string;
        twitter: string;
        github: string;
        instagram: string;
    };
    nav: {
        solutions: {
            label: string;
            href: string;
        }[];
        industries: {
            label: string;
            href: string;
        }[];
        company: {
            label: string;
            href: string;
        }[];
    };
    techStack: {
        Frontend: string[];
        Backend: string[];
        Mobile: string[];
        Database: string[];
        Cloud: string[];
        "AI / ML": string[];
        DevOps: string[];
        Analytics: string[];
    };
    engagementModels: {
        title: string;
        description: string;
        idealFor: string;
        duration: string;
        highlights: string[];
    }[];
    process: {
        step: string;
        title: string;
        description: string;
    }[];
    seo: {
        defaultTitle: string;
        titleTemplate: string;
        defaultDescription: string;
    };
    footer: {
        solutions: {
            label: string;
            href: string;
        }[];
        company: {
            label: string;
            href: string;
        }[];
        resources: {
            label: string;
            href: string;
        }[];
        legal: {
            label: string;
            href: string;
        }[];
    };
};
export type SiteConfig = typeof siteConfig;
//# sourceMappingURL=config.d.ts.map