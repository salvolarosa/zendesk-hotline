export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subject, description, email } = req.body;

  const ZENDESK_DOMAIN = 'https://swish7527.zendesk.com';
  const ZENDESK_EMAIL = 'support@swishforgood.com';
  const ZENDESK_TOKEN = process.env.ZENDESK_TOKEN;

  const auth = Buffer.from(`${ZENDESK_EMAIL}/token:${ZENDESK_TOKEN}`).toString('base64');

  try {
    const response = await fetch(`${ZENDESK_DOMAIN}/api/v2/requests.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: {
          requester: {
            name: email,
            email: email,
          },
          subject,
          comment: {
            body: description,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ message: 'Ticket created successfully', data });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
