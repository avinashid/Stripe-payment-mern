const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const cors = require("cors");
const {
  getCoupons,
  createCheckoutSession,
  sessionStatus,
  webhook,
} = require("./controllers/stripe");
connectDB();
const app = express();

app.use(cors());
app.post("/webhook", express.raw({ type: "application/json" }), webhook);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/getCoupons", getCoupons);
app.post("/create-checkout-session", createCheckoutSession);
app.get("/session-status", sessionStatus);

app.listen(port, () => console.log(`Server started on port ${port}`));
