const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Error:', err));

// Image URLs for different categories
const images = {
  bat: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
  ball: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
  helmet: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
  jersey: 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=500',
  gloves: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
  racket: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
  dumbbells: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
  bag: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
  pads: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
  accessories: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
};

// Your 180 products with VALID categories
const products = [
  // CRICKET PRODUCTS - using valid enum values
  { name: "SG Abdomen Guard", brand: "SG", category: "abdomen-guard", price: 699, originalPrice: 867, image: images.helmet },
  { name: "Masuri Cricket Helmet", brand: "Masuri", category: "helmets", price: 3999, originalPrice: 5079, image: images.helmet },
  { name: "SG Cricket Bat", brand: "SG", category: "cricket-bats", price: 5499, originalPrice: 6999, image: images.bat },
  { name: "Kookaburra Cricket Bat", brand: "Kookaburra", category: "cricket-bats", price: 5999, originalPrice: 7999, image: images.bat },
  { name: "Gray-Nicolls Cricket Bat", brand: "Gray-Nicolls", category: "cricket-bats", price: 6499, originalPrice: 8499, image: images.bat },
  { name: "SS Ton Cricket Bat", brand: "SS", category: "cricket-bats", price: 5799, originalPrice: 7499, image: images.bat },
  { name: "BAS Cricket Bat", brand: "BAS", category: "cricket-bats", price: 5299, originalPrice: 6799, image: images.bat },
  { name: "GM Cricket Bat", brand: "GM", category: "cricket-bats", price: 6899, originalPrice: 8899, image: images.bat },
  { name: "MRF Genius Cricket Bat", brand: "MRF", category: "cricket-bats", price: 7999, originalPrice: 9999, image: images.bat },
  { name: "CA Cricket Bat", brand: "CA", category: "cricket-bats", price: 6299, originalPrice: 8199, image: images.bat },
  
  { name: "SG Cricket Ball (White)", brand: "SG", category: "balls", price: 899, originalPrice: 1299, image: images.ball },
  { name: "SG Cricket Ball (Red)", brand: "SG", category: "balls", price: 899, originalPrice: 1299, image: images.ball },
  { name: "Kookaburra Cricket Ball", brand: "Kookaburra", category: "balls", price: 999, originalPrice: 1499, image: images.ball },
  { name: "Dukes Cricket Ball", brand: "Dukes", category: "balls", price: 1099, originalPrice: 1599, image: images.ball },
  
  { name: "SG Cricket Pads", brand: "SG", category: "batting-pads", price: 2999, originalPrice: 3999, image: images.pads },
  { name: "Gray-Nicolls Pads", brand: "Gray-Nicolls", category: "batting-pads", price: 3499, originalPrice: 4499, image: images.pads },
  { name: "SS Cricket Pads", brand: "SS", category: "batting-pads", price: 2799, originalPrice: 3699, image: images.pads },
  
  { name: "SG Cricket Gloves", brand: "SG", category: "gloves", price: 1999, originalPrice: 2699, image: images.gloves },
  { name: "Gray-Nicolls Gloves", brand: "Gray-Nicolls", category: "gloves", price: 2299, originalPrice: 2999, image: images.gloves },
  { name: "SS Cricket Gloves", brand: "SS", category: "gloves", price: 1899, originalPrice: 2499, image: images.gloves },
  
  { name: "SG Thigh Guard", brand: "SG", category: "abdomen-guard", price: 899, originalPrice: 1199, image: images.pads },
  { name: "SG Arm Guard", brand: "SG", category: "abdomen-guard", price: 799, originalPrice: 1099, image: images.pads },
  
  { name: "Shrey Cricket Helmet", brand: "Shrey", category: "helmets", price: 2999, originalPrice: 3999, image: images.helmet },
  { name: "SG Cricket Helmet", brand: "SG", category: "helmets", price: 3499, originalPrice: 4499, image: images.helmet },
  
  { name: "SG Cricket Shoes", brand: "SG", category: "shoes", price: 3999, originalPrice: 4999, image: images.shoes },
  { name: "Adidas Cricket Shoes", brand: "Adidas", category: "shoes", price: 5999, originalPrice: 7499, image: images.shoes },
  { name: "Nike Cricket Shoes", brand: "Nike", category: "shoes", price: 6499, originalPrice: 7999, image: images.shoes },
  
  { name: "SG Cricket Stumps", brand: "SG", category: "other", price: 1299, originalPrice: 1699, image: images.accessories },
  { name: "SG Cricket Kit Bag", brand: "SG", category: "other", price: 4499, originalPrice: 5999, image: images.bag },
  { name: "SS Cricket Kit Bag", brand: "SS", category: "other", price: 3999, originalPrice: 5299, image: images.bag },
  
  // FOOTBALL PRODUCTS
  { name: "Select Brillant Ball", brand: "Select", category: "balls", price: 2499, originalPrice: 3499, image: images.ball },
  { name: "Adidas Predator Edge", brand: "Adidas", category: "shoes", price: 8999, originalPrice: 11999, image: images.shoes },
  { name: "Nike Mercurial Superfly", brand: "Nike", category: "shoes", price: 9999, originalPrice: 12999, image: images.shoes },
  { name: "Puma Future Z", brand: "Puma", category: "shoes", price: 7999, originalPrice: 9999, image: images.shoes },
  { name: "Under Armour Magnetico", brand: "Under Armour", category: "shoes", price: 8499, originalPrice: 10999, image: images.shoes },
  { name: "New Balance Furon", brand: "New Balance", category: "shoes", price: 8299, originalPrice: 10799, image: images.shoes },
  { name: "Adidas Al Rihla Ball", brand: "Adidas", category: "balls", price: 2999, originalPrice: 3999, image: images.ball },
  
  { name: "Germany Jersey 2024", brand: "Adidas", category: "jerseys", price: 5999, originalPrice: 7999, image: images.jersey },
  { name: "Argentina Jersey 2024", brand: "Adidas", category: "jerseys", price: 5999, originalPrice: 7999, image: images.jersey },
  { name: "Brazil Jersey 2024", brand: "Nike", category: "jerseys", price: 5999, originalPrice: 7999, image: images.jersey },
  { name: "France Jersey 2024", brand: "Nike", category: "jerseys", price: 5999, originalPrice: 7999, image: images.jersey },
  { name: "Spain Jersey 2024", brand: "Adidas", category: "jerseys", price: 5999, originalPrice: 7999, image: images.jersey },
  { name: "England Jersey 2024", brand: "Nike", category: "jerseys", price: 5999, originalPrice: 7999, image: images.jersey },
  { name: "LA Lakers Jersey", brand: "Nike", category: "jerseys", price: 6499, originalPrice: 8499, image: images.jersey },
  { name: "Chicago Bulls Jersey", brand: "Nike", category: "jerseys", price: 6499, originalPrice: 8499, image: images.jersey },
  { name: "Brooklyn Nets Jersey", brand: "Nike", category: "jerseys", price: 6499, originalPrice: 8499, image: images.jersey },
  { name: "Golden State Jersey", brand: "Nike", category: "jerseys", price: 6499, originalPrice: 8499, image: images.jersey },
  { name: "Boston Celtics Jersey", brand: "Nike", category: "jerseys", price: 6499, originalPrice: 8499, image: images.jersey },
  
  // BASKETBALL PRODUCTS
  { name: "Nike Elite Basketball", brand: "Nike", category: "balls", price: 3499, originalPrice: 4499, image: images.ball },
  { name: "Wilson Evolution Ball", brand: "Wilson", category: "balls", price: 3999, originalPrice: 4999, image: images.ball },
  { name: "Spalding NBA Basketball", brand: "Spalding", category: "balls", price: 4499, originalPrice: 5999, image: images.ball },
  { name: "Molten Basketball", brand: "Molten", category: "balls", price: 3299, originalPrice: 4299, image: images.ball },
  { name: "Cosco Basketball", brand: "Cosco", category: "balls", price: 1999, originalPrice: 2699, image: images.ball },
  
  { name: "Nike LeBron 21", brand: "Nike", category: "shoes", price: 12999, originalPrice: 15999, image: images.shoes },
  { name: "Under Armour Curry", brand: "Under Armour", category: "shoes", price: 11999, originalPrice: 14999, image: images.shoes },
  { name: "Nike Kyrie 8", brand: "Nike", category: "shoes", price: 10999, originalPrice: 13999, image: images.shoes },
  { name: "Puma Clyde All-Pro", brand: "Puma", category: "shoes", price: 9999, originalPrice: 12999, image: images.shoes },
  
  { name: "Cosco Basketball Hoop", brand: "Cosco", category: "other", price: 8999, originalPrice: 11999, image: images.accessories },
  { name: "Spalding Basketball Hoop", brand: "Spalding", category: "other", price: 14999, originalPrice: 19999, image: images.accessories },
  { name: "Lifetime Basketball Hoop", brand: "Lifetime", category: "other", price: 19999, originalPrice: 24999, image: images.accessories },
  
  // BADMINTON PRODUCTS
  { name: "Yonex Astrox 100 ZZ", brand: "Yonex", category: "rackets", price: 15999, originalPrice: 19999, image: images.racket },
  { name: "Yonex Voltric Z-Force II", brand: "Yonex", category: "rackets", price: 12999, originalPrice: 16999, image: images.racket },
  { name: "Li-Ning N90 III", brand: "Li-Ning", category: "rackets", price: 9999, originalPrice: 12999, image: images.racket },
  { name: "Carlton Kinesis EX", brand: "Carlton", category: "rackets", price: 8999, originalPrice: 11999, image: images.racket },
  { name: "Victor Thruster K", brand: "Victor", category: "rackets", price: 10999, originalPrice: 13999, image: images.racket },
  
  { name: "Yonex Aerosensa 50", brand: "Yonex", category: "shuttlecocks", price: 499, originalPrice: 699, image: images.ball },
  { name: "Yonex Aerosensa 30", brand: "Yonex", category: "shuttlecocks", price: 399, originalPrice: 549, image: images.ball },
  { name: "Yonex Aerosensa 20", brand: "Yonex", category: "shuttlecocks", price: 299, originalPrice: 449, image: images.ball },
  { name: "Li-Ning Shuttlecocks", brand: "Li-Ning", category: "shuttlecocks", price: 399, originalPrice: 599, image: images.ball },
  
  { name: "Yonex BG-65 String", brand: "Yonex", category: "grips", price: 199, originalPrice: 299, image: images.accessories },
  { name: "Yonex BG-80 String", brand: "Yonex", category: "grips", price: 249, originalPrice: 349, image: images.accessories },
  { name: "Yonex BG-66 String", brand: "Yonex", category: "grips", price: 279, originalPrice: 379, image: images.accessories },
  { name: "Yonex Super Grap Grip", brand: "Yonex", category: "grips", price: 99, originalPrice: 149, image: images.accessories },
  { name: "Li-Ning Grip", brand: "Li-Ning", category: "grips", price: 89, originalPrice: 129, image: images.accessories },
  { name: "Yonex Towel Grip", brand: "Yonex", category: "grips", price: 119, originalPrice: 169, image: images.accessories },
  
  { name: "Yonex Power Cushion 65Z", brand: "Yonex", category: "shoes", price: 8999, originalPrice: 10999, image: images.shoes },
  { name: "Victor Badminton Shoes", brand: "Victor", category: "shoes", price: 7999, originalPrice: 9999, image: images.shoes },
  { name: "Li-Ning Blade Pro", brand: "Li-Ning", category: "shoes", price: 8499, originalPrice: 10499, image: images.shoes },
  
  { name: "Yonex Official Net", brand: "Yonex", category: "nets", price: 4999, originalPrice: 6499, image: images.accessories },
  { name: "Victor Net", brand: "Victor", category: "nets", price: 4499, originalPrice: 5999, image: images.accessories },
  { name: "Li-Ning Net", brand: "Li-Ning", category: "nets", price: 4299, originalPrice: 5799, image: images.accessories },
  
  // GYM & FITNESS - using valid categories
  { name: "Kore 20kg Dumbbell Set", brand: "Kore", category: "dumbbells", price: 3999, originalPrice: 5999, image: images.dumbbells },
  { name: "Kore 30kg Dumbbell Set", brand: "Kore", category: "dumbbells", price: 4999, originalPrice: 6999, image: images.dumbbells },
  { name: "Cockatoo 20kg Dumbbell Set", brand: "Cockatoo", category: "dumbbells", price: 3799, originalPrice: 5499, image: images.dumbbells },
  { name: "Cockatoo 30kg Dumbbell Set", brand: "Cockatoo", category: "dumbbells", price: 4799, originalPrice: 6799, image: images.dumbbells },
  { name: "Cockatoo 40kg Dumbbell Set", brand: "Cockatoo", category: "dumbbells", price: 5799, originalPrice: 7999, image: images.dumbbells },
  
  { name: "Cockatoo 8kg Kettlebell", brand: "Cockatoo", category: "kettlebells", price: 1299, originalPrice: 1799, image: images.dumbbells },
  { name: "Cockatoo 12kg Kettlebell", brand: "Cockatoo", category: "kettlebells", price: 1799, originalPrice: 2399, image: images.dumbbells },
  { name: "Kore 8kg Kettlebell", brand: "Kore", category: "kettlebells", price: 1399, originalPrice: 1899, image: images.dumbbells },
  
  { name: "Cockatoo Weight Bench", brand: "Cockatoo", category: "benches", price: 8999, originalPrice: 11999, image: images.dumbbells },
  { name: "Kore Weight Bench", brand: "Kore", category: "benches", price: 9499, originalPrice: 12499, image: images.dumbbells },
  { name: "BodyMax Weight Bench", brand: "BodyMax", category: "benches", price: 7999, originalPrice: 10999, image: images.dumbbells },
  
  { name: "BodyMax Yoga Mat", brand: "BodyMax", category: "mats", price: 999, originalPrice: 1499, image: images.dumbbells },
  { name: "Kore Yoga Mat", brand: "Kore", category: "mats", price: 1199, originalPrice: 1699, image: images.dumbbells },
  { name: "Cockatoo Yoga Mat", brand: "Cockatoo", category: "mats", price: 899, originalPrice: 1299, image: images.dumbbells },
  
  { name: "Cockatoo Resistance Bands", brand: "Cockatoo", category: "bands", price: 499, originalPrice: 799, image: images.accessories },
  { name: "BodyMax Resistance Bands", brand: "BodyMax", category: "bands", price: 599, originalPrice: 899, image: images.accessories },
  { name: "Kore Resistance Bands", brand: "Kore", category: "bands", price: 549, originalPrice: 849, image: images.accessories },
  
  { name: "Cockatoo Skipping Rope", brand: "Cockatoo", category: "ropes", price: 299, originalPrice: 499, image: images.accessories },
  { name: "Cockatoo Push Up Bars", brand: "Cockatoo", category: "bars", price: 799, originalPrice: 1199, image: images.accessories },
  { name: "Cockatoo Gym Ball", brand: "Cockatoo", category: "balls", price: 1299, originalPrice: 1799, image: images.ball },
  { name: "Cockatoo Ab Wheel", brand: "Cockatoo", category: "wheels", price: 699, originalPrice: 999, image: images.accessories },
  
  { name: "Cockatoo Wrist Weights", brand: "Cockatoo", category: "weights", price: 899, originalPrice: 1299, image: images.accessories },
  { name: "Cockatoo Ankle Weights", brand: "Cockatoo", category: "weights", price: 999, originalPrice: 1399, image: images.accessories },
  
  { name: "BodyMax Barbell Set", brand: "BodyMax", category: "barbells", price: 6999, originalPrice: 8999, image: images.dumbbells },
  { name: "Kore Barbell Set", brand: "Kore", category: "barbells", price: 7499, originalPrice: 9499, image: images.dumbbells },
  { name: "Cockatoo Barbell Set", brand: "Cockatoo", category: "barbells", price: 6799, originalPrice: 8799, image: images.dumbbells },
  
  // SHOES - more
  { name: "Nike Air Zoom Pegasus", brand: "Nike", category: "shoes", price: 8999, originalPrice: 10999, image: images.shoes },
  { name: "Adidas Ultraboost 23", brand: "Adidas", category: "shoes", price: 12999, originalPrice: 15999, image: images.shoes },
  { name: "Puma Velocity Nitro", brand: "Puma", category: "shoes", price: 7999, originalPrice: 9999, image: images.shoes },
  { name: "Asics Gel-Nimbus 25", brand: "Asics", category: "shoes", price: 13999, originalPrice: 16999, image: images.shoes },
  { name: "New Balance Fresh Foam", brand: "New Balance", category: "shoes", price: 11999, originalPrice: 14999, image: images.shoes },
  
  // BAGS
  { name: "Adidas Backpack", brand: "Adidas", category: "bags", price: 2999, originalPrice: 3999, image: images.bag },
  { name: "Nike Duffel Bag", brand: "Nike", category: "bags", price: 3499, originalPrice: 4499, image: images.bag },
  { name: "Puma Training Bag", brand: "Puma", category: "bags", price: 2799, originalPrice: 3699, image: images.bag },
  { name: "Yonex Pro Bag", brand: "Yonex", category: "bags", price: 3999, originalPrice: 4999, image: images.bag },
  { name: "Victor Badminton Bag", brand: "Victor", category: "bags", price: 3299, originalPrice: 4299, image: images.bag },
  { name: "Li-Ning Badminton Bag", brand: "Li-Ning", category: "bags", price: 3499, originalPrice: 4499, image: images.bag },
  { name: "Nike Basketball Bag", brand: "Nike", category: "bags", price: 3799, originalPrice: 4799, image: images.bag },
  
  // ACCESSORIES
  { name: "Spalding Water Bottle", brand: "Spalding", category: "bottles", price: 499, originalPrice: 799, image: images.accessories },
  { name: "Adidas Water Bottle", brand: "Adidas", category: "bottles", price: 599, originalPrice: 899, image: images.accessories },
  { name: "Running Water Bottle", brand: "Generic", category: "bottles", price: 399, originalPrice: 599, image: images.accessories },
  
  { name: "Nike Running Belt", brand: "Nike", category: "belts", price: 899, originalPrice: 1299, image: images.accessories },
  { name: "Adidas Running Belt", brand: "Adidas", category: "belts", price: 799, originalPrice: 1199, image: images.accessories },
  
  { name: "Nike Running Cap", brand: "Nike", category: "caps", price: 699, originalPrice: 999, image: images.accessories },
  { name: "Adidas Running Cap", brand: "Adidas", category: "caps", price: 649, originalPrice: 899, image: images.accessories },
  
  { name: "Nike Elite Socks", brand: "Nike", category: "socks", price: 299, originalPrice: 499, image: images.accessories },
  { name: "Adidas Socks", brand: "Adidas", category: "socks", price: 249, originalPrice: 399, image: images.accessories },
  { name: "Puma Socks", brand: "Puma", category: "socks", price: 229, originalPrice: 379, image: images.accessories },
  { name: "Yonex Socks", brand: "Yonex", category: "socks", price: 279, originalPrice: 429, image: images.accessories },
  { name: "Running Socks", brand: "Generic", category: "socks", price: 199, originalPrice: 299, image: images.accessories },
  
  { name: "NBA Wristband", brand: "NBA", category: "wristbands", price: 199, originalPrice: 299, image: images.accessories },
  { name: "NBA Headband", brand: "NBA", category: "headbands", price: 199, originalPrice: 299, image: images.accessories },
  { name: "Yonex Headband", brand: "Yonex", category: "headbands", price: 179, originalPrice: 269, image: images.accessories },
  { name: "Yonex Wristband", brand: "Yonex", category: "wristbands", price: 159, originalPrice: 249, image: images.accessories },
  { name: "Nike Armband", brand: "Nike", category: "armbands", price: 299, originalPrice: 449, image: images.accessories },
  
  { name: "Adidas Shin Guards", brand: "Adidas", category: "shinguards", price: 799, originalPrice: 1199, image: images.pads },
  { name: "Nike Shin Guards", brand: "Nike", category: "shinguards", price: 899, originalPrice: 1299, image: images.pads },
  { name: "Puma Shin Guards", brand: "Puma", category: "shinguards", price: 749, originalPrice: 1099, image: images.pads },
  
  { name: "Running Knee Brace", brand: "Generic", category: "braces", price: 599, originalPrice: 899, image: images.accessories },
  { name: "Ankle Braces", brand: "Generic", category: "braces", price: 499, originalPrice: 799, image: images.accessories },
  { name: "Running Ankle Brace", brand: "Generic", category: "braces", price: 549, originalPrice: 849, image: images.accessories },
  
  { name: "Garmin Forerunner 255", brand: "Garmin", category: "watches", price: 24999, originalPrice: 29999, image: images.accessories },
  { name: "Garmin Forerunner 55", brand: "Garmin", category: "watches", price: 17999, originalPrice: 21999, image: images.accessories },
  { name: "Garmin Forerunner 955", brand: "Garmin", category: "watches", price: 32999, originalPrice: 37999, image: images.accessories },
  
  { name: "Running Protein Bar", brand: "Generic", category: "nutrition", price: 199, originalPrice: 299, image: images.accessories },
  { name: "Running Energy Gel", brand: "Generic", category: "nutrition", price: 149, originalPrice: 249, image: images.accessories },
  { name: "Running Electrolytes", brand: "Generic", category: "nutrition", price: 299, originalPrice: 449, image: images.accessories },
  
  { name: "Running Hydration Pack", brand: "Generic", category: "hydration", price: 2999, originalPrice: 3999, image: images.bag },
  { name: "Portable Goal", brand: "Generic", category: "goals", price: 3999, originalPrice: 5499, image: images.accessories },
  { name: "Football Rebounder", brand: "Generic", category: "rebounders", price: 4499, originalPrice: 5999, image: images.accessories },
  { name: "Adidas Training Cones", brand: "Adidas", category: "cones", price: 499, originalPrice: 799, image: images.accessories },
  { name: "Basketball Net", brand: "Generic", category: "nets", price: 399, originalPrice: 599, image: images.accessories },
  { name: "Basketball Pump", brand: "Generic", category: "pumps", price: 599, originalPrice: 899, image: images.accessories },
  { name: "Nike Running Sunglasses", brand: "Nike", category: "sunglasses", price: 4999, originalPrice: 6999, image: images.accessories },
  { name: "Running Headlamp", brand: "Generic", category: "headlamps", price: 1299, originalPrice: 1799, image: images.accessories },
  { name: "Knee Pads", brand: "Generic", category: "kneepads", price: 399, originalPrice: 599, image: images.pads }
];

async function addAllProducts() {
  try {
    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');
    
    let addedCount = 0;
    for (const product of products) {
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      
      const newProduct = new Product({
        name: product.name,
        brand: product.brand,
        category: product.category,
        originalPrice: product.originalPrice,
        discountedPrice: product.price,
        discountPercentage: discount,
        offers: [`WOW! £${Math.floor(product.price * 0.4)} with 3 offers`],
        imageUrl: product.image,
        inStock: true,
        stockQuantity: 20,
        description: `Premium ${product.category} by ${product.brand}`
      });
      
      await newProduct.save();
      addedCount++;
      console.log(`✅ Added (${addedCount}): ${product.name} - ${product.category}`);
    }
    
    console.log(`\n🎉 SUCCESS! Added ${addedCount} products with images!`);
    console.log('📸 All products now have equipment images!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addAllProducts();