const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  { name: 'SG Abdomen Guard', brand: 'SG', category: 'abdomen-guard', sport: 'cricket', price: 699, original: 867 },
  { name: 'Masuri Cricket Helmet', brand: 'Masuri', category: 'helmets', sport: 'cricket', price: 3999, original: 5079 },
  { name: 'Select Brillant Ball', brand: 'Select', category: 'balls', sport: 'football', price: 2499, original: 3499 },
  { name: 'Adidas Backpack', brand: 'Adidas', category: 'bags', sport: 'other', price: 2999, original: 3999 },
  { name: 'Li-Ning Shuttlecocks', brand: 'Li-Ning', category: 'shuttlecocks', sport: 'badminton', price: 399, original: 599 },
  { name: 'Nike Elite Basketball', brand: 'Nike', category: 'balls', sport: 'basketball', price: 3499, original: 4499 }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');
    
    let count = 0;
    for (const p of products) {
      const discount = Math.round(((p.original - p.price) / p.original) * 100);
      await Product.create({
        name: p.name,
        brand: p.brand,
        category: p.category,
        sport: p.sport,
        originalPrice: p.original,
        discountedPrice: p.price,
        discountPercentage: discount,
        offers: [`WOW! £${Math.floor(p.price * 0.4)} with 3 offers`],
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
        inStock: true,
        stockQuantity: 20,
        description: `${p.brand} ${p.name} - Premium quality sports equipment`
      });
      count++;
      console.log(`✅ Added ${count} products`);
    }
    
    console.log(`\n🎉 SUCCESS! Added ${count} products!`);
    console.log('🔄 Refresh your products page now!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

run();
