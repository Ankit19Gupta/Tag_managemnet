const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
