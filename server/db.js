const mongoose = require("mongoose");

async function connectToDatabase(){
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
        });
        console.log('🍃 MongoDB server connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectToDatabase};