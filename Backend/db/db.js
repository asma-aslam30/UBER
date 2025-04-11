const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_CONNECT, { 
            // useNewUrlParser: true, 
            // useUnifiedTopology: true 
        });
        console.log('Connected to MongoDB');  // ✅ Ab yeh execute hoga
    } catch (err) {
        console.error('MongoDB connection error:', err);  // ✅ Error handling better ho gayi
    }
}

module.exports = connectToDb;
