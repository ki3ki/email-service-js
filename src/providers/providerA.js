class ProviderA {
  async sendEmail(to, subject, body) {
    console.log("🔵 Trying Provider A...");

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (Math.random() < 0.7) {
      console.log("✅ Provider A: Email sent successfully");
      return true;
    } else {
      console.log("❌ Provider A: Failed to send email");
      throw new Error("Provider A failed");
    }
  }
}

module.exports = ProviderA;
