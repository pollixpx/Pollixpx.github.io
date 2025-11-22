import React from 'react';
import { Elements } from 'https://esm.sh/@stripe/react-stripe-js?external=react,react-dom';
import { stripePromise } from './services/stripeService.ts';
import { CheckoutForm } from './components/CheckoutForm.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Product Info & Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 mb-3 border border-indigo-500/20">
              Checkout Demo
            </span>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Pro Plan Subscription</h1>
            <p className="text-gray-400">Unlimited access to all premium features, dark mode analytics, and 24/7 priority support.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-white">$0.10</span>
              <span className="ml-2 text-lg text-gray-500">/verificación</span>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>

        {/* Right Column: Technical Explanation */}
        <div className="space-y-8 lg:mt-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              How it works
            </h2>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-sm leading-relaxed text-gray-400">
              <p className="mb-4">
                This is a frontend-only demo using Stripe's <strong>Card Element</strong>. 
                It securely collects card details and generates a token (or PaymentMethod) client-side.
              </p>
              <p>
                To actually charge the card, you need a backend. The client cannot charge cards directly for security reasons.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              Backend Integration Guide
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-indigo-400 font-bold text-sm border border-gray-700">1</div>
                <div>
                  <h3 className="text-white font-medium">Create PaymentIntent</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Your backend calls <code>stripe.paymentIntents.create({'{ amount: 10, currency: "usd" }'})</code>.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-indigo-400 font-bold text-sm border border-gray-700">2</div>
                <div>
                  <h3 className="text-white font-medium">Send Client Secret</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    The backend returns the <code>client_secret</code> from the intent to this frontend.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-indigo-400 font-bold text-sm border border-gray-700">3</div>
                <div>
                  <h3 className="text-white font-medium">Confirm Payment</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    The frontend calls <code>stripe.confirmCardPayment(client_secret, ...)</code> to finalize the charge.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;