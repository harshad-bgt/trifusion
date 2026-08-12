import { MetadataRoute } from 'next';
import { api } from '@/lib/api';
import { siteConfig } from '@/lib/config';

const BASE_URL = siteConfig.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        '',
        '/solutions',
        '/industries',
        '/products',
        '/case-studies',
        '/insights',
        '/careers',
        '/contact',
        '/company/about',
        '/company/process',
        '/company/technology',
        '/privacy-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    try {
        const [services, industries, products, caseStudies, posts, jobs] = await Promise.allSettled([
            api.services.list({ limit: 100 }),
            api.industries.list(),
            api.products.list(),
            api.caseStudies.list({ limit: 100 }),
            api.blog.list({ limit: 100 }),
            api.careers.list(),
        ]);

        const dynamicRoutes: MetadataRoute.Sitemap = [];

        if (services.status === 'fulfilled') {
            services.value.items.forEach(s => {
                dynamicRoutes.push({ url: `${BASE_URL}/solutions/${s.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
            });
        }
        if (industries.status === 'fulfilled') {
            industries.value.items.forEach(ind => {
                dynamicRoutes.push({ url: `${BASE_URL}/industries/${ind.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
            });
        }
        if (products.status === 'fulfilled') {
            products.value.items.forEach(p => {
                dynamicRoutes.push({ url: `${BASE_URL}/products/${p.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
            });
        }
        if (caseStudies.status === 'fulfilled') {
            caseStudies.value.items.forEach(cs => {
                dynamicRoutes.push({ url: `${BASE_URL}/case-studies/${cs.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
            });
        }
        if (posts.status === 'fulfilled') {
            posts.value.items.forEach(post => {
                dynamicRoutes.push({ url: `${BASE_URL}/insights/${post.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 });
            });
        }
        if (jobs.status === 'fulfilled') {
            jobs.value.items.forEach(job => {
                dynamicRoutes.push({ url: `${BASE_URL}/careers/${job.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 });
            });
        }

        return [...staticRoutes, ...dynamicRoutes];
    } catch {
        return staticRoutes;
    }
}
