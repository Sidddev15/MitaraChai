// src/lib/products.ts
export type PackSize = '250g' | '500g';

export type ProductVariant = {
    size: PackSize;
    price: number; // in INR
};

export type Product = {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    image: string;        // /public/images/...
    features: string[];
    variants: ProductVariant[];
};

export const PRODUCTS: Product[] = [
    {
        id: 'premium',
        name: 'Premium Leaves',
        slug: 'premium-leaves',
        tagline: 'Everyday chai, elevated.',
        description: 'Balanced Assam blend for a smooth, comforting cup.',
        image: '/images/premium-1.jpg',
        features: ['Balanced taste', 'Consistent liquor', 'Great for milk chai'],
        variants: [
            { size: '250g', price: 149 },
            { size: '500g', price: 259 },
        ],
    },
    {
        id: 'strong',
        name: 'Strong Chai',
        slug: 'strong-chai',
        tagline: 'Bold color. Bigger kick.',
        description: 'Darker cup, stronger taste and color.',
        image: '/images/strong-1.jpg',
        features: ['Bold liquor', 'Robust aroma', 'Perfect with masala'],
        variants: [
            { size: '250g', price: 159 },
            { size: '500g', price: 279 },
        ],
    },
    {
        id: 'gold',
        name: 'Gold',
        slug: 'gold',
        tagline: 'Richer. Deeper. Aroma-first.',
        description: 'Signature blend with richer body and layered aroma.',
        image: '/images/gold-1.jpg',
        features: ['High aroma', 'Rich body', 'Premium profile'],
        variants: [
            { size: '250g', price: 199 },
            { size: '500g', price: 349 },
        ],
    },
];
