/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import Stripe from 'stripe';

const stripe = Stripe(
  'sk_test_51OT1cULmzp3fXPyxGfnAjRwA4biD1ctAsB8FC4zFxa2xEpIa0256NuxKB8vXF81mKie85Ah31nZmkz1XpLbizVUM00dcPKlmlp'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

document.getElementById('book-tour').addEventListener('click', e => {
  console.log('1');
});
