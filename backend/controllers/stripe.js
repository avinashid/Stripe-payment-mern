const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const SubscriptionData = require("../models/SubscriptionModel");
const endpointSecret =
  "whsec_26db93c292761d1c11251a766a88bba83b4f300b00352775a2f8015309f95077";

const YOUR_DOMAIN = "http://localhost:5173";
const getCoupons = async (req, res) => {
  try {
    const couponCode = req.body.couponCode;
    const retrieve = await stripe.coupons.list({
      limit: 3,
    });
    const available = retrieve.data.filter((e) => e.name === couponCode);
    res.json(available);
  } catch (error) {
    res.json([]);
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const { name, address, email, couponId } = req.body.userData;
    console.log(name, address, email, couponId);
    const couponFound = couponId ? true : false;
    const discount = couponFound ? [{ coupon: couponId }] : [];
    console.log(discount);
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: "price_1OFDMbSAmBXTDoESE74c7rN1",
          quantity: 1,
        },
      ],

      discounts: discount,
      mode: "subscription",
      customer_email: email,
      custom_fields: [{}],
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error.message);
    res.status(500).json();
  }
};

const sessionStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const subscriptionData = async ( checkoutSessionCompleted ) => {
  try {
    const session = await SubscriptionData.create({
      sessionid: checkoutSessionCompleted.id,
      amount_subtotal: checkoutSessionCompleted.amount_subtotal,
      amount_total: checkoutSessionCompleted.amount_total,
      email: checkoutSessionCompleted.customer_email,
      name: checkoutSessionCompleted.customer_details.name,
      phone:  0,
      address: checkoutSessionCompleted.customer_details.address.country,
      invoice: checkoutSessionCompleted.invoice,
      payment_status: checkoutSessionCompleted.payment_status,
    });
    if (session) {
      console.log(session);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log("error", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const uploadSession = await subscriptionData(checkoutSessionCompleted);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.send();
};

module.exports = {
  getCoupons,
  createCheckoutSession,
  sessionStatus,
  webhook,
};
