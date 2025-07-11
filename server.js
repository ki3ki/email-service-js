const express = require('express');
const ProviderA = require('./src/providers/providerA');
const ProviderB = require('./src/providers/providerB');
const EmailService = require('./src/services/EmailService');

const app = express();
app.use(express.json());

// Create providers and service
const providerA = new ProviderA();
const providerB = new ProviderB();
const emailService = new EmailService([providerA, providerB]);

// Define POST endpoint
app.post('/send-email', async (req, res) => {
  const { messageId, to, subject, body } = req.body;

  if (!messageId || !to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await emailService.sendEmail({ messageId, to, subject, body });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use Render’s default port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
