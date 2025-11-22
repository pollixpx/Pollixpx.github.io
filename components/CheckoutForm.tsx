import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from 'https://esm.sh/@stripe/react-stripe-js?external=react,react-dom';

// Styles for the Stripe Iframe content
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#e2e8f0', // slate-200 matches Tailwind
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#64748b', // slate-500
      },
      iconColor: '#6366f1', // indigo-500
    },
    invalid: {
      color: '#ef4444', // red-500
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: true, // Simplified for this demo
};

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    // In a real application, you would create a PaymentIntent on your backend
    // and use stripe.confirmCardPayment() with the client_secret.
    // Here, we demonstrate creating a PaymentMethod to show the elements are working.
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message || 'An unexpected error occurred.');
      setLoading(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setSuccess(true);
      setLoading(false);
      // Reset logic could go here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-2">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-400">
          Card Details
        </label>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all duration-200">
          <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} onChange={() => setError(null)} />
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-md animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Payment details verified successfully! (Token generated)</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading || success}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 ${
          (loading || success) ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : success ? (
          'Success'
        ) : (
          `Verificar Tarjeta`
        )}
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        Powered by <span className="font-bold text-gray-400">Stripe</span>. 
        <br/> 
        Use <span className="font-mono text-indigo-400">4242 4242 4242 4242</span> to test.
      </p>
    </form>
  );
};