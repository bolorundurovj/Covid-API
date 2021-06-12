const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected On: ${conn.connection.host}`);
    return conn;
}

module.exports = {connectDB};