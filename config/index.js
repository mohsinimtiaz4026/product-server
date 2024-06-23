const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/backend-product').then(() => console.log(`database connected`)).catch((e) => console.log(`database failed: ${e.message}`));