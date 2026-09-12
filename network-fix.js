/* GHAR PARIVAR — resilient API fetch layer
   Retries transient gateway/database failures without duplicating normal writes. */
(() => {
  const originalFetch = window.fetch.bind(window);
  const API = 'https://ghar-parivar-backend.onrender.com';
  const wait = ms => new Promise(r => setTimeout(r, ms));

  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    const method = String(init.method || (typeof input !== 'string' ? input.method : 'GET') || 'GET').toUpperCase();
    if (!url.startsWith(API)) return originalFetch(input, init);

    const canRetry = method === 'GET' || method === 'HEAD' || (method === 'POST' && /\/login$/.test(url));
    const attempts = canRetry ? 4 : 1;
    let lastError;

    for (let i = 0; i < attempts; i++) {
      try {
        const response = await originalFetch(input, init);
        if (response.ok || !canRetry || ![502, 503, 504].includes(response.status) || i === attempts - 1) return response;
      } catch (err) {
        lastError = err;
        if (!canRetry || i === attempts - 1) throw err;
      }
      await wait(700 * (i + 1));
    }
    throw lastError || new Error('Network request failed');
  };
})();
