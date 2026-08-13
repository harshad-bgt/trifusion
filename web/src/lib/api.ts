// ============================================================
// Trifusion API Client
// Next.js → Express API communication layer
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type ApiOptions = {
    method?: string;
    body?: unknown;
    token?: string;
    tags?: string[];
    revalidate?: number;
    cache?: RequestCache;
};

export class ApiError extends Error {
    status: number;
    code: string;

    constructor(message: string, status: number, code: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body, token, tags, revalidate, cache } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const fetchOptions: RequestInit = {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : {}),
        ...(tags ? { next: { tags, ...(revalidate !== undefined ? { revalidate } : {}) } } : {}),
        ...(cache ? { cache } : {}),
    };

    const res = await fetch(`${API_BASE}${path}`, fetchOptions);
    const json = await res.json() as { success: boolean; data?: T; error?: { code: string; message: string } };

    if (!json.success) {
        throw new ApiError(
            json.error?.message || 'Request failed',
            res.status,
            json.error?.code || 'ERROR'
        );
    }

    return json.data as T;
}

// ── Public API ────────────────────────────────────────────────

export const api = {
    // Services
    services: {
        list: (params?: { page?: number; limit?: number }) => {
            const q = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
            return apiFetch<PaginatedResponse<Service>>(`/api/services${q}`, { tags: ['services'], revalidate: 3600 });
        },
        get: (slug: string) =>
            apiFetch<Service>(`/api/services/${slug}`, { tags: [`service-${slug}`], revalidate: 3600 }),
    },

    // Industries
    industries: {
        list: () =>
            apiFetch<PaginatedResponse<Industry>>('/api/industries', { tags: ['industries'], revalidate: 3600 }),
        get: (slug: string) =>
            apiFetch<Industry>(`/api/industries/${slug}`, { tags: [`industry-${slug}`], revalidate: 3600 }),
    },

    // Case Studies
    caseStudies: {
        list: (params?: { industry?: string; featured?: string; page?: number; limit?: number }) => {
            const q = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
            return apiFetch<PaginatedResponse<CaseStudy>>(`/api/case-studies${q}`, { tags: ['case-studies'], revalidate: 3600 });
        },
        get: (slug: string) =>
            apiFetch<CaseStudy>(`/api/case-studies/${slug}`, { tags: [`case-study-${slug}`], revalidate: 3600 }),
    },

    // Products
    products: {
        list: () =>
            apiFetch<PaginatedResponse<Product>>('/api/products', { tags: ['products'], revalidate: 3600 }),
        get: (slug: string) =>
            apiFetch<Product>(`/api/products/${slug}`, { tags: [`product-${slug}`], revalidate: 3600 }),
    },

    // Testimonials
    testimonials: {
        list: () =>
            apiFetch<Testimonial[]>('/api/testimonials', { tags: ['testimonials'], revalidate: 3600 }),
    },

    // FAQs
    faqs: {
        list: (params?: { serviceId?: string; industryId?: string }) => {
            const q = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
            return apiFetch<FAQ[]>(`/api/faqs${q}`, { tags: ['faqs'], revalidate: 3600 });
        },
    },

    // Blog
    blog: {
        list: (params?: { page?: number; limit?: number; category?: string; search?: string }) => {
            const q = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
            return apiFetch<PaginatedResponse<BlogPost>>(`/api/blog${q}`, { tags: ['blog'], revalidate: 3600 });
        },
        get: (slug: string) =>
            apiFetch<BlogPost>(`/api/blog/${slug}`, { tags: [`post-${slug}`], revalidate: 3600 }),
    },

    // Careers
    careers: {
        list: () =>
            apiFetch<PaginatedResponse<Job>>('/api/careers', { tags: ['jobs'], revalidate: 3600 }),
        get: (slug: string) =>
            apiFetch<Job>(`/api/careers/${slug}`, { tags: [`job-${slug}`], revalidate: 3600 }),
        apply: (slug: string, data: unknown) =>
            apiFetch<{ id: string; message: string }>(`/api/careers/${slug}/apply`, { method: 'POST', body: data }),
    },

    // Settings
    settings: {
        get: () =>
            apiFetch<Record<string, string | null>>('/api/settings', { tags: ['settings'], revalidate: 86400 }),
    },

    // Contact
    leads: {
        submit: (data: unknown) =>
            apiFetch<{ leadRef: string; message: string }>('/api/leads', { method: 'POST', body: data }),
    },

    // Admin (authenticated)
    admin: {
        stats: (token: string) =>
            apiFetch<AdminStats>('/api/admin/stats', { token, cache: 'no-store' }),
        leads: (token: string, params?: { page?: number; status?: string; search?: string }) => {
            const q = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
            return apiFetch<PaginatedResponse<Lead>>(`/api/leads${q}`, { token, cache: 'no-store' });
        },
        updateLeadStatus: (token: string, id: string, status: string) =>
            apiFetch(`/api/leads/${id}/status`, { method: 'PATCH', body: { status }, token }),
        login: (email: string, password: string) =>
            apiFetch<{ token: string; user: AdminUser }>('/api/auth/login', { method: 'POST', body: { email, password } }),
        verify: (token: string) =>
            apiFetch<{ user: AdminUser }>('/api/auth/verify', { method: 'POST', token }),
    },
};

// ── Types ─────────────────────────────────────────────────────

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
    seoTitle?: string;
    seoDesc?: string;
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
    services?: { service: Service }[];
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
    architecture?: string;
    published: boolean;
    featured: boolean;
    heroImage?: string;
    seoTitle?: string;
    seoDesc?: string;
    metrics?: CaseStudyMetric[];
    technologies?: { name: string; category?: string }[];
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
    features?: { title: string; desc?: string; icon?: string }[];
    technologies?: { name: string; category?: string }[];
    screenshots?: { url: string; alt?: string }[];
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
    category?: { name: string; slug: string };
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    author?: string;
    category?: { name: string; slug: string };
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
    leads: { total: number; new: number };
    services: { total: number; published: number };
    industries: { published: number };
    caseStudies: { published: number };
    products: { published: number };
    testimonials: { published: number };
    blog: { total: number; published: number };
    careers: { openJobs: number; applications: number };
}
