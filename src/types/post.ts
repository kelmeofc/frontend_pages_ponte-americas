export interface IPost {
    id: number;
    rttpg_featured_image_url: {
        full: string[]
    }
    title: { rendered: string }
    excerpt: { rendered: string }
    content: { rendered: string }
    rttpg_excerpt: string;
    slug: string;
    status: string;
    image: string;
    date: string;
    link: string;
}

export interface IMetadataPost {
    slug: string;
    title: string;
    description: string;
    modified: string;
    image: string;
}

export interface IPagination {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
}