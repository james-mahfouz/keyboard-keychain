import { db } from '../index';
import { products } from '../schema';

async function main() {
    const sampleProducts = [
        {
            name: 'CLASSIC WASD',
            price: '$5.97',
            priceValue: 5.97,
            color: 'Clear & Cream',
            switches: 'Light Sound (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_59PM-1763504359428.png',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: 'STEALTH EDITION',
            price: '$5.97',
            priceValue: 5.97,
            color: 'Smoke & Black',
            switches: 'Light Sound (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_36PM-1763504359353.png',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: 'RGB GAMER',
            price: '$5.97',
            priceValue: 5.97,
            color: 'Clear & Blue',
            switches: 'Clicky & Loud (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_29PM-1763504359576.png',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            name: 'CRYSTAL PRO',
            price: '$5.97',
            priceValue: 5.97,
            color: 'Crystal Clear',
            switches: 'Light Sound (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_28PM-1763504359521.png',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(products).values(sampleProducts);
    
    console.log('✅ Products seeder completed successfully - 4 mechanical keyboard keychains added');
}

main().catch((error) => {
    console.error('❌ Products seeder failed:', error);
});