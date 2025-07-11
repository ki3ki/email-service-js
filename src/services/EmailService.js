const retryWithBackoff = require('../utils/retry');
const RateLimiter = require('../utils/rateLimiter');
const statusStore = require('../statusStore')

class EmailService {
  constructor(providers, maxEmailsPerMinute = 5) {
    this.providers = providers; // array of provider instances
    this.rateLimiter = new RateLimiter(maxEmailsPerMinute, 60 * 1000); // 1 min interval
  }

  // Main method to send email
  async sendEmail({ messageId, to, subject, body }) {
    // Idempotency: check if messageId was already sent
    if (statusStore.isAlreadySent(messageId)) {
      console.log(`⚠️ Email with messageId "${messageId}" was already sent. Skipping.`);
      return statusStore.getStatus(messageId);
    }

    // Rate limiting check
    if (!this.rateLimiter.allow()) {
      throw new Error("Rate limit exceeded. Try again later.");
    }

    // Function to try sending via a provider
    const trySend = async (provider) => {
      return await retryWithBackoff(() => provider.sendEmail(to, subject, body));
    };

    let lastError;

    // Try providers in order
    for (let i = 0; i < this.providers.length; i++) {
      try {
        await trySend(this.providers[i]);
        // Mark success in status store
        statusStore.markAsSent(messageId, this.providers[i].constructor.name, true);
        console.log(`🎉 Email sent successfully via ${this.providers[i].constructor.name}`);
        return { success: true, provider: this.providers[i].constructor.name };
      } catch (err) {
        console.log(`⚠️ Provider ${this.providers[i].constructor.name} failed: ${err.message}`);
        lastError = err;
        // fallback: try next provider
      }
    }

    // If all providers fail:
    statusStore.markAsSent(messageId, null, false);
    console.log("❌ All providers failed to send the email.");
    throw lastError;
  }
}

module.exports = EmailService;
