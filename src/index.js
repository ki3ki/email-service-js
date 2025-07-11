const ProviderA = require('./providers/providerA');
const ProviderB = require('./providers/providerB');
const EmailService = require('./services/EmailService');

// Instantiate providers
const providerA = new ProviderA();
const providerB = new ProviderB();

// Create the email service with both providers (A first, then fallback to B)
const emailService = new EmailService([providerA, providerB]);

// Generate a random messageId to simulate a unique email (for idempotency)
const messageId = 'msg_' + Math.floor(Math.random() * 10000);

// Email content
const emailData = {
  messageId: messageId,
  to: 'user@example.com',
  subject: 'Welcome to our service!',
  body: 'Thank you for signing up. Let us know if you need anything!'
};

// Run the sendEmail function
async function run() {
  try {
    const result = await emailService.sendEmail(emailData);
    console.log("✅ Final Result:", result);
  } catch (err) {
    console.error("❌ Final Error:", err.message);
  }
}

run();
