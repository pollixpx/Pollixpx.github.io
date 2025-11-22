import { loadStripe } from 'https://esm.sh/@stripe/stripe-js';

// This is a publicly available test key from Stripe's documentation.
// In a real app, you would use process.env.REACT_APP_STRIPE_KEY
export const STRIPE_PUBLIC_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);