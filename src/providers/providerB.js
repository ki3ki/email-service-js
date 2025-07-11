class ProviderB {
  async sendEmail(to, subject, body) {
    console.log("🟠 Trying Provider B...");

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (Math.random() < 0.8) {
      console.log("✅ Provider B: Email sent successfully");
      return true;
    } else {
      console.log("❌ Provider B: Failed to send email");
      throw new Error("Provider B failed");
    }
  }
}

module.exports = ProviderB;
