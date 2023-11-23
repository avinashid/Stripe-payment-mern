const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

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


const checkoutSession = async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
}


module.exports = {
  getCoupons,
};
