export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subject, body, requesterName, requesterEmail } = req.body;

  const zendeskRes = await fetch("https://swish7527.zendesk.com/api/v2/tickets.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + Buffer.from("support@swishforgood.com/token:EbLVluq5EBq6TfLwIB4Bop7xQkuSTH6uY8GuSbAZ").toString("base64")
    },
    body: JSON.stringify({
      ticket: {
        subject,
        comment: { body },
        requester: {
          name: requesterName,
          email: requesterEmail
        }
      }
    })
  });

  const data = await zendeskRes.json();

  if (!zendeskRes.ok) {
    return res.status(zendeskRes.status).json(data);
  }

  res.status(200).json(data);
}
