export declare class ApiError extends Error {
    status: number;
    code: string;
    constructor(message: string, status: number, code: string);
}
export declare const api: {
    services: {
        list: (params?: {
            page?: number;
            limit?: number;
        }) => Promise<PaginatedResponse<Service>>;
        get: (slug: string) => Promise<Service>;
    };
    industries: {
        list: () => Promise<PaginatedResponse<Industry>>;
        get: (slug: string) => Promise<Industry>;
    };
    caseStudies: {
        list: (params?: {
            industry?: string;
            featured?: string;
            page?: number;
            limit?: number;
        }) => Promise<PaginatedResponse<CaseStudy>>;
        get: (slug: string) => Promise<CaseStudy>;
    };
    products: {
        list: () => Promise<PaginatedResponse<Product>>;
        get: (slug: string) => Promise<Product>;
    };
    testimonials: {
        list: () => Promise<Testimonial[]>;
    };
    faqs: {
        list: (params?: {
            serviceId?: string;
            industryId?: string;
        }) => Promise<FAQ[]>;
    };
    blog: {
        list: (params?: {
            page?: number;
            limit?: number;
            category?: string;
            search?: string;
        }) => Promise<PaginatedResponse<BlogPost>>;
        get: (slug: string) => Promise<BlogPost>;
    };
    careers: {
        list: () => Promise<PaginatedResponse<Job>>;
        get: (slug: string) => Promise<Job>;
        apply: (slug: string, data: unknown) => Promise<{
            id: string;
            message: string;
        }>;
    };
    settings: {
        get: () => Promise<Record<string, string | null>>;
    };
    leads: {
        submit: (data: unknown) => Promise<{
            leadRef: string;
            message: string;
        }>;
    };
    admin: {
        stats: (token: string) => Promise<AdminStats>;
        leads: (token: string, params?: {
            page?: number;
            status?: string;
            search?: string;
        }) => Promise<PaginatedResponse<Lead>>;
        updateLeadStatus: (token: string, id: string, status: string) => Promise<unknown>;
        login: (email: string, password: string) => Promise<{
            token: string;
            user: AdminUser;
        }>;
        verify: (token: string) => Promise<{
            user: AdminUser;
        }>;
    };
};
export interface PaginatedResponse<T> {
    items: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export interface Service {
    id: string;
    slug: string;
    title: string;
    shortDesc: string;
    description: string;
    icon?: string;
    heroImage?: string;
    problemStatement?: string;
    published: boolean;
    featured: boolean;
    sortOrder: number;
    features?: ServiceFeature[];
    technologies?: ServiceTechnology[];
    faqs?: FAQ[];
}
export interface ServiceFeature {
    id: string;
    title: string;
    desc?: string;
    icon?: string;
}
export interface ServiceTechnology {
    id: string;
    name: string;
    category?: string;
    icon?: string;
}
export interface Industry {
    id: string;
    slug: string;
    title: string;
    shortDesc: string;
    description?: string;
    icon?: string;
    challenges?: string;
    outcomes?: string;
    published: boolean;
    services?: {
        service: Service;
    }[];
    caseStudies?: CaseStudy[];
}
export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    clientName?: string;
    industry?: Industry;
    overview?: string;
    challenge?: string;
    solution?: string;
    published: boolean;
    featured: boolean;
    heroImage?: string;
    metrics?: CaseStudyMetric[];
    technologies?: {
        name: string;
        category?: string;
    }[];
    testimonial?: Testimonial;
}
export interface CaseStudyMetric {
    id: string;
    label: string;
    value: string;
    description?: string;
}
export interface Product {
    id: string;
    slug: string;
    name: string;
    tagline?: string;
    description: string;
    logo?: string;
    heroImage?: string;
    category?: string;
    status: string;
    externalUrl?: string;
    published: boolean;
    featured: boolean;
    features?: {
        title: string;
        desc?: string;
        icon?: string;
    }[];
    technologies?: {
        name: string;
        category?: string;
    }[];
    screenshots?: {
        url: string;
        alt?: string;
    }[];
}
export interface Testimonial {
    id: string;
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
    quote: string;
    rating?: number;
}
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category?: {
        name: string;
        slug: string;
    };
}
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    author?: string;
    category?: {
        name: string;
        slug: string;
    };
    tags?: string;
    readingTime?: number;
    published: boolean;
    publishedAt?: string;
}
export interface Job {
    id: string;
    slug: string;
    title: string;
    department?: string;
    location?: string;
    employmentType?: string;
    experience?: string;
    description?: string;
    responsibilities?: string;
    requirements?: string;
    benefits?: string;
    published: boolean;
}
export interface Lead {
    id: string;
    leadRef: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    serviceInterest?: string;
    message: string;
    status: string;
    createdAt: string;
}
export interface AdminUser {
    id: string;
    email: string;
    name?: string;
    role: string;
}
export interface AdminStats {
    leads: {
        total: number;
        new: number;
    };
    services: {
        total: number;
        published: number;
    };
    industries: {
        published: number;
    };
    caseStudies: {
        published: number;
    };
    products: {
        published: number;
    };
    testimonials: {
        published: number;
    };
    blog: {
        total: number;
        published: number;
    };
    careers: {
        openJobs: number;
        applications: number;
    };
}
//# sourceMappingURL=api.d.ts.map