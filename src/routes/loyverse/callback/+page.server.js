// file: src/routes/auth/loyverse/callback/+page.server.js

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ url, request, fetch }) => {
    // 1. Extract the 'code' and 'state' from the URL Loyverse sent
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    // 2. Basic validation
    if (!code) {
      return { success: false, error: 'Authorization code not found' };
    }

    // 3. Securely send the code to your Symfony backend
    try {
      const response = await fetch('http://localhost:7071/api/loyverse/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (response.ok) {
        // 4. On success, redirect to your main page with success data
        throw redirect(303, '/loyverse-test?success=true&items=' + data.items_fetched);
      } else {
        // 5. On backend error, redirect with an error message
        throw redirect(303, '/loyverse-test?error=' + encodeURIComponent(data.error || 'Token exchange failed'));
      }
    } catch (err) {
      // 6. On network error, redirect with error details
      throw redirect(303, '/loyverse-test?error=' + encodeURIComponent(err.message || 'Network error'));
    }
  }
};