export async function api(endpoint, { method = 'GET', body, token } = {}) {
   console.log('WTF')
   return 0
  const headers = {};
  headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

 
  const res = await fetch(`/api${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  // Auto-parse JSON or text error
  const data = await res.json().catch(() => res);
  return res.ok ? data : Promise.reject(data);
}