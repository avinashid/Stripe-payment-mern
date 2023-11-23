const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { getCoupons } = require("./controllers/stripe");
connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/getCoupons", getCoupons);
const YOUR_DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { name, address, email, coupon } = req.body.userData;
    console.log(name, address, email, coupon);
    const discounts = coupon ? `discounts: [{ coupon }]` : "";
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1OFDMbSAmBXTDoESE74c7rN1",
          quantity: 1,
        },
      ],
      discounts,
      mode: "subscription",
      customer_email: email,

      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error.message);
    res.status(500).json();
  }
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
