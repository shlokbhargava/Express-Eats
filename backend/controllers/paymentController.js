const asyncHandler = require("express-async-handler")
const stripe = require('stripe')('sk_test_51GvoiXJmYE2iXkVGx63vkh5NcG9gqhfMBrZQJErYGY7ofDwacQ1AT3zsqmWnyfOHeYRafXsLxZwelKL6BDOMxs2n00K5dMPh6V')

const YOUR_DOMAIN = 'http://localhost:3000'


// @desc    Payment Check Out Session
// @route   POST /api/payments/create-checkout-session
// @access  Private
exports.checkOutSession = asyncHandler(async (req, res) => {

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          name: 'John',
          currency: 'INR',
          amount: '1000',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url)
  })