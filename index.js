const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.post('/payment', async (req, res) => {
  try {
    const { token, amount, metadata } = req.body;
    // Create a charge using the Stripe token
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'gbp',
      source: token,
      description: 'Example charge',
      metadata: metadata
    });

    res.json({ success: true, message: 'Payment successful', charge });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, message: 'Payment failed', error: error.message });
  }
});


app.listen(process.env.PORT || 4000, () => {
  console.log("server is listening on port 4000");
})