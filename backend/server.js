require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const { connectDB } = require("./config/db.js");
const productRoutes = require("./routes/productRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const ruleRoutes = require("./routes/ruleRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use Routes
app.use("/api/products", productRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/auth", authRoutes);

function startScheduler() {
  cron.schedule(
    "0 1 * * *",
    async () => {
      console.log(
        "[Scheduler] Running daily rules at",
        new Date().toISOString()
      );
      const rules = await Rule.find({ enabled: true, schedule: "daily" });
      for (const r of rules) {
        try {
          await runRuleById(r._id);
        } catch (err) {
          console.error("Error running rule", r._id, err);
        }
      }
    },
    {
      timezone: process.env.TIMEZONE || "UTC",
    }
  );
}

async function start() {
  await connectDB();
  startScheduler();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
