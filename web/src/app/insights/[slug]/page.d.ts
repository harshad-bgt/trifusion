import type { Metadata } from 'next';
interface Props {
    params: {
        slug: string;
    };
}
export declare function generateMetadata({ params }: Props): Promise<Metadata>;
export default function InsightDetailPage({ params }: Props): Promise<import("react").JSX.Element>;
export {};
//# sourceMappingURL=page.d.ts.map