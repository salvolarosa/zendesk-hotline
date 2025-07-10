export default async function handler(req, res) {
  // CORS headers : autoriser ton frontend
  res.setHeader('Access-Control-Allow-Origin', 'https://salvolarosa.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Répondre OK à la requête preflight
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { subject, body, requesterName, requesterEmail } = req.body;

    const zendeskRes = await fetch('https://swish7527.zendesk.com/api/v2/tickets.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('support@swishforgood.com/token:EbLVluq5EBq6TfLwIB4Bop7xQkuSTH6uY8GuSbAZ').toString('base64')
      },
      body: JSON.stringify({
        ticket: {
