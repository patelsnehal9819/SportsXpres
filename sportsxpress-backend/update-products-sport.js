const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Error:', err));

// Sport mapping based on product name/brand keywords
const getSportFromProduct = (name, brand, category) => {
  const text = `${name} ${brand} ${category}`.toLowerCase();

  if (text.includes('cricket') || text.includes('bat') || text.includes('helmet') || text.includes('guard') || text.includes('pad') || text.includes('stump') || text.includes('ball') && !text.includes('basketball') && !text.includes('football')) {
    return 'cricket';
  }
  if (text.includes('football') || text.includes('soccer') || text.includes('predator') || text.includes('mercurial') || text.includes('jersey') && (text.includes('germany') || text.includes('argentina') || text.includes('brazil') || text.includes('england') || text.includes('spain') || text.includes('france'))) {
    return 'football';
  }
  if (text.includes('basketball') || text.includes('hoop') || text.includes('lebron') || text.includes('kyrie') || text.includes('lakers') || text.includes('bulls') || text.includes('nets') || text.includes('warriors') || text.includes('celtics') || text.includes('spalding') || text.includes('wilson') && text.includes('ball')) {
    return 'basketball';
  }
  if (text.includes('badminton') || text.includes('yonex') || text.includes('shuttle') || text.includes('racket') || text.includes('li-ning') || text.includes('victor') || text.includes('aerosensa') || text.includes('astrox') || text.includes('voltric')) {
    return 'badminton';
  }
  if (text.includes('gym') || text.includes('dumbbell') || text.includes('kettlebell') || text.includes('bench') || text.includes('weight') || text.includes('mat') || text.includes('cockatoo') || text.includes('kore') || text.includes('bodymax') || text.includes('resistance') || text.includes('ab wheel') || text.includes('gloves') && !text.includes('cricket') && !text.includes('football')) {
    return 'gym-fitness';
  }
  if (text.includes('run') || text.includes('shoe') && !text.includes('cricket') && !text.includes('football') && !text.includes('basketball') || text.includes('sock') || text.includes('belt') || text.includes('hydration') || text.includes('protein') || text.includes('pegasus') || text.includes('ultraboost') || text.includes('asics') || text.includes('new balance')) {
    return 'running';
  }

  return 'other';
};

const updateProductsWithSport = async () => {
  try {
    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);

    for (const product of products) {
      const sport = getSportFromProduct(product.name, product.brand, product.category);
      await Product.findByIdAndUpdate(product._id, { sport });
      console.log(`Updated ${product.name} -> ${sport}`);
    }

    console.log('✅ All products updated with sport information!');
  } catch (error) {
    console.error('❌ Error updating products:', error);
  } finally {
    mongoose.connection.close();
  }
};

updateProductsWithSport();