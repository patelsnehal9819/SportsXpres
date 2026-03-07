const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  { name: 'SG Abdomen Guard', brand: 'SG', category: 'abdomen-guard', price: 699, original: 867 },
  { name: 'Masuri Cricket Helmet', brand: 'Masuri', category: 'helmets', price: 3999, original: 5079 },
  { name: 'Select Brillant Ball', brand: 'Select', category: 'balls', price: 2499, original: 3499 },
  { name: 'Adidas Backpack', brand: 'Adidas', category: 'bags', price: 2999, original: 3999 },
  { name: 'Li-Ning Shuttlecocks', brand: 'Li-Ning', category: 'shuttlecocks', price: 399, original: 599 },
  { name: 'Nike Elite Basketball', brand: 'Nike', category: 'balls', price: 3499, original: 4499 }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');
    
    for (const p of products) {
      await Product.create({
        name: p.name,
        brand: p.brand,
        category: p.category,
        originalPrice: p.original,
        discountedPrice: p.price,
        inStock: true
      });
    }
    
    console.log('✅ 6 products added!');
    console.log('🔄 Refresh your products page now!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

run();
