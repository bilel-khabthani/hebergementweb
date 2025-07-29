// pages/api/lead.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { company, email, phone, needs } = req.body;

    // 1. Enregistrement dans le CRM
    const crmResponse = await fetch('https://votre-crm.com/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRM_TOKEN}`
      },
      body: JSON.stringify({
        lead: {
          company_name: company,
          email,
          phone,
          description: needs
        }
      })
    });

    // 2. Notification à l'équipe commerciale
    await fetch('https://api.email-service.com/send', {
      method: 'POST',
      body: JSON.stringify({
        to: 'commercial@crp-memo.com',
        subject: 'Nouveau lead CRP-MEMO',
        text: `Nouvelle demande de ${company} (${email})`
      })
    });

    // 3. Réponse au client
    res.status(200).json({ 
      success: true,
      nextStep: {
        url: '/confirmation',
        message: 'Un commercial vous contactera sous 24h'
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}